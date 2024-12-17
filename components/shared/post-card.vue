<template>
  <NuxtLink class="block" :to="`/${post.id}?slug=${postSlug}`">
    <div
      class="p-4 h-full border rounded-xl bg-background hover:bg-accent transition-all hover:scale-[0.99] cursor-pointer"
    >
      <div class="w-full aspect-video rounded-[inherit] bg-accent border">
        <NuxtImg
          v-if="post?.cover?.external?.url"
          :src="post?.cover?.external?.url"
          class="w-full h-full object-cover rounded-[inherit]"
        />
      </div>
      <div class="flex items-center gap-2 text-sm text-muted-foreground mt-4">
        <div>July 25th, 2024</div>
        <div>|</div>
        <div>{{ post?.properties?.["Read Time"]?.number ?? "" }} mins read</div>
      </div>
      <h3
        class="text-lg font-semibold max-h-14 overflow-hidden text-ellipsis line-clamp-2 my-4"
      >
        {{ post?.properties?.Name?.title?.[0]?.plain_text ?? "" }}
      </h3>
      <p
        class="max-h-20 overflow-hidden text-ellipsis line-clamp-3 text-muted-foreground"
      >
        {{
          post?.properties?.["Content Summary"]?.rich_text?.[0]?.plain_text ??
          ""
        }}
      </p>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps<{ post: any }>();
const postSlug = computed(() => {
  return props?.post?.properties?.Slug?.rich_text?.[0]?.plain_text ?? "";
});
</script>
