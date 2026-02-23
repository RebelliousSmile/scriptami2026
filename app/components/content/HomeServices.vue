<script setup lang="ts">
defineProps<{
  items: { icon: string, title: string, description: string }[]
  tags?: string[]
}>()
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <div class="text-sm text-white/80 leading-relaxed text-center max-w-2xl mx-auto [&>p]:my-0 px-2 py-4">
      <slot />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <div
        v-for="item in items"
        :key="item.title"
        class="flex gap-3 items-start rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
      >
        <UIcon
          :name="item.icon"
          class="size-5 text-white/50 shrink-0 mt-0.5"
          :font-controlled="false"
        />
        <div class="flex flex-col gap-1">
          <span class="text-sm font-medium text-white/80">{{ item.title }}</span>
          <span class="text-xs text-muted">{{ item.description }}</span>
        </div>
      </div>
    </div>
    <div v-if="tags?.length" class="flex flex-wrap gap-2 justify-center">
      <span
        v-for="tag in tags"
        :key="tag"
        class="font-mono text-xs text-white/30 hover:text-white/60 transition-colors cursor-default"
      >#{{ tag }}</span>
    </div>
  </div>
</template>
