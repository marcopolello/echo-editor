import { Node, mergeAttributes } from '@tiptap/core'
import axios from 'axios';
import { jsPDF } from 'jspdf';  // Importa la libreria jsPDF
import type { Editor } from 'grapesjs';
import Modal from './components/Modal.vue';
// import { xml } from '$lib/stores/xml';
import { xml2json } from 'xml-js';

export let editorInstance: Editor;

let showModal = false;
let base64Pdf: string;

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    export: {
      exportPdf: () => ReturnType
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
        const doc = new jsPDF();
        const content = editor.getHTML();  // Ottieni il contenuto dell'editor in formato HTML
        doc.text(content, 10, 10);  // Aggiungi il contenuto HTML al PDF
        doc.save('editor-content.pdf');  // Salva il PDF con un nome di file
        return true;
      }
    }
  },
})
