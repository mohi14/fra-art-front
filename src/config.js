 // 1 - Required Variables
if (!process.env.REACT_APP_NETWORK_ID) {
  throw new Error('REACT_APP_NETWORK_ID is not set')
}



// 2 - Interfaces

// 3 - Values
export const globalConfig = {
  chain: Number(process.env.REACT_APP_NETWORK_ID),
  nftfy: {
    marketplaceUrl: 'https://testnet.fra-art.com'
  },
  paginationLimit: 50
}
