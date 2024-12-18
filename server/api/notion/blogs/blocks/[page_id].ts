import { n2m } from "~/lib/notion.client";

export default defineEventHandler((event) => {
  const page_id = getRouterParam(event, "page_id") ?? "";
  return n2m.pageToMarkdown(page_id);
});
