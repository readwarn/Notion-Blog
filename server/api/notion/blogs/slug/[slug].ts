import { notion } from "~/lib/notion.client";

export default defineEventHandler((event) => {
  const {
    public: { NOTION_DB },
  } = useRuntimeConfig();
  const slug = getRouterParam(event, "name") ?? "";

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
