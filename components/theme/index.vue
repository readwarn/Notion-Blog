<template>
  <main :class="[theme === 'dark' ? 'dark' : null]">
    <slot />
  </main>
</template>

<script lang="ts" setup>
import { provideTheme } from "./theme-context";
const { theme } = provideTheme();
</script>
