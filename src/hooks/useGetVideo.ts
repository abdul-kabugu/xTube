import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
type TgetVideo = {
    profileId : string,
    videoId : string | string[]
}

export const useGetVideo = ({profileId, videoId}: TgetVideo) =>  {
    const BASE_URL = `https://indexer.crossbell.io/v1/notes/${profileId}/${videoId}`
   const fetchVideo = async () =>  {
      return axios.get(BASE_URL)
    }
    const { data : videoData, error : videoDataError, isLoading : isVideoDataLoading, isError : isVideoDataError } =  useQuery(['video'], fetchVideo )

    return{
      videoData, isVideoDataError, isVideoDataLoading, videoDataError
    }
}