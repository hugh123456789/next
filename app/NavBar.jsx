'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react' // Import useState
import classNames from 'classnames'


const list = [
    { href: "/", title: "Home", icon: "home" },
    { href: "/blog", title: "Blog", icon: "blog" },
    { href: "/projects", title: "Projects", icon: "projects" },
    { href: "/about", title: "About", icon: "about" },
    { href: "/comment", title: "Comment", icon: "comment" },

]

export const NavBar = () => {
    const path = usePathname()
    // State to track if the mouse is hovering over the nav bar
    const [isHovered, setIsHovered] = useState(false);

    console.log(path)
    return (
        <div className="flex justify-center bg-white mt-[5vh] ">
            <nav
                className={classNames(
                    'border-2 rounded-2xl h-[8vh] items-center flex justify-around  w-2/5',
                    { 'transform transition-all duration-300 ease-in-out border-[#000000] shadow-lg shadow-blue-200': isHovered } // Apply highlight class when hovered
                )}
                onMouseEnter={() => setIsHovered(true)} // Set isHovered to true on mouse enter
                onMouseLeave={() => setIsHovered(false)} // Set isHovered to false on mouse leave
            >
                {list.map(item => (
                    <Link className={classNames(
                        { 'scale-110': path === item.href },
                        { 'bg-[#0095ff]': path === item.href },
                        { 'text-white': path === item.href },
                        { ' text-black transform transition-all duration-300 ease-in-out rounded-xl p-1  font-bold hover:text-2xl hover:text-[#0095ff]': true }
                    )} href={item.href} key={item.href}>{item.title}</Link>
                ))}

            </nav>
        </div>

    )
}