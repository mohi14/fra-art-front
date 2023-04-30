import { FC, useState } from 'react'
import React from 'react'
import { paths } from '@reservoir0x/reservoir-kit-client'
import { FiChevronDown } from 'react-icons/fi'
import Link from 'antd/es/typography/Link'

type Props = {
  collections: paths['/search/collections/v1']['get']['responses']['200']['schema']['collections']
  defaultCollectionId?: string
}

const CommunityDropdown: FC<Props> = ({ collections, defaultCollectionId }) => {
  const [open, setOpen] = useState(false)

  return (
   <>
   </>
  )
}

export default CommunityDropdown
