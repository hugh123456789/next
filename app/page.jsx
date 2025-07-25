'use client'
import { motion } from 'framer-motion'
import {SparkleIcon ,UserSecurityIcon} from '../assets/SparkleIcon'


function Developer() {
    return (
        <span className="group">
            <span className="font-mono">&lt;</span>开发者
            <span className="font-mono">/&gt;</span>
            <span className="invisible inline-flex text-zinc-300 before:content-['|'] group-hover:visible group-hover:animate-typing dark:text-zinc-500" />
        </span>
    )
}

function Designer() {
    return (
        <span className="group relative bg-black/5 p-1 dark:bg-white/5">
            <span className="pointer-events-none absolute inset-0 border border-lime-700/90 opacity-70 group-hover:border-dashed group-hover:opacity-100 dark:border-lime-400/90">
                <span className="absolute -left-[3.5px] -top-[3.5px] size-1.5 border border-lime-700 bg-zinc-50 dark:border-lime-400" />
                <span className="absolute -bottom-[3.5px] -right-[3.5px] size-1.5 border border-lime-700 bg-zinc-50 dark:border-lime-400" />
                <span className="absolute -bottom-[3.5px] -left-[3.5px] size-1.5 border border-lime-700 bg-zinc-50 dark:border-lime-400" />
                <span className="absolute -right-[3.5px] -top-[3.5px] size-1.5 border border-lime-700 bg-zinc-50 dark:border-lime-400" />
            </span>
            前端开发
        </span>
    )
}

function OCD() {
    return (
        <span className="group inline-flex items-center">
            <SparkleIcon className="mr-1 inline-flex transform-gpu transition-transform duration-500 group-hover:rotate-180" />
            <span>idea</span>
        </span>
    )
}

function Founder() {
    return (
        <span className="group inline-flex items-center">
            <UserSecurityIcon className="mr-1 inline-flex group-hover:fill-zinc-600/20 dark:group-hover:fill-zinc-200/20" />
            <span> s m : ) e</span>
        </span>
    )
}

export default function rootPage() {
  
    return (
        <div className="min-h-screen w-full bg-white dark:bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center sm:text-left">
                        <motion.h1
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-900 leading-tight"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: 'spring',
                                damping: 25,
                                stiffness: 100,
                                duration: 0.3,
                            }}
                        >
                            <div className="space-y-2 sm:space-y-0">
                                <span className="block sm:inline">
                                    <Developer className="text-zinc-900" />，
                                </span>
                                <span className="block sm:inline mt-2 sm:mt-0">
                                    <Designer />
                                </span>
                            </div>
                            <div className="mt-4">
                                <span className="block sm:inline">
                                    <OCD />，
                                </span>
                                <span className="block sm:inline mt-2 sm:mt-0">
                                    <Founder />
                                </span>
                            </div>
                        </motion.h1>
                        
                        <motion.p
                            className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-500 max-w-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: 'spring',
                                damping: 30,
                                stiffness: 85,
                                duration: 0.3,
                                delay: 0.1,
                            }}
                        >
                            专注于创造优雅的用户体验，将技术与设计完美融合
                        </motion.p>
                        
                        <motion.div
                            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: 'spring',
                                damping: 50,
                                stiffness: 90,
                                duration: 0.35,
                                delay: 0.25,
                            }}
                        >
                            <button className="px-6 py-3 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors">
                                查看作品
                            </button>
                            <button className="px-6 py-3 border border-zinc-300 text-zinc-900 rounded-lg hover:bg-zinc-50 transition-colors">
                                联系我
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}