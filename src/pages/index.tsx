import React from "react";

import { CharacterAvatar, useWeb2Url } from "@crossbell/ui";
import { useConnectedAccount, ConnectButton } from "@crossbell/connect-kit";
import { extractCharacterName } from "@crossbell/util-metadata";
import { Verified } from "@/Icons";
import IconsAll from "@/components/IconsAll";

export default function IndexPage() {
  return (
    <div>
      hllow  world
      <Verified  fill="none" color="red" />
      <IconsAll  />
    </div>
  );
}



