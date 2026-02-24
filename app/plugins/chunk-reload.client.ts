// Handles stale JS chunks after a new Docker deployment.
// When Nuxt can't fetch a chunk (old hash no longer on server), reload to get fresh HTML with new hashes.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:chunkError', () => {
    reloadNuxtApp({ persistState: true })
  })
})
