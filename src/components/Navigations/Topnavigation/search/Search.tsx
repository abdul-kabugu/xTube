/* eslint-disable prettier/prettier */
// @ts-nocheck

import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import {useQuery} from "@tanstack/react-query"
import axios from "axios";
import VideoResults from "./VideoResults";
import ChannelResults from "./ChannelResults";
import { AiOutlineUser, AiOutlineVideoCamera } from "react-icons/ai";
import { TbBadge } from "react-icons/tb";
import { CollectOutline } from "@/Icons";
export default function Search() {
  const [searchQuery, setsearchQuery] = useState("");
 const [searchTab, setSearchTab] = useState("VIDEOS")

  
 const handleFetch = async () => {
  const BASE_SOURCES = "xTube_v1"
  const BASE_URL = `https://indexer.crossbell.io/v1/notes/search?limit=20&q=${searchQuery}&sources=${BASE_SOURCES}&includeCharacterMetadata=false`
 return axios.get(BASE_URL)
 }
 const {
 data: videos, isLoading: isVideosLoading, isError : isVideosError, refetch :reSearchVideos, isRefetching:isVideosRefetching
 } = useQuery(
  ["video-search"],
   handleFetch, {
  enabled : false
 })
 // FETCH CHANNELS
 const handleFetchChannels = async () => {
  const BASE_SOURCES = "xTube_v1"
  const BASE_URL = `https://indexer.crossbell.io/v1/characters/search?limit=20&q=${searchQuery}`
 return axios.get(BASE_URL)
 }
 const {
 data: channels, isLoading: isChannelsLoading, isError : isChannelsError, refetch :reSearchChannels, isRefetching:isChannelsRefeteching
 } = useQuery(
  ["channels-search"],
   handleFetchChannels, {
  enabled : false
 })
  const fetchQueries = async () =>  {
    if(searchTab === "VIDEOS" && searchQuery.length > 1){
       reSearchVideos()
    }else if(searchTab === "CHANNELS" && searchQuery.length > 1){
      reSearchChannels()
    }
  }
  useEffect(() => {
    fetchQueries()
  }, [searchQuery])
  console.log("videos from search", channels)

   const getCurrentTab = () =>  {
    if(searchTab === "VIDEOS"){
      return(
        <VideoResults videos = {videos} isVidesLoading = {isVideosLoading} isVideosError = {isVideosError} isVideosRefetching ={isVideosRefetching} />
      )
    }else if(searchTab  === "CHANNELS"){
      return(
         <ChannelResults channels = {channels} isChannelsLoading = {isChannelsLoading} isChannelsError = {isChannelsError} isChannelsRefeteching = {isChannelsRefeteching}/>
      )
    }
   }
  return (
    <div className="relative">
    <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2  xl:w-[350px] xs:hidden md:flex ">
      <input
        value={searchQuery}
        onChange={(e) => setsearchQuery(e.target.value)}
        placeholder="Search By channel/Hashtag"
        className="w-[300px] focus:outline-none bg-inherit"
      />
      <CiSearch className="w-5 h-5 cursor-pointer" />
    </div>
    {searchQuery.length > 0 &&
    <div className="absolute bg-white dark:bg-gray-800 shadow-lg rounded-md w-[400px]">
    <div className=" my-4 flex px-3 justify-between">
        <div
          className={`${
            searchTab === "VIDEOS" && "bg-gray-300 dark:bg-gray-700"
          }  flex gap-2 w-[110px] px-2 py-1 rounded-xl items-center justify-center cursor-pointer `}
          onClick={() => setSearchTab("VIDEOS")}
        >
          <AiOutlineVideoCamera className="w-4 h-4" />
          <button className={``}>Videos</button>
        </div>
        
        <div
          className={`${
            searchTab === "CHANNELS" && "bg-gray-300 dark:bg-gray-700"
          }  flex gap-2 w-[110px] px-2 py-1 rounded-xl items-center justify-center cursor-pointer`}
          onClick={() => setSearchTab("CHANNELS")}
        >
          <AiOutlineUser className="w-4 h-4" />
          <button className={``}>Channels</button>
        </div>
      </div>
      <div> 
        {getCurrentTab()}
      </div>
    </div>
}
    </div>
  );
}
