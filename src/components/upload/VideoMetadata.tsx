//@ts-nocheck 

import {useRef, useState, useEffect} from 'react'
import { Contract } from 'crossbell.js'
import { AddImageOutline } from '@/Icons'
import {generateVideoThumbnailViaUrl, generateVideoThumbnails, importFileandPreview} from '@rajesh896/video-thumbnails-generator'
//const contract = new Contract(window.ethereum)
import { AiOutlineClose } from 'react-icons/ai'
import { LIVEPEER_KEY } from '@/constants'
import { usePostVideo } from '@/hooks/usePostVideo'
import { usePinToIpfs } from '@/hooks'
import { useCreateAsset } from '@livepeer/react';
import {useContract} from '@crossbell/contract'
import { useAccountCharacter } from "@crossbell/connect-kit";
import { ClipLoader } from 'react-spinners'
console.log("the live peer key", LIVEPEER_KEY)
export default function VideoMetadata({videoFile, setVideoFile}) {
    const [videoTitle, setvideoTitle] = useState("")
    const [caption, setcaption] = useState("")
    const [videoTags, setVideoTags] = useState([])
    const [videoTag, setvideoTag] = useState("")
    const [isSenstive, setisSensitive] = useState("no")
    const [videoThumnail, setvideoThumnail] = useState()
    const [selectedThumbnail, setselectedThumbnail] = useState()
    const [pointedThumbail, setpointedThumbail] = useState()
    const [isGeneratingThumbnails, setisGeneratingThumbnails] = useState(true)
    const [videoThumbnails, setvideoThumbnails] = useState([])
    const [videoUrl, setvideoUrl] = useState("")
    const [isUploadingCover, setisUploadingCover] = useState(false)
    const [isVideoUploading, setisVideoUploading] = useState(false)
    const [isCreatingNote, setisCreatingNote] = useState(false)
    const [trueTest, settrueTest] = useState(true)
    const [isNotCreated, setisNotCreated] = useState(false)
    const [coverCID, setcoverCID] = useState()
    const {uploadToIpfs, isUploading, isUploadingError} = usePinToIpfs()
    const character = useAccountCharacter();

     console.log("The character", character)
   // const {postVideo} = usePostVideo()
     const selectThumbnailRef = useRef(null)
  // console.log("thumbnails ", videoThumbnails)
     //
     const addTag = (event) =>  {
        if(event.key === "Enter" && videoTag.length > 1 && videoTags.length < 5){
          setVideoTags([...videoTags, videoTag])
          setvideoTag("")
        }
     }

          //Remove  tag
   const removeTag = (index) => {
    setVideoTags([...videoTags.filter(tags => videoTags.indexOf(tags) !== index)])
   }

   /*
   =========================
   UPLOD VIDEO THUMBNAIL
   ==========================
   */
    const handleUploadThumbnail = async () => {
          if(selectedThumbnail || videoThumbnails){
     const base64ToBlob = (base64String, type) => {
  try {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: type });
  } catch (error) {
    if (error.name === 'InvalidCharacterError') {
      console.error('Invalid base64 string:', base64String);
      return null;
    } else {
      throw error;
    }
  }
}

        // UPLOAD_VIDEO_COVER_TO_IPFS
    
    setisUploadingCover(true)
        const jpegBlob = base64ToBlob(selectedThumbnail?.replace(/^data:image\/(png|jpeg|jpg);base64,/, '') || videoThumbnails[0]?.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''), 'image/png')
        const videoCoverCID = await uploadToIpfs(jpegBlob)
        console.log("the image cid", videoCoverCID)
        setcoverCID(videoCoverCID?.path)
        setisUploadingCover(false)   
    }}

    useEffect(() => {
      handleUploadThumbnail()
    
    }, [selectedThumbnail, videoThumbnails])

    /* 
    ===============================
        END OF UPLOAD THUMBNAIL 
    ================================
    */
    

     /*
     ===============================
       GENERATE VIDEO  THUMBNAILS
     ==============================
     
     */
    
   useEffect(() => {
    if(videoFile) {
     importFileandPreview(videoFile).then((res) => {
     setvideoUrl(res)
    })
    generateVideoThumbnails(videoFile, 6).then((res) =>  {
      setvideoThumbnails(res)
      setisGeneratingThumbnails(false)
      //setvidThunbnail(videoThumbnails[0])
    }).catch((error) => {
     alert(error)
    })
    }
  }, [videoFile])

  /*
     ===========================================
      END OF  GENERATE VIDEO  THUMBNAILS
     ========================================
     
     */

     /*
     ===============================
       RESET FORM FUNCTION
     ==============================
     
     */
 
    const handleReset = () =>  {
         setvideoTitle("")
         setcaption("")
         setVideoTags([])
         setVideoFile()
         setselectedThumbnail()
         
    }

    /*
     ===============================
       END OF RESET FUNCTION
     ==============================
     
     */

     /*
     ==================================
       LIVEPEER HOOK TO UPLOAD FILE
     ====================================
     
     */
    const {
      mutate: createAsset,
      data: assets,
      status,
      progress,
      error,
      isLoading

    } = useCreateAsset(
      videoFile
        ? {
            sources: [
              {
                name: videoFile.name,
                file: videoFile,
                storage: {
                  ipfs: true,
                  metadata: {
                    name: 'interesting video',
                    description: 'a great description of the video',
                  },
                },
              },
            ] as const,
          }
        : null,
    );
    console.log("the progress of video", isLoading)
    console.log("the assets itsell", assets)
