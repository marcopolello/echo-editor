import ActionButton from '@/components/ActionButton.vue'
import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

export const Layout = Extension.create({
  name: 'layout',
  iconName: 'Layout',
  description: 'Add layout',
  aliases: ['columns', 'cols', '2cols'],
  shouldBeHidden: false,
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor, extension, t }) {
        const skeletons = extension.options?.skeletons || [];
        const items = [...skeletons].map(k => ({
          title: "Add Layout",
          isActive: () => {
            return true;
          },
          action: ({ editor, range }) => {
            editor
            .chain()
            .deleteRange(range)
            .setColumns()
            .focus(editor.state.selection.head - 1)
            .run()
          },
          disabled: false,
          divider: false,
          default: false,
        }))
      },
    }
  }
})
