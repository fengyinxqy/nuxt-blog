<template>
  <div class="py-12">
    <div class="container-custom">
      <header class="mb-10">
        <h1 class="text-3xl font-bold text-slate-900">
          标签：#{{ tag }}
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
              <span>·</span>
              <span>{{ post.category }}</span>
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
const route = useRoute()
const tag = route.params.tag as string

const { data: posts } = await useAsyncData(`tag-${tag}`, async () => {
  const result = await queryCollection('posts')
    .where({ tags: { $contains: tag } })
    .order('date', 'DESC')
    .all()
  return result as unknown as Post[]
})

interface Post {
  path: string
  title: string
  description: string
  category: string
  tags: string[]
  date: string
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useHead({
  title: `标签：${tag}`
})
</script>
