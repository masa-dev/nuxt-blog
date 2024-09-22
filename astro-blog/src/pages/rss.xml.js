import rss from "@astrojs/rss";
import { fetchPosts } from "../lib/newtClient";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const postRes = await fetchPosts({ limit: 100, skip: 0 });
  const noteRes = await fetchPosts({ limit: 100, skip: 0 });
  const postItems = postRes.items.map((post) => ({
    title: post.title,
    description: post.description,
    content: post.body,
    pubDate: post._sys.createdAt,
    link: `/post/${post._id}`,
  }));
  const noteItems = noteRes.items.map((note) => ({
    title: note.title,
    description: note.description,
    content: note.body,
    pubDate: note._sys.createdAt,
    link: `/note/${note._id}`,
  }));

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: [...postItems, ...noteItems],
  });
}
