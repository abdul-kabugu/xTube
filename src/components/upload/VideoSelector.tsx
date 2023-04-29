//@ts-nocheck 
import {useState, useRef} from 'react'
import { TvideoSelector } from '@/types'
import { UploadOutline } from '@/Icons'
export default function VideoSelector({handleSelectFile}) {
    const videoRef = useRef<HTMLInputElement>(null)

    const handleOpenInput = () =>  {
        videoRef.current.click()
    }
  return (
<div className=' h-[80vh] flex items-center justify-center'>
    <div className='w-[650px] h-[400px] border border-dashed border-gray-400 flex items-center justify-center gap-4 flex-col rounded-lg'
   
    >
 <input
  type="file"
  id="fileInput"
  accept=".mp4, .avi, .mov, .mkv, .wmv"
  onChange={(e) => handleSelectFile(e.target.files[0])}
  onDrop={(e) => handleSelectFile(e.target.files[0])}
 ref={videoRef} hidden
    className={`w-full  h-full bg-yellow-400 relative`}
    />
    <div className='absolute flex flex-col gap-3 items-center justify-center'>
    <UploadOutline  className='w-20 h-20'  />
     <h1 className='text-center text-3xl font-bold'>Drag and Drop File <br /> Video to Upload</h1>
      <button className='bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold' onClick={handleOpenInput}>Or Choose File</button>
    </div>
    </div>
    </div>
  )
}
