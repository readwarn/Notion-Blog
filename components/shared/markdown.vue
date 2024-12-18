<template>
  <div v-html="result"></div>
</template>

<script lang="ts" setup>
import markdownit from "markdown-it";
const props = defineProps<{ content: string }>();
const md = markdownit({ breaks: true });
const result = md.render(props.content);
</script>
