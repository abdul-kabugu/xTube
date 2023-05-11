import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type discoverTypes = {
  limit?: number;
  locked?: boolean;
  includeDeleted?: boolean;
  sources?: string;
  tags?: string[];
  includeCharacter?: boolean;
};
export const useDiscover = ({
  limit,
  locked,
  includeCharacter,
  includeDeleted,
  sources,
  tags,
}: discoverTypes) => {
  const BASE_URL = `https://indexer.crossbell.io/v1/notes?limit=${limit}&includeDeleted=${includeDeleted}&tags=${tags}&sources=xTube_v1&includeEmptyMetadata=false&includeCharacter=true&includeHeadCharacter=false&includeHeadNote=false&includeNestedNotes=false`;
  const fetchVideos = () => {
    return axios.get(BASE_URL);
  };

  const { isLoading, isFetching, error, isError, data } = useQuery(
    ["discover-videos"],
    fetchVideos
  );

  return {
    data,
    isLoading,
    isFetching,
    error,
    isError,
  };
};
