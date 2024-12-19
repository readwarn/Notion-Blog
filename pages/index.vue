<template>
  <div class="pb-[80px]">
    <div class="py-28 bg-primary text-background">
      <div class="container">
        <div class="text-center space-y-6 text-white">
          <h1 class="text-4xl md:text-6xl font-bold">Redstone Blog</h1>
          <p class="text-xl md:text-2xl max-w-[650px] mx-auto">
            Finance, escrow, e-commerce and other information that keeps you on
            the edge of technology
          </p>
        </div>
      </div>
    </div>
    <div class="py-20">
      <div class="container">
        <div
          class="grid sm:grid-cols-blog-post gap-6 items-stretch"
          v-if="status === 'pending'"
        >
          <LoadingPostCard v-for="i in 3" :key="i" />
        </div>
        <div
          class="grid sm:grid-cols-blog-post gap-6 items-stretch"
          v-else-if="blogs?.length"
        >
          <PostCard v-for="post in blogs" :key="post.id" :post="post" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PostCard from "~/components/shared/post-card.vue";
import LoadingPostCard from "~/components/shared/loading-post-card.vue";
import { getBlogDetails } from "~/lib/notion.utils";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
const { status, data } = useBlogs();

const blogs = computed(() =>
  data?.value?.results?.length
    ? data?.value?.results
        ?.map((page) => {
          return getBlogDetails(page as PageObjectResponse);
        })
        .filter((page) => !!page)
    : []
);
</script>