/*
     ===========================================
       END OF LIVEPEER HOOK TO UPLOAD FILE
     ===========================================
     
     */
    /*
     ===============================
       CROSSBELL CONTRACT INSTACNCE
     ==============================
     
     */
      const contract = useContract()
       /*
     ======================================
      END OF CROSSBELL CONTRACT INSTANCE
     ======================================
     
     */
        
        

      
      /*
     ===============================
       UPLOAD VIDEO FUNCTION
     ==============================
     */
      const postVideo = async () =>  {
          //UPLOAD_VIDEO_TO_LIVEPEER
      setisVideoUploading(true)
        await createAsset()
        setisVideoUploading(false)
       }
        /*
     ===============================
       END UPLOAD VIDEO FUNCTION
     ==============================
     */
        /*
     ======================================
       POST_VIDEO AS NOTE TO CROSSBELL
     =======================================
     */ 
       const handleCreateNote = async () =>  {
        
          setisCreatingNote(true)
           const result = await contract.postNote(
            character?.characterId, 
            {
              title : videoTitle,
              content : caption,
              tags : videoTags,
              "sources": ["xTube_v1"],
              attachments : [
                  {
                      name : coverCID,
                      address : assets[0]?.playbackId                      ,
                      alt : videoTitle,
                      "mime_type": videoFile?.type,
      
                  }
              ]
            }

           )

           console.log("the note results", result)

          setisNotCreated(true)
           setisCreatingNote(false)
          }
          
       

        useEffect(() => {
          if(status === "success" && !isNotCreated ){
            handleCreateNote()
          }
        }, [status])
        
         /*
     ======================================
       END POST_VIDEO AS NOTE TO CROSSBELL
     =======================================
     */ 
    
          /*
     ======================================
       GET CURRENT  UPLOADING STATE
     =======================================
     */
       const getCurrentUploadingState = () =>  {
         if(status  === "loading"){
          return "Uploading Video"
         } else if(isCreatingNote) {
          return "Posting Video"
         } else {
          return "Post Video"
         }
       }

         /*
     ======================================
      END OF  GET CURRENT  UPLOADING STATE
     =======================================
     */

    
  return (
    <div className=' h-screen flex gap-3 items-center justify-center'>
      
         <div className='flex-1 h-full px-4 py-2'>
             <div className='flex flex-col gap-2 mb-3'>
                <h1 className='opacity-75 text-sm'>TITLE</h1>
                 <input   value={videoTitle}  onChange={e => setvideoTitle(e.target.value)} placeholder="Title that describes Your video"
                  className="py-2 px-4 focus:outline-none border dark:border-gray-700 rounded-lg border-gray-300 bg-inherit focus:border-blue-500"
                 />
             </div>
             <div className='flex flex-col gap-2 mb-3'>
                <h1 className='opacity-75 text-sm'>DESCRIPTION</h1>
                 <textarea   value={caption}  onChange={e => setcaption(e.target.value)} placeholder="Description of your video"
                   className="h-32 py-2 px-4 focus:outline-none border rounded-lg dark:border-gray-700 border-gray-300 bg-inherit focus:border-blue-500 resize-none"
                 />
             </div>
             <div className='border border-gray-300 dark:border-gray-700 rounded-lg h-32 px-4 py-2 my-3'>
                <h1 className='opacity-75 text-sm'>TAGS</h1>
                 <input   value={videoTag}  onChange={e => setvideoTag(e.target.value)} placeholder="Eg Music"
                  onKeyUp={event => addTag(event)}
                  className="focus:outline-none border border-gray-200 dark:border-gray-800 px-4 bg-inherit rounded-md py-1 w-full"
                 />
                 <div className='flex gap-2 mt-2 flex-wrap'>
                {videoTags?.map((tag, i) => (
                  <div className='flex bg-blue-600 opacity-70 py-1 px-4 rounded-md items-center text-white gap-2' key={i}>
                    <p>{tag}</p>
                     <AiOutlineClose  size={16} className="cursor-pointer" onClick={() => removeTag(i)} />
                  </div>
                ))}
              </div>
             </div>
              <div className='flex flex-col gap-3'>
                <h1 className='opacity-90'>Does this video contain sensitive information that targets an adult audience?</h1>
                 <div className='flex gap-4'>
                 <label className='flex items-center gap-2 cursor-pointer'>
  <input type="radio" name="isSensitive" value="yes" checked={isSenstive === "yes"} className="bg-inherit" onChange={() => setisSensitive("yes")} />
  Yes
</label>
<label className='flex items-center gap-2 cursor-pointer'>
  <input type="radio" name="isSensitive" value="no" className='bg-inherit' checked={isSenstive === "no"} onChange={() => setisSensitive("no")} />
  No
</label>
                 </div>
              </div>
         </div>
         <div className='flex-1  h-full  px-3'>
           <div className='z-0'>
           <video width={500} controls className='rounded-md' poster={selectedThumbnail} >
            <source src={URL.createObjectURL(videoFile)}/>
            </video>
          
           </div>

           <div className='my-4 '>
           <h1 className='opacity-75 text-sm my-3'>THUMBNAILS</h1>
             <div className='flex flex-wrap gap-3'>
                 <div className='w-[120px] h-[70px] border border-gray-300 flex flex-col items-center justify-center rounded-lg'>
                  <input type="file" accept='image/*'  onChange={e => setvideoThumnail(e.target.files[0])} ref={selectThumbnailRef} hidden />
                   {videoThumnail ?  (
                    <img  src={URL.createObjectURL(videoThumnail)} className="w-[100%] h-[100%] object-cover rounded-md"   />
                    
                   ) : (
                     <>
                    <AddImageOutline  className='w-5 h-5 cursor-pointer opacity-70' onClick={() => {selectThumbnailRef.current.click()}} />
                    <h1 className='text-xs opacity-60'>Upload</h1>
                     </>
                   )}
                   
                 </div>

                  {isGeneratingThumbnails && <h1>loading</h1>}
                   {videoThumbnails?.map((item, i) =>  {

                    return(
                       <div key={i} className={`w-[120px] h-[70px] cursor-pointer ${pointedThumbail === i && "ring-2 ring-blue-700 rounded-lg"} relative `} onClick={() =>  {
                         setselectedThumbnail(item)
                         setpointedThumbail(i)

                       }}>
                        <img   src={item} key={i} className="rounded-lg w-full h-full object-cover"    />
                         {/*<div>
                          <h1 className='absolute top-[50%] left-[50%] right-[50%]'>loading</h1>
                      </div>*/}
                       </div>
                    )
                   })}
             </div>
           </div>

            <div className='flex gap-4 justify-end my-4'>
                <button onClick={handleReset}>Reset</button>
                <div  className='bg-blue-700 text-white font-semibold px-4 py-1.5 xl:py-2 rounded-lg flex items-center gap-2 cursor-pointer' onClick={postVideo}>
                  <ClipLoader  size={15} loading={isLoading || isCreatingNote} />
                 <button className='bg-blue-700 text-white font-semibold   rounded-lg' >{getCurrentUploadingState()}</button>
                  </div>
            </div>
            
            
         </div>
    </div>
    
  )
}
