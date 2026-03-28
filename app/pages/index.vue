<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <p class="hero-tagline">思想 · 技术 · 生活</p>
          <h1 class="hero-title">
            <span class="hero-title-line">记录</span>
            <span class="hero-title-line hero-title-accent">思考</span>
            <span class="hero-title-line">的痕迹</span>
          </h1>
          <p class="hero-desc">
            在代码与文字之间，寻找表达的可能
          </p>
        </div>
        <div class="hero-decoration">
          <div class="hero-circle"></div>
          <div class="hero-line"></div>
        </div>
      </div>
    </section>

    <!-- 分类导航 -->
    <section class="categories-section">
      <div class="categories-wrapper">
        <button
          class="category-btn"
          :class="{ active: selectedCategory === null }"
          @click="selectedCategory = null"
        >
          <span class="category-text">全部</span>
          <span class="category-indicator"></span>
        </button>
        <button
          v-for="cat in categories"
          :key="cat"
          class="category-btn"
          :class="{ active: selectedCategory === cat }"
          @click="selectedCategory = cat"
        >
          <span class="category-text">{{ cat }}</span>
          <span class="category-indicator"></span>
        </button>
      </div>
    </section>

    <!-- 文章列表 -->
    <section class="posts-section">
      <div class="posts-grid">
        <article
          v-for="(post, index) in filteredPosts"
          :key="post.path"
          class="post-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <NuxtLink :to="post.path" class="post-link">
            <div class="post-meta">
              <span class="post-category">{{ post.category }}</span>
              <span class="post-dot"></span>
              <time class="post-date">{{ formatDate(post.date) }}</time>
            </div>
            <h2 class="post-title">{{ post.title }}</h2>
            <p class="post-excerpt">{{ post.description }}</p>
            <div v-if="post.tags?.length" class="post-tags">
              <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="post-tag">
                {{ tag }}
              </span>
            </div>
            <div class="post-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </NuxtLink>
        </article>
      </div>

      <div v-if="!filteredPosts?.length" class="posts-empty">
        <p>暂无文章</p>
      </div>
    </section>

    <!-- 页脚装饰 -->
    <section class="home-footer">
      <div class="footer-decoration">
        <span class="footer-shape"></span>
        <span class="footer-shape"></span>
        <span class="footer-shape"></span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
interface Post {
  path: string
  title: string
  description: string
  category: string
  tags: string[]
  date: string
}

const selectedCategory = ref<string | null>(null)

const { data: posts } = await useAsyncData<Post[]>('posts', async () => {
  const result = await queryCollection('posts')
    .order('date', 'DESC')
    .all()
  return result as unknown as Post[]
})

const categories = computed(() => {
  if (!posts.value) return []
  return Array.from(new Set(posts.value.map((p) => p.category).filter(Boolean))) as string[]
})

const filteredPosts = computed(() => {
  if (!posts.value) return []
  if (!selectedCategory.value) return posts.value
  return posts.value.filter((p) => p.category === selectedCategory.value)
})

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.home {
  background-color: #fafaf9;
  min-height: 100vh;
}

.hero {
  padding: 8rem 2rem 6rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-text {
  animation: fadeInUp 0.8s ease-out;
}

.hero-tagline {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  color: #78716c;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

.hero-title {
  font-family: 'Crimson Pro', serif;
  font-size: 4.5rem;
  line-height: 1.1;
  color: #1c1917;
  margin: 0;
  font-weight: 400;
}

.hero-title-line {
  display: block;
  animation: fadeInUp 0.8s ease-out backwards;
}

.hero-title-line:nth-child(1) { animation-delay: 0.1s; }
.hero-title-line:nth-child(2) { animation-delay: 0.2s; }
.hero-title-line:nth-child(3) { animation-delay: 0.3s; }

.hero-title-accent {
  color: #1e40af;
  font-style: italic;
}

.hero-desc {
  font-family: 'DM Sans', sans-serif;
  font-size: 1.125rem;
  color: #57534e;
  margin-top: 2rem;
  line-height: 1.6;
  max-width: 400px;
  animation: fadeInUp 0.8s ease-out 0.4s backwards;
}

.hero-decoration {
  position: relative;
  height: 300px;
  animation: fadeIn 1s ease-out 0.5s backwards;
}

.hero-circle {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 1px solid #e7e5e4;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: rotate 20s linear infinite;
}

.hero-circle::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: #1e40af;
  border-radius: 50%;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.hero-line {
  position: absolute;
  width: 150px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #1e40af, transparent);
  top: 50%;
  left: 0;
  transform: translateY(-50%) rotate(-30deg);
}

.categories-section {
  border-top: 1px solid #e7e5e4;
  border-bottom: 1px solid #e7e5e4;
  background: #fff;
  padding: 1.5rem 2rem;
}

.categories-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  overflow-x: auto;
}

.category-btn {
  position: relative;
  padding: 0.5rem 1.25rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9375rem;
  color: #78716c;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  white-space: nowrap;
}

.category-btn:hover {
  color: #1c1917;
}

.category-btn.active {
  color: #1e40af;
}

.category-indicator {
  position: absolute;
  bottom: -1.5rem;
  left: 50%;
  width: 0;
  height: 2px;
  background: #1e40af;
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.category-btn.active .category-indicator {
  width: 100%;
}

.posts-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
}

.posts-grid {
  display: grid;
  gap: 2rem;
}

.post-card {
  animation: fadeInUp 0.6s ease-out backwards;
}

.post-link {
  display: block;
  padding: 2rem;
  background: #fff;
  border: 1px solid #e7e5e4;
  border-radius: 2px;
  transition: all 0.4s ease;
  position: relative;
}

.post-link:hover {
  border-color: #1e40af;
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -20px rgba(30, 64, 175, 0.15);
}

.post-meta {
  display: flex;
  align-items: center;
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
  font-size: 1.75rem;
  color: #1c1917;
  margin: 0 0 0.75rem;
  font-weight: 400;
  line-height: 1.3;
  transition: color 0.3s ease;
}

.post-link:hover .post-title {
  color: #1e40af;
}

.post-excerpt {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9375rem;
  color: #57534e;
  line-height: 1.6;
  margin: 0 0 1rem;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
}

.post-tag {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  color: #78716c;
  background: #f5f5f4;
  padding: 0.25rem 0.75rem;
  border-radius: 2px;
}

.post-arrow {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%) translateX(-10px);
  color: #1e40af;
  opacity: 0;
  transition: all 0.4s ease;
}

.post-link:hover .post-arrow {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

.posts-empty {
  padding: 6rem 2rem;
  text-align: center;
}

.posts-empty p {
  font-family: 'Crimson Pro', serif;
  font-size: 1.5rem;
  color: #a8a29e;
}

.home-footer {
  padding: 3rem 2rem;
  border-top: 1px solid #e7e5e4;
}

.footer-decoration {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.footer-shape {
  width: 8px;
  height: 8px;
  background: #e7e5e4;
  border-radius: 2px;
  animation: pulse 2s ease-in-out infinite;
}

.footer-shape:nth-child(2) {
  animation-delay: 0.3s;
}

.footer-shape:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes rotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
}

@media (max-width: 768px) {
  .hero {
    padding: 4rem 1rem 3rem;
  }

  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-decoration {
    display: none;
  }

  .posts-section {
    padding: 2rem 1rem 4rem;
  }

  .post-link {
    padding: 1.5rem;
  }

  .post-arrow {
    display: none;
  }
}
</style>
