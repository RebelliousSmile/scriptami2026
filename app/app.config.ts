export default defineAppConfig({
  global: {
    meetingLink: 'https://cal.com/francois-xavier-guillois/first',
    available: true,
  },
  profile: {
    name: 'François-Xavier Guillois',
    job: 'Développeur web indépendant',
    email: 'ecrire.a@scriptami.com',
    phone: '(+33) 6 38 05 61 00',
    picture: '/portrait.webp',
  },
  socials: {
    github: 'https://github.com/tnntwister',
    twitter: '',
    linkedin: 'https://www.linkedin.com/in/francois-xavier-guillois/',
    instagram: '',
    spotify: '',
  },
  seo: {
    title: 'Scriptami — François-Xavier Guillois',
    description: 'Développeur web indépendant basé à Rumilly, Haute-Savoie. 20 ans d\'expérience en développement web sur mesure, e-commerce et applications métier.',
    url: 'https://scriptami.com',
  },
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'neutral',
    },
    notifications: {
      position: 'top-0 bottom-auto',
    },
    notification: {
      progress: {
        base: 'absolute bottom-0 end-0 start-0 h-0',
        background: 'bg-transparent dark:bg-transparent',
      },
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
      defaultVariants: {
        color: 'neutral',
      },
    },
    input: {
      defaultVariants: {
        color: 'neutral',
      },
    },
    textarea: {
      defaultVariants: {
        color: 'neutral',
      },
    },
    icons: {
      loading: 'lucide:loader',
    },
  },
  link: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
})
