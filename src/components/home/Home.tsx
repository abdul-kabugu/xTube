import { useState } from "react";
import { VideoCardSpinner } from "../spinners";
import { useDiscover } from "@/hooks";
import { IPFS_GATEWAY } from "@/constants";
import { VideoCard } from "../cards";
import { useWeb2Url } from "@crossbell/ui";
import { QueryError } from "../ErrorPages";

export default function Home() {
  const [testTruth, settestTruth] = useState(true);
  const { data, isLoading, isFetching, error, isError } = useDiscover({
    limit: 20,
    locked: false,
    includeCharacter: true,
    includeDeleted: false,
    tags: [],
  });
  if (isError) {
    return <QueryError />;
  }

  if (isLoading) {
    return (
      <div className="">
        <VideoCardSpinner />
      </div>
    );
  }
  return (
    <div className="flex gap-2 flex-wrap px-1 ">
      {data?.data?.list?.map((item: any, i: any) => {
        return <VideoCard key={i} post={item} />;
      })}
    </div>
  );
}
