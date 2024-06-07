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

export const ExportPdf = Node.create({
  name: 'exportPdf',
  content: 'block+',
  isolating: true,
  addCommands() {
    return {
      exportPdf: () => ({ editor }) => {
        // Ottieni il contenuto HTML dell'editor
        const contentHtml = editor.getHTML();

        // Usa DOMParser per convertire l'HTML in testo semplice
        const parser = new DOMParser();
        const doc = parser.parseFromString(contentHtml, 'text/html');
        const contentText = doc.body.textContent || '';

        const pdf = new jsPDF();
        const margin = 10;
        const maxLineWidth = pdf.internal.pageSize.width - 2 * margin;
        const lines = pdf.splitTextToSize(contentText, maxLineWidth);

        // Aggiungi il contenuto al PDF, gestendo le righe
        lines.forEach((line, index) => {
          pdf.text(line, margin, margin + index * 10);
        });

        // Salva il PDF
        pdf.save('editor-content.pdf');
        return true;
      }
    };
  }
});
