import { notion, n2m } from "~/lib/notion.client";

export default defineEventHandler(() => {
  const {
    public: { NOTION_DB },
  } = useRuntimeConfig();

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
