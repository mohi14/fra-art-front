import { notification } from 'antd'
import { useCallback, useEffect } from 'react'

export default function useBuyFloorAcquirerV2(
  chainId: number,
  tokenId: string,
  poolId: string,
  poolIsCompleted: boolean,
  collectionAddress: string,
  refetchData: () => void
) {
  const handleSpecificAcquire = async () => {
    try {
    } catch (_) {
      console.error({
        type: 'error',
        text: 'error',
        duration: 5
      })
    }
  }

  const notificationSuccessAddFounds = useCallback(() => {
    notification.success({
      message: `Buy NFT successfully`,
      description: `successfully`,
      placement: 'top',
      duration: 2
    })
  }, [])

  useEffect(() => {
    if (status === 'success') {
      refetchData()
      notificationSuccessAddFounds()
    }
    if (status === 'reverted') {
      console.error({
        type: 'error',
        text: 'error',
        duration: 5
      })
    }
  }, [status, refetchData, notificationSuccessAddFounds])

  return {
    handleSpecificAcquire
  }
}
