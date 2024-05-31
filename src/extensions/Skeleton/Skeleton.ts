import { Node, Extension, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import type { Item } from './components/SkeletonActionButton.vue'
import ArticleBlock from './components/ArticleBlock.vue'
import SkeletonActionButton from './components/SkeletonActionButton.vue'
import { DEFAULT_SKELETONS_LIST } from '@/constants'

export const Skeleton = Extension.create({
  name: 'skeleton',
  addOptions() {
    return {
      ...this.parent?.(),
      //types: ['textStyle'],
      //fontSizes: [...DEFAULT_FONT_SIZE_LIST],
      skeletons: [...DEFAULT_SKELETONS_LIST],
      button({ editor, extension, t }) {
        const skeletons = extension.options?.skeletons || [];
        const items: Item[] = [...skeletons].map(k => ({
          title: "skeletons",
          isActive: () => {
            return true;
          },
          action: () => {
            editor.commands.setSkeleton(String(k))
          },
          disabled: false,
          divider: false,
          default: false,
        }))
        const disabled = items.filter(k => k.disabled).length === items.length
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
})