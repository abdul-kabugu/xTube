// @ts-nocheck

import {useState, useEffect} from 'react'
import ChannelBanner from './ChannelBanner'
import { useGetChannelData } from '@/hooks/useGetChannelData'
import { useRouter } from 'next/router'
import { CharacterAvatar } from '@crossbell/ui'
import { Indexer } from 'crossbell.js'
import { useAccountCharacter, useFollowCharacter } from '@crossbell/connect-kit'
import { useCharacterFollowRelation, useCharacterFollowStats } from '@crossbell/indexer'
import {useContract} from '@crossbell/contract'
import { toast } from 'react-toastify'
import { Badges, Nfts, Videos } from './tabs'
import { AiOutlineVideoCamera } from 'react-icons/ai'
import { CollectOutline } from '@/Icons'
import {HiOutlineCheckBadge} from 'react-icons/Hi'
import { TbBadge } from 'react-icons/tb'
export default function ChannelPage() {
    const [tab, setTab] = useState(0)
    const router = useRouter()
  const {channelId} = router.query
  const {data, isLoading, error, isError} = useGetChannelData(channelId)
  const indexer = new Indexer()
  const contract = useContract()
  const character = useAccountCharacter()
  const {data :relationStatus} = useCharacterFollowRelation(character?.characterId, channelId)
 const {data:profileStats} = useCharacterFollowStats(channelId)
  console.log("user data", profileStats)
   
        /*   
 =============================
 Subscribe to cahnnel
 =========================
 */
const follow = useFollowCharacter()
const handleSubscribe = async () =>  {
 try{
 const { data } = await contract.linkCharacter(character?.characterId, channelId, 'follow')
 toast.success(`Subscribed to ${data?.data.handle}`)
 } catch (error){
   toast.error(`${error}`)
 }
}

 const getCurrentTab = () =>  {
    if(tab === 0) {
       return(
        <Videos channelId = {channelId} />
       ) 
    }else if(tab === 1){
        return(
            <Badges />
        )
    }else if(tab === 2){
        return(
            <Nfts />
        )
    }
 }

  return (
    <div>
        <ChannelBanner  />
       <div className='flex justify-between items-center px-2 mt-3'>
        <div className='flex gap-3'>
         <CharacterAvatar  size={60} character={data?.data} />
          <div>
             <h1 className='font-semibold'>@{data?.data.handle}</h1>
             <p className='text-sm'>Subsribers {profileStats?.followersCount}</p>
          </div>
         </div>
          <button disabled={relationStatus?.isFollowed} className='py-1.5 px-4 rounded-lg bg-blue-600 text-white' onClick={handleSubscribe}>{relationStatus?.isFollowed ? "Subsribed" : "Subsribe"}</button>
       </div>

       <div className=' my-4 flex gap-4'>
        <div className={`${tab === 0 && "bg-gray-300 dark:bg-gray-700"}  flex gap-2 w-[110px] px-2 py-1 rounded-xl items-center justify-center cursor-pointer `} onClick={() => setTab(0)}>
            <AiOutlineVideoCamera className='w-4 h-4' />
        <button className={``}>Videos</button>
 </div>
 <div className={`${tab === 1 && "bg-gray-300 dark:bg-gray-700"}  flex gap-2 w-[110px] px-2 py-1 rounded-xl items-center justify-center cursor-pointer`} onClick={() => setTab(1)}>
        <TbBadge  />
        <button className={``}>Badges</button>
 </div>
 <div className={`${tab === 2 && "bg-gray-300 dark:bg-gray-700"}  flex gap-2 w-[110px] px-2 py-1 rounded-xl items-center justify-center cursor-pointer`} onClick={() => setTab(2)}>
            <CollectOutline className='w-4 h-4' />
        <button className={``}>NFTs</button>
 </div>
       </div>
       <div>
        {getCurrentTab()}
       </div>
    </div>
  )
}
