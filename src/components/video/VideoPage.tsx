// @ts-nocheck
import { useGetVideo } from '@/hooks'
import {useState, useEffect, Fragment} from 'react'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import { IPFS_GATEWAY, tipsTires } from '@/constants'
import { Player } from '@livepeer/react'
import { useAccountCharacter, useFollowCharacter, useIsNoteLiked, useMintNote, useNoteLikeCount, useToggleLikeNote, useUnfollowCharacter } from '@crossbell/connect-kit'
import { Indexer } from 'crossbell.js'
import moment from 'moment'
import { BulbOutline, CollectOutline, LikeOutline } from '@/Icons'
import { AiOutlineBulb, AiOutlineClose, AiOutlineDollar, AiOutlineHeart, AiOutlineLike } from 'react-icons/ai'
import { TbShare2, TbShare3 } from 'react-icons/tb'
import { Transition, Dialog } from '@headlessui/react'
import { CharacterAvatar } from '@crossbell/ui'
import useTruncateText from '@/hooks/useTruncateText'
import { useAccountBalance } from '@crossbell/connect-kit'
import {useContract} from '@crossbell/contract'
import ShareButtons from './ShareButtons'
import { useCharacterFollowRelation, useCharacterFollowStats, useNoteStatus } from '@crossbell/indexer'
import { toast } from 'react-toastify'
import Link from 'next/link'
import Comments from './Comments'
import RelatedVideoCrad from '../cards/RelatedVideoCard'
import RelatedVideos from './RelatedVideos'

 type TvideoPage = {
    post : {}
    profileId : string
    videoId : string | string[]
 }
