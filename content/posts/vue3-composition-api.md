---
title: 'Vue 3 Composition API 完全指南'
description: '深入理解 Vue 3 Composition API 的核心概念和最佳实践'
category: '前端'
tags: ['Vue', 'JavaScript', 'Composition API']
date: '2026-03-27'
---

# Vue 3 Composition API 完全指南

Vue 3 的 Composition API 是自 Options API 以来最大的变革。本文将带你深入了解其核心概念。

## 为什么需要 Composition API

在 Vue 2 的 Options API 中，组件的逻辑被分散在 `data`、`methods`、`computed`、`watch` 等选项中。当组件变得复杂时，维护一个功能需要不断在这些选项之间来回切换。

```vue
<!-- Options API 的问题：逻辑分散 -->
<script>
export default {
  data() {
    return {
      // 搜索相关
      searchQuery: '',
      searchResults: [],
      // 分页相关
      currentPage: 1,
      pageSize: 10,
      // 加载状态
      loading: false,
      error: null
    }
  },
  methods: {
    async search() { /* ... */ },
    changePage() { /* ... */ }
  }
}
</script>
```

Composition API 允许我们按**功能**组织代码，而不是按选项类型。

## 核心 API

### ref 和 reactive

```ts
import { ref, reactive } from 'vue'

// ref - 用于基本类型
const count = ref(0)
console.log(count.value) // 访问需要 .value

// reactive - 用于对象
const state = reactive({
  count: 0,
  name: 'Vue'
})
console.log(state.count) // 不需要 .value
```

**何时使用哪个？**

- 优先使用 `ref`，更灵活
- `reactive` 适合多个相关属性的组合
- 不要混用两者表示同一状态

### computed

```ts
const count = ref(0)
const double = computed(() => count.value * 2)

// 只读的，自动追踪依赖
console.log(double.value) // 自动更新
```

### watch 和 watchEffect

```ts
// 明确指定监听源
watch(count, (newVal, oldVal) => {
  console.log(`count changed from ${oldVal} to ${newVal}`)
})

// 自动收集依赖
watchEffect(() => {
  console.log(`count is: ${count.value}`)
})
```

## 组合式函数（Composables）

组合式函数是 Composition API 的真正威力所在——**逻辑复用**。

```ts
// useCounter.ts
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => {
    count.value++
  }
  
  const decrement = () => {
    count.value--
  }
  
  const reset = () => {
    count.value = initialValue
  }
  
  const double = computed(() => count.value * 2)
  
  return {
    count,
    increment,
    decrement,
    reset,
    double
  }
}
```

在组件中使用：

```vue
<script setup lang="ts">
import { useCounter } from './useCounter'

const { count, increment, double } = useCounter(10)
</script>
```

## 最佳实践

### 1. 使用 TypeScript

Composition API 配合 TypeScript 能获得极佳的类型推导：

```ts
interface User {
  id: number
  name: string
  email: string
}

const user = ref<User | null>(null)
const isLoading = ref(false)

async function fetchUser(id: number) {
  isLoading.value = true
  try {
    const res = await fetch(`/api/users/${id}`)
    user.value = await res.json()
  } finally {
    isLoading.value = false
  }
}
```

### 2. 遵循 Composables 命名约定

- 函数名以 `use` 开头
- 返回响应式引用，而非 plain 对象

### 3. 避免过度抽象

不要为了使用而使用。简单的逻辑用 Options API 可能更清晰。

## 总结

Composition API 带来的主要优势：

| 特性 | Options API | Composition API |
|------|-------------|----------------|
| 代码组织 | 按选项类型 | 按功能逻辑 |
| 逻辑复用 | mixins (有缺陷) | composables |
| TypeScript 支持 | 一般 | 优秀 |
|  Tree-shaking | 部分 | 完全 |

开始使用 Composition API，让你的 Vue 代码更加优雅和可维护！
