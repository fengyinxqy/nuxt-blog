---
title: 'Tailwind CSS 最佳实践'
description: '学习如何使用 Tailwind CSS 构建现代化、可维护的 UI'
category: '前端'
tags: ['CSS', 'Tailwind', '设计']
date: '2026-03-26'
---

# Tailwind CSS 最佳实践

Tailwind CSS 是一个实用优先的 CSS 框架，近年来在前端社区越来越流行。

## 为什么选择 Tailwind CSS

### 传统 CSS 的问题

```css
/* 需要想一个类名 */
.user-card { ... }
.user-card-wrapper { ... }
.user-card-content { ... }
```

### Tailwind 的方式

```html
<div class="p-6 bg-white rounded-lg shadow-md">
  <h2 class="text-xl font-bold">标题</h2>
</div>
```

## 核心概念

### 1. 实用类优先

```html
<!-- 不好：自定义类 -->
<div class="button-primary">点击</div>

<!-- 好：直接使用实用类 -->
<div class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  点击
</div>
```

### 2. 响应式设计

```html
<div class="
  text-sm      /* 移动端 */
  md:text-base /* 平板 */
  lg:text-lg   /* 桌面 */
">
  响应式文本
</div>
```

### 3. 状态变体

```html
<button class="
  bg-blue-500
  hover:bg-blue-600
  focus:ring-2
  disabled:opacity-50
">
  按钮
</button>
```

## 最佳实践

### 1. 使用 `@apply` 提取重复样式

```css
/* tailwind.css */
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
}
```

### 2. 自定义主题

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
        }
      }
    }
  }
}
```

### 3. 使用 `clsx` 处理条件类名

```ts
import { clsx } from 'clsx'

<div class={clsx(
  'px-4 py-2',
  isActive ? 'bg-blue-500' : 'bg-gray-500'
)} />
```

## 总结

Tailwind CSS 的学习曲线可能有点陡，但一旦掌握，它将极大提升你的开发效率。
