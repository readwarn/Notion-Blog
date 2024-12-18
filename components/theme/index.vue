<template>
  <slot />
</template>

<script lang="ts" setup>
import { provideTheme } from "./theme-context";
provideTheme();
</script>
