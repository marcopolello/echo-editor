<script setup lang="ts">
import { ref, defineProps } from 'vue'
//import { useLocale } from '@/locales'

//const { t } = useLocale()

const props = defineProps<{
  show: boolean,
  title: string,
  size: 'large' | 'small' | 'medium'
}>()

const show = ref(props.show)

function toggleShow() {
  show.value = !show.value
}
</script>

<template>
  <!-- Main modal -->
  <div v-if="show" class="fixed top-0 left-0 right-0 z-50 w-full h-full mx-auto bg-gray-500 bg-opacity-70">
    <div class="flex items-center justify-center h-full">
      <!-- Modal content -->
      <div
        class="relative bg-white rounded-lg shadow"
        :class="{
          'w-[40rem]': size === 'small',
          'w-[60rem]': size === 'medium',
          'w-[80rem]': size === 'large'
        }"
      >
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 border-b rounded-t md:p-5 dark:border-gray-600">
          <div>
            <h1>{{ props.title }}</h1>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ title }}
            </h3>
          </div>

          <button
            @click="toggleShow()"
            type="button"
            class="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto"
          >
            <i class="fa-solid fa-close"></i>
            <span class="sr-only"></span>
          </button>
        </div>
        
        <!-- Modal body -->
        <div class="p-4 space-y-4 md:p-5">
          <div class="w-full px-3 overflow-y-scroll max-h-96">
            <slot name="body" />
          </div>
        </div>

        <!-- Modal footer -->
        <div class="flex items-center justify-between p-4 border-t border-gray-200 rounded-b md:p-5 dark:border-gray-600">
          <slot name="footer">
            <button
              @click="toggleShow()"
              type="button"
              class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              Chiudi
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hidden {
  display: none;
}
</style>
