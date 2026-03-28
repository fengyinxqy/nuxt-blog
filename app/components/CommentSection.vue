<template>
  <div class="comment-section">
    <div ref="commentRef" id="giscus-container"></div>
  </div>
</template>

<script setup lang="ts">
const commentRef = ref<HTMLElement | null>(null)

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

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', config.repo)
  script.setAttribute('data-repo-id', config.repoId)
  script.setAttribute('data-category', config.category)
  script.setAttribute('data-category-id', config.categoryId)
  script.setAttribute('data-mapping', config.mapping)
  script.setAttribute('data-strict', config.strict)
  script.setAttribute('data-reactions-enabled', config.reactionsEnabled)
  script.setAttribute('data-emit-metadata', config.emitMetadata)
  script.setAttribute('data-input-position', config.inputPosition)
  script.setAttribute('data-theme', config.theme)
  script.setAttribute('data-lang', config.lang)
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true

  if (commentRef.value) {
    commentRef.value.appendChild(script)
  }
})
</script>

<style scoped>
.comment-section {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #e7e5e4;
}
</style>
