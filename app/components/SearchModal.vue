<template>
  <div class="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="modelValue" class="modal-overlay">
          <div class="fixed inset-0 bg-slate-900/50" @click="$emit('update:modelValue', false)" />

          <div class="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden">
            <div class="flex items-center border-b border-slate-200 px-4">
              <Icon name="lucide:search" class="w-5 h-5 text-slate-400" />
              <input
                ref="inputRef"
                v-model="query"
                type="text"
                placeholder="搜索文章..."
                class="flex-1 px-3 py-4 text-base bg-transparent outline-none placeholder:text-slate-400"
              />
              <kbd class="px-2 py-1 text-xs text-slate-400 bg-slate-100 rounded">ESC</kbd>
            </div>

            <div class="max-h-96 overflow-y-auto">
              <div v-if="query && results.length === 0" class="px-4 py-8 text-center text-slate-500">
                未找到相关文章
              </div>

              <div v-else-if="results.length > 0">
                <NuxtLink
                  v-for="post in results"
                  :key="post._path"
                  :to="post._path!"
                  @click="$emit('update:modelValue', false)"
                  class="block px-4 py-3 hover:bg-slate-50 transition-colors"
                >
                  <div class="font-medium text-slate-900">{{ post.title }}</div>
                  <div class="mt-1 text-sm text-slate-500 line-clamp-1">{{ post.description }}</div>
                </NuxtLink>
              </div>

              <div v-else class="px-4 py-8 text-center text-slate-400">
                输入关键词开始搜索
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const query = ref('')
const inputRef = ref<HTMLInputElement>()

const { data: results } = await useAsyncData(
  () => queryCollection('posts')
    .where({ title: { $contains: query.value } })
    .limit(10)
    .all(),
  { watch: [query] }
)

watch(() => props.modelValue, (open) => {
  if (open) {
    nextTick(() => inputRef.value?.focus())
  } else {
    query.value = ''
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
