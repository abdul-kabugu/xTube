
import {useState} from 'react'
import { Tsidebar } from '@/types'
import { ChevronLeftOutline, ChevronRightOutline } from '@/Icons'
import Link from 'next/link'
import { sidebarMenu } from '@/constants'
export default function Sidebar({isExpanded, toggleSidebar}: Tsidebar) {
  return (
    
    <div className={`${isExpanded ? "w-[120px] " : "w-[70px] "}  border-r-1 h-screen fixed top-0  duration-500 ease-in-out xs:hidden md:block `}>
        <div>
          {sidebarMenu.map((item, i) =>  {

            return(
              <Link href={item.to} key={i}>
              <div className={`${isExpanded ? "flex gap-3 items-center my-4 px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg" : "flex flex-col my-5 px-3 items-center justify-center hover:bg-indigo-100 dark:hover:bg-gray-700  w-full h-12 py-1.5"}`}>
                 <item.icon className={`${isExpanded ? "w-5 h-5" : "w-6 h-6 "}`} />
                  <p className={`${isExpanded ? "text-sm" : "text-xs"}`}>{item.title}</p>
              </div>
              </Link>
            )
          })}
        </div>
       
       <div className='absolute bottom-0 flex justify-center items-center w-full '>
       {isExpanded  ? (
        <ChevronLeftOutline className='w-5 h-5 cursor-pointer ' onClick={toggleSidebar} />
       ) : (
        <ChevronRightOutline className='w-5 h-5 cursor-pointer '  onClick={toggleSidebar}/>
       )}
       </div>
         
    </div>
   
    
  )
}
