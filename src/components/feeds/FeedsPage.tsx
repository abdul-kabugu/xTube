import Image from 'next/image'
import React from 'react'

export default function FeedsPage() {
  return (
    <div className='flex items-center justify-center flex-col h-[70vh]'>
         <Image  src={`/img/empty.svg`} width={300} height={300} alt='svg image'
          className='w-[150px] '
         />
         <h1 className='text-2xl font-bold'>Your Timeline is Empty</h1>
         <p className='text-lg font-semibold'>Follow More creatores</p>
    </div>
  )
}
