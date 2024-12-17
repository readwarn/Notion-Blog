<template>
  <div>
    <article class="mx-auto max-w-[650px]">
      <Markdown :content="blockMd.parent" v-if="blockMd" />
    </article>
  </div>
</template>

<script lang="ts" setup>
import { n2m } from "~/lib/notion.client";
import Markdown from "~/components/shared/markdown.vue";
import { useBlogByID, useBlogBlocks } from "@/composables/useNotion";
const route = useRoute();
const slug = route.query?.slug as string;
const page_id = route.params.page_id as string;
const { data, status, error } = useBlogByID(page_id);
const { data: blocks } = useBlogBlocks(page_id);
const blockMd = computed(() =>
  blocks.value ? n2m.toMarkdownString(blocks.value) : null
);
</script>
