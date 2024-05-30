import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import ArticleBlock from './components/ArticleBlock.vue'
import SkeletonActionButton from './components/SkeletonActionButton.vue'

export const Skeleton = Node.create({
  name: 'skeleton',

  group: 'block',

  content: 'block+',

  parseHTML() {
    return [
      {
        tag: 'div[data-type="skeleton"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'skeleton' }), 0]
  },

  addNodeView() {
    return VueNodeViewRenderer(ArticleBlock)
  },

  addOptions() {
        return {
      ...this.parent?.(),
      HTMLAttributes: {},
      resizable: true,
      //lastColumnResizable: true,
      //allowTableNodeSelection: false,
      button: ({ editor, t }) => ({
        component: SkeletonActionButton,
        componentProps: {
          disabled: editor.isActive('table') || false,
          icon: 'Skeleton',
          tooltip: t('editor.skeleton.tooltip'),
        },
      }),
    }
  },
})