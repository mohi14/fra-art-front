import { usePrepareContractWrite, useSendTransaction } from 'wagmi'
import { chainConfig } from '../../ChainConfig'
import perpetualOpenCollectivePurchaseAbi from './openCollectivePurchaseAbi.json'

const useClaim = (chainId, listingId, buyer) => {
  const { products } = chainConfig(chainId)

  const { config } = usePrepareContractWrite({
    address: products.specific.contract.openCollectivePurchase,
    abi: perpetualOpenCollectivePurchaseAbi,
    functionName: 'claim',
    args: [listingId, buyer]
  })
  const { sendTransaction, isSuccess, data, isLoading } = useSendTransaction(config)
console.log(listingId, buyer)
  const setClaim = async () => {
    if (sendTransaction) {
      await sendTransaction()
    }
  }

  return {
    isLoading: isLoading,
    setClaim,
  }
}

export default useClaim
