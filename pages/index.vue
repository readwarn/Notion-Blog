<template>
  <div class="pb-[150px]">
    <div class="py-20 bg-secondary">
      <div class="container">
        <div class="text-center space-y-6">
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
        <div class="grid sm:grid-cols-blog-post gap-6 items-stretch">
          <PostCard v-for="post in blogs" :key="post.id" :post="post" />
        </div>
        <!-- <div class="flex justify-between items-center mt-10">
          <div></div>
          <BlogsPagination />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NotionRenderer } from "vue-notion";
import PostCard from "~/components/shared/post-card.vue";
import BlogsPagination from "~/components/shared/blogs-pagination.vue";
const { status, error, data } = useBlogs();

const blogs = computed(() => data?.value?.results ?? []);
</script>
