import { notion, n2m } from "~/lib/notion.client";

export const useBlogs = () => {
  const {
    public: { NOTION_DB },
  } = useRuntimeConfig();
  return useAsyncData(() => {
    return notion.databases.query({
      database_id: NOTION_DB,
      filter: {
        property: "Status",
        status: {
          equals: "Published",
        },
      },
    });
  });
};

export const useBlogBySlug = (slug: string) => {
  const {
    public: { NOTION_DB },
  } = useRuntimeConfig();
  return useAsyncData(() => {
    return notion.databases.query({
      database_id: NOTION_DB,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    });
  });
};

export const useBlogByID = (id: string) => {
  return useAsyncData(() => {
    return notion.pages.retrieve({ page_id: id });
  });
};

export const useBlogBlocks = (id: string) => {
  return useAsyncData(() => {
    return n2m.pageToMarkdown(id);
  });
};
