import React from 'react'
import Connected from './Connected'
import Search from './Search'
import { Tsidebar } from '@/types'
export default function TopNav({isExpanded} : Tsidebar) {
  return (
    <div className={`flex ${isExpanded ? "ml-[120px]" : "ml-[70px]"} justify-between  px-3 py-2 sticky top-0 items-center bg-white dark:bg-gray-900 z-10 `}>
        <div>
           <h1 className='font-semibold text-xl'>xTube</h1>
        </div>

         <Search  />
         <Connected  />
    </div>
  )
}
