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

  runtimeConfig: {
    public: {
      NOTION_DB: process.env.NOTION_DB,
    },
  },
});
