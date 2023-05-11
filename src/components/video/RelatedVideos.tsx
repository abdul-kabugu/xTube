// @ts-nocheck
import { useDiscover } from "@/hooks";
import { useState } from "react";
import RelatedVideoCard from "../cards/RelatedVideoCard";
export default function RelatedVideos() {
  const [testTruth, settestTruth] = useState(true);
  const { data, isLoading, isFetching, error, isError } = useDiscover({
    limit: 20,
    locked: false,
    includeCharacter: true,
    includeDeleted: false,
    tags: [],
  });
  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  console.log("the data", data);

  if (isLoading) {
    return <div className="">loading</div>;
  }
  return (
    <div className="xs:hidden xl:flex flex-col ">
      {data?.data?.list.map((item, i) => {
        return <RelatedVideoCard key={i} video={item} />;
      })}
    </div>
  );
}
