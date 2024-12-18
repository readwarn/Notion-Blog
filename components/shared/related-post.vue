<template>
  <div>
    <div
      class="grid sm:grid-cols-blog-post gap-6 items-stretch"
      v-if="status === 'pending'"
    >
      <LoadingPostCard v-for="post in posts" :key="post" />
    </div>
    <div class="grid sm:grid-cols-blog-post gap-6 items-stretch" v-else>
      <PostCard v-for="post in relatedPosts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import PostCard from "./post-card.vue";
import LoadingPostCard from "./loading-post-card.vue";
import { useRelatedBlogs } from "~/composables/useNotion";
import { getBlogDetails } from "~/lib/notion.utils";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
const props = defineProps<{ posts: string[] }>();
const { data, status } = useRelatedBlogs(props.posts);
const relatedPosts = computed(() => {
  return data?.value?.length
    ? data?.value
        ?.map((page) => {
          return getBlogDetails(page as PageObjectResponse);
        })
        .filter((page) => !!page)
    : [];
});
</script>
