<template>
  <div class="comment-section">
    <script src="https://giscus.app/client.js"
      :data-repo="config.repo"
      :data-repo-id="config.repoId"
      :data-category="config.category"
      :data-category-id="config.categoryId"
      :data-mapping="config.mapping"
      :data-strict="config.strict"
      :data-reactions-enabled="config.reactionsEnabled"
      :data-emit-metadata="config.emitMetadata"
      :data-input-position="config.inputPosition"
      :data-theme="config.theme"
      :data-lang="config.lang"
      crossorigin="anonymous"
      async
    />
  </div>
</template>

<script setup lang="ts">
// Giscus 配置 - https://giscus.app/zh-CN
const config = {
  repo: 'fengyinxqy/nuxt-blog',
  repoId: 'R_kgDORzIhsQ',
  category: 'Q&A',
  categoryId: 'DIC_kwDORzIhsc4C5eH9',
  mapping: 'url',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'preferred_color_scheme',
  lang: 'zh-CN'
}
</script>

<style scoped>
.comment-section {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #e7e5e4;
}
</style>
