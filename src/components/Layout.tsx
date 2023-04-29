
import {useState} from 'react'
import { MobileNav, Sidebar, } from './Navigations'
import TopNav from './Navigations/Topnavigation/TopNav'
import {ThemeProvider} from 'next-themes'
import { Tlayout } from '@/types'
export default function Layout({children} : Tlayout) {
  const [isSidebarExpanded, setisSidebarExpanded] = useState(false)

  const toggleSidebar = () => {
    setisSidebarExpanded(! isSidebarExpanded)
  }
  return (
    <>
    {/* /*DISABLED DARK MODE */ }
   <ThemeProvider attribute='class'>
     <TopNav isExpanded = {isSidebarExpanded} />
     <main className='flex '>
      <section className={`${isSidebarExpanded ? "ml-[120px]" : "ml-[70px]"}  w-full`}>{children}</section>
       <Sidebar isExpanded = {isSidebarExpanded} toggleSidebar = {toggleSidebar} />   
     </main>
     <MobileNav  />
     </ThemeProvider>
    </>
  )
}
