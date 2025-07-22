import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts'; 
import './comm.css'
import classNames from 'classnames';
import { GiAlliedStar } from "react-icons/gi";


export default function blogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className='bg-[#ffffff] custom-scrollbar min-h-screen relative mt-[5vh]'>
      <div className='flex flex-col custom-scrollbar  overflow-y-auto p-15 pt-[10vh] pb-[5vh] relative z-10'>
        <div className='flex-1 '>
          <div className='text-5xl font-bold text-black'>欢迎!</div>
          <div className='mt-[5vh] w-1/2 text-black'>
            写博客文章是我比较喜欢的沉淀分享方式，
            我希望能够把好用的技术知识传递给更多的人。我比较喜欢围绕着技术为主的话题，但是也会写一些非技术的话题，比如设计、创业、企业管理、生活随笔等等。
          </div>
          <div className='mt-[5vh]'><GiAlliedStar className='text-3xl text-yellow-400'></GiAlliedStar></div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-[10vh] mb-8'>
            {allPostsData.map(({ id, date, title, image }) => (
              <div
                key={id}
                className={classNames(
                  {
                    'border-gray-700 overflow-hidden p-0 bg-cover bg-center rounded-4xl hover:shadow-[#1351fc] hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between items-center duration-400 transition ease-in-out h-[40vh]  border-2 text-center': true
                  },
                )}
                // style={{ backgroundImage: `url('${image}')` }}
              >
                <div className='h-[70%] flex justify-center items-center backdrop-brightness-50 w-full'>
                  <Link href={`/posts/${id}`} className='text-xl font-semibold text-blue-400 hover:text-blue-200 transition-colors text-center w-full'>
                    {title}
                  </Link>
                </div>
                <div className='w-full bg-gray-700 h-[30%] bg-opacity-70 flex items-center justify-center'>
                  <small className='text-gray-300 w-full text-center'>
                    {new Date(date).toDateString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}