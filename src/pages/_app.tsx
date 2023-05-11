import "./globals.css";

import type { AppProps } from "next/app";
import React from "react";
import { WagmiConfig, createClient } from "wagmi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  getDefaultClientConfig({ appName: "xTube App" })
);

export type CommonPageProps<T = unknown> = T & {
  dehydratedState: DehydratedState;
};

// <Hydrate state={pageProps.dehydratedState}>
// <IpfsGatewayContext.Provider value={ipfsGateway}>
//<ConnectKitProvider ipfsLinkToHttpLink={ipfsLinkToHttpLin

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  // const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <WagmiConfig client={wagmiClient}>
          <ConnectKitProvider>
            <Layout>
              <NotificationModal />
              <Component {...pageProps} />
              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </Layout>
          </ConnectKitProvider>
        </WagmiConfig>
      </Hydrate>
    </QueryClientProvider>
  );
}
