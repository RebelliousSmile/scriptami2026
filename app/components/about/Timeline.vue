<script setup lang="ts">
defineProps<{
  items: { title: string, date: string, company: string, description?: string }[]
}>()
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Timeline line + dots (desktop) — même structure que la rangée de blocs -->
    <div class="hidden sm:flex items-center gap-2">
      <template v-for="(item, index) in items" :key="'dot-' + index">
        <div class="flex-1 flex flex-col items-center gap-3">
          <span class="text-xs font-mono text-muted">{{ item.date }}</span>
          <div class="size-2.5 rounded-full bg-white/60 ring-2 ring-white/20 ring-offset-2 ring-offset-black" />
        </div>
        <div v-if="index < items.length - 1" class="w-4 flex items-center">
          <div class="w-full h-px bg-white/20" />
        </div>
      </template>
    </div>

    <!-- Blocks -->
    <div class="flex flex-col sm:flex-row gap-2">
      <template v-for="(item, index) in items" :key="item.title">
        <div class="flex-1 flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <span class="text-xs font-mono text-muted sm:hidden">{{ item.date }}</span>
          <h4 class="font-semibold text-sm leading-snug">
            {{ item.title }}
          </h4>
          <p class="text-xs font-medium text-primary">
            {{ item.company }}
          </p>
          <p v-if="item.description" class="text-xs text-muted leading-relaxed">
            {{ item.description }}
          </p>
        </div>
        <div
          v-if="index < items.length - 1"
          class="flex items-center justify-center text-muted"
        >
          <UIcon name="lucide:chevron-right" class="size-4 hidden sm:block" />
          <UIcon name="lucide:chevron-down" class="size-4 sm:hidden" />
        </div>
      </template>
    </div>
  </div>
</template>
