import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts';
import './comm.css'
import classNames from 'classnames';
import { GiAlliedStar } from "react-icons/gi";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";

export default function blogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className='bg-[#ffffff] custom-scrollbar min-h-screen relative mt-[5vh]'>
      <div className='flex flex-col custom-scrollbar  overflow-y-auto p-15 pt-[10vh] pb-[5vh] relative z-10'>
        <div className='flex-1 '>
          <div className='text-4xl font-bold tracking-tight text-black  sm:text-5xl' style={{ margin: '0 auto' }} >欢迎!</div>
          <div className='mt-[5vh] w-1/2 text-black'>
            写博客文章是我比较喜欢的沉淀分享方式，
            我希望能够把好用的技术知识传递给更多的人。我比较喜欢围绕着技术为主的话题，但是也会写一些非技术的话题，比如设计、创业、企业管理、生活随笔等等。
          </div>
          <div className='mt-[5vh]'><GiAlliedStar className='text-3xl text-yellow-400'></GiAlliedStar></div>
          <div className='flex flex-wrap justify-center gap-6 mt-[10vh] mb-8'>
            {allPostsData.map(({ id, date, title, image, type }) => (
              <Link href={`/posts/${id}`} key={id} className='md-contain'>
                <div
                  key={id}
                  className={classNames(
                    {
                      'w-80 border-gray-700 overflow-hidden p-0 bg-cover bg-center rounded-4xl hover:shadow-[#1351fc] hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between items-center duration-400 transition ease-in-out h-[40vh] border-2 text-center': true
                    },
                  )}
                  style={{ backgroundImage: `url('${image}')` }}
                >
                  <div className='h-[70%] flex justify-center items-center  w-full'>

                  </div>
                  <div className=' flex-col w-full h-[20%] bg-opacity-70 flex items-center justify-center'
                    style={{
                      // 玻璃模糊核心样式
                      backdropFilter: 'blur(8px)', // 模糊程度，数值越大越模糊
                      backgroundColor: 'rgba(255, 255, 255, 0.2)', // 半透明白色背景（可自定义颜色）
                      // 可选增强效果
                      border: '1px solid rgba(255, 255, 255, 0.18)', // 轻微边框增强层次感
                      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)', // 柔和阴影增加立体感
                    }}
                  >
                    <div className='text-gray-900 w-full text-center md-title'>
                      {title}
                    </div>
                    <div className='flex text-black' style={{ fontSize: '12px', justifyContent: 'space-between' }}>
                      <div className='flex items-center'>
                        <HiOutlineCalendarDateRange className='text-black' />
                        <span>{new Date(date).toLocaleDateString()}</span>
                      </div>

                      <div className='text-black' style={{ mrginLeft: '10px' }}>{type}</div>
                    </div>

                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}