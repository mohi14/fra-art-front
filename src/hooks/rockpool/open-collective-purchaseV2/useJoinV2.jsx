import { ethers } from 'ethers'
import { usePrepareContractWrite, useSendTransaction } from 'wagmi'
import { chainConfig } from '../../ChainConfig'
import perpetualOpenCollectivePurchaseV2Abi from './perpetualOpenCollectivePurchaseV2Abi'

const useJoinV2 = (
  collection,
  paymentToken,
  amount,
  maxReservePrice,
  referralId,
  chainId,
  creatorAddress
) => {
  const { products, nativeToken } = chainConfig(chainId)
  let perpetualJoinOptions
  if (paymentToken === ethers.constants.AddressZero) {
    perpetualJoinOptions = { value: amount }
  } else {
    perpetualJoinOptions = { value: 0 }
  }

  const referralIdBytes32 = ethers.utils.hexZeroPad(ethers.utils.hexlify(referralId), 32)

  const { config } = usePrepareContractWrite({
    address: products.buyFloor.contract.perpetualOpenCollectivePurchaseV2,
    abi: perpetualOpenCollectivePurchaseV2Abi,
    functionName: 'perpetualJoin',
    args: [
      creatorAddress?.length ? creatorAddress : nativeToken.address,
      collection,
      paymentToken,
      amount,
      maxReservePrice,
      referralIdBytes32,
      perpetualJoinOptions
    ]
  })
  const { sendTransaction, isSuccess, data, isLoading } = useSendTransaction(config)

  const join = async () => {
    if (sendTransaction) {
      await sendTransaction()
    }
  }

  return {
    join,
    isLoading: isLoading
  }
}

export default useJoinV2
