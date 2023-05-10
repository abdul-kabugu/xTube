import axios from "axios";
import  {useQuery} from "@tanstack/react-query"
 export const useGetChannelData = (channelId) =>  {
     const BASE_URL = `https://indexer.crossbell.io/v1/characters/${channelId}`
     const fetchChannelData = () =>  {
        return axios.get(BASE_URL)
     }
     const {isLoading, isFetching, error, isError, data} = useQuery(["channel-data"], fetchChannelData)
  return{
    data, isLoading, isFetching, error, isError
  }
 }