***WELCOME TO OUR FEEDBACK APP***

*HERE ARE SOME STEP BY STEP (BEGINNER LEVEL) GUIDE :*


**TWO IMMPORTANT STUFFS YOUR MUST HAVE FROM REMIX IDE**
```js
const CONTRACT_ADDRESS = "0x4f55851D3f60d6070244c04e80187609d3616714";
const CONTRACT_ABI = [];
```
------

**FETCH FEEDBACK**
```js
 const fetchFeedbacks = async () => {
    if (!window.ethereum) return;
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const data = await contract.getFeedbacks();
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };
  ```

  ---------

**SUBMIT FEEDBACK**
  ```js
  const submitFeedback = async () => {
    if (!window.ethereum || !message.trim() || !isConnected) return;
    
    try {
      setIsLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.submitFeedback(message);
      await tx.wait();
      
      setMessage("");
      await fetchFeedbacks();
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };
  ```
--------

**CONNECT WALLET**
  ```js
  import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Connector } from 'wagmi'

const WalletConnect = () => {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  // Filter out to only use MetaMask connector
  const metamaskConnector = connectors.find((connector: Connector) => connector.name === 'MetaMask')

  return(
  //Customize your connect button
  )
  };

  ```

  This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.