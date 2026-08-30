// 블로그 RSS 피드
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_NAME, SITE_DESCRIPTION } from '../consts';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );

  return rss({
    title: `${SITE_NAME} 블로그`,
    description: SITE_DESCRIPTION,
    site: context.site ?? 'https://burnytools.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>ko-KR</language>',
  });
}
