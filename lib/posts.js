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
    // 更宽松的正则表达式，处理标题前后可能的空格
    const match = line.trim().match(/^(#{1,6})\s*(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      
      // 改进ID生成逻辑
      let id = text
        .toLowerCase()
        // 移除markdown语法字符
        .replace(/[\*\`\[\]\(\)]/g, '')
        // 保留中文、英文、数字、空格和连字符
        .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
        // 空格替换为连字符
        .replace(/\s+/g, '-')
        // 多个连字符合并为一个
        .replace(/-+/g, '-')
        // 去除首尾连字符
        .replace(/^-|-$/g, '');
      
      // 如果生成的id为空或太短，使用备用方案
      if (!id || id.length < 1) {
        id = `heading-${index}-${level}`;
      }
      
      headings.push({
        level,
        text,
        id
      });
      
      console.log(`提取到标题: ${text}, ID: ${id}, Level: ${level}`); // 调试信息
    }
  });
  
  console.log(`总共提取到 ${headings.length} 个标题`); // 调试信息
  return headings;
}

// 为HTML内容添加锚点ID - 改进版本
function addAnchorIds(htmlContent, headings) {
  let result = htmlContent;
  
  headings.forEach(heading => {
    // 更精确的正则表达式，处理HTML转义字符
    const escapedText = heading.text
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // 转义正则特殊字符
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    const regex = new RegExp(
      `<h${heading.level}([^>]*)>([^<]*${escapedText}[^<]*)</h${heading.level}>`, 
      'gi'
    );
    
    result = result.replace(regex, (match, attrs, content) => {
      // 检查是否已经有id属性
      if (attrs && attrs.includes('id=')) {
        return match; // 已经有id，不替换
      }
      return `<h${heading.level} id="${heading.id}"${attrs}>${content}</h${heading.level}>`;
    });
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