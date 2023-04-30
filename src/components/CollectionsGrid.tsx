import Link from 'antd/es/typography/Link'
import React from 'react'
import { FC } from 'react'


const CollectionsGrid: FC<any> = ({ collections }) => {
  const {
    collections: { data, isValidating },
    ref,
  } = collections

  const mappedCollections = data
    ? data
        .flatMap(({ collections }) => collections)
        // @ts-ignore
        .filter((collection) => !collection?.sampleImages?.includes(null))
    : []
  const didReachEnd = data && data[data.length - 1]?.collections?.length === 0

  return (
  
   <>
   </>
    
  )
}

export default CollectionsGrid
