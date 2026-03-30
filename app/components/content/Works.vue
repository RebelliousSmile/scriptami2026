<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const { locale, t } = useI18n()

const { data: projects } = await useAsyncData('works-projects', async () => {
  const collection = ('projects_' + locale.value) as keyof Collections
  return await queryCollection(collection).order('order', 'ASC').all() as Collections['projects_en'][] | Collections['projects_fr'][]
}, {
  watch: [locale],
})

const clientProjects = computed(() => projects.value?.filter(p => p.type !== 'opensource') ?? [])
const opensourceProjects = computed(() => projects.value?.filter(p => p.type === 'opensource') ?? [])
</script>

<template>
  <section class="mx-auto mt-4 flex max-w-4xl flex-col p-7 sm:mt-20">
    <h1 class="font-newsreader italic text-white-shadow text-center text-4xl">
      <slot
        name="title"
        mdc-unwrap="p"
      />
    </h1>
    <h2 class="text-center text-lg font-extralight italic text-muted">
      <slot
        name="subtitle"
        mdc-unwrap="p"
      />
    </h2>
    <Divider class="mb-8 mt-2" />

    <h3 class="mb-4 text-center text-2xl font-semibold text-white/90">
      {{ t('global.client_projects') }}
    </h3>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <ProjectCard
        v-for="project in clientProjects"
        :key="project.name"
        :project
      />
    </div>

    <NuxtLinkLocale
      to="/contact"
      class="group mt-6 flex items-center justify-center gap-2 self-center rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-zinc-800/80"
    >
      {{ t('global.contact') }}
      <UIcon
        name="heroicons:arrow-right"
        class="size-4 transition-transform group-hover:translate-x-1"
      />
    </NuxtLinkLocale>

    <Divider class="my-8" />

    <h3 class="mb-4 text-center text-2xl font-semibold text-white/90">
      {{ t('global.opensource_projects') }}
    </h3>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <ProjectCard
        v-for="project in opensourceProjects"
        :key="project.name"
        :project
      />
    </div>
  </section>
</template>
