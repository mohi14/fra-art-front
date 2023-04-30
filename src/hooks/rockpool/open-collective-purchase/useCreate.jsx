import { usePrepareContractWrite, useSendTransaction } from 'wagmi'
import { chainConfig } from '../../ChainConfig'
import perpetualOpenCollectivePurchaseAbi from './openCollectivePurchaseAbi.json'

const useCreate = (contractAddress, tokenId, priceMultiplier, extra, chainId) => {
  const { products, nativeToken } = chainConfig(chainId)
  const { config } = usePrepareContractWrite({
    address: products.specific.contract.openCollectivePurchase,
    abi: perpetualOpenCollectivePurchaseAbi,
    functionName: 'list',
    args: [contractAddress, tokenId, true, 0, nativeToken.address, priceMultiplier, extra]
  })
  console.log(products)
  const { sendTransaction, isSuccess, data, isLoading } = useSendTransaction(config)

  const create = async () => {
    console.log(sendTransaction)
 if(sendTransaction){

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
