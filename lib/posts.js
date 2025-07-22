import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

// 提取标题大纲的函数
function extractHeadings(content) {
  const headings = [];
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5\s-]/g, '') // 保留中文、英文、数字、空格和连字符
        .replace(/\s+/g, '-') // 空格替换为连字符
        .replace(/-+/g, '-') // 多个连字符合并为一个
        .replace(/^-|-$/g, ''); // 去除首尾连字符
      
      headings.push({
        level,
        text,
        id: id || `heading-${index}` // 如果生成的id为空，使用索引
      });
    }
  });
  
  return headings;
}

// 为HTML内容添加锚点ID
function addAnchorIds(htmlContent, headings) {
  let result = htmlContent;
  
  headings.forEach(heading => {
    const regex = new RegExp(`<h${heading.level}>(.*?${heading.text}.*?)</h${heading.level}>`, 'gi');
    result = result.replace(regex, `<h${heading.level} id="${heading.id}">$1</h${heading.level}>`);
  });
  
  return result;
}

export function getSortedPostsData() {
  // 获取 posts 目录下所有文件名
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    
    // 移除 .md 获取 id
    const id = fileName.replace(/\.md$/, '');

    // 读取 markdown 文件为字符串
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 使用 gray-matter 解析文章的元数据
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  // 根据日期排序文章
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // 使用 gray-matter 解析文章的元数据
  const matterResult = matter(fileContents);

  // 提取标题大纲
  const headings = extractHeadings(matterResult.content);

  // 使用 remark 将 markdown 转换为 HTML 字符串
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  let contentHtml = processedContent.toString();
  
  // 为HTML内容添加锚点ID
  contentHtml = addAnchorIds(contentHtml, headings);

  return {
    id,
    contentHtml,
    headings, // 添加标题大纲数据
    ...matterResult.data,
  };
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}