import { fakeArray } from '@/constants'
import React from 'react'

export default function ThumbnailsLoadingSpinner() {
  return (
    <div className='flex gap-2 flex-wrap'>
        {fakeArray.map((item, i) =>  {
            return(
                <div className="flex flex-col  animate-pulse  h-full justify-center flex-grow-2 flex-shrink" key={i}>
                                <div className=" w-[120px] h-[70px] border border-gray-300  bg-gray-300  rounded-lg mb-1 ">
                                    </div>

                 </div>
            )
        })}
    </div>
  )
}
