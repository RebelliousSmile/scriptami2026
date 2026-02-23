<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  experiences: {
    type: Object as PropType<{ title: string, date: string, company: string, description?: string }[]>,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <h3 class="text-white-shadow font-newsreader italic text-2xl">
      {{ $t("global.experiences") }}
    </h3>

    <!-- Timeline line + dots (desktop) -->
    <div class="hidden sm:flex items-center w-full">
      <template v-for="(experience, index) in experiences" :key="'dot-' + index">
        <div class="flex flex-col items-center gap-1 flex-1">
          <span class="text-xs font-mono text-muted">{{ experience.date }}</span>
          <div class="size-2.5 rounded-full bg-white/60 ring-2 ring-white/20 ring-offset-2 ring-offset-black" />
        </div>
        <div v-if="index < experiences.length - 1" class="flex-1 h-px bg-white/20" />
      </template>
    </div>

    <!-- Blocks -->
    <div class="flex flex-col sm:flex-row gap-2">
      <template v-for="(experience, index) in experiences" :key="experience.title">
        <div class="flex-1 flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <!-- Date (mobile only, desktop shown above) -->
          <span class="text-xs font-mono text-muted sm:hidden">{{ experience.date }}</span>
          <h4 class="font-semibold text-sm leading-snug">
            {{ experience.title }}
          </h4>
          <p class="text-xs font-medium text-primary">
            {{ experience.company }}
          </p>
          <p v-if="experience.description" class="text-xs text-muted leading-relaxed">
            {{ experience.description }}
          </p>
        </div>
        <!-- Arrow between blocks -->
        <div
          v-if="index < experiences.length - 1"
          class="flex items-center justify-center text-muted"
        >
          <UIcon name="lucide:chevron-right" class="size-4 hidden sm:block" />
          <UIcon name="lucide:chevron-down" class="size-4 sm:hidden" />
        </div>
      </template>
    </div>
  </div>
</template>
