<script setup lang="ts">
import { Editor } from '@tiptap/core'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/icons'
import { Separator } from '@/components/ui/separator'
const props = defineProps({
  editor: {
    type: Editor,
    required: true,
  },
  completion: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['discard'])
function handleReplace() {
  const selection = props.editor.view.state.selection
  props.editor
    .chain()
    .focus()
    .insertContentAt(
      {
        from: selection.from,
        to: selection.to,
      },
      props.completion
    )
    .run()
}
function handleInsert() {
  const selection = props.editor.view.state.selection
  props.editor
    .chain()
    .focus()
    .insertContentAt(selection.to + 1, props.completion)
    .run()
}
</script>

<template>
  <div class="flex-wrap p-1 overflow-auto text-black dark:bg-black">
    <Separator />
    <div class="flex flex-row gap-3 mt-3">
      <Button @click="handleReplace" size="sm">
        <Icon name="Replace" />
        sostituire
      </Button>
      <Button @click="handleInsert" size="sm">
        <Icon name="TextQuote" />
        inserire
      </Button>
      <Button @click="emits('discard')" size="sm">
        <Icon name="Trash" />
        Buttar via
      </Button>
    </div>
  </div>
</template>
