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

export default function ChannelPage() {
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

  return (
    <div>
        <ChannelBanner  />
       <div className='flex justify-between items-center px-2 mt-3'>
        <div className='flex gap-3'>
         <CharacterAvatar  size={60} character={data?.data} />
          <div>
             <h1 className='font-semibold'>{data?.data.handle}</h1>
             <p className='text-sm'>Subsribers {profileStats?.followersCount}</p>
          </div>
         </div>
          <button disabled={relationStatus?.isFollowed} className='py-1.5 px-4 rounded-lg bg-blue-600 text-white' onClick={handleSubscribe}>{relationStatus?.isFollowed ? "Subsribed" : "Subsribe"}</button>
       </div>
    </div>
  )
}
