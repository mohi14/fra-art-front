import { usePrepareContractWrite, useSendTransaction } from 'wagmi'
// @ts-ignore
import { chainConfig } from '../../ChainConfig'
import { units } from '../../../service/UtilService'
import perpetualOpenCollectivePurchaseAbi from './openCollectivePurchaseAbi.json'

const useJoin = (chainId, specificPoolItem, value,maxReservePrice) => {
  const { products, nativeToken } = chainConfig(chainId)
  const amountInUnits = units(value || '0', 18)
  // const reservePriceInUnits = units(specificPoolItem?.reservePrice || '0', 18)
  const reservePriceInUnits = units(maxReservePrice|| '0', 18)

  const { config } = usePrepareContractWrite({
    // @ts-ignore
    address: products.specific.contract.openCollectivePurchase,
    abi: perpetualOpenCollectivePurchaseAbi,
    functionName: 'join',
    args: [specificPoolItem?.listingId, amountInUnits, reservePriceInUnits,{ value: amountInUnits }]
  })
  console.log(specificPoolItem?.listingId, value, maxReservePrice,{ value: amountInUnits })
  const { sendTransaction, isSuccess, data, isLoading } = useSendTransaction(config)

  const join = async () => {
    console.log(sendTransaction)
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
