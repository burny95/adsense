// 글 주소와 이전·다음 글 계산 (블로그·클로드 섹션 공용)
import type { CollectionEntry } from 'astro:content';
import { CLAUDE_CATEGORIES } from './consts';

type Post = CollectionEntry<'blog'>;

// 클로드 소분류에 속한 글인지
export function isClaudePost(post: Post) {
  return post.data.category in CLAUDE_CATEGORIES;
}

// 글이 실리는 주소. 클로드 소분류면 /claude/, 나머지는 /blog/
export function postHref(post: Post) {
  return `${isClaudePost(post) ? '/claude' : '/blog'}/${post.id}/`;
}

// 한 섹션의 글로 정적 경로를 만든다.
// 이전·다음 글은 같은 카테고리 안에서 발행일 순으로 이어 붙인다
// (도구 1개당 기초편 → 활용편, 시리즈 1편 → 2편 순서가 그대로 이어지도록).
export function postPaths(posts: Post[]) {
  return posts.map((post) => {
    const series = posts
      .filter((p) => p.data.category === post.data.category)
      .sort((a, b) => a.data.publishedAt.valueOf() - b.data.publishedAt.valueOf());
    const i = series.findIndex((p) => p.id === post.id);
    return {
      params: { slug: post.id },
      props: {
        post,
        prev: series[i - 1] ?? null,
        next: series[i + 1] ?? null,
      },
    };
  });
}
