'use client'
import './common.css'
import { HiArrowUpCircle } from "react-icons/hi2";
import { SiFurrynetwork } from "react-icons/si";
import { LiaGlobeAfricaSolid } from "react-icons/lia";
import classNames from 'classnames'
import { useState } from 'react';
import { GrFingerPrint } from "react-icons/gr";
import { GrReactjs } from "react-icons/gr";

export default function projectPage() {
    const [isActive, setActive] = useState(false)
    const [deepseek, setDeepseek] = useState(false)
    function openWeb() {
        setActive(!isActive)
    }
    function openDeep() {
        setDeepseek(!deepseek)
    }

    return (

        <div className="project-page w-full">
            <div className='question  bg-white'>

            </div>
            <div className='w-full bg-white h-full p-4'>
                <div className='answer-container flex flex-col items-center gap-4 w-[60vw]'>
                    <textarea className='w-full h-18 rounded-lg border-0 focus:outline-none p-4 text-black overflow-hidden' placeholder='输入你的问题' />
                    <div className=' text-black w-full flex flex-row justify-between'>
                        <div className='flex flex-row '>
                            <div onClick={openWeb}><LiaGlobeAfricaSolid
                                className={classNames
                                    ('text-3xl mt-1 ml-5 mr-1 hover:scale-110 hover-button',
                                        { 'text-blue-800': isActive }
                                    )}

                            />
                            </div>
                            <div >
                                <GrReactjs onClick={openDeep} className={classNames('hover-button text-2xl mt-[8px] ml-4 hover:scale-110',
                                    {'text-blue-600':deepseek

                                    })} />
                            </div>
                        </div>
                        <div  >
                            <HiArrowUpCircle className='text-4xl mt-1 mr-1 hover:scale-110 hover-button ' />
                        </div>

                    </div>
                </div>
            </div>




        </div>


    )
}