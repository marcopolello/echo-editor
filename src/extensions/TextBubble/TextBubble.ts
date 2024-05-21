import { Extension } from '@tiptap/core'

import TextDropdown from './components/TextDropdown.vue'

import type { GeneralOptions } from '@/type'

export interface TextBubbleOptions extends GeneralOptions<TextBubbleOptions> {}

export const TextBubble = Extension.create<TextBubbleOptions>({
  name: 'text-bubble',
  addOptions() {
    return {
      ...this.parent?.(),
      toolbar: false,
      button: () => ({
        component: TextDropdown,
        componentProps: {},
      }),
    }
  },
})

export default TextBubble
