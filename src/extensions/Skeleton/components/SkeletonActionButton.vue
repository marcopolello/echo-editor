<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import type { StyleValue } from 'vue'
import { computed } from 'vue'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ActionMenuButton from '@/components/ActionMenuButton.vue'
import { useLocale } from '@/locales'
//import type { CreateTablePayload } from './CreateTablePopover.vue'
import ActionButton from '@/components/ActionButton.vue'
import { ButtonViewReturnComponentProps } from '@/type'
import { icons } from '@/components/icons'

export interface Item {
  title: string
  isActive: NonNullable<ButtonViewReturnComponentProps['isActive']>
  action?: ButtonViewReturnComponentProps['action']
  style?: StyleValue
  disabled?: boolean
  divider?: boolean
  default?: boolean
}
interface Props {
  editor: Editor
  disabled?: boolean
  color?: string
  shortcutKeys?: string[]
  maxHeight?: string | number
  tooltip?: string
  items?: Item[]
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  color: undefined,
  maxHeight: undefined,
  icon: undefined,
  tooltip: '',
  shortcutKeys: undefined,
  items: () => [],
})
const { t } = useLocale()

const active = computed(() => {
  const find: any = props.items.find((k: any) => k.isActive())
  if (find) {
    return find
  }
  const item: Item = {
    title: "SKELETON",
    isActive: () => false,
  }
  return item
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <ActionMenuButton :title="active.title" :tooltip="tooltip" />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-32 overflow-y-auto max-h-96">
      <template v-for="(item, index) in props.items" :key="index">
        <DropdownMenuCheckboxItem :checked="active.title === item.title" @click="item.action">
          <div class="h-full ml-1">{{ item.title }}</div>
        </DropdownMenuCheckboxItem>
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
