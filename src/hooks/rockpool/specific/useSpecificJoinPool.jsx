import { notification } from 'antd'
import { useCallback, useEffect } from 'react'
import { chainConfig } from '../../ChainConfig'
import useJoin from '../open-collective-purchase/useJoin'

export default function useSpecificJoinPool(
  chainId,
  accountAddress,
  specificPoolItem,
  value,
  reserveAmount,
) {

  const { join, isSuccess,isLoading } = useJoin(chainId, specificPoolItem, value,reserveAmount)
  const handleJoin = async () => {
   

    try {
    console.log(chainId, specificPoolItem, value)

      await join()
     
        // fetch(`https://testnet.fra-art.com/api/updateRockPool/${specificPoolItem?.listingId}`, {
        //   method: 'post',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(
        //     {
        //       amount: (parseInt(specificPoolItem.amount) + parseInt(value)).toString(),
        //       }
        //   ),
          
        //   })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     console.log('updated by listingId=>', data )
        //   })
        //   .catch((err) => console.log(err));
      
      
    } catch (err) {
      console.log(err)
      console.error({
        type: 'error',
        text: 'error',
        duration: 5
      })
    }
  }

  const notificationSuccessAddFounds = useCallback(() => {
    notification.success({
      message: `Funds successfully added!`,
      description: `Amount deposited: ${value} ETH`,
      placement: 'top',
      duration: 2
    })
    window.location.reload()
  }, [value])

  useEffect(() => {
    if (isSuccess) {
      notificationSuccessAddFounds()
    }
  }, [notificationSuccessAddFounds, isSuccess])

  return {
    handleJoin,
    isExecutin: isLoading
  }
}
