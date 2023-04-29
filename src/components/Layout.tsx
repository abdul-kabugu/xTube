
import {useState} from 'react'
import { MobileNav, Sidebar, } from './Navigations'
import TopNav from './Navigations/Topnavigation/TopNav'

import { Tlayout } from '@/types'
export default function Layout({children} : Tlayout) {
  const [isSidebarExpanded, setisSidebarExpanded] = useState(false)

  const toggleSidebar = () => {
    setisSidebarExpanded(! isSidebarExpanded)
  }
  return (
    <>
     <TopNav isExpanded = {isSidebarExpanded} />
     <main className='flex'>
      <section className={`${isSidebarExpanded ? "ml-[130px]" : "ml-[70px]"}`}>{children}</section>
       <Sidebar isExpanded = {isSidebarExpanded} toggleSidebar = {toggleSidebar} />   
     </main>
     <MobileNav  />
    </>
  )
}
