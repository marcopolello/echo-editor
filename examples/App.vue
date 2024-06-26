<template>
  <div
    style="
      padding: 24px;
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 1024px;
      gap: 24px;
      margin: 0 auto;
    "
  >
    <div style="display: flex; gap: 12px">
      <button ghost @click="locale.setLang('it')">Italiano</button>
      <button ghost @click="locale.setLang('en')">English</button>
      <button ghost @click="theme = 'dark'">dark</button>
      <button ghost @click="theme = null">light</button>
      <button ghost @click="hideToolbar = !hideToolbar">Hide Toolbar</button>
      <a href="https://github.com/marcopolello/echo-editor" target="__blank">Github</a>
    </div>
    <echo-editor
      v-model="content"
      :extensions="extensions"
      :max-height="1024"
      :hideToolbar="hideToolbar"
      :min-height="512"
      output="json"
      maxWidth="900"
      :dark="theme === 'dark'"
    >
    </echo-editor>
    <div title="content" style="margin-top: 20px">
      {{ content }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import {
  Bold,
  BulletList,
  Italic,
  BaseKit,
  Underline,
  Strike,
  LineHeight,
  Image,
  History,
  Heading,
  CodeBlock,
  FontSize,
  Highlight,
  Table,
  Clear,
  Blockquote,
  Link,
  Color,
  Video,
  OrderedList,
  HorizontalRule,
  Fullscreen,
  TaskList,
  MoreMark,
  FormatPainter,
  SlashCommand,
  Indent,
  locale,
  ImportWord,
  Columns,
  TextAlign,
  ImageUpload,
  VideoUpload,
  Code,
  Skeleton,
  ExportPdf
  //Layout
} from 'echo-editor'
import OpenAI from 'openai'
import { DEMO_CONTENT } from './initContent'
import { createLowlight, common } from 'lowlight'
//TODPOL
//const content = ref(DEMO_CONTENT)
const content = "";

const theme = ref<string | null>(null)
const hideToolbar = ref(false)
const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50000,
    },
  }),
  History,
  Columns,
  FormatPainter,
  Clear,
  Heading.configure({ spacer: true }),
  FontSize,
  Bold,
  Italic,
  Underline,
  Strike,
  MoreMark,
  Color.configure({ spacer: true }),
  Highlight,
  BulletList,
  OrderedList,
  TextAlign.configure({ types: ['heading', 'paragraph', 'image'], spacer: true }),
  Indent,
  LineHeight,
  TaskList.configure({
    spacer: true,
    taskItem: {
      nested: true,
    },
  }),
  Link,
  Image,
  ImageUpload.configure({
    upload: (files: File) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files))
        }, 3000)
      })
    },
  }),
  Video,
  VideoUpload.configure({
    upload: (files: File[]) => {
      const f = files.map(file => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }))
      return Promise.resolve(f)
    },
  }),
  Blockquote,
  SlashCommand,
  HorizontalRule,
  Fullscreen.configure({ spacer: true }),
  CodeBlock.configure({ lowlight: createLowlight(common) }),
  Table,
  Code,
  ImportWord.configure({
    upload: (files: File[]) => {
      const f = files.map(file => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }))
      return Promise.resolve(f)
    },
  }),
  Skeleton,
  ExportPdf,
  //Layout
  //AI.configure({
  //  completions: text => AICompletions(text),
  //}),
]
//TODPOL
async function AICompletions(text?: string) {
  // Ottieni la chiave da .env, si prega di inviare
  // @ts-ignore
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  if (!apiKey) {
    console.error('VITE_OPENAI_API_KEY')
    return
  }
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
    baseURL: 'https://api.deepseek.com/v1',
  })
  const stream = await openai.chat.completions.create({
    model: 'deepseek-chat',
    messages: [
      {
        role: 'system',
        content: `App.vue messages.content`,
      },
      {
        role: 'user',
        content: `${text}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 256,
    top_p: 0.9,
    stream: true,
  })

  return stream
}
</script>
