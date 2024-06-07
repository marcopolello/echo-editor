import { Node, mergeAttributes } from '@tiptap/core'
import axios from 'axios';
import type { Editor } from 'grapesjs';
import Modal from './components/Modal.vue';
//import { xml } from '$lib/stores/xml';
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
        exportPdf: () => ({ commands }) => {
        return commands.setNode('exportPdf', { position: 'left' })
      }
    }
  },

})