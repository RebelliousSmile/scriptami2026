<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const { locale, t } = useI18n()
const localePath = useLocalePath()

const { data: projects } = await useAsyncData('home-projects', async () => {
  const collection = ('projects_' + locale.value) as keyof Collections
  return await queryCollection(collection).order('order', 'ASC').all() as Collections['projects_en'][] | Collections['projects_fr'][]
}, {
  watch: [locale],
})

const clientCount = computed(() => projects.value?.filter(p => p.type !== 'opensource').length ?? 0)
const opensourceCount = computed(() => projects.value?.filter(p => p.type === 'opensource').length ?? 0)
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <NuxtLink
      :to="localePath('/works')"
      class="group relative flex overflow-hidden rounded-lg border border-white/10 bg-zinc-900/80 p-6 transition-colors hover:bg-zinc-800/80"
    >
      <img
        src="/logos/picto-scriptami.svg"
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute -right-4 -bottom-4 h-32 opacity-10 transition-opacity group-hover:opacity-20"
      >
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-4 text-sm text-muted">
          <span>{{ clientCount }} {{ t('global.client_projects').toLowerCase() }}</span>
          <span class="text-white/20">·</span>
          <span>{{ opensourceCount }} {{ t('global.opensource_projects').toLowerCase() }}</span>
        </div>
        <span class="inline-flex items-center gap-2 text-sm font-medium text-white/90 transition-colors group-hover:text-white">
          {{ $t("global.see_more") }}
          <UIcon
            name="heroicons:arrow-right"
            class="size-4 transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </NuxtLink>
  </div>
</template>
