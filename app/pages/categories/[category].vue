<template>
  <div class="py-12">
    <div class="container-custom">
      <header class="mb-10">
        <h1 class="text-3xl font-bold text-slate-900">
          分类：{{ category }}
        </h1>
        <p class="mt-2 text-slate-600">
          共 {{ posts?.length || 0 }} 篇文章
        </p>
      </header>

      <div class="grid gap-6">
        <article
          v-for="post in posts"
          :key="post.path"
          class="group p-6 rounded-xl hover:bg-slate-50 transition-colors"
        >
          <NuxtLink :to="post.path">
            <div class="flex items-center gap-3 text-sm text-slate-500">
              <time>{{ formatDate(post.date) }}</time>
            </div>
            <h2 class="mt-2 text-xl font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
              {{ post.title }}
            </h2>
            <p class="mt-2 text-slate-600 line-clamp-2">{{ post.description }}</p>
          </NuxtLink>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Post {
  path: string
  title: string
  description: string
  category: string
  date: string
}

const route = useRoute()
const category = route.params.category as string

// 获取所有文章，然后在前端过滤
const { data: allPosts } = await useAsyncData<Post[]>(`category-${category}`, async () => {
  const result = await queryCollection('posts')
    .order('date', 'DESC')
    .all()
  return result as unknown as Post[]
})

// 在前端过滤分类
const posts = computed(() => {
  if (!allPosts.value) return []
  return allPosts.value.filter(p => p.category === category)
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useHead({
  title: `分类：${category}`
})
</script>
