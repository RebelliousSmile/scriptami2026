<script setup lang="ts">
import type { ContentEnCollectionItem, ContentFrCollectionItem } from '@nuxt/content'

const { page, isWriting } = defineProps<{
  page: ContentEnCollectionItem | ContentFrCollectionItem
  isWriting: boolean
}>()

const route = useRoute()
const { link, seo, profile, socials } = useAppConfig()
const requestURL = useRequestURL()

const pageSEO = computed(() => ({
  title: isWriting ? page?.title : page?.title || seo.title,
  description: isWriting ? page?.description : page?.description || seo.description,
}))

const isHome = computed(() =>
  !route.params.slug || (Array.isArray(route.params.slug) && route.params.slug.length === 0),
)

const getTitleTemplate = (title: string | undefined) => {
  if (isHome.value) return title || seo.title
  if (isWriting) return title
  return `${title} | ${seo.title}`
}

useSchemaOrg([
  definePerson({
    name: profile.name,
    jobTitle: 'Développeur web indépendant',
    url: seo.url,
    email: profile.email,
    sameAs: [socials.github, socials.linkedin].filter(Boolean),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rumilly',
      addressRegion: 'Haute-Savoie',
      addressCountry: 'FR',
    },
  }),
])

useSeoMeta({
  ogSiteName: seo.title,
  ogTitle: pageSEO.value.title,
  ogDescription: pageSEO.value.description,
  ogType: isWriting ? 'article' : 'website',
  ogUrl: requestURL.href,
  author: profile.name,
  title: pageSEO.value.title,
  description: pageSEO.value.description,
  twitterTitle: pageSEO.value.title,
  twitterDescription: pageSEO.value.description,
  twitterCard: 'summary_large_image',
})

useHead({
  title: pageSEO.value.title,
  titleTemplate: getTitleTemplate,
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'charset', content: 'utf-8' },
    { name: 'robots', content: 'index, follow' },
    { name: 'color-scheme', content: 'light dark' },
  ],
  link,
})

defineOgImage({
  component: 'Scriptami',
  props: {
    title: pageSEO.value.title,
    description: pageSEO.value.description,
  },
})
</script>

<template>
  <slot />
</template>
