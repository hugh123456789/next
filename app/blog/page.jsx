import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts'; // 确保路径正确
import './comm.css'
import classNames from 'classnames';
import { GiAlliedStar } from "react-icons/gi";
import Footer from '../Foot';
import { NavBar } from '../NavBar'; // Assuming NavBar is a client component if it has interactive elements

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className='bg-[#14151b] custom-scrollbar min-h-screen relative'>
      {/* NavBar is now fixed and vertically centered in the viewport.
        It sits on top of other content. Adjust z-index if needed.
      */}
      {/* <NavBar  /> */}

      {/* Main content area, pushed down to avoid overlapping with the fixed NavBar */}
      <div className='flex flex-col custom-scrollbar ml-[15vw] w-[70vw] overflow-y-auto p-2 pt-[10vh] pb-[5vh] relative z-10'> {/* Added padding-top to account for NavBar height */}
        <div className='flex-1 '>
          <div className='text-5xl font-bold text-white'>欢迎!</div> {/* Added text-white for visibility */}
          <div className='mt-[5vh] w-1/2 text-gray-400'>
            写博客文章是我比较喜欢的沉淀分享方式，
            我希望能够把好用的技术知识传递给更多的人。我比较喜欢围绕着技术为主的话题，但是也会写一些非技术的话题，比如设计、创业、企业管理、生活随笔等等。
          </div>
          <div className='mt-[5vh]'><GiAlliedStar className='text-3xl text-yellow-400'></GiAlliedStar></div> {/* Added text-yellow-400 for visibility */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-[10vh] mb-8'>
            {allPostsData.map(({ id, date, title, image }) => (
              <div
                key={id}
                className={classNames(
                  {
                    'border-orange-600 overflow-hidden p-0 bg-cover bg-center rounded-4xl hover:shadow-[#1351fc] hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between items-center duration-400 transition ease-in-out h-[40vh] border-2 text-center': true
                  },
                )}
                style={{ backgroundImage: `url('${image}')` }}
              >
                <div className='h-[70%] flex justify-center items-center backdrop-brightness-50 w-full'> {/* Added backdrop for better text visibility */}
                  <Link href={`/posts/${id}`} className='text-xl font-semibold text-blue-400 hover:text-blue-200 transition-colors text-center w-full'>
                    {/* {title} */}
                  </Link>
                </div>
                <div className='w-full bg-gray-700 h-[30%] bg-opacity-70 flex items-center justify-center'> {/* Adjusted backdrop-blur-glass to bg-opacity-70 for simplicity */}
                  <small className='text-gray-300 w-full text-center'> {/* Changed text-gray-500 to text-gray-300 for better contrast */}
                    {new Date(date).toDateString()} {/* Ensure date is a Date object or convert */}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer as part of the scrollable content */}
        <div className='mt-8 mb-4 pt-4 border-t border-gray-700 text-gray-400'> {/* Adjusted border and text color */}
          <Footer />
        </div>
      </div>
    </div>
  );
}