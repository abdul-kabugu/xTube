import React from "react";

import { CharacterAvatar, useWeb2Url } from "@crossbell/ui";
import { useConnectedAccount, ConnectButton } from "@crossbell/connect-kit";
import { extractCharacterName } from "@crossbell/util-metadata";
import { Verified } from "@/Icons";
import IconsAll from "@/components/IconsAll";
import { Home } from "@/components/home";

export default function IndexPage() {
  return (
    <div className="">
      <Home />
    
    </div>
  );
}
