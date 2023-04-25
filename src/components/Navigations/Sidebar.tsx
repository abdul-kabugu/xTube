
import {useState} from 'react'
import { Tsidebar } from '@/types'
import {Transition} from '@headlessui/react'
export default function Sidebar({isExpanded, toggleSidebar}: Tsidebar) {
  return (
    
    <div className={`  ease-in-out duration-300 ${isExpanded ? "w-[150px] translate-x-0" : "80px min-w-[80px] translate-x-0.5"} border border-r-2 border-purple-400 h-screen fixed top-0 left-0`}>
        <h1>{isExpanded}</h1>
         <button onClick={toggleSidebar} className="bg-black text-white">Toggle</button>
    </div>
   
    
  )
}
