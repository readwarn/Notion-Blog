// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "radix-vue/nuxt",
    "@nuxt/image",
    "@vueuse/nuxt",
  ],

  app: {
    head: {
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-664FPJFFMP",
          async: true,
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-664FPJFFMP');`,
          type: "text/javascript",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      NOTION_DB: process.env.NOTION_DB,
    },
  },
});
