
import {useState} from 'react'
import { MobileNav, Sidebar, } from './Navigations'
import TopNav from './Navigations/Topnavigation/TopNav'
import {ThemeProvider} from 'next-themes'
import { Tlayout } from '@/types'
import {createReactClient, studioProvider, LivepeerConfig} from "@livepeer/react"
import { LIVEPEER_KEY } from '@/constants'
export default function Layout({children} : Tlayout) {
  const [isSidebarExpanded, setisSidebarExpanded] = useState(false)

  const toggleSidebar = () => {
    setisSidebarExpanded(! isSidebarExpanded)
  }

  //LIVEPEER_CONFIGURATIONS
  const client = createReactClient({
    provider: studioProvider({ apiKey: LIVEPEER_KEY}),
  });
  return (
    <>
    {/* /*DISABLED DARK MODE */ }
   <ThemeProvider attribute='class'>
    <LivepeerConfig client={client}>
     <TopNav isExpanded = {isSidebarExpanded} />
     <main className='flex '>
      <section className={`${isSidebarExpanded ? "md:ml-[120px]" : "md:ml-[70px]"} xs:ml-0  w-full`}>{children}</section>
       <Sidebar isExpanded = {isSidebarExpanded} toggleSidebar = {toggleSidebar} />   
     </main>
     <MobileNav  />
     </LivepeerConfig>
     </ThemeProvider>
    </>
  )
}
