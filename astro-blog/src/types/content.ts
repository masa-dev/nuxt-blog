import type { ImageMetadata } from "astro";
import type { CollectionEntry } from "astro:content";

export type ContentKind = "post" | "note";
export type LocalContentEntry =
  | CollectionEntry<"post">
  | CollectionEntry<"note">;
export type TagEntry = CollectionEntry<"tag">;

export interface ResolvedTag {
  id: string;
  name: string;
  slug: string;
  image?: string | ImageMetadata;
  description?: string;
}

export interface NormalizedContentEntry {
  id: string;
  kind: ContentKind;
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  legacyIds: string[];
  tagIds: string[];
  tags: ResolvedTag[];
  heroImage?: string | ImageMetadata;
  entry: LocalContentEntry;
}
