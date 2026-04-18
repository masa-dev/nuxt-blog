import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
import { getAllEntries } from "../lib/content";

export async function GET(context) {
  const posts = await getAllEntries("post");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site ?? "http://localhost:4321",
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: post.pubDate,
      link: `/post/${post.slug}/`,
    })),
  });
}
