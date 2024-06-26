<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/vue'
import AiCompletion from './AiCompletion.vue'
const props = defineProps({
  ...nodeViewProps,
})
const status = ref<string>('idle')
const result = ref('')
const messageList = ref<string[]>([])
const showDropdown = ref(true)
const inputRef = ref()

const options: any = [
  {
    label: 'continua a scrivere',
    icon: 'mdi:magic',
    key: 'jay gatsby',
  },
  {
    label: 'ai polacco',
    icon: 'mdi:magic-staff',
    key: 'runse',
    children: [
      {
        label: 'dettagli',
        icon: 'mdi:magic-staff',

        key: 'xiangxi',
      },
      {
        icon: 'mdi:magic-staff',
        label: 'snello',
        key: 'jingjian',
      },
      {
        icon: 'mdi:magic-staff',
        label: 'formale',
        key: 'zhengshi',
      },
      {
        label: 'coerente',
        icon: 'mdi:magic-staff',
        key: 'lianguan',
      },
      {
        icon: 'mdi:magic-staff',
        label: 'vivido',
        key: 'shengdong',
      },
    ],
  },
  {
    label: 'AI',
    key: 'jiaoyue',
    icon: 'mdi:file-document-box-search-outline',
  },
  {
    label: 'AI',
    icon: 'mdi:translate',
    key: 'nick carraway',
    children: [
      {
        label: 'Inglese',
        icon: 'mdi:translate',
        key: 'jordan baker',
      },
      {
        label: 'Italiano',
        icon: 'mdi:translate',
        key: 'jordan baker',
      },
    ],
  },
]
onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus()
  }
})

function handleMaskClick() {
  if (result.value) {
  } else {
    props.deleteNode()
  }
}
async function handleSelect() {
  status.value = 'loading'
  const selectionText = props.node.attrs.selectionText
  const stream = await props.extension.options.completions(selectionText)
  status.value = 'generating'
  for await (const chunk of stream) {
    messageList.value.push(chunk.choices[0]?.delta?.content || '')
    result.value += chunk.choices[0]?.delta?.content || ''
  }
  status.value = 'completed'
}

function handleStop() {
  status.value = 'idle'
}

function handleReplace() {
  props.deleteNode()
  const range = {
    from: Number(props.node.attrs.selectionFrom),
    to: Number(props.node.attrs.selectionTo),
  }
  props.editor.chain().focus().setTextSelection(range).deleteSelection().insertContent(result.value).run()
}
function insetBottom() {
  props.editor.commands.insertContent(result.value)
}

function copy(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('copy success')
  })
}

function handleDelete() {
  props.deleteNode()
}
</script>
<template>
  <NodeViewWrapper data-drag-handle>
    <div class="relative">
      <!-- <div class="fixed z-[100] h-full inset-0" @click="handleMaskClick"></div> -->
      <div class="z-[1001] min-h-12 w-[350px]">
        <div class="ai-modal-main-container">
          <div class="px-4 py-2">
            <div v-if="status === 'loading'" class="flex flex-row items-center w-full select-none">
              <div class="ai_modal_writing_tips_loading_wrapper" style="width: 24px">
                <div class="flex flex-row rounded-sm itemscenter" style="width: 24px; height: 24px">
                  <img
                    src="https://docs.gtimg.com/docs-design-resources/icon/desktop/png@3x/ai-assistant_fill_motion_loop_24@3x-00b564ad53.png"
                    width="24"
                    height="24"
                    draggable="false"
                  />
                </div>
              </div>
              <div class="text-sm px-1 py-2 flex-grow-[1]">È in fase di creazione un assistente intelligente...</div>
              <div class="flex flex-col items-center justify-center">
                <Button size="sm" secondary @click="handleStop">fermare</Button>
              </div>
            </div>
            <div class="w-full overflow-hidden px-0.5 flex flex-row" v-if="status === 'idle'">
              <div class="w-6">
                <div class="flex flex-row w-6 h-6 rounded-sm itemscenter">
                  <img
                    src="https://docs.gtimg.com/docs-design-resources/icon/desktop/png@3x/ai-assistant_fill_motion_once_24@3x-23803ec719.png"
                    width="24"
                    height="24"
                    draggable="false"
                  />
                </div>
              </div>
              <div
                class="ai_modal_input_area"
                contenteditable="true"
                ref="inputRef"
                spellcheck="false"
                placeholder="Lascia che l'assistente intelligente mi aiuti..."
              />
              <div class="flex flex-col-reverse min-w-6">
                <div
                  class="dui-trigger dui-tooltip dui-tooltip-wrapper"
                  data-dui-1-3-5="dui-trigger dui-tooltip dui-tooltip-wrapper"
                >
                  <div
                    @click="handleSelect"
                    class="ai_modal_input_submit_button ai_modal_input_submit_button_active"
                  ></div>
                </div>
              </div>
            </div>
            <div v-if="status === 'generating' || status === 'completed'" class="select-none">
              <div class="flex flex-row justify-between h-8 px-1 text-xs text-gray-500 dark:text-gray-100">
                <div>Genera risultati</div>
                <div>
                  <Button variant="ghost" size="sm">
                    <Icon @click="handleDelete" style="width: 22px; height: 22px" icon="mdi:close" />
                  </Button>
                </div>
              </div>
              <div class="select-none ai_modal_message_board">
                {{ result }}
              </div>
              <AiCompletion :editor="editor" :completion="result" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </NodeViewWrapper>
</template>
