import {useState} from 'react'
import VideoSelector from './VideoSelector'

export default function FullVideoUploader() {
    const [videoFile, setvideoFile] = useState()
     console.log("the selected file", videoFile)
  return (
    <div className=''>
        <h1>Full uploader</h1>
        <VideoSelector handleSelectFile={setvideoFile} />
    </div>
  )
}
