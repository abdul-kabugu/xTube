// @ts-nocheck

import { CopyOutline } from '@/Icons';
import {useState} from 'react'
import { FacebookIcon, FacebookShareButton, InstapaperShareButton, LinkedinIcon, LinkedinShareButton, PinterestIcon, PinterestShareButton, RedditIcon, RedditShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'
import { toast, ToastContainer } from 'react-toastify';
export default function ShareButtons({postId}) {
    const [isUrlCopied, setisUrlCopied] = useState(false)
    const url = `https://frentube.xyz/watch/${postId}`


      // handle copy url
      const copyToClipboard = async (text) => {
        try {
          await navigator.clipboard.writeText(text);
          setisUrlCopied(true);
          toast.success("link copied to clipboard")
          setTimeout(() => {
            setisUrlCopied(false);
          }, 2000);
        } catch (err) {
          alert('Failed to copy: ', err);
        }
      }
  return (
    <div>
      <div className='flex gap-2'>
      <TwitterShareButton url={url} >
           <TwitterIcon  size={35} round={true} />
         </TwitterShareButton>
           <FacebookShareButton url={url}>
             <FacebookIcon  size={35} round={true} />
           </FacebookShareButton>
            <LinkedinShareButton url={url}>
              <LinkedinIcon   size={35} round={true} />
            </LinkedinShareButton>
              <PinterestShareButton url={url}>
                   <PinterestIcon  size={35} round={true}   />
              </PinterestShareButton>
              <RedditShareButton url={url}>
                <RedditIcon  size={35} round={true} />
              </RedditShareButton>
               <TelegramShareButton url={url}>
                 <TelegramIcon  size={35} round={true} />
               </TelegramShareButton>

               <WhatsappShareButton url={url}>
                 <WhatsappIcon   size={35} round={true}  />
               </WhatsappShareButton>
                
      </div>

       <div className='py-1 px-2 rounded-lg border border-gray-200 dark:border-gray-700 mt-3 flex  justify-between items-center'>
        <p className='text-sm'>{url}</p>
         <CopyOutline onClick={() => copyToClipboard(url)} className='w-4 h-4 cursor-pointer' />
       </div>
    </div>
  )
}
