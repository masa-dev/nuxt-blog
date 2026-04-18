import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { highlightCode } from "../src/util/highlightCode.mjs";
import { setCopyCodeButton } from "../src/util/setCopyCode.mjs";
import setHeadingId from "../src/util/setHeadingId.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(projectRoot, "..");
const newtDir = path.join(repoRoot, "newtResult");
const mediaSourceDir = path.join(newtDir, "media");
const publicMediaDir = path.join(projectRoot, "public", "media");
const redirectsPath = path.join(projectRoot, "public", "_redirects");

const readNewtJson = async (...candidates) => {
  for (const fileName of candidates) {
    try {
      return await readFile(path.join(newtDir, fileName), "utf8");
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        continue;
      }
      throw error;
    }
  }

  throw new Error(`Missing newt source file. Tried: ${candidates.join(", ")}`);
};

const contentMap = [
  {
    kind: "post",
    sourceFiles: ["posts.json", "__posts.json"],
    routeBase: "/post",
    outputDir: path.join(projectRoot, "src", "content", "post", "_migrated"),
  },
  {
    kind: "note",
    sourceFiles: ["note.json", "__note.json"],
    routeBase: "/note",
    outputDir: path.join(projectRoot, "src", "content", "note", "_migrated"),
  },
];
const tagOutputDir = path.join(projectRoot, "src", "content", "tag");

const normalizeText = (value) =>
  typeof value === "string" ? value.trim() : "";
const quoteYaml = (value) => JSON.stringify(normalizeText(value));

const rewriteAssetUrl = (value) => {
  if (typeof value !== "string" || value.length === 0) {
    return value;
  }

  try {
    const url = new URL(value);
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length < 2) {
      return value;
    }

    const rawTail = parts.at(-1);
    const decodedTail = rawTail ? decodeURIComponent(rawTail) : "";

    if (decodedTail.includes("/")) {
      const [directory, fileName] = decodedTail.split("/");
      if (!directory || !fileName) {
        return value;
      }
      return `/media/${directory}/${fileName}`;
    }

    const fileName = rawTail;
    const directory = parts.at(-2);
    if (!directory || !fileName) {
      return value;
    }

    return `/media/${directory}/${decodeURIComponent(fileName)}`;
  } catch {
    return value;
  }
};

const rewriteBodyHtml = async (bodyHtml) => {
  if (typeof bodyHtml !== "string") return "";
  let result = bodyHtml.replace(
    /https:\/\/ik\.imagekit\.io\/masahikoproject\/[^"'\s<>)]+/g,
    (match) => rewriteAssetUrl(match),
  );
  result = setHeadingId(result);
  result = await highlightCode(result, "dark-plus");
  result = setCopyCodeButton(result);
  return result;
};

const toEntry = async (item) => {
  const meta = item.meta ?? {};
  const ogImage = meta.ogImage ?? meta.ogimage;
  const slug = normalizeText(item.slug) || normalizeText(item._id);

  return {
    id: normalizeText(item._id),
    slug,
    title: normalizeText(item.title),
    description: normalizeText(item.description || meta.description),
    pubDate:
      item._sys?.raw?.firstPublishedAt ??
      item._sys?.createdAt ??
      new Date().toISOString(),
    updatedDate: item._sys?.raw?.updatedAt ?? item._sys?.updatedAt ?? null,
    legacyIds: item._id ? [item._id] : [],
    tags: Array.isArray(item.tags)
      ? item.tags.map((tag) => normalizeText(tag.slug)).filter(Boolean)
      : [],
    heroImage: rewriteAssetUrl(item.image?.src ?? ogImage?.src ?? null),
    bodyHtml: await rewriteBodyHtml(item.body ?? ""),
  };
};

const toMarkdown = (entry) => {
  const lines = [
    "---",
    `title: ${quoteYaml(entry.title)}`,
    `description: ${quoteYaml(entry.description)}`,
    `pubDate: ${quoteYaml(entry.pubDate)}`,
  ];

  if (entry.updatedDate) {
    lines.push(`updatedDate: ${quoteYaml(entry.updatedDate)}`);
  }

  lines.push(`slug: ${quoteYaml(entry.slug)}`);
  lines.push("legacyIds:");
  for (const legacyId of entry.legacyIds) {
    lines.push(`  - ${quoteYaml(legacyId)}`);
  }

  lines.push("tags:");
  for (const tagSlug of entry.tags) {
    lines.push(`  - ${quoteYaml(tagSlug)}`);
  }

  if (entry.heroImage) {
    lines.push(`heroImage: ${quoteYaml(entry.heroImage)}`);
  }

  lines.push("---", "", entry.bodyHtml);
  return `${lines.join("\n")}\n`;
};

const toTagYaml = (item) => {
  const lines = [
    `name: ${quoteYaml(item.name)}`,
    `slug: ${quoteYaml(item.slug)}`,
  ];

  if (item.image?.src) {
    lines.push(`image: ${quoteYaml(rewriteAssetUrl(item.image.src))}`);
  }

  return `${lines.join("\n")}\n`;
};

await mkdir(publicMediaDir, { recursive: true });
await cp(mediaSourceDir, publicMediaDir, { recursive: true });

const redirects = [];

await rm(tagOutputDir, { recursive: true, force: true });
await mkdir(tagOutputDir, { recursive: true });
const rawTags = await readNewtJson("tsgs.json", "__tsgs.json");
const parsedTags = JSON.parse(rawTags);
for (const tag of parsedTags.items ?? []) {
  const slug = normalizeText(tag.slug);
  if (!slug) continue;
  await writeFile(
    path.join(tagOutputDir, `${slug}.yaml`),
    toTagYaml(tag),
    "utf8",
  );
}

for (const config of contentMap) {
  await rm(config.outputDir, { recursive: true, force: true });
  await mkdir(config.outputDir, { recursive: true });

  const raw = await readNewtJson(...config.sourceFiles);
  const parsed = JSON.parse(raw);
  const entries = Array.isArray(parsed.items)
    ? await Promise.all(parsed.items.map((item) => toEntry(item)))
    : [];

  for (const entry of entries) {
    for (const legacyId of entry.legacyIds) {
      redirects.push(
        `${config.routeBase}/${legacyId} ${config.routeBase}/${entry.slug}/ 301`,
      );
    }
    await writeFile(
      path.join(config.outputDir, `${entry.slug}.md`),
      toMarkdown(entry),
      "utf8",
    );
  }
}

await writeFile(redirectsPath, `${redirects.join("\n")}\n`, "utf8");
