/* eslint-disable prettier/prettier */
import React from 'react'
import RelatedVideoLosderSkelton from './RelatedVideoCardSpinner'


export default function VideoFullSkeleton() {
  return (
    <div className='flex gap-2 xl:w-[73vw] '>
    <div className="flex flex-col  animate-pulse  h-full justify-center flex-grow flex-shrink ">
       <div className=" xs:w-[100vw]  md:w-[80vw] lg:w-[90vw] xl:w-[73vw] lg:h-[90vh] xs:h-[200px]  bg-gray-300 dark:bg-gray-700  rounded-lg mb-1 ">
              </div>
        <div className="w-[350px] h-[25px] bg-gray-300 dark:bg-gray-700 rounded-md mt-3"></div>
        <div className='flex xs:flex-col md:flex-row justify-between md:items-center'>
        <div className='mt-3 px-5 flex gap-3'>
          <div className='w-[100px] h-[18px] rounded-lg bg-gray-300 dark:bg-gray-700'></div>
          <div className='w-[100px] h-[18px] rounded-lg bg-gray-300 dark:bg-gray-700'></div>
          <div className='w-[100px] h-[18px] rounded-lg bg-gray-300 dark:bg-gray-700'></div>
          <div className='w-[100px] h-[18px] rounded-lg bg-gray-300 dark:bg-gray-700'></div>
        </div>
         <div className='flex gap-3 px-3 my-4'>
         <div className='w-[40px] h-[40px] rounded-2xl bg-gray-300 dark:bg-gray-700'></div>
         <div className='w-[40px] h-[40px] rounded-2xl bg-gray-300 dark:bg-gray-700'></div>
         <div className='w-[40px] h-[40px] rounded-2xl bg-gray-300 dark:bg-gray-700'></div>
         <div className='w-[40px] h-[40px] rounded-2xl bg-gray-300 dark:bg-gray-700'></div>
         </div>
        </div>
        <div className='mt-3 px-5 flex justify-between'>
          <div className='w-[50px] h-[50px] rounded-full bg-gray-300 dark:bg-gray-700'></div>
           <div className='w-[110px] h-[30px] rounded-lg bg-gray-300 dark:bg-gray-700'></div>
        </div>

        
    </div>

   <RelatedVideoLosderSkelton  />
    </div>
  )
}
