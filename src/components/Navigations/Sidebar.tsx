
import {useState} from 'react'
import { Tsidebar } from '@/types'
import { ChevronLeftOutline, ChevronRightOutline } from '@/Icons'
import Link from 'next/link'
import { sidebarMenu } from '@/constants'
export default function Sidebar({isExpanded, toggleSidebar}: Tsidebar) {
  return (
    
    <div className={`${isExpanded ? "w-[130px] " : "w-[70px] "} border border-r-2 border-purple-400 h-screen fixed top-0  duration-500 ease-in-out`}>
        <div>
          {sidebarMenu.map((item, i) =>  {

            return(
              <Link href={item.to} key={i}>
              <div className={`${isExpanded ? "flex gap-3 items-center my-4 px-3 py-1.5 hover:bg-gray-200 rounded-lg" : "flex flex-col my-5 px-3 items-center justify-center hover:bg-gray-200  w-full h-12 py-1.5"}`}>
                 <item.icon className={`${isExpanded ? "w-5 h-5" : "w-6 h-6 text-black/70"}`} />
                  <p className={`${isExpanded ? "text-sm" : "text-xs text-black/75 "}`}>{item.title}</p>
              </div>
              </Link>
            )
          })}
        </div>
       
       <div className='absolute bottom-0 flex justify-center items-center w-full '>
       {isExpanded  ? (
        <ChevronLeftOutline className='w-6 h-6 cursor-pointer text-black/70' onClick={toggleSidebar} />
       ) : (
        <ChevronRightOutline className='w-6 h-6 cursor-pointer text-black/70'  onClick={toggleSidebar}/>
       )}
       </div>
         
    </div>
   
    
  )
}
