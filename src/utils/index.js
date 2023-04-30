import { Contract } from '@ethersproject/contracts';
import ERC721ABI from '../contracts/ERC721.json';
import FraArtMarketABI from '../contracts/FraArtMarket.json';
import FraArtAuctionABI from '../contracts/FraArtAuction.json';
import FractionalizerABI from '../contracts/Fractionalizer.json';
import FractionsImplABI from '../contracts/FractionsImpl.json';
import AuctionFractionsImplABI from '../contracts/AuctionFractionsImpl.json';
import AuctionFractionalizerABI from '../contracts/AuctionFractionalizer.json';
import OpenCollectivePurchase from '../contracts/OpenCollectivePurchase.json';
import PeerMarketABI from '../contracts/PeerMarket.json';

export const currentNetwork = process.env.REACT_APP_NETWORK_ID;
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const FRACTION_DECIMAL = 6;
export const CONTRACTS_BY_NETWORK = {
  [currentNetwork]: {
    ERC721: {
      address: "0x6C220F8dF2011D962f5a6f00c64fFBE2d3949965",  // Goerli
      abi: ERC721ABI,
    },
    FraArtMarket: {
      address: "0xCE070102D13c3443E89b45737c56128bA278703f",  // Goerli
      abi: FraArtMarketABI
    },
    FraArtAuction: {
      address: "0xfC53F7D90F9f457dC188fA979E0Bc7120263610D",  // Goerli
      abi: FraArtAuctionABI
    },
    Fractionalizer: {
      address: "0xe220Cf94EE1e331Ae71F4bA07492848cD3a4eD97",  // Goerli
      abi: FractionalizerABI
    },
    FractionsImpl: {
      address: "0xa4b22c2E7c3e848e586A57C5Ed9b957aE1C03D3B",  // Goerli
      abi: FractionsImplABI
    },
    AuctionFractionalizer: {
      address: "0x3978e41A9D8e6B07034912431228Bed0487015e2",  // Goerli
      abi: AuctionFractionalizerABI
    },

    OpenCollectivePurchase: {
      address:"0x3978e41A9D8e6B07034912431228Bed0487015e2", // Goerli
      abi: OpenCollectivePurchase
    },
    AuctionFractionsImpl: {
      address: "0xaD5DF78191F51DCF9026E6178c1b3802b096E3bc",  // Goerli
      abi: AuctionFractionsImplABI
    },
    PeerMarket: {
      address: "0xB6330687cC102BE9930A3a233b06c60035C98d5f",  // Goerli
      abi: PeerMarketABI
    },
  },
}
export function getContractInfo(name, chainId = null) {
  if (!chainId) chainId = currentNetwork;

  const contracts = CONTRACTS_BY_NETWORK?.[chainId];
  if (contracts) {
    return contracts?.[name];
  } else {
    return null;
  }
}
export function getContractObj(name, chainId, provider) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(info.address, info.abi, provider);
}
export function getCollectionContract(address, chainId, provider) {
  const info = getContractInfo('ERC721', chainId);
  return !!info && new Contract(address, info.abi, provider);
}
export function getFractonsContract(address, chainId, provider) {
  const info = getContractInfo('FractionsImpl', chainId);
  return !!info && new Contract(address, info.abi, provider);
}
export function getAuctionFractonsContract(address, chainId, provider) {
  const info = getContractInfo('AuctionFractionsImpl', chainId);
  return !!info && new Contract(address, info.abi, provider);
}
export function getOpenCollectivePurchaseContract(chainId, provider) {
  const info = getContractInfo('OpenCollectivePurchase', chainId);
  return !!info && new Contract(info.address, info.abi, provider);
}
export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str
export function formatNum(value) {
  let intValue = Math.floor(value)
  if (intValue < 10) {
    return '' + parseFloat(value).toFixed(2)
  } else if (intValue < 1000) {
    return '' + intValue
  } else if (intValue < 1000000) {
    return parseFloat(intValue / 1000).toFixed(1) + 'K'
  } else if (intValue < 1000000000) {
    return parseFloat(intValue / 1000000).toFixed(1) + 'M'
  } else {
    return parseFloat(intValue / 1000000000).toFixed(1) + 'G'
  }
}
export function formatNum1(value) {
  let intValue = Math.floor(value)
  if (isNaN(intValue)) return '-';
  if (intValue < 10) {
    return '' + parseFloat(value).toFixed(2)
  } else if (intValue < 1000) {
    return '' + parseFloat(value).toFixed(2)
  } else if (intValue < 1000000) {
    return parseFloat(parseFloat(value) / 1000).toFixed(2) + 'K'
  } else if (intValue < 1000000000) {
    return parseFloat(parseFloat(value) / 1000000).toFixed(2) + 'M'
  } else {
    return parseFloat(parseFloat(value) / 1000000000).toFixed(2) + 'G'
  }
}
