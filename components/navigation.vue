<template>
  <header class="relative flex items-center py-4 container">
    <NuxtLink to="/">
      <NuxtImg src="/images/redstone-head.svg" />
    </NuxtLink>
    <nav></nav>
    <Button
      :size="'icon'"
      :variant="'ghost'"
      @click="toggleTheme"
      class="ml-auto"
    >
      <Moon class="size-4" v-if="theme === 'light'" />
      <Lightbulb class="size-4" v-else />
    </Button>
  </header>
</template>

<script lang="ts" setup>
import { useTheme } from "./theme/theme-context";
import Button from "./ui/button.vue";
import { Moon, Lightbulb } from "lucide-vue-next";
const { theme, toggleTheme } = useTheme();
</script>
