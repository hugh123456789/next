import Link from "next/link";

import { LiaAirbnb } from "react-icons/lia";
import { FaGithub } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";

export default function Footer() {
    return (
        <div>
            <div className="flex justify-center items-center">
                <div className="flex justify-center items-center max-w-screen-xl w-[70vw]">
                    <div>
                        <div style={{ width: '30vw', margin: '0 auto', height: '30vh' }} className=" rounded-2xl p-4 bg-white shadow-md 

                     border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                            <div className="flex">
                                <LiaAirbnb className="text-2xl " style={{ color: 'black' }} />
                                <span style={{ color: 'black', marginLeft: '10px', textAlign: 'center', fontWeight: 'bold' }}>动态更新</span>
                            </div>
                            <div>喜欢我的内容的话不妨订阅支持一下</div>
                            <div>xxxx</div>
                            <div className="flex justify-between" style={{ marginTop: '20px' }}>
                                <input />
                                <button className="button">订阅</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '9vh' }} className="flex justify-between items-center py-4 ">

                <div className="flex justify-center items-center">
                    <span style={{ color: 'hsla(240,4%,46%,.8)', textAlign: 'center' }} >© 2025</span>
                    <span style={{ fontSize: '13px', marginLeft: '3px', color: 'hsla(240,4%,46%,.8)' }}>项目已开源，欢迎star
                    </span>
                    <Link href="https://github.com/hugh123456789/next" style={{ display: 'flex', flexDirection: 'row' }}>
                          <FaGithub className="" style={{marginLeft: '5px',color:'black'}}  />
                         <div className="border-bottom" style={{ fontSize: '13px', marginLeft: '3px', color: 'black', }}>Github</div>
                      <FaRegShareFromSquare className="text-black" style={{marginLeft: '3px'}} />
                    </Link>

                </div>



                <div className="gap-4 foot-contain hover:text-lime-500">
                    <Link href="/" style={{ marginRight: '10px' }} className="foot">首页</Link>
                    <Link href="/blog" className="foot">博客</Link>
                    <Link href="/contact" className="foot">联系</Link>
                    <Link href="/about" className="foot">关于</Link>

                </div>
            </div>
        </div>

    );
}