<template>
  <header class="header">
    <nav class="nav">
      <NuxtLink to="/" class="logo">
        <span class="logo-text">Blog</span>
      </NuxtLink>

      <div class="nav-right">
        <NuxtLink
          to="/"
          class="nav-link"
          :class="{ active: route.path === '/' }"
        >
          首页
        </NuxtLink>

        <button class="search-btn" @click="searchOpen = true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="1.5"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span class="search-text">搜索</span>
          <kbd class="search-kbd">⌘K</kbd>
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const searchOpen = inject('searchOpen') as Ref<boolean>
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #e7e5e4;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  text-decoration: none;
}

.logo-text {
  font-family: 'Crimson Pro', serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: #1c1917;
  letter-spacing: 0.02em;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9375rem;
  color: #78716c;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #1c1917;
}

.search-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  color: #78716c;
  background: #f5f5f4;
  border: 1px solid #e7e5e4;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background: #fff;
  color: #1c1917;
}

.search-text {
  display: none;
}

.search-kbd {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  background: #fff;
  border: 1px solid #e7e5e4;
  border-radius: 2px;
}

@media (min-width: 640px) {
  .search-text {
    display: inline;
  }
}
</style>
