import { Editor } from '@tiptap/core'
import { Group } from './types'
import { useLocale } from '@/locales'
import { hasExtension } from '@/utils/utils'
import { AllEmbedServices } from '@/extensions/Iframe/embed'
const { t } = useLocale()

export const GROUPS: Group[] = [
  {
    name: 'format',
    title: 'Formato',
    commands: [
      {
        name: 'heading1',
        label: t.value('editor.heading.h1.tooltip'),
        aliases: ['h1', 'bt', 'bt1'],
        description: 'okok',
        iconName: 'Heading1',
        action: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run()
        },
      },
      {
        name: 'heading2',
        label: t.value('editor.heading.h2.tooltip'),
        aliases: ['h2', 'bt', 'bt2'],
        iconName: 'Heading2',
        action: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
        },
      },
      {
        name: 'heading3',
        label: t.value('editor.heading.h3.tooltip'),
        aliases: ['h3', 'bt', 'bt3'],
        iconName: 'Heading3',
        action: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
        },
      },
      {
        name: 'bulletList',
        label: t.value('editor.bulletlist.tooltip'),
        aliases: ['ul', 'yxlb'],
        iconName: 'List',
        action: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run()
        },
      },
      {
        name: 'numberedList',
        label: t.value('editor.orderedlist.tooltip'),
        aliases: ['ol', 'yxlb'],
        iconName: 'ListOrdered',
        action: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleOrderedList().run()
        },
      },
      {
        name: 'taskList',
        label: t.value('editor.tasklist.tooltip'),
        iconName: 'ListTodo',
        description: 'Task list with todo items',
        aliases: ['todo'],
        action: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleTaskList().run()
        },
      },
      {
        name: 'blockquote',
        label: t.value('editor.blockquote.tooltip'),
        description: 'inserireintrodurreFormato',
        aliases: ['yr'],
        iconName: 'TextQuote',
        action: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setBlockquote().run()
        },
      },
      {
        name: 'codeBlock',
        label: t.value('editor.codeblock.tooltip'),
        iconName: 'Code2',
        description: 'Code block with syntax highlighting',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setCodeBlock().run()
        },
      },
    ],
  },
  {
    name: 'insert',
    title: 'inserire',
    commands: [
      {
        name: 'table',
        label: t.value('editor.table.tooltip'),
        iconName: 'Table',
        description: 'Insert a table',
        aliases: ['table', 'bg', 'biaoge', 'biao'],
        shouldBeHidden: editor => editor.isActive('columns'),
        action: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()
        },
      },
      {
        name: 'horizontalRule',
        label: t.value('editor.horizontalrule.tooltip'),
        iconName: 'Minus',
        description: 'Insert a horizontal divider',
        aliases: ['hr', 'fgx', 'fg'],
        action: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setHorizontalRule().run()
        },
      },
      {
        name: 'columns',
        label: 'colonne',
        iconName: 'Columns2',
        description: 'Add two column content',
        aliases: ['columns', 'cols', '2cols'],
        shouldBeHidden: editor => editor.isActive('columns'),
        action: ({ editor, range }) => {
          editor
            .chain()
            .deleteRange(range)
            .setColumns()
            .focus(editor.state.selection.head - 1)
            .run()
        },
      },
    ],
  },
]

export function renderGroups(editor: Editor) {
  const groups = GROUPS
  const hasAI = hasExtension(editor, 'Ai')
  const hasIframes = hasExtension(editor, 'iframes')
  if (hasAI) {
    groups.unshift({
      name: 'ai',
      title: 'AI',
      commands: [
        {
          name: 'aiWriter',
          label: 'Assistente intelligente AI',
          iconName: 'Sparkles',
          description: 'Let AI finish your thoughts',
          shouldBeHidden: editor => editor.isActive('columns'),
          action: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).activateMagic().run()
          },
        },
      ],
    })
  }
  if (hasIframes) {
    const services = AllEmbedServices
    groups.push({
      name: 'others',
      title: 'ncorpora servizi di terze parti',
      commands: services.map(item => ({
        name: item.value,
        label: item.label,
        iconName: item.icon,
        aliases: [item.value, item.label],
        shouldBeHidden: editor => editor.isActive('columns'),
        action: ({ editor, range }) => {
          editor
            .chain()
            .deleteRange(range)
            .focus()
            .setIframe({
              src: '',
              service: item.value,
            })
            .run()
        },
      })),
    })
  }
  return groups
}
