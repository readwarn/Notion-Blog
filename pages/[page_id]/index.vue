<template>
  <div class="pb-[80px]">
    <div class="bg-primary py-10 md:py-20 lg:py-32 relative">
      <div class="container">
        <div v-if="status === 'pending'">
          <div class="space-y-2 mb-8">
            <div
              class="h-8 bg-foreground/10 animate-pulse max-w-[800px] mx-auto"
            ></div>
            <div
              class="h-8 bg-foreground/10 animate-pulse max-w-[500px] mx-auto"
            ></div>
          </div>
          <div
            class="w-full max-w-[300px] mx-auto bg-foreground/5 h-2 animate-pulse"
          ></div>
        </div>

        <div v-else>
          <h1
            class="text-4xl lg:text-5xl text-white !leading-snug font-bold text-center max-w-[800px] mx-auto"
          >
            {{ blogDetails?.Name ?? "" }}
          </h1>
          <div
            class="flex items-center justify-center gap-x-2 mt-8 text-muted-foreground md:text-lg"
          >
            <div>{{ blogDetails?.Category ?? "" }}</div>
            <div>&bull;</div>
            <div>By {{ blogDetails?.Author?.[0] ?? "" }}</div>
            <div>&bull;</div>
            <ClientOnly v-if="publishedDate">
              <div>{{ timeAgo }}</div>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="[
        'container relative',
        blogDetails?.page_cover ? 'md:top-[-50px]' : null,
      ]"
    >
      <div
        :class="[
          'w-full max-w-[980px] max-h-[380px] aspect-video mx-auto bg-primary/80',
          status === 'pending' ? 'animate-pulse' : null,
        ]"
      >
        <NuxtImg
          :src="blogDetails?.page_cover"
          v-if="blogDetails?.page_cover && status !== 'pending'"
          class="w-full h-full object-cover"
        />
      </div>
      <article
        :class="[
          'prose lg:prose-lg prose-zinc mx-auto py-4 md:py-[50px]',
          theme === 'dark' ? 'prose-invert' : null,
        ]"
      >
        <Markdown :content="blockMd.parent" v-if="blockMd" />
      </article>
      <div class="space-y-8 mt-20" v-if="relatedPosts?.length">
        <h4 class="font-semibold text-4xl">Related Posts</h4>
        <RelatedPost :posts="relatedPosts" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { n2m } from "~/lib/notion.client";
import Markdown from "~/components/shared/markdown.vue";
import { useBlogByID, useBlogBlocks } from "@/composables/useNotion";
import { getBlogDetails } from "~/lib/notion.utils";
import { useTheme } from "~/components/theme/theme-context";
import { useTimeAgo } from "@vueuse/core";
import RelatedPost from "~/components/shared/related-post.vue";

const route = useRoute();
const slug = route.query?.slug as string;
const page_id = route.params.page_id as string;
const { data, status, error } = useBlogByID(page_id);
const { data: blocks } = useBlogBlocks(page_id);
const { theme } = useTheme();

const blockMd = computed(() =>
  blocks.value ? n2m.toMarkdownString(blocks.value) : null
);

const blogDetails = computed(() => {
  return getBlogDetails(data.value);
});

const publishedDate = computed(
  () =>
    blogDetails.value?.["Publish Date"] ??
    blogDetails?.value?.created_time ??
    new Date()
);

const timeAgo = useTimeAgo(
  publishedDate?.value ? new Date(publishedDate.value) : new Date()
);

const relatedPosts = computed(
  () => blogDetails?.value?.["Related Posts"] ?? []
);
</script>
