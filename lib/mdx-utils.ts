import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const caseStudiesDirectory = path.join(process.cwd(), 'content', 'case-studies');

function parseDate(dateStr: string): Date {
  if (!dateStr) return new Date(0);
  const ddmmyyyy = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (ddmmyyyy) return new Date(`${ddmmyyyy[3]}-${ddmmyyyy[2]}-${ddmmyyyy[1]}`);
  return new Date(dateStr);
}


export type CaseStudy = {
  slug: string;
  title: string;
  date: string;
  content: string;
  // Add any other fields you expect in your frontmatter
  [key: string]: any;
};

/**
 * Get all case studies from the content directory
 */
export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  try {
    const fileNames = await fs.readdir(caseStudiesDirectory);
    const allCaseStudies = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map(async (fileName) => {
          const slug = fileName.replace('.md', '');
          const fullPath = path.join(caseStudiesDirectory, fileName);
          const fileContents = await fs.readFile(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          const processedContent = await remark()
            .use(html, { sanitize: false })
            .process(content);
          const contentHtml = processedContent.toString();
          return {
            slug,
            title: data.title || '',
            date: data.date || '',
            content: contentHtml,
            ...data,
          };
        })
    );
    // Sort case studies by date, newest first (handles both YYYY-MM-DD and DD-MM-YYYY)
    return allCaseStudies.sort(
      (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
    );
  } catch (error) {
    console.error('Error reading case studies:', error);
    return [];
  }
}

/**
 * Get a single case study by its slug
 */
export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | null> {
  try {
    const fullPath = path.join(caseStudiesDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();
    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      content: contentHtml,
      ...data,
    };
  } catch (error) {
    console.error(`Error reading case study with slug ${slug}:`, error);
    return null;
  }
}