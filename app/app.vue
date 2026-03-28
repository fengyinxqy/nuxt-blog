<template>
  <div class="app-wrapper">
    <Header />
    <main>
      <NuxtPage />
    </main>
    <Footer />
    <SearchModal v-model="searchOpen" />
  </div>
</template>

<script setup lang="ts">
const searchOpen = ref(false)
provide('searchOpen', searchOpen)

onMounted(() => {
  const handleSearch = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      searchOpen.value = true
    }
    if (e.key === 'Escape') {
      searchOpen.value = false
    }
  }
  window.addEventListener('keydown', handleSearch)
  onUnmounted(() => window.removeEventListener('keydown', handleSearch))
})
</script>
