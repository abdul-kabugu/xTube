import { useGetVideo } from '@/hooks'
import {useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import { IPFS_GATEWAY } from '@/constants'
import { Player } from '@livepeer/react'
 type TvideoPage = {
    post : {}
    profileId : string
    videoId : string | string[]
 }
export default function VideoPage({post, videoId, profileId}:TvideoPage) {
    const BASE_URL = `https://indexer.crossbell.io/v1/notes/${profileId}/${videoId}`
    const fetchVideo = async () =>  {
       return axios.get(BASE_URL)
     }
     const { data : videoData, error : videoDataError, isLoading : isVideoDataLoading, isError : isVideoDataError } =  useQuery(['video'], fetchVideo )
 console.log("the post from it's page", videoData)

  const PosterImage = () =>  {

    return(
        <Image 
            src={`${IPFS_GATEWAY}/${videoData?.data.metadata.content.attachments[0].name}`}
            width={1400}
            height={600}
            
            alt='video Poster'
        />
    )
  }
  return (
    <div>
         <div className='xl:w-[73vw]'>
        <Player
           loop
           playbackId={videoData?.data.metadata.content.attachments[0].address}
             poster={<PosterImage />}
            
         />
         </div>
    </div>
  )
}
