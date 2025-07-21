// app/posts/[id]/page.js
import { getAllPostIds, getPostData } from '../../../lib/posts';

// 使用 generateStaticParams 来在构建时生成所有可能的 id 路径
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

export default async function Post({ params }) {
  const postData = await getPostData(params.id);

  return (
    <div >
      <h1>{postData.title}</h1>
      <p>{postData.date.toDateString()}</p> 
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  );
}