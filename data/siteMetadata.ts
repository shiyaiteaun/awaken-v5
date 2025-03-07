const siteMetadata = {
  title: 'Awaken',
  author: '',
  headerTitle: 'Awaken',
  description: '',
  language: 'en',
  theme: 'system',
  siteUrl: 'https://awaken.zone',
  siteRepo: '',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/twitter-card.png',
  email: '',
  github: '',
  twitter: '',
  facebook: '',
  youtube: '',
  linkedin: '',
  locale: 'en',
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    umamiAnalytics: {
      // We use an env variable for this site to avoid other users cloning our analytics ID
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
    },
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // googleAnalytics: {
    //   googleAnalyticsId: '', // e.g. G-XXXXXXX
    // },
  },
  newsletter: {
    provider: '',
  },
  comments: false,
  // multiauthors: true,
}

export default siteMetadata 