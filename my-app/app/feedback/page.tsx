"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import WalletConnect from "../components/wallet/WalletConnect";

const CONTRACT_ADDRESS = "0x4f55851D3f60d6070244c04e80187609d3616714";
const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "string", name: "message", type: "string" },
      { indexed: false, internalType: "uint256", name: "timestamp", type: "uint256" }
    ],
    name: "FeedbackSubmitted",
    type: "event"
  },
  {
    inputs: [{ internalType: "string", name: "_message", type: "string" }],
    name: "submitFeedback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "feedbacks",
    outputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "string", name: "message", type: "string" },
      { internalType: "uint256", name: "timestamp", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getFeedbacks",
    outputs: [
      {
        components: [
          { internalType: "address", name: "user", type: "address" },
          { internalType: "string", name: "message", type: "string" },
          { internalType: "uint256", name: "timestamp", type: "uint256" }
        ],
        internalType: "struct Feedback.FeedbackData[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

interface FeedbackData {
  user: string;
  message: string;
  timestamp: number;
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      fetchFeedbacks();
    }
  }, [isConnected]);

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

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>
      
      <div className="mb-4">
        <WalletConnect />
      </div>

      <textarea
        className="w-96 p-2 text-black rounded"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your feedback..."
        disabled={!isConnected}
      />
      
      <button
        onClick={submitFeedback}
        className="bg-green-500 p-2 rounded mt-2 disabled:bg-gray-500 disabled:cursor-not-allowed"
        disabled={!isConnected || !message.trim() || isLoading}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>

      <h3 className="text-lg font-bold mt-5">Feedbacks:</h3>
      <div className="mt-2 w-96">
        {feedbacks.map((fb, index) => (
          <div key={index} className="border-b border-gray-600 p-2">
            <p className="text-sm">{fb.message}</p>
            <p className="text-xs text-gray-400">From: {fb.user}</p>
          </div>
        ))}
      </div>
    </div>
  );
}