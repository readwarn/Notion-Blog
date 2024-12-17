<template>
  <ConfigProvider :use-id="useIdFunction">
    <Theme>
      <div class="fixed left-0 right-0 z-[100] bg-background">
        <Navigation />
      </div>
      <section class="pt-[70px]">
        <NuxtPage />
      </section>
    </Theme>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ConfigProvider } from "radix-vue";
const useIdFunction = () => useId();
import Theme from "./components/theme/index.vue";
import Navigation from "./components/navigation.vue";
</script>
