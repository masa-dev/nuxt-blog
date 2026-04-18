import { getCollection } from "astro:content";
import type {
  ContentKind,
  LocalContentEntry,
  NormalizedContentEntry,
  ResolvedTag,
  TagEntry,
} from "../types/content";

const sortByDate = (entries: NormalizedContentEntry[]) =>
  entries.sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

export const getTags = async () => {
  const tags = await getCollection("tag");
  const byId = new Map<string, ResolvedTag>();
  for (const tag of tags) {
    byId.set(tag.id, {
      id: tag.id,
      name: tag.data.name,
      slug: tag.data.slug,
      image: tag.data.image,
      description: tag.data.description,
    });
  }
  return byId;
};

const normalizeCollection = (
  kind: ContentKind,
  entry: LocalContentEntry,
  tagMap: Map<string, ResolvedTag>,
): NormalizedContentEntry => ({
  id: entry.id,
  kind,
  slug: entry.data.slug,
  title: entry.data.title,
  description: entry.data.description,
  pubDate: entry.data.pubDate,
  updatedDate: entry.data.updatedDate,
  legacyIds: entry.data.legacyIds,
  tagIds: entry.data.tags.map((tag) => tag.id),
  tags: entry.data.tags
    .map((tag) => tagMap.get(tag.id))
    .filter((tag): tag is ResolvedTag => Boolean(tag)),
  heroImage: entry.data.heroImage,
  entry,
});

export const getCollectionEntries = async (kind: ContentKind) => {
  const [entries, tagMap] = await Promise.all([getCollection(kind), getTags()]);
  return entries.map((entry) =>
    normalizeCollection(kind, entry as LocalContentEntry, tagMap),
  );
};

export const getAllEntries = async (kind: ContentKind) =>
  sortByDate(await getCollectionEntries(kind));

export const getEntryBySlug = async (kind: ContentKind, slug: string) => {
  const entries = await getAllEntries(kind);
  return entries.find((entry) => entry.slug === slug);
};

export const getEntriesByTag = async (kind: ContentKind, tagSlug: string) => {
  const entries = await getAllEntries(kind);
  return entries.filter((entry) =>
    entry.tags.some((tag) => tag.slug === tagSlug),
  );
};

export const getTagSummaries = async () => {
  const [tagMap, posts, notes] = await Promise.all([
    getTags(),
    getAllEntries("post"),
    getAllEntries("note"),
  ]);
  const counts = new Map<string, number>();

  for (const entry of [...posts, ...notes]) {
    for (const tag of entry.tags) {
      counts.set(tag.slug, (counts.get(tag.slug) ?? 0) + 1);
    }
  }

  return [...tagMap.values()]
    .map((tag) => ({ ...tag, count: counts.get(tag.slug) ?? 0 }))
    .sort((a, b) => a.name.localeCompare(b.name));
};
