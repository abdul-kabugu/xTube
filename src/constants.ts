import {TfiVideoClapper} from 'react-icons/tfi'
import { Verified, UploadOutline,BellOutline,ChannelOutline, ChevronLeftOutline, ChevronRightOutline,
  FeedOutline,HomeOutline,ExploreOutline, AddImageOutline, CollectOutline, CopyOutline, DisconnectOutline,
  LikeOutline, DislikeOutline, CommentOutline,EmojiOutline, ExternalOutline, FireOutline,GlobeOutline, Discover, YppOutline} from "./Icons"
export const profileMenuLinks = [
  {
    title : "Your channel",
    icon : ChannelOutline,
    to : "/channel"
  },

  
]

 export const sidebarMenu = [
  {
    title : "Home",
    icon : HomeOutline,
    to : "/"
  },
  {
    title : "Feed",
    icon : FeedOutline,
    to : "/Subscriptions"
  },
  {
    title : "Popular",
    icon : FireOutline,
    to : "/trending"
  },

  {
    title : "Discover",
    icon : Discover,
    to : "/trending"
  },

  {
    title : "Ypp",
    icon : YppOutline,
    to : "/ypp"
  },

 ]

 export const LIVEPEER_KEY = process.env.NEXT_PUBLIC_LIVEPEER_API_KEY
 export const PINATA_PROJECT_ID = process.env.NEXT_PUBLIC_PINATA_PROJECT_ID
 export const PINATA_APP_SECRET = process.env.NEXT_PUBLIC_PINATA_APP_SECRET
 export  const IPFS_GATEWAY = "https://gateway.ipfscdn.io/ipfs/"


 