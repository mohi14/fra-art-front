import { usePrepareContractWrite, useSendTransaction } from 'wagmi'
import { chainConfig } from '../../ChainConfig'
import perpetualOpenCollectivePurchaseV2Abi from './perpetualOpenCollectivePurchaseV2Abi'

const useLeaveV2 = (collection: string, paymentToken: string, chainId: number, creatorAddress: string) => {
  const { products } = chainConfig(chainId)

  const { config } = usePrepareContractWrite({
    address: products.buyFloor.contract.perpetualOpenCollectivePurchaseV2,
    abi: perpetualOpenCollectivePurchaseV2Abi,
    functionName: 'perpetualLeave',
    args: [creatorAddress, collection, paymentToken]
  })
  const { sendTransaction, isSuccess, data, isLoading } = useSendTransaction(config)

  const leaveV2 = async () => {
    if (sendTransaction) {
      await sendTransaction()
    }
  }

  return {
    leaveV2,
    isLoading: isLoading
  }
}

export default useLeaveV2
