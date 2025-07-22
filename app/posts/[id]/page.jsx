// app/posts/[id]/page.js
import { getAllPostIds, getPostData } from '../../../lib/posts';
import './comm.css'

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

export default async function Post({ params }) {
  const postData = await getPostData(params.id);

  return (
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
  );
}
