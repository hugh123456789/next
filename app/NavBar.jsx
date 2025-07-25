'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import classNames from 'classnames'

const list = [
    { href: "/", title: "Home", icon: "🏠" },
    { href: "/blog", title: "Blog", icon: "📝" },
    { href: "/projects", title: "Projects", icon: "💼" },
    { href: "/about", title: "About", icon: "👤" },
    { href: "/comment", title: "Comment", icon: "💬" },
]

export const NavBar = () => {
    const path = usePathname()
    // 导航栏悬停状态
    const [isHovered, setIsHovered] = useState(false)
    // 移动端菜单展开状态
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // 切换移动端菜单
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    // 关闭移动端菜单（点击链接时）
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    return (
        <div className="flex justify-center bg-white nav-bar relative px-4" style={{width:'90vw',margin:'0 auto'}}>
            {/* 桌面端导航栏 */}
            <nav
                className={classNames(
                    'hidden md:flex border-2 rounded-2xl h-[8vh] items-center justify-around w-2/5 min-w-[400px]',
                    { 'transform transition-all duration-300 ease-in-out border-[#000000] shadow-lg shadow-blue-200': isHovered }
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {list.map(item => (
                    <Link 
                        className={classNames(
                            { 'scale-110': path === item.href },
                            { 'bg-[#0095ff]': path === item.href },
                            { 'text-white': path === item.href },
                            { 'text-black transform transition-all duration-300 ease-in-out rounded-xl p-2 font-bold hover:text-xl hover:text-[royalblue]': true }
                        )} 
                        href={item.href} 
                        key={item.href}
                    >
                        <span className="hidden lg:inline">{item.title}</span>
                        <span className="lg:hidden text-xl">{item.icon}</span>
                    </Link>
                ))}
            </nav>

            {/* 移动端导航栏 */}
            <div className="md:hidden w-full">
                {/* 移动端顶部栏 */}
                <div className="flex justify-between items-center h-[8vh] px-4">
                    {/* Logo或品牌名 */}
                    <Link href="/" className="text-xl font-bold text-[#0095ff]">
                        Blog
                    </Link>
                    
                    {/* 汉堡菜单按钮 */}
                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        aria-label="切换菜单"
                    >
                        <div className="w-6 h-6 flex flex-col justify-center items-center">
                            <span className={classNames(
                                'block w-5 h-0.5 bg-gray-600 transition-all duration-300',
                                { 'rotate-45 translate-y-1.5': isMobileMenuOpen }
                            )}></span>
                            <span className={classNames(
                                'block w-5 h-0.5 bg-gray-600 mt-1 transition-all duration-300',
                                { 'opacity-0': isMobileMenuOpen }
                            )}></span>
                            <span className={classNames(
                                'block w-5 h-0.5 bg-gray-600 mt-1 transition-all duration-300',
                                { '-rotate-45 -translate-y-1.5': isMobileMenuOpen }
                            )}></span>
                        </div>
                    </button>
                </div>

                {/* 移动端下拉菜单 */}
                <div className={classNames(
                    'absolute top-[8vh] left-0 w-full bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out z-50',
                    {
                        'opacity-100 visible translate-y-0': isMobileMenuOpen,
                        'opacity-0 invisible -translate-y-2': !isMobileMenuOpen
                    }
                )}>
                    <nav className="py-4">
                        {list.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMobileMenu}
                                className={classNames(
                                    'flex items-center px-6 py-3 text-lg font-medium transition-colors duration-200',
                                    {
                                        'bg-[#0095ff] text-white': path === item.href,
                                        'text-gray-700 hover:bg-gray-50 hover:text-[#0095ff]': path !== item.href
                                    }
                                )}
                            >
                                <span className="mr-3 text-xl">{item.icon}</span>
                                <span>{item.title}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}