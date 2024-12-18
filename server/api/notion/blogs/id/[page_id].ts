import { notion } from "~/lib/notion.client";

export default defineEventHandler((event) => {
  const page_id = getRouterParam(event, "page_id") ?? "";
  return notion.pages.retrieve({ page_id });
});
