export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxt/image',
    'vue-sonner/nuxt',
  ],

  imports: {
    presets: [
      {
        from: 'vue-sonner',
        imports: ['toast'],
      },
    ],
  },

  css: ['~/assets/style/main.css'],

  site: {
    url: 'https://www.scriptami.com',
    defaultLocale: 'fr',
    indexable: true,
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },

  content: {},

  mdc: {
    highlight: {
      theme: {
        dark: 'github-dark',
        default: 'github-dark',
        light: 'github-light',
      },
    },
  },

  runtimeConfig: {
    public: {
      resendApiKey: process.env.NUXT_PUBLIC_RESEND_API_KEY || '',
    },
  },

  experimental: {
    viewTransition: true,
  },

  compatibilityDate: '2025-01-05',

  nitro: {
    minify: false,
    logLevel: 5,
    rollupConfig: {
      treeshake: false,
    },
    prerender: {
      crawlLinks: true,
      routes: ['/en', '/fr'],
      ignore: ['/_ipx/', '/_og-image/'],
    },
  },

  vite: {
    build: {
      sourcemap: false,
    },
  },

  hooks: {
    'nitro:config': (config) => {
      if (process.env.NUXT_PRIVATE_RESEND_API_KEY) {
        config.handlers?.push({
          method: 'post',
          route: '/api/emails/send',
          handler: '~~/server/emails/send.ts',
        })
      }
    },
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-US' },
      { code: 'fr', name: 'French', language: 'fr-FR' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    strategy: 'prefix',
    defaultLocale: 'fr',
  },

  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './app/assets/icons',
      },
    ],
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
    },
    provider: 'iconify',
  },

  linkChecker: {
    enabled: false,
  },

  ogImage: {
    enabled: false,
  },


  robots: {
    disallow: [],
    allow: '/',
  },

  sitemap: {
    strictNuxtContentPaths: true,
  },
})
