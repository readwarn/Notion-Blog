import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const useBlogs = () => {
  return useAsyncData("blogs", () => {
    return $fetch("/api/notion/blogs");
  });
};

export const useBlogBySlug = (slug: string) => {
  return useAsyncData(`blog-${slug}`, () => {
    return $fetch(`/api/notion/blogs/slug/${slug}`);
  });
};

export const useBlogByID = (id: string) => {
  return useAsyncData(
    `blog-${id}`,
    () => {
      return $fetch(`/api/notion/blogs/id/${id}`);
    },
    {
      transform: (data) => data as PageObjectResponse,
    }
  );
};

export const useBlogBlocks = (id: string) => {
  return useAsyncData(`blog-blokcs-${id}`, () => {
    return $fetch(`/api/notion/blogs/blocks/${id}`);
  });
};

export const useRelatedBlogs = (related_posts: string[]) => {
  return useAsyncData(`related-blogs-${related_posts.join(",")}`, () => {
    const related_post_promises = related_posts.map((id) =>
      $fetch(`/api/notion/blogs/id/${id}`)
    );
    return Promise.all(related_post_promises);
  });
};
