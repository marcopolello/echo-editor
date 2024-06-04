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
      setColumns: () => ReturnType
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
        () =>
        ({ commands }) => {
          //if (commands) {
          //  console.log(commands);
          //}
          commands.insertContent(
            `<div data-type="columns"><div data-type="column" data-position="left"><p></p></div><div data-type="column" data-position="center"><p></p></div><div data-type="column" data-position="right"><p></p></div></div>`
          )
          return true
        },

      setLayout: (layout: ColumnLayout) => ({ commands }) => {
        console.log(`Updating layout to: ${layout}`);
        return commands.updateAttributes('columns', { layout });
      }
    }
  },
  renderHTML({ HTMLAttributes }) {
    const layoutClass = `layout-${HTMLAttributes.layout}`; 
  if (HTMLAttributes.layout === 'three-column') {
    return [
      'div', 
      { 'data-type': 'columns', class: layoutClass }, 
      ['div', { 'data-type': 'column', 'data-position': 'left' }, 0],
      ['div', { 'data-type': 'column', 'data-position': 'center' }, 0],
      ['div', { 'data-type': 'column', 'data-position': 'right' }, 0]
    ];
  }
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
