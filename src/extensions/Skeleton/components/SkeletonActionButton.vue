<script setup lang="ts">
import { ref, computed, StyleValue } from 'vue';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ActionMenuButton from '@/components/ActionMenuButton.vue';
import { useLocale } from '@/locales';
import type { ButtonViewReturnComponentProps } from '@/type';

export interface Item {
  title: string
  isActive: NonNullable<ButtonViewReturnComponentProps['isActive']>
  action?: ButtonViewReturnComponentProps['action']
  style?: StyleValue
  disabled?: boolean
  divider?: boolean
  default?: boolean
}

const props = defineProps<{ items: Item[]; editor: any; tooltip: string }>();

const { t } = useLocale();

const active = computed(() => {
  const find: any = props.items.find((k: any) => k.isActive());
  if (find) {
    return find;
  }
  const item: Item = {
    title: "SKELETON",
    isActive: () => false,
  };
  return item;
});
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <ActionMenuButton :title="active.title" :tooltip="props.tooltip" />
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