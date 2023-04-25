import React from 'react'
import Connected from './Connected'
import Search from './Search'
import { Tsidebar } from '@/types'
export default function TopNav({isExpanded} : Tsidebar) {
  return (
    <div className={`flex ${isExpanded ? "ml-[150px]" : "ml-[80px]"} justify-between border-b-2 border-red-500 px-3 py-2 sticky top-0 items-center`}>
        <div>
           <h1 className='font-semibold text-xl'>xTube</h1>
        </div>

         <Search  />
         <Connected  />
    </div>
  )
}
