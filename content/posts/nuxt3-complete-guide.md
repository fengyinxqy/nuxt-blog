---
title: 'Nuxt 3 完全指南'
description: '从入门到精通，全面掌握 Nuxt 3 框架'
category: '前端'
tags: ['Nuxt', 'Vue', 'SSR']
date: '2026-03-22'
---

# Nuxt 3 完全指南

Nuxt 3 是基于 Vue 3 和 Vite 的全栈框架，让构建 Web 应用变得简单。

## 为什么选择 Nuxt 3

### 开箱即用的功能

- 📁 基于文件的路由
- 🎯 TypeScript 支持
- ⚡ Vite 构建
- 🚀 SSR/SSG/ISR支持
- 📝 Markdown 内容

## 目录结构

```
my-app/
├── app/
│   ├── components/     # Vue 组件
│   ├── pages/          # 页面组件
│   ├── layouts/        # 布局组件
│   └── app.vue         # 应用入口
├── content/            # Markdown 内容
├── public/             # 静态资源
├── nuxt.config.ts      # Nuxt 配置
└── package.json
```

## 核心概念

### 自动导入

Nuxt 3 自动导入以下 API：

```vue
<script setup lang="ts">
// ref, computed, watch 等 Vue API 自动可用
// useRoute, useRouter, useFetch 等 Nuxt API 也自动可用

const count = ref(0)
const route = useRoute()
</script>
```

### 页面路由

```bash
app/pages/
├── index.vue          # /
├── about.vue          # /about
├── posts/
│   ├── index.vue      # /posts
│   └── [slug].vue     # /posts/:slug
└── categories/
    └── [category].vue # /categories/:category
```

### 服务端渲染

```vue
<script setup>
// 在服务端执行
const { data } = await useFetch('/api/data')
</script>
```

## Nuxt Content

Nuxt Content 让 Markdown 内容管理变得简单：

```md
---
title: 文章标题
date: 2026-03-22
---

# 正文内容
```

```vue
<script setup>
const { data: post } = await useAsyncData(() =>
  queryCollection('posts').first()
)
</script>

<template>
  <ContentRenderer :value="post" />
</template>
```

## 部署

### Vercel 部署

1. 连接 GitHub 仓库
2. 自动检测 Nuxt 3
3. 点击部署

### Netlify 部署

```js
// netlify.toml
[build]
  command = "npm run build"
  publish = ".output"
```

## 总结

Nuxt 3 是一个强大且易用的框架，适合各种规模的 Web 项目。
