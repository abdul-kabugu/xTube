// @ts-nocheck
import { DislikeOutline, LikeOutline } from '@/Icons'
import { CharacterAvatar } from '@crossbell/ui'
import React from 'react'

export default function CommentCard({comment}) {
    console.log("comment from card", comment)
  return (
    <div className='flex gap-3 my-3 px-3 mt-4'>
        <CharacterAvatar  size={25} character={comment.character}  />
         <div>
             <p className='text-sm'>{comment.metadata.content.content}</p>
              <div className='flex gap-3 my-1'>
                <LikeOutline className='w-4 h-4 cursor-pointer'  />
                 <DislikeOutline className='w-4 h-4 cursor-pointer' />
              </div>
         </div>
    </div>
  )
}
