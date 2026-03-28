<template>
  <article class="post-detail">
    <!-- 面包屑导航 -->
    <nav class="breadcrumb">
      <NuxtLink to="/" class="breadcrumb-link">首页</NuxtLink>
      <span class="breadcrumb-separator">/</span>
      <NuxtLink to="/" class="breadcrumb-link">文章</NuxtLink>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-current">{{ post?.title }}</span>
    </nav>

    <div class="post-container">
      <!-- 文章头部 -->
      <header class="post-header">
        <div class="post-meta">
          <span class="post-category">{{ post?.category }}</span>
          <span class="post-dot"></span>
          <time class="post-date">{{ formatDate(post?.date) }}</time>
        </div>
        <h1 class="post-title">{{ post?.title }}</h1>
        <p class="post-description">{{ post?.description }}</p>
        <div v-if="post?.tags?.length" class="post-tags">
          <NuxtLink
            v-for="tag in post.tags"
            :key="tag"
            :to="`/tags/${tag}`"
            class="post-tag"
          >
            #{{ tag }}
          </NuxtLink>
        </div>
      </header>

      <!-- 目录 -->
      <div v-if="toc?.length" class="toc-sidebar">
        <h3 class="toc-title">目录</h3>
        <ul class="toc-list">
          <li
            v-for="link in toc"
            :key="link.id"
            :style="{ paddingLeft: `${(link.depth - 2) * 1}rem` }"
          >
            <a :href="`#${link.id}`" class="toc-link" v-html="link.text" />
          </li>
        </ul>
      </div>

      <!-- 文章内容 -->
      <div class="prose prose-slate max-w-none">
        <ContentRenderer
          v-if="post"
          :value="post"
        />
      </div>

      <!-- 上下篇导航 -->
      <nav v-if="surround[0] || surround[1]" class="post-nav">
        <NuxtLink
          v-if="surround[0]"
          :to="surround[0].path"
          class="post-nav-item post-nav-prev"
        >
          <span class="post-nav-label">← 上一篇</span>
          <span class="post-nav-title">{{ surround[0].title }}</span>
        </NuxtLink>
        <span v-else class="post-nav-placeholder"></span>
        <NuxtLink
          v-if="surround[1]"
          :to="surround[1].path"
          class="post-nav-item post-nav-next"
        >
          <span class="post-nav-label">下一篇 →</span>
          <span class="post-nav-title">{{ surround[1].title }}</span>
        </NuxtLink>
        <span v-else class="post-nav-placeholder"></span>
      </nav>

      <!-- 评论区 -->
      <CommentSection />
    </div>
  </article>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug

const { data: post } = await useAsyncData(`post-${slug}`, async () => {
  const result = await queryCollection('posts')
    .where({ path: { $eq: `/posts/${slug}` } })
    .first()
  return result as unknown as Post | null
})

const { data: allPosts } = await useAsyncData<Post[]>('all-posts', async () => {
  const result = await queryCollection('posts')
    .order('date', 'DESC')
    .all()
  return result as unknown as Post[]
})

const surround = computed(() => {
  if (!allPosts.value) return [null, null]
  const currentIndex = allPosts.value.findIndex(p => p.path === post.value?.path)
  return [
    currentIndex > 0 ? allPosts.value[currentIndex - 1] : null,
    currentIndex < allPosts.value.length - 1 ? allPosts.value[currentIndex + 1] : null
  ]
})

const toc = computed(() => {
  if (!post.value?.body?.toc) return []
  return post.value.body.toc.links.filter((link: any) => link.depth >= 2 && link.depth <= 3)
})

interface Post {
  path: string
  title: string
  description: string
  category: string
  tags: string[]
  date: string
  body?: {
    toc?: {
      links: Array<{ id: string; text: string; depth: number }>
    }
  }
}

const formatDate = (date?: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

if (!post.value) {
  throw createError({
    statusCode: 404,
    message: '文章不存在'
  })
}

useHead({
  title: `${post.value?.title}`,
  meta: [
    { name: 'description', content: post.value?.description }
  ]
})
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
}

.breadcrumb-link {
  color: #78716c;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-link:hover {
  color: #1e40af;
}

.breadcrumb-separator {
  color: #e7e5e4;
}

.breadcrumb-current {
  color: #1c1917;
}

.post-header {
  margin-bottom: 3rem;
  text-align: center;
}

.post-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.post-category {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: #1e40af;
  text-transform: uppercase;
}

.post-dot {
  width: 4px;
  height: 4px;
  background: #e7e5e4;
  border-radius: 50%;
}

.post-date {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  color: #a8a29e;
}

.post-title {
  font-family: 'Crimson Pro', serif;
  font-size: 2.5rem;
  line-height: 1.2;
  color: #1c1917;
  margin: 0 0 1rem;
  font-weight: 400;
}

.post-description {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.125rem;
  color: #57534e;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 1.5rem;
}

.post-tags {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.post-tag {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  color: #1e40af;
  background: #dbeafe;
  padding: 0.25rem 0.75rem;
  border-radius: 2px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.post-tag:hover {
  background: #3b82f6;
  color: #fff;
}

/* 目录样式 */
.toc-sidebar {
  position: sticky;
  top: 6rem;
  float: right;
  width: 200px;
  margin-left: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #fafaf9;
  border: 1px solid #e7e5e4;
  border-radius: 8px;
}

.toc-title {
  font-family: 'Crimson Pro', serif;
  font-size: 1rem;
  color: #1c1917;
  margin-bottom: 1rem;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-link {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8125rem;
  color: #57534e;
  text-decoration: none;
  line-height: 1.6;
  transition: color 0.3s ease;
}

.toc-link:hover {
  color: #1e40af;
}

/* 文章内容 */
.prose {
  font-size: 1.0625rem;
  line-height: 1.7;
}

/* 上下篇导航 */
.post-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #e7e5e4;
}

.post-nav-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  background: #fafaf9;
  border: 1px solid #e7e5e4;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.post-nav-item:hover {
  border-color: #1e40af;
  background: #fff;
}

.post-nav-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  color: #78716c;
  text-transform: uppercase;
}

.post-nav-title {
  font-family: 'Crimson Pro', serif;
  font-size: 1rem;
  color: #1c1917;
}

.post-nav-prev { text-align: left; align-items: flex-start; }
.post-nav-next { text-align: right; align-items: flex-end; }

.post-nav-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .post-detail {
    padding: 1rem;
  }

  .post-title {
    font-size: 1.75rem;
  }

  .toc-sidebar {
    float: none;
    width: 100%;
    margin: 2rem 0;
  }

  .post-nav {
    grid-template-columns: 1fr;
  }
}
</style>
