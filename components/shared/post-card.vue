<template>
  <NuxtLink class="block" :to="`/${post.id}?slug=${post.Slug}`">
    <div
      class="p-4 h-full border border-muted-foreground/40 rounded-xl bg-background hover:bg-accent transition-all hover:scale-[0.99] cursor-pointer"
    >
      <div class="w-full aspect-video rounded-[inherit] bg-accent border">
        <NuxtImg
          v-if="post?.['Featured Image'] || post.page_cover"
          :src="post?.['Featured Image'] ?? post.page_cover ?? ''"
          class="w-full h-full object-cover rounded-[inherit]"
        />
      </div>
      <div class="flex items-center gap-2 text-sm text-muted-foreground mt-4">
        <div>{{ publishedDate }}</div>
        <div>|</div>
        <div>by {{ post.Author?.[0] }}</div>
        <div>|</div>
        <div>
          {{
            post["Read Time"] && post["Read Time"] < 1
              ? "a min"
              : `${post["Read Time"]} mins`
          }}
          read
        </div>
      </div>
      <h3
        class="text-lg font-semibold max-h-14 overflow-hidden text-ellipsis line-clamp-2 my-4"
      >
        {{ post?.Name ?? "" }}
      </h3>
      <p
        class="max-h-20 overflow-hidden text-ellipsis line-clamp-3 text-muted-foreground"
      >
        {{ post?.["Content Summary"] ?? "" }}
      </p>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { BlogDetails } from "~/lib/notion.utils";
import { useDateFormat } from "@vueuse/core";
const props = defineProps<{ post: BlogDetails }>();
const publishedDate = useDateFormat(
  props.post?.["Publish Date"] || props.post?.created_time
    ? new Date(props.post?.["Publish Date"] ?? props.post?.created_time)
    : new Date(),
  "MMM Do, YYYY"
);
</script>
