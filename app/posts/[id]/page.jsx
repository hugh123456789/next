// app/posts/[id]/page.js
import Link from 'next/link';
import { getAllPostIds, getPostData } from '../../../lib/posts';
import './comm.css'
import { BsArrowReturnLeft } from "react-icons/bs";

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

// 大纲组件
function TableOfContents({ headings }) {
  console.log('TableOfContents received headings:', headings); // 调试信息
  
  if (!headings || headings.length === 0) {
    console.log('No headings found or empty headings array'); // 调试信息
    return (
      <div className="toc-container">
        <h3 className="toc-title">目录</h3>
        <p style={{fontSize: '0.8rem', color: '#999'}}>暂无目录</p>
      </div>
    );
  }

  return (
    <div className="toc-container">
      <h3 className="toc-title">目录</h3>
      <nav className="toc-nav">
        <ul className="toc-list">
          {headings.map((heading, index) => (
            <li key={index} className={`toc-item toc-level-${heading.level}`}>
              <a href={`#${heading.id}`} className="toc-link">
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default async function Post({ params }) {
  const postData = await getPostData(params.id);

  return (
    <div className="post-layout">
      <div className='back-button'>
        <Link href='/blog'>
          <BsArrowReturnLeft>x</BsArrowReturnLeft>
         
        </Link>
      </div>
      {/* 左侧大纲 */}
      <aside className="post-sidebar">
        <TableOfContents headings={postData.headings} />
      </aside>
      
      {/* 主要内容 */}
      <main className="post-main">
        <div className='post-container'>
          <h1>{postData.title}</h1>
          <div className='post-meta'>
            <span>{postData.date.toDateString()}</span>
            {/* 若有阅读时长等其他元信息，也可放这里 */}
          </div>
          <div
            className='post-content'
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </div>
      </main>
    </div>
  );
}
