<template>
  <div class="comment-section">
    <div class="comment-placeholder">
      <div class="comment-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      </div>
      <h3 class="comment-title">评论区</h3>
      <p class="comment-desc">使用 Giscus 评论系统</p>
      <div class="comment-setup">
        <p class="setup-hint">需要配置 GitHub 仓库信息：</p>
        <ol class="setup-steps">
          <li>访问 <a href="https://giscus.app/" target="_blank" rel="noopener">giscus.app</a></li>
          <li>输入您的 GitHub 仓库信息（例如：fengyinxqy/nuxt-blog）</li>
          <li>复制生成的 <code>&lt;script&gt;</code> 标签配置</li>
          <li>替换此组件中的 GISCUS_CONFIG 对象</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Giscus 配置 - 请在使用前替换以下值
const GISCUS_CONFIG = {
  repo: 'your-username/your-repo',  // 替换为您的 GitHub 仓库
  repoId: '',                        // Giscus 生成的 Repo ID
  category: 'General',               // 讨论分类
  categoryId: '',                    // 分类 ID
  mapping: 'pathname',               // 评论映射方式
  strict: '1',                       // 严格匹配
  reactionsEnabled: '1',             // 是否启用表情回复
  emitMetadata: '0',                 // 是否发送元数据
  inputPosition: 'bottom',           // 输入框位置
  theme: 'light',                    // 主题
  lang: 'zh-CN'                      // 语言
}
</script>

<style scoped>
.comment-section {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #e7e5e4;
}

.comment-placeholder {
  text-align: center;
  padding: 3rem 1rem;
  background: #fafaf9;
  border-radius: 8px;
}

.comment-icon {
  color: #78716c;
  margin-bottom: 1rem;
}

.comment-title {
  font-family: 'Crimson Pro', serif;
  font-size: 1.5rem;
  color: #1c1917;
  margin-bottom: 0.5rem;
}

.comment-desc {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  color: #78716c;
  margin-bottom: 1.5rem;
}

.comment-setup {
  text-align: left;
  max-width: 500px;
  margin: 2rem auto 0;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #e7e5e4;
  border-radius: 4px;
}

.setup-hint {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #1c1917;
  margin-bottom: 1rem;
}

.setup-steps {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8125rem;
  color: #57534e;
  padding-left: 1.25rem;
  line-height: 1.8;
}

.setup-steps a {
  color: #1e40af;
  text-decoration: underline;
}

.setup-steps code {
  background: #f5f5f4;
  padding: 0.125rem 0.375rem;
  border-radius: 2px;
  font-size: 0.75rem;
}
</style>
