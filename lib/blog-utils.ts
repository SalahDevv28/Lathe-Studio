import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost } from '@/lib/types';

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

function parseDate(dateStr: string): Date {
  if (!dateStr) return new Date(0);
  const ddmmyyyy = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (ddmmyyyy) return new Date(`${ddmmyyyy[3]}-${ddmmyyyy[2]}-${ddmmyyyy[1]}`);
  return new Date(dateStr);
}

function ensurePost(slug: string, data: { [key: string]: any }, contentHtml: string): BlogPost {
  return {
    slug,
    title: data.title || 'Untitled Post',
    excerpt: data.excerpt || '',
    content: contentHtml,
    author: data.author || 'SNT Solutions',
    date: data.date || new Date().toISOString(),
    category: data.category || 'General',
    tags: Array.isArray(data.tags) ? data.tags : [],
    featuredImage: data.featuredImage || '',
    readTime: typeof data.readTime === 'number' ? data.readTime : 5,
    ...data,
  } as BlogPost;
}

/**
 * Get all blog posts from the content directory
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const fileNames = await fs.readdir(postsDirectory);
    const allPosts = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map(async (fileName) => {
          const slug = fileName.replace('.md', '');
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = await fs.readFile(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          const processedContent = await remark()
            .use(html, { sanitize: false })
            .process(content);
          const contentHtml = processedContent.toString();
          return ensurePost(slug, data, contentHtml);
        })
    );
    return allPosts.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

/**
 * Get a single blog post by its slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();
    return ensurePost(slug, data, contentHtml);
  } catch (error) {
    console.error(`Error reading blog post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get all unique categories from blog posts
 */
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
}
