import { usePrepareContractWrite, useSendTransaction } from 'wagmi'
// @ts-ignore
import { chainConfig } from '../../ChainConfig'
import { units } from '../../../service/UtilService'
import perpetualOpenCollectivePurchaseAbi from './openCollectivePurchaseAbi.json'

const useJoin = (chainId, specificPoolItem, value) => {
  const { products, nativeToken } = chainConfig(chainId)
  const amountInUnits = units(value || '0', 18)
  // const reservePriceInUnits = units(specificPoolItem?.reservePrice || '0', 18)
  const reservePriceInUnits = units( '0', 18)
  const isNetworkToken = specificPoolItem?.paymentToken?.id === nativeToken.address

  const { config } = usePrepareContractWrite({
    // @ts-ignore
    address: products.specific.contract.openCollectivePurchase,
    abi: perpetualOpenCollectivePurchaseAbi,
    functionName: 'join',
    args: [specificPoolItem?.id, amountInUnits, reservePriceInUnits, isNetworkToken ? { value: amountInUnits } : { value: 0 }]
  })
  const { sendTransaction, isSuccess, data, isLoading } = useSendTransaction(config)

  const join = async () => {
    if (sendTransaction) {
      await sendTransaction()
    }
  }

  return {
    join,
    isLoading: isLoading,
    data,
    isSuccess

  }
}

export default useJoin
