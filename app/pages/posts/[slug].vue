<template>
  <article class="post-article">
    <!-- 面包屑导航 -->
    <nav class="breadcrumb">
      <div class="breadcrumb-inner">
        <NuxtLink to="/" class="breadcrumb-link">首页</NuxtLink>
        <span class="breadcrumb-separator">/</span>
        <NuxtLink :to="`/categories/${post?.category}`" class="breadcrumb-link">
          {{ post?.category }}
        </NuxtLink>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ post?.title }}</span>
      </div>
    </nav>

    <!-- 文章头部 -->
    <header class="post-header">
      <div class="post-header-inner">
        <div class="post-meta-header">
          <span class="post-category-badge">{{ post?.category }}</span>
          <span class="post-meta-dot"></span>
          <time class="post-date">{{ formatDate(post?.date) }}</time>
        </div>

        <h1 class="post-title">{{ post?.title }}</h1>

        <p class="post-description">{{ post?.description }}</p>

        <div class="post-meta-footer">
          <div class="post-tags">
            <NuxtLink
              v-for="tag in post?.tags || []"
              :key="tag"
              :to="`/tags/${tag}`"
              class="post-tag"
            >
              {{ tag }}
            </NuxtLink>
          </div>
          <div class="post-reading-time">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
              <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <span>{{ readingTime }} 分钟阅读</span>
          </div>
        </div>
      </div>
    </header>

    <!-- 文章主体 -->
    <div class="post-body">
      <!-- 目录导航 (桌面端) -->
      <aside v-if="toc?.links?.length" class="post-toc">
        <div class="toc-title">目录</div>
        <nav class="toc-nav">
          <a
            v-for="link in toc.links"
            :key="link.id"
            :href="`#${link.id}`"
            class="toc-link"
            :class="{ active: activeTocId === link.id }"
          >
            {{ link.text }}
          </a>
        </nav>
      </aside>

      <!-- 文章内容 -->
      <div class="post-content">
        <ContentRenderer v-if="post" :value="post" class="prose" />

        <!-- 文章底部装饰 -->
        <div class="post-end-marker">
          <span class="end-line"></span>
          <span class="end-dot"></span>
          <span class="end-line"></span>
        </div>
      </div>
    </div>

    <!-- 上下篇导航 -->
    <nav class="post-navigation">
      <NuxtLink
        v-if="surround[0]"
        :to="surround[0].path"
        class="post-nav-item post-nav-prev"
      >
        <div class="nav-direction">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>上一篇</span>
        </div>
        <div class="nav-title">{{ surround[0].title }}</div>
      </NuxtLink>

      <NuxtLink
        v-if="surround[1]"
        :to="surround[1].path"
        class="post-nav-item post-nav-next"
      >
        <div class="nav-direction">
          <span>下一篇</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="nav-title">{{ surround[1].title }}</div>
      </NuxtLink>
    </nav>

    <!-- 评论区 -->
    <section class="post-comments">
      <div class="comments-header">
        <h2 class="comments-title">评论</h2>
        <p class="comments-desc">分享你的想法</p>
      </div>
      <CommentSection />
    </section>
  </article>
</template>

<script setup lang="ts">
interface Post {
  path: string
  title: string
  description: string
  category: string
  tags: string[]
  date: string
  body?: {
    toc?: {
      links: { id: string; text: string; depth: number }[]
    }
  }
}

const route = useRoute()
const slug = route.params.slug as string

// 获取所有文章，然后在前端过滤
const { data: allPosts } = await useAsyncData<Post[]>('all-posts', async () => {
  const result = await queryCollection('posts')
    .order('date', 'DESC')
    .all()
  return result as unknown as Post[]
})

// 查找当前文章
const post = computed(() => {
  if (!allPosts.value) return null
  return allPosts.value.find(p => p.path === `/posts/${slug}`) || null
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

const toc = computed(() => post.value?.body?.toc)

// 计算上下篇
const surround = computed(() => {
  if (!allPosts.value) return [null, null]
  const currentIndex = allPosts.value.findIndex(p => p.path === post.value?.path)
  return [
    currentIndex > 0 ? allPosts.value[currentIndex - 1] : null,
    currentIndex < allPosts.value.length - 1 ? allPosts.value[currentIndex + 1] : null
  ]
})

const readingTime = computed(() => {
  const words = post.value?.description?.length || 0
  return Math.max(1, Math.ceil(words / 200))
})

const activeTocId = ref<string>('')

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeTocId.value = entry.target.id
        }
      })
    },
    { rootMargin: '-80px 0px -80% 0px' }
  )

  document.querySelectorAll('.prose h2, .prose h3').forEach((el) => {
    if (el.id) observer.observe(el)
  })

  onUnmounted(() => observer.disconnect())
})

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useHead({
  title: post.value.title,
  meta: [
    { name: 'description', content: post.value.description }
  ]
})
</script>
