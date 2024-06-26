<script setup lang="ts">
import { computed, ref } from 'vue'
import { sticky } from 'tippy.js'
import type { Editor } from '@tiptap/vue-3'
import { BubbleMenu, isActive } from '@tiptap/vue-3'
import ActionButton from '@/components/ActionButton.vue'
import { ColumnLayout } from '../Columns'
import { getRenderContainer } from '@/utils/getRenderContainer'

interface Props {
  editor: Editor
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

console.log(props.editor);

const shouldShow = ({ editor }) => {
  return isActive(editor.view.state, 'columns')
}
// Ottieni la posizione dell'elemento di riferimento
const getReferenceClientRect = () => {
  const renderContainer = getRenderContainer(props.editor, 'columns')
  const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)

  return rect
}

const onColumnLeft = () => {
  props.editor.chain().focus().setLayout(ColumnLayout.SidebarLeft).run()
}

const onColumnRight = () => {
  props.editor.chain().focus().setLayout(ColumnLayout.SidebarRight).run()
}

const onColumnTwo = () => {
  console.log(props.editor);
  console.log("Setting layout to TwoColumn");
  props.editor.chain().focus().setLayout(ColumnLayout.TwoColumn).run()
}

const onColumnThree = () => {
  console.log(props.editor);
  console.log("Setting layout to ThreeColumn");
  props.editor.chain().focus().setLayout(ColumnLayout.ThreeColumn).run()
}
</script>

<template>
  <BubbleMenu
    :editor="editor"
    pluginKey="columns"
    :shouldShow="shouldShow"
    :updateDelay="0"
    :tippy-options="{
      offset: [0, 8],
      popperOptions: {
        modifiers: [{ name: 'flip', enabled: false }],
      },
      getReferenceClientRect,
      plugins: [sticky],
      sticky: 'popper',
    }"
  >
    <div class="p-2 bg-white border rounded-lg shadow-sm dark:bg-black border-neutral-200 dark:border-neutral-800">
      <div class="flex items-center gap-1">
        <ActionButton
          title="ok"
          icon="PanelLeft"
          tooltip="Barra laterale sinistra"
          :action="onColumnLeft"
          :isActive="() => editor.isActive('columns', { layout: ColumnLayout.SidebarLeft })"
          :tooltip-options="{ sideOffset: 15 }"
        />
        <ActionButton
          title="ok"
          icon="Columns"
          tooltip="Layout a due colonne"
          :action="onColumnTwo"
          :isActive="() => editor.isActive('columns', { layout: ColumnLayout.TwoColumn })"
          :tooltip-options="{ sideOffset: 15 }"
        />
        <ActionButton
          title="ok"
          icon="PanelRight"
          tooltip="Barra laterale destra"
          :action="onColumnRight"
          :isActive="() => editor.isActive('columns', { layout: ColumnLayout.SidebarRight })"
          :tooltip-options="{ sideOffset: 15 }"
        />
        <ActionButton
          title="ok"
          icon="Columns3"
          tooltip="Layout a tre colonne"
          :action="onColumnThree"
          :isActive="() => editor.isActive('multiColumns', { layout: ColumnLayout.ThreeColumn })"
          :tooltip-options="{ sideOffset: 15 }"
        />
      </div>
    </div>
  </BubbleMenu>
</template>
