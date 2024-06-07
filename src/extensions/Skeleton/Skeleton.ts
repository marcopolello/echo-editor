import { Node, Extension, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import type { Item } from './components/SkeletonActionButton.vue'
import SkeletonActionButton from './components/SkeletonActionButton.vue'
import { DEFAULT_SKELETONS_LIST } from '@/constants'

// src/extensions/Skeleton/Skeleton.ts

let skeletons = [
  {id: "1", title: "skeleton1", content: "content1"}, 
  {id: "2", title: "skeleton2", content: "content2"}, 
  {id: "3", title: "skeleton3", content: "content3"}
];

export const Skeleton = Extension.create({
  name: 'skeleton',
  addOptions() {
    return {
      ...this.parent?.(),
      skeletons: [...skeletons],
      button({ editor, extension, t }) {
        const skeletons = extension.options?.skeletons || [];
        const items: Item[] = [...skeletons].map(k => ({
          title: k.title,
          isActive: () => true,
          action: () => {
            insertCustomHTML(editor, String(k.title));
          },
          disabled: false,
          divider: false,
          default: false,
        }));
        const disabled = items.filter(k => k.disabled).length === items.length;
        return {
          component: SkeletonActionButton,
          componentProps: {
            editor,
            tooltip: "skeletons",
            disabled,
            items,
            maxHeight: 280,
          },
        }
      },
    }
  },
});

// Definisci la funzione che inserirà l'HTML personalizato
function insertCustomHTML(editor, skeletonTitle) {
  //CUSTOM HTML PRESO DA DB O CHIAMATA AXIOS
  //TODO
  const customHTML = '<div class="custom-html">Custom HTML Content for Skeleton: ' + skeletonTitle + '</div>';
  editor.chain().focus().insertContent(customHTML).run();
}