import { notification } from 'antd'
import { useCallback, useEffect } from 'react'
import { chainConfig } from '../../ChainConfig'
import useCreate from '../open-collective-purchase/useCreate'


export default function useSpecificCreatePool(
  contractAddress, tokenId, priceMultiplier, extra, chainId
) {

  const { create,data, isLoading } = useCreate(contractAddress, tokenId, priceMultiplier, extra, chainId)

  const handleCreate = async () => {
    console.log("check", contractAddress, tokenId, priceMultiplier, extra, chainId)

    if (!contractAddress || !tokenId) {
      return
    }

    try {
      await create()
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
      message: `Pool successfully Created!`,
      placement: 'top',
      duration: 2
    })
  }, [])

  useEffect(() => {
    if (data) {
      notificationSuccessAddFounds()
    }
  else
      console.error({
        type: 'error',
        text: 'error',
        duration: 5
      })
    
  }, [notificationSuccessAddFounds])

  return {
    handleCreate,
    isExecutin: isLoading
  }
}
