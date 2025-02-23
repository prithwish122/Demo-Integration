import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Connector } from 'wagmi'

const WalletConnect = () => {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  // Filter out to only use MetaMask connector
  const metamaskConnector = connectors.find((connector: Connector) => connector.name === 'MetaMask')

  return (
    <div className="flex flex-col items-center gap-4">
      {account.status === 'connected' ? (
        <>
          <div className="text-lg font-semibold">Connected Account</div>
          <div className="text-sm text-gray-400">{account.addresses[0]}</div>
          <div className="text-sm text-gray-500">Chain ID: {account.chainId}</div>
          <button
            onClick={() => disconnect()}
            className="mt-4 px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-200"
          >
            Disconnect
          </button>
        </>
      ) : (
        <>
          <div className="text-lg font-semibold">Connect your Wallet</div>
          <button
            onClick={() => metamaskConnector && connect({ connector: metamaskConnector })}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Connect MetaMask
          </button>
          {status && <div className="text-sm mt-2">{status}</div>}
          {error?.message && <div className="text-sm text-red-500">{error.message}</div>}
        </>
      )}
    </div>
  )
}

export default WalletConnect