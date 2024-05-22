<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getExampleUrl, getServiceSrc } from './embed'
const props = defineProps({
  ...nodeViewProps,
})
const originalLink = ref<string>('')

const src = computed({
  get: () => props.node.attrs.src,
  set: (value: string) => {
    originalLink.value = value
    props.updateAttributes({ src: value })
  },
})
function handleConfirm() {
  let result = getServiceSrc(props.node.attrs.service, originalLink.value)
  // 校验链接合法
  if (result.validLink && result.validId) {
    src.value = result.src
  } else {
    console.log('暂不支持')
  }
}
function handleExmaple() {
  const url = getExampleUrl(props.node.attrs.service)
  if (url) {
    let result = getServiceSrc(props.node.attrs.service, url)
    src.value = result.src
  }
}
onMounted(() => {
  originalLink.value = props.node.attrs.src
})
</script>

<template>
  <NodeViewWrapper as="section">
    <div class="relative flex flex-row items-center" v-if="!src">
      <Input v-model:model-value="originalLink" type="url" class="h-12 pr-40" autofocus placeholder="Inserisci il collegamento"> </Input>
      <div class="absolute flex gap-2 right-1 w-36">
        <Button @click="handleExmaple" variant="outline">Esempio</Button>
        <Button type="primary" @click="handleConfirm">Confermare</Button>
      </div>
    </div>
    <iframe v-if="src" :src="src" frameborder="0" allowfullscreen="true"></iframe>
  </NodeViewWrapper>
</template>
