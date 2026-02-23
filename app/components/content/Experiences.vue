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
  <div class="flex flex-col gap-3">
    <h3 class="text-white-shadow font-newsreader italic text-2xl">
      {{ $t("global.experiences") }}
    </h3>
    <AboutTimeline :items="experiences" />
  </div>
</template>
