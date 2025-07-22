import Link from "next/link";
import { DiBower } from "react-icons/di";
import { LiaAirbnb } from "react-icons/lia";

export default function Footer() {
    return (
        <div>
            <div className="flex justify-center items-center">
                <div className="flex justify-center items-center max-w-screen-xl w-[70vw]">
                    <div>
                        <div style={{ width: '30vw', margin: '0 auto' }} className=" rounded-2xl p-4 bg-white shadow-md 
                     border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                            <div className="flex">
                                <LiaAirbnb className="text-2xl " style={{color:'black'}} />
                               <span style={{color:'black',marginLeft:'10px',textAlign:'center',fontWeight:'bold'}}>动态更新</span> 
                            </div>
                            <div>喜欢我的内容的话不妨订阅支持一下</div>
                            <div>xxxx</div>
                            <div className="flex" style={{marginTop:'20px'}}>
                                <input/>
                                <button className="button">订阅</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '9vh' }} className="flex justify-between items-center py-4 ">


                <span style={{marginLeft:'5vw',color:'hsla(240,4%,46%,.8)'}} >© 2025</span>

                <div className="gap-4 foot-contain">
                    <Link href="/" style={{marginRight:'10px'}} className="foot">首页</Link>
                    <Link href="/blog" className="foot">博客</Link>
                    <Link href="/contact" className="foot">联系</Link>
                    <Link href="/about" className="foot">关于</Link>
                    
                </div>
            </div>
        </div>

    );
}