 // @ts-nocheck
import {useState} from 'react'
import { TPostVideo } from '@/types'
import { usePinToIpfs } from './usePinToIpfs'
export const usePostVideo = () =>  {
 const [isUploadingCover, setisUploadingCover] = useState(false)
 const [isVideoUploading, setisVideoUploading] = useState(false)
 const {uploadToIpfs, isUploading, isUploadingError} = usePinToIpfs()
 const postVideo = async ({title, content, tags,videoCover,videoThumbnails, selectedThumbnail}:TPostVideo) =>  {
    
    const base64ToBlob = (base64String :void, type) => {
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: type });
      }
      //const jpegBlob = base64ToBlob(selectedThumbnail?.replace(/^data:image\/(png|jpeg|jpg);base64,/, '') || videoThumbnails[0].replace(/^data:image\/(png|jpeg|jpg);base64,/, ''), 'image/png')
       setisUploadingCover(true)
     // const videoCoverCID = uploadToIpfs(jpegBlob)
      setisUploadingCover(false)
       console.log("video over cid", selectedThumbnail)
     //const videoCID = uploadToIpfs(videFile)
     // metadata
     const metadata = {
        title : title,
        content : content,
        tags : tags,
        "sources": ["xTube_v1"],
        attachments : [
            {
                //name : videoCoverCID,
                //address : videoCID,
                alt : title,
                "mime_type": "video/mp4",

            }
        ]
     }
     
 }

 return {
    postVideo
 }

}