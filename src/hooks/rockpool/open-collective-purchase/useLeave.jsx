import { usePrepareContractWrite, useSendTransaction } from 'wagmi'
// @ts-ignore
import { chainConfig } from '../../ChainConfig'
import perpetualOpenCollectivePurchaseAbi from './openCollectivePurchaseAbi.json'

const useLeave = (chainId, specificPoolItem) => {
  const { products } = chainConfig(chainId)
  const { config } = usePrepareContractWrite({
    //@ts-ignore
    address: products.specific.contract.openCollectivePurchase,
    abi: perpetualOpenCollectivePurchaseAbi,
    functionName: 'leave',
    args: [specificPoolItem.id]
  })
  const { sendTransaction, isSuccess, data, isLoading } = useSendTransaction(config)
  const leave = async () => {
    if (sendTransaction) {
      await sendTransaction()
    }
  }

  return {
    leave,
    isLoading: isLoading,
    data,
  }
}

export default useLeave
