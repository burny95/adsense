// 블로그 글 컬렉션 정의 (src/content/blog/*.md)
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORIES } from './consts';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(), // 목록·검색결과 노출용 한 줄 요약
    category: z.enum(
      Object.keys(CATEGORIES) as [keyof typeof CATEGORIES, ...(keyof typeof CATEGORIES)[]],
    ),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    relatedTools: z.array(z.string()).optional(), // 관련 도구 slug
    draft: z.boolean().default(false), // true면 목록·빌드에서 제외
  }),
});

export const collections = { blog };
