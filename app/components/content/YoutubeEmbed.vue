<script setup lang="ts">
defineProps<{
  id: string
}>()
</script>

<template>
  <div class="my-6 w-full overflow-hidden rounded-xl" style="position: relative; padding-bottom: 56.25%;">
    <iframe
      :src="`https://www.youtube-nocookie.com/embed/${id}`"
      style="position: absolute; inset: 0; width: 100%; height: 100%;"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"
      frameborder="0"
    />
  </div>
</template>
