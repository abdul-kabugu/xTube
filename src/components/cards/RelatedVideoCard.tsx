import { IPFS_GATEWAY } from '@/constants'
import { useDiscover } from '@/hooks'
import Image from 'next/image'
import {useState} from 'react'
import moment from 'moment'
import useTruncateText from '@/hooks/useTruncateText'
import Link from 'next/link'
export default function RelatedVideoCard({video}) {
   console.log("video from its card", video)
   const [currentTime, setCurrentTime] = useState(new Date());
 const currentDate = new Date();
 const videoCreatedAt = new Date(video.createdAt);
 const diffInMilliseconds = currentDate - videoCreatedAt;
 const diffInHours = diffInMilliseconds / (60 * 60 * 1000);
const duration = moment.duration(diffInHours, 'hours');
const {shortenTxt} = useTruncateText()
  return (
    <div className='xs:hidden xl:flex mb-2 gap-2'>
     
      <Image  src={`${IPFS_GATEWAY}/${video?.metadata.content?.attachments[0].name}`} width={200} height={200} 
        alt='video cover'
        className='w-[140px] h-[100px] object-cover rounded-lg cursor-pointer'
      />
      
      <div>
        {video?.metadata?.content.title ? (
           <Link href={`${video.character.characterId}-${video?.noteId}`}>
       <h1 className='text-lg font-semibold'>{shortenTxt(video?.metadata?.content.title, 27)}</h1>
       </Link>
      ) : (
        <Link href={`${video.character.characterId}-${video?.noteId}`}>
        <h1 className='text-lg font-semibold'> Video By {shortenTxt(video?.character.handle, 10) }</h1>
        </Link>

      )}
         <h2 className='text-sm'>{video?.character.handle}</h2>
         <h3 className='text-xs'>uploaded  {duration.humanize().replace("a ", "")} ago </h3>
      </div>
    </div>
  )
}
