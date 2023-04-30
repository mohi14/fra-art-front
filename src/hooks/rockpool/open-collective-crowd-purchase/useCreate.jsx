import { usePrepareContractWrite, useSendTransaction } from 'wagmi'
import { chainConfig } from '../../ChainConfig'
import perpetualOpenCollectivePurchaseAbi from './openCollectivePurchaseAbi.json'

const useCreate = (contractAddress, tokenId, fee,limitPrice,reservePrice,  priceMultiplier, extra, chainId) => {
  const { products, nativeToken } = chainConfig(chainId)
  const { config } = usePrepareContractWrite({
    address: products.specific.contract.openCollectivePurchase,
    abi: perpetualOpenCollectivePurchaseAbi,
    functionName: 'list',
    args: [contractAddress, tokenId,nativeToken, reservePrice, limitPrice,'999999999' ,false, fee, , priceMultiplier, extra]
  })
  const { sendTransaction, isSuccess, data, isLoading } = useSendTransaction(config)

  const create = async () => {
    if (sendTransaction) {
      await sendTransaction()
    }
  }

  return {
    create,
    isLoading: isLoading,
    data,

  }
}

export default useCreate
