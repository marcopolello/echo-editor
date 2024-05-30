<template>
  <div class="article-block">
    <HeaderBlock />
    <div class="content">
      <slot></slot>
    </div>
    <FooterBlock />
  </div>
</template>

<script setup lang="ts">
import HeaderBlock from './HeaderBlock.vue';
import FooterBlock from './FooterBlock.vue';
</script>

<style scoped>
.article-block {
  margin: 16px;
  padding: 16px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.content {
  margin: 16px 0;
}
</style>