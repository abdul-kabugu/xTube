import "./globals.css";

import type { AppProps } from "next/app";
import React from "react";
import { WagmiConfig, createClient } from "wagmi";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { IpfsGatewayContext } from "@crossbell/ipfs-react";
import { NotificationModal } from "@crossbell/notification";
import {
  ConnectKitProvider,
  getDefaultClientConfig,
} from "@crossbell/connect-kit";

import { ipfsGateway, ipfsLinkToHttpLink } from "@/ipfs";
import Layout from "@/components/Layout";

const wagmiClient = createClient(
  getDefaultClientConfig({ appName: "Crossbell App" })
);

export type CommonPageProps<T = unknown> = T & {
  dehydratedState: DehydratedState;
};

// <Hydrate state={pageProps.dehydratedState}>
// <IpfsGatewayContext.Provider value={ipfsGateway}>
//<ConnectKitProvider ipfsLinkToHttpLink={ipfsLinkToHttpLin

const queryClient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
 // const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider  client={queryClient} >
      <Hydrate state={pageProps.dehydratedState}>

        <WagmiConfig client={wagmiClient}>
     
         <ConnectKitProvider>
              <Layout>
                <NotificationModal />
              <Component {...pageProps} />
              </Layout>
              </ConnectKitProvider>
         
        </WagmiConfig>
      </Hydrate>
    </QueryClientProvider>
  );
}
