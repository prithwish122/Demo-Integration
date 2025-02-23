import { defineChain } from "viem";
import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

// Define Educhain
const educhain = defineChain({
  id: 656476,
  name: "Educhain",
  network: "educhain",
  nativeCurrency: {
    decimals: 18,
    name: "EduToken",
    symbol: "EDU",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.open-campus-codex.gelato.digital/"],
    },
  },
  
  blockExplorers: {
    default: { name: "OpenCampusCodex", url: "https://opencampus-codex.blockscout.com/" },
  },
  testnet: true, // Set to false if it's a mainnet deployment
});

export function getConfig() {
  return createConfig({
    chains: [educhain],
    connectors: [
      injected(),
      coinbaseWallet(),
      walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || "" }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [educhain.id]: http(),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
