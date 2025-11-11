import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  if (!context.site) {
    throw new Error('RSS feed requires the `site` option in astro.config.mjs');
  }

  return rss({
    title: 'Benjamin Filler | Studio Journal',
    description: 'Stories from the studio, profiles of mentors, and process notes by Benjamin Filler.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`
    }))
  });
}
