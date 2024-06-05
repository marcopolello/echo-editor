import { Node } from '@tiptap/core'
import { Column } from './Column'
import { GeneralOptions } from '@/type'

export enum ColumnLayout {
  SidebarLeft = 'sidebar-left',
  SidebarRight = 'sidebar-right',
  TwoColumn = 'two-column',
  ThreeColumn = 'three-column',
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    columns: {
      setColumns: (layout?: ColumnLayout) => ReturnType
      setLayout: (layout: ColumnLayout) => ReturnType
    }
  }
}

export interface ColumnsOptions extends GeneralOptions<ColumnsOptions> {
  columnOptions: any
  layout: ColumnLayout
}

export const Columns = Node.create<ColumnsOptions>({
  name: 'columns',
  group: 'columns',
  content: 'column+',
  defining: true,
  isolating: true,
  addOptions() {
    return {
      ...this.parent?.(),
      layout: ColumnLayout.TwoColumn,
    }
  },

  addAttributes() {
    return {
      layout: {
        default: ColumnLayout.TwoColumn,
      },
    }
  },
  addCommands() {
    return {
      setColumns:
        (layout?: ColumnLayout) =>
        ({ commands }) => {
          if (layout === ColumnLayout.ThreeColumn) {
            commands.insertContent(`<div data-type="columns">
            <div data-type="column" data-position="left"></div>
            <div data-type="column" data-position="center"></div>
            <div data-type="column" data-position="right"></div>
            </div>`)
            return true
          } else {
            commands.insertContent(`<div data-type="columns"><div data-type="column" data-position="left"><p></p></div><div data-type="column" data-position="right"><p></p></div></div>`)
            return true
          }
        },

      setLayout: (layout: ColumnLayout) => ({ commands }) => {
        return commands.updateAttributes('columns', { layout });
      }
    }
  },

  renderHTML({ HTMLAttributes }) {
    const layoutClass = `layout-${HTMLAttributes.layout}`;
    return ['div', { 'data-type': 'columns', class: layoutClass }, 0];
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="columns"]',
      },
    ]
  },

  addExtensions() {
    return [Column.configure(this.options.columnOptions)]
  },
})

export default Columns
