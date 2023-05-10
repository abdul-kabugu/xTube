// @ts-nocheck

import {useState, useEffect} from 'react'
import { Indexer } from 'crossbell.js'
import { UserVideoCard, VideoCard } from '@/components/cards'
export default function Videos({channelId}) {
    const [channelVids, setchannelVids] = useState()
    const indexer = new Indexer()

     const handleGetAllVideos = async () => {
        const { list } = await indexer.getNotes({
            characterId: channelId,
          });
          setchannelVids(list)
     }

     useEffect(() => {
       handleGetAllVideos()
     }, [])
      console.log("channel vids", channelVids) 
      const filteredPosts = channelVids?.filter(post =>    !post.toNoteId && post.metadata?.content?.hasOwnProperty("attachments")  )
       console.log("filtered posts", filteredPosts)

  return (
    <div>
       coming soon 
    </div>
  )
}
