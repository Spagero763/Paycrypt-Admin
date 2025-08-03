import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseAbi } from "viem"

// Replace with your actual contract address
export const CONTRACT_ADDRESS = "0xYourContractAddressHere" // Example: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'

// Full ABI for a hypothetical ERC20-like contract with some common functions
export const CONTRACT_ABI = parseAbi([
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
  // Add more functions and events as per your specific contract
  "function mint(address to, uint256 amount) returns (bool)",
  "function burn(uint256 amount) returns (bool)",
  "function owner() view returns (address)",
  "function renounceOwnership()",
  "function transferOwnership(address newOwner)",
])

// Custom hook to read contract data
export function useContractRead(functionName: string, args?: any[]) {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: functionName,
    args: args,
  })
}

// Custom hook to write to contract
export function useContractWrite(functionName: string) {
  const { data: hash, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  return { writeContract, hash, isConfirming, isConfirmed }
}
