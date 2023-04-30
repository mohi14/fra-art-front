import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { Web3Provider } from "@ethersproject/providers";
import { getDefaultProvider } from "ethers";
import { AuthProvider } from "./context/authContext";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { InjectedConnector } from "wagmi/connectors/injected";

import "./i18n";
import {
  ReservoirKitProvider,
  darkTheme as reservoirDarkTheme,
  lightTheme as reservoirLightTheme,
  ReservoirKitTheme,
  CartProvider,
} from "@reservoir0x/reservoir-kit-ui";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import "./choices.min.css";
import "./assets/scss/style.scss";
import "react-input-range/lib/css/index.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import supportedChains from "../src/utils/chains";
import App from "./App";
import ChainContextProvider from "./context/ChainContextProvider";
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme as rainbowDarkTheme,
  lightTheme as rainbowLightTheme,
} from "@rainbow-me/rainbowkit";

let chainId = 5;
const reservoirKitThemeOverrides = {
  primaryColor: "#6E56CB",
  primaryHoverColor: "#644fc1",
};
function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}
const { chains, provider, webSocketProvider } = configureChains(
  supportedChains,
  [
    alchemyProvider({ apiKey: "hK1w_lNLh9MOTnr5iZm2K_vOT8ZNYeXM" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Reservoir Marketplace",
  chains,
});
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "144c623a861848f796ec67bbe424feb2",
        showQrModal: true,
      },
    }),
  ],
  provider,
});
let source = "https://marketplace.reservoir.tools";
let baseUrl = "https://www.reservoir.market";
ReactDOM.render(
  <React.StrictMode>
    <ReservoirKitProvider
      options={{
        //CONFIGURABLE: Override any configuration available in RK: https://docs.reservoir.tools/docs/reservoirkit-ui#configuring-reservoirkit-ui
        // Note that you should at the very least configure the source with your own domain
        chains: supportedChains.map(({ id, apiKey }) => {
          return {
            apiKey,
            id,
            baseApiUrl: "https://api-goerli.reservoir.tools",

            default: chainId === id,
          };
        }),
        source: "reservoir.tools",
      }}
      theme={reservoirLightTheme(reservoirKitThemeOverrides)}
    >
      <Web3ReactProvider getLibrary={getLibrary}>
        <WagmiConfig client={client}>
          <AuthProvider>
            <ChainContextProvider>
              <CartProvider>
                <RainbowKitProvider
                  chains={chains}
                  theme={rainbowLightTheme({
                    borderRadius: "small",
                  })}
                  modalSize="compact"
                >
                  <App />
                </RainbowKitProvider>
              </CartProvider>
            </ChainContextProvider>
          </AuthProvider>
        </WagmiConfig>
      </Web3ReactProvider>
    </ReservoirKitProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
