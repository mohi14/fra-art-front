import { usePrepareContractWrite, useSendTransaction } from 'wagmi'
import { chainConfig } from '../../ChainConfig'
import perpetualOpenCollectivePurchaseV2Abi from './perpetualOpenCollectivePurchaseV2Abi'
const useFloorClaimFractions = (chainId, listingId, buyer) => {
  const { products } = chainConfig(chainId)

  const { config } = usePrepareContractWrite({
    address: products.buyFloor.contract.perpetualOpenCollectivePurchaseV2,
    abi: perpetualOpenCollectivePurchaseV2Abi,
    functionName: 'claim',
    args: [listingId, buyer]
  })
  const { sendTransaction, isSuccess, data, isLoading } = useSendTransaction(config)

  const claim = async () => {
    if (sendTransaction) {
      await sendTransaction()
    }
  }

  return {
    claim,
    isLoading: isLoading,
    isSuccess
  }
}

export default useFloorClaimFractions