export default function VideoPage({post, videoId, profileId}:TvideoPage) {
    const indexer = new Indexer()
      const [totalMints, settotalMints] = useState()
      const [isTipModal, setisTipModal] = useState(false)
      const [pointedAmount, setPointedAmount] = useState(0)
      const [selectedAmount, setselectedAmount] = useState(1)
      const [isShareModal, setisShareModal] = useState(false)
      const [isVideoMinted, setisVideoMinted] = useState(false)
      const [isVideoLiked, setisVideoLiked] = useState(false)
      const [likeStatus, setlikeStatus] = useState()
      const { shortenTxt} = useTruncateText()
      const balance = useAccountBalance()
      const contract = useContract()
      const character = useAccountCharacter()
      const {data:status, isError : isStatusError, error: statusError} = useNoteStatus(profileId, videoId)
       const {data:relationStatus} = useCharacterFollowRelation(character?.characterId, Number(profileId) )
      console.log("user character", relationStatus)
    const BASE_URL = `https://indexer.crossbell.io/v1/notes/${profileId}/${videoId}`
    const fetchVideo = async () =>  {
       return axios.get(BASE_URL)
     }
     const { data : videoData, error : videoDataError, isLoading : isVideoDataLoading, isError : isVideoDataError } =  useQuery(['video'], fetchVideo )

 console.log("the post from it's page", videoData)

  /*   
 =============================
 Get creator followers
 ==========================
 */
 const {data:profileStats} = useCharacterFollowStats(profileId)
 /*=============================
 Get like status
 ===========================
*/

   const [{isLiked}] = useIsNoteLiked(profileId, videoId)
   console.log("lakes", isLiked)
/*   
 =============================
 Get video comments
 ===================
*/

const COMMENTS_BASE_URL = `https://indexer.crossbell.io/v1/notes?limit=20&toCharacterId=${profileId}&toNoteId=${videoId}&includeDeleted=false&includeEmptyMetadata=false&includeCharacter=true&includeHeadCharacter=false&includeHeadNote=false&includeNestedNotes=true`
 const fetchvideoComments = async () =>  {
   return axios.get(COMMENTS_BASE_URL)
 }
 const {data : videoComments, isLoading : isVideoCommentsLoading, isError : isVideoCommentsError, error: videoCommentsError} = useQuery(['comments-data'], fetchvideoComments)
  console.log("video comments", videoComments)
/*   
 =============================
 Get Creator profile
 =========================
 */
 const PROFILE_BASE_URL = `https://indexer.crossbell.io/v1/characters/${profileId}`
 const fetchProfileData = async () =>  {
   return axios.get(PROFILE_BASE_URL)
 }
 const {data : profileData, isLoading : isProfileDataLoading, isError : isProfileDataError, error: profileDataError} = useQuery(['profile-data'], fetchProfileData)

       /*   
 =============================
 Tip Charactors
 =========================
 */
 const handleTip = async (tip, i) =>  {
  const amount = selectedAmount * 10 ** 18
  setselectedAmount(tip.amount)
  setPointedAmount(i)
  try{
    const result = contract.tipCharacter(character?.characterId, profileData?.data.characterId, amount.toString())
  } catch (error){
     alert(`something went wrong ${error}`)
  }
 }

  /*   
 =============================
 handle mint video
 =========================
 */
  const mintNote = useMintNote()
   const handleMint = async () =>  {
     try {
      
      const { data } = await contract.mintNote(
        profileId,
        videoId, // noteId
        character?.owner // toAddress
      )
      setisVideoMinted(true)
      toast.success("Video minted succefully")
     } catch(error) {
      toast.error("Someting went wrong")
     }
   }

    /*   
 =============================
 Handle like video
 ===========================
*/

 const handleLikeVideo = async () =>  {
  try{
    const { data } = await contract.linkNote(character?.characterId, profileId, videoId, 'like')
    setisVideoLiked(true)
    toast.success("Liked video")
  }catch(error) {
    toast.error("Something went wrong")
  }
 }
  /*   
 =============================
 Video uploaded time 
 =========================
 */
 const [currentTime, setCurrentTime] = useState(new Date());
 const currentDate = new Date();
 const videoCreatedAt = new Date(videoData?.data?.createdAt);
 const diffInMilliseconds = currentDate - videoCreatedAt;
 const diffInHours = diffInMilliseconds / (60 * 60 * 1000);
const duration = moment.duration(diffInHours, 'hours');
console.log("profile data", profileData)
  console.log("orofile error", )

       /*   
 =============================
 Subscribe to cahnnel
 =========================
 */
const follow = useFollowCharacter()
 const handleSubscribe = async () =>  {
  try{
  const { data } = await contract.linkCharacter(character?.characterId, profileId, 'follow')
  toast.success(`Subscribed to ${profileData?.data.handle}`)
  } catch (error){
    toast.error(`${error}`)
  }
 }
  const PosterImage = () =>  {

    return(
        <Image 
            src={`${IPFS_GATEWAY}/${videoData?.data.metadata.content.attachments[0].name}`}
            width={1400}
            height={600}
            
            alt='video Poster'
        />
    )
  }

      /*   
 =============================
 Tip user modal
 =========================
 */
 const toggleShowTipModal = () =>  {
    isTipModal ? setisTipModal(false) : setisTipModal(true)
 }

  const TipUser = () =>  {
    return(
      <Transition appear show={isTipModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={toggleShowTipModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-4 text-left align-middle shadow-xl  transition-all">
                <Dialog.Title
                  className="text-lg font-medium leading-6 "
                >
                 <div className='flex justify-between'>
                  <div className='flex gap-2'>
                    <AiOutlineHeart className='w-6 h-6' />
                     <h1>Tip {profileData?.data.handle}</h1>
                    </div>
                     <AiOutlineClose onClick={toggleShowTipModal} className='opacity-75 cursor-pointer'  />
                      
                 </div>
                 <div className='flex items-center justify-center flex-col '>
                      <CharacterAvatar  character={profileData?.data } size={60} className='xl:w-[200px]' /> 
                       {profileData?.data.metadata.content.bio && <p className='text-sm'>{ shortenTxt(profileData?.data.metadata.content.bio, 20) }</p>}
                      </div>
                </Dialog.Title>
                <div className="mt-4">
                  <div className='flex items-center justify-center'>
                     <h1 className='text-lg font-medium leading-6'>Select tier</h1>
                  </div>

                   <div className='flex gap-3 flex-wrap items-center justify-center mt-3'>
                     {tipsTires.map((tip, i) =>  {

                      return(
                        <div key={i} className={`${pointedAmount  === i && "border-blue-600"} flex gap-2 border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg cursor-pointer`}
                        onClick={() => handleTip(tip, i)}>
                          <p>{tip.emoji}</p>
                           <p>{tip.title}</p>
                        </div>
                      )
                     })}
                   </div>
                    <div className='flex gap-2 items-center justify-center my-3'>
                    <AiOutlineBulb className='text-gray-500' />
                     <a href='https://mira.crossbell.io/' target="_blank" rel="noopener noreferrer" className='outline-none font-medium text-gray-500'>What is MIRA? where I can get some?</a>
                     </div>
                     
                </div>

              
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
    )
  }

   
      /*   
 =============================
 Share modal
 =========================
 */
 const toggleShareModal = () =>  {
  isShareModal ? setisShareModal(false) : setisShareModal(true)
}

const ShareModal = () =>  {
  return(
    <Transition appear show={isShareModal} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={toggleShareModal}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-2 text-left align-middle shadow-xl  transition-all">
              <Dialog.Title
                className="text-lg font-medium leading-6 "
              >
              <h1 className='opacity-70'>SHARE</h1> 
              </Dialog.Title>
              <div className="mt-3">
                
                <ShareButtons postId={`${profileId}-${videoId}`} />
                   
              </div>

            
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
  )
}
  return (
    <div className='flex gap-2'>
      <div className='w-full xl:w-[73vw]'>
         <div className='xl:w-[73vw]'>
        <Player
           loop
           playbackId={videoData?.data.metadata.content.attachments[0].address}
             poster={<PosterImage />}
          />
         </div>

          <div className='xl:w-[73vw] px-3 '>
            { videoData?.data.metadata.content.title ?(
             <h1 className='text-2xl font-semibold opacity-90 '>{videoData?.data.metadata.content.title }</h1>) : (
                <h1>Video By {profileData?.data.handle}</h1>
             )
            }
            <div className='flex justify-between xs:flex-col md:flex-row'>
             <div className='flex gap-4'>
               <p className=' font-semibold opacity-70'>0 Views</p>
                 <p className=' font-semibold opacity-70'>{status?.mintCount} Mints</p>
         <p className=' font-semibold opacity-70'>Uploaded {duration.humanize().replace("a ", "")} ago</p>
             </div>
              <div className='flex gap-3 items-center '>
                  <div className={`flex gap-2 border hover:bg-gray-200 py-0.5 px-1 items-center rounded-md cursor-pointer ${isLiked|| isVideoLiked  ? "text-blue-600" : "text-gray-900 dark:text-white"} `} onClick={handleLikeVideo}>
                     <p className='text-lg'>{likeStatus?.count}</p>
                      <LikeOutline className='xs:w-4 xs:h-4 md:w-5 md:h-5' />
                      </div>
                  <div className={`flex gap-2 hover:bg-gray-200 py-0.5 px-1 items-center rounded-md cursor-pointer ${status?.isMinted || isVideoMinted ? "text-blue-600" : "text-gray-900 dark:text-white"}`} onClick={handleMint}>
                    <p>{status?.mintCount}</p>
                  <CollectOutline className=' xs:w-4 xs:h-4 md:w-5 md:h-5'   />
                  </div>
                  <div>
                    <AiOutlineDollar className='xs:w-5 xs:h-5 md:w-6 md:h-6 cursor-pointer' onClick={toggleShowTipModal} />
                  </div>
                  <TbShare3 className=' xs:w-5 xs:h-5 md:w-6 md:h-6 cursor-pointer' onClick={toggleShareModal} />
              </div>
              
</div>
<div className='flex justify-between items-center mt-3'>
 <div className='flex gap-3'>
 <CharacterAvatar  character={profileData?.data } size={60} className='xl:w-[200px]' /> 
  <div>
  <Link href={`/channel/${profileData?.data.characterId}`} className='opacity-90'>{profileData?.data.handle}</Link>
  <p className='text-xs opacity-80'>Subscribers {profileStats?.followersCount}</p>
  </div>
 </div>
<button className='bg-blue-600 py-2 px-4 rounded-lg text-white' disabled={relationStatus?.isFollowed} onClick={handleSubscribe}>{relationStatus?.isFollowed ? "Subscribed" : "Subscribe"}</button>
  </div>
 {/*DISPLAY MODALS */}
  {isTipModal  && <TipUser />}
  {isShareModal && <ShareModal />}
   <Comments  profileId = {profileId} videoId = {videoId} comments = {videoComments?.data} />
</div>
</div>
<RelatedVideos  />
    </div>
  )
}
