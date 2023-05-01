import {useState} from 'react'
import VideoMetadata from './VideoMetadata'
import VideoSelector from './VideoSelector'

export default function FullVideoUploader() {
    const [videoFile, setvideoFile] = useState()
     console.log("the selected file", videoFile)
  return (
    <div className=''>
        
         {videoFile  ? (
           <VideoMetadata videoFile = {videoFile} setVideoFile = {setvideoFile} />
         ) : (
          <VideoSelector handleSelectFile={setvideoFile} />
       )}
    </div>
  )
}
