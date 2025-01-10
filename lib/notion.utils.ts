import { isFullPage } from "@notionhq/client";
import type {
  PageObjectResponse,
  UserObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

type Properties = PageObjectResponse["properties"][number];

export const getFieldValue = (field: Properties) => {
  switch (field.type) {
    case "people":
      return field.people?.length
        ? field.people?.map(
            (person) => (person as UserObjectResponse)?.name ?? ""
          )
        : [];
    case "rich_text":
      return field?.rich_text?.[0]?.plain_text ?? "";
    case "title":
      return field?.title?.[0]?.plain_text ?? "";
    case "files": {
      const file = field.files?.[0];
      if (!file) return null;
      if (file.type === "external") {
        return file?.external?.url;
      }
      if (file.type === "file") {
        return file?.file?.url;
      }
      return null;
    }
    case "select":
      return field?.select?.name ?? null;
    case "multi_select":
      return field.multi_select.map((item) => item.name);
    case "status":
      return field.status?.name ?? null;
    case "number":
      return field?.number;
    case "date":
      return field.date?.start ?? null;
    case "relation":
      return field.relation.map((item) => item.id);
    default:
      return field;
  }
};

const blog_fields = [
  "Author",
  "Category",
  "Content Summary",
  "Featured Image",
  "Name",
  "Publish Date",
  "Read Time",
  "Related Posts",
  "Slug",
  "Status",
  "Tags",
] as const;

type BlogFields = (typeof blog_fields)[number];

export interface BlogProperties {
  Author: string[];
  Category: string | null;
  "Content Summary": string;
  "Featured Image": string | null;
  Name: string;
  "Publish Date": string | null;
  "Read Time": number | null;
  "Related Posts": string[];
  Slug: string | null;
  Status: "Draft" | "Published" | "Archived";
  Tags: string[];
}

export interface BlogDetails extends BlogProperties {
  page_cover?: string | null;
  id: string;
  url: string;
  created_time: string;
}

export const getBlogDetails = (data: PageObjectResponse | null) => {
  if (!data || !isFullPage(data)) return null;

  const page_cover =
    data.cover?.type === "external"
      ? data.cover?.external?.url
      : data.cover?.file.url;

  const blog_details = {
    Author: [],
    Category: "",
    "Content Summary": "",
    "Featured Image": "",
    Name: "",
    "Publish Date": "",
    "Read Time": 0,
    "Related Posts": [],
    Slug: "",
    Status: "Draft",
    Tags: [],
  };

  const getField = (field: BlogFields) => data.properties[field] as Properties;

  const blogProperties = blog_fields.reduce((details, _field) => {
    const field = getField(_field);
    switch (_field) {
      case "Author":
        details.Author =
          field.type === "people" ? (getFieldValue(field) as string[]) : [];
        break;
      case "Category":
        details.Category =
          field.type === "select" ? (getFieldValue(field) as string) : "";
        break;
      case "Content Summary":
        details["Content Summary"] =
          field.type === "rich_text" ? (getFieldValue(field) as string) : "";
        break;
      case "Featured Image": {
        details["Featured Image"] = getFieldValue(field) as string;
        break;
      }
      case "Name":
        details.Name =
          field.type === "title" ? (getFieldValue(field) as string) : "";
        break;
      case "Publish Date":
        details["Publish Date"] =
          field.type === "date" ? (getFieldValue(field) as string) : null;
        break;
      case "Read Time":
        details["Read Time"] =
          field.type === "number" ? (getFieldValue(field) as number) : null;
        break;
      case "Related Posts":
        details["Related Posts"] =
          field.type === "relation" ? (getFieldValue(field) as string[]) : [];
        break;
      case "Slug":
        details.Slug =
          field.type === "rich_text" ? (getFieldValue(field) as string) : null;
        break;
      case "Status":
        details.Status =
          field.type === "status"
            ? (getFieldValue(field) as BlogProperties["Status"])
            : "Draft";
        break;
      case "Tags":
        details.Tags =
          field.type === "multi_select"
            ? (getFieldValue(field) as string[])
            : [];
        break;
      default:
        break;
    }

    return details;
  }, {} as BlogProperties);

  return {
    ...blogProperties,
    page_cover,
    id: data.id,
    url: data.url,
    created_time: data.created_time,
  };
};
