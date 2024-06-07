// File: src/extensions/Export/ExportPdf.ts

// Importa le librerie necessarie
import { Node, mergeAttributes } from '@tiptap/core';
import { jsPDF } from 'jspdf';
import type { Editor } from 'grapesjs';
import Modal from './components/Modal.vue';
import { xml2json } from 'xml-js';

// Definire l'istanza dell'editor
export let editorInstance: Editor;

let showModal = false;
let base64Pdf: string;

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    export: {
      exportPdf: () => ReturnType;
    }
  }
}

function htmlToPlainText(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const body = doc.body;

  function recursiveTextExtraction(node: HTMLElement): string {
    let text = '';

    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === globalThis.Node.TEXT_NODE) {
        text += child.textContent;
      } else if (child.nodeType === globalThis.Node.ELEMENT_NODE) {
        text += recursiveTextExtraction(child as HTMLElement);
      }
      // Add line breaks for block elements
      if (child.nodeName === 'BR' || child.nodeName === 'P' || child.nodeName === 'DIV') {
        text += '\n';
      }
    }

    return text;
  }

  return recursiveTextExtraction(body).replace(/\n\s*\n/g, '\n'); // Remove multiple consecutive newlines
}

export const ExportPdf = Node.create({
  name: 'exportPdf',
  content: 'block+',
  isolating: true,
  addCommands() {
    return {
      exportPdf: () => ({ editor }) => {
        const contentHtml = editor.getHTML();
        const contentText = htmlToPlainText(contentHtml);

        const pdf = new jsPDF();
        const margin = 10;
        const maxLineWidth = pdf.internal.pageSize.width - 2 * margin;
        const lines = pdf.splitTextToSize(contentText, maxLineWidth);

        lines.forEach((line, index) => {
          pdf.text(line, margin, margin + index * 10);
        });

        pdf.save('editor-content.pdf');
        return true;
      }
    };
  }
});
