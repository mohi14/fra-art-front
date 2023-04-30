import { useState, createContext, FC, useEffect, useCallback } from 'react'
import supportedChains, { DefaultChain } from '../utils/chains'

const supportedChainsMap = supportedChains.reduce((map, chain) => {
  map[chain.id] = chain
  return map
})

export const ChainContext = createContext({
  chain: DefaultChain,
  switchCurrentChain: () => {},
})

const ChainContextProvider = ({ children }) => {
  const [globalChainId, setGlobalChainId] = useState(DefaultChain.id)

  useEffect(() => {
    const selectedChainId =
      localStorage.getItem('reservoir.chainId') || DefaultChain.id
    const selectedChain = supportedChains.find(
      (chain) => chain.id === +selectedChainId
    )
    const id = selectedChain?.id || DefaultChain.id
    setGlobalChainId(id)
    localStorage.setItem('reservoir.chainId', `${id}`)
  }, [])

  const switchCurrentChain = useCallback(
    (chainId) => {
      if (chainId === globalChainId) {
        return
      }

      setGlobalChainId(+chainId)

      if (typeof window !== 'undefined') {
        localStorage.setItem('reservoir.chainId', `${chainId}`)
      }
    },
    [globalChainId, setGlobalChainId]
  )



  let currentChain = DefaultChain
  if (globalChainId && supportedChainsMap[globalChainId]) {
    currentChain = supportedChainsMap[globalChainId]
  }

  return (
    <ChainContext.Provider value={{ chain: currentChain,switchCurrentChain }}>
      {children}
    </ChainContext.Provider>
  )
}

export default ChainContextProvider
