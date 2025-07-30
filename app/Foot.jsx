'use client'
import Link from "next/link";

import { LiaAirbnb } from "react-icons/lia";
import { FaGithub } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { useState } from "react";
import { useModal } from './hooks/useModal'; // 添加导入自定义hook

import { GrValidate } from "react-icons/gr";

export default function Footer() {
    const [email, setEmail] = useState("");
    const { isOpen, message, title, showModal, closeModal } = useModal(); // 使用自定义hook
    
    const handleSubscribe = async () => {
        if (!email) {
            showModal("请输入邮箱地址");
            return;
        }
        
        try {
            const response = await fetch('/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'welcome',
                    to: email
                })
            });
            
            const result = await response.json();
            
            if (response.ok) {
                showModal("订阅成功！感谢您的订阅", "成功");
                setEmail(""); // 清空输入框
            } else {
                showModal("订阅失败：" + result.message, "失败");
            }
        } catch (error) {
            console.error("订阅出错:", error);
            showModal("订阅过程中出现错误，请稍后再试", "错误");
        }
    };
    const onChange = (e) => {
        setEmail(e.target.value);
    };
    return (
        <footer className="w-full bg-white ">
            {/* 订阅区域 - 移动端优化 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-md mx-auto text-center">
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-center  mb-4">
                            <LiaAirbnb className="text-2xl text-black" />
                            <h3 className="ml-3 text-lg font-bold text-black">动态更新</h3>
                        </div>
                        <p className="text-gray-600 mb-4 text-sm sm:text-base">
                            喜欢我的内容的话不妨订阅支持一下
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 items-center">
                            <input value={email} onChange={onChange}
                                type="email" 
                                placeholder="输入您的邮箱"
                                className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm text-center sm:text-left"
                            />
                            <button className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
                            onClick={()=>handleSubscribe()}
                            >
                                订阅
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 底部导航和版权 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* 左侧版权信息 */}
                        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
                            <GrValidate className="text-black"/>
                            <span className="text-gray-500 text-sm"> 2025</span>
                            <span className="text-gray-500 text-sm">项目已开源，欢迎star</span>
                            <Link 
                                href="https://github.com/hugh123456789/next" 
                                className="flex items-center gap-1 text-black hover:text-gray-600 transition-colors"
                            >
                                <FaGithub className="text-sm" />
                                <span className="text-sm border-b border-transparent hover:border-black transition-colors">
                                    Github
                                </span>
                                <FaRegShareFromSquare className="text-sm" />
                            </Link>
                        </div>

                        {/* 右侧导航链接 */}
                        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
                            <Link href="/" className="text-sm text-gray-600 hover:text-black transition-colors">
                                首页
                            </Link>
                            <Link href="/blog" className="text-sm text-gray-600 hover:text-black transition-colors">
                                博客
                            </Link>
                            <Link href="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">
                                联系
                            </Link>
                            <Link href="/about" className="text-sm text-gray-600 hover:text-black transition-colors">
                                关于
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>

            {/* 自定义弹窗 */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                        <h3 className="text-lg font-semibold mb-2">{title}</h3>
                        <p className="text-gray-600 mb-4">{message}</p>
                        <div className="flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                确定
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
}
