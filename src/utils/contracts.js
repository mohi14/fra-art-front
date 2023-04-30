import { BigNumber, ethers } from "ethers";
import { getCollectionContract, getContractInfo, CONTRACTS_BY_NETWORK,getOpenCollectivePurchaseContract, getContractObj } from ".";

export function isAddress(address) {
    try {
        ethers.utils.getAddress(address);
    } catch (e) { return false; }
    return true;
}

export function toEth(amount) {
    return ethers.utils.formatEther(String(amount), { commify: true });
}

export function toWei(amount) {
    return ethers.utils.parseEther(String(amount));
}
/**
 * Governance Token Contract Management
 */
export async function getTokenBalance(account, tokenName, tokenDecimal, chainId, library) {
    if (tokenName === 'main') {
        const balance = await library.getBalance(account);
        return ethers.utils.formatEther(balance);
    } else {
        console.log("token balance ...");
        const Token = getContractObj(tokenName, chainId, library.getSigner());
        if (Token) {
            const balance = await Token.balanceOf(account);
            return ethers.utils.formatUnits(balance, tokenDecimal);
        }
    }
    return 0;
}
/**
 * NFT Contract Management
 */
export async function isNFTApprovedForMarket(collection, account, chainId, provider) {
    const marketContract = getContractObj('FraArtMarket', chainId, provider);
    const nftToken = getCollectionContract(collection, chainId, provider);

    return await nftToken.isApprovedForAll(account, marketContract.address);
}

export async function isNFTApprovedForAuction(collection, account, chainId, provider) {
    const auctionContract = getContractObj('FraArtAuction', chainId, provider);
    const nftToken = getCollectionContract(collection, chainId, provider);

    return await nftToken.isApprovedForAll(account, auctionContract.address);
}


export async function JoinPool(listingId, maxReserve,amount ,chainId, provider) {
    const PoolContract = getOpenCollectivePurchaseContract(chainId, provider);
    return await PoolContract.join(listingId, amount, maxReserve, { value: ethers.utils.parseEther(amount) });
}

export async function CreatePool(collection, tokenId,amount, chainId, provider) {
    const PoolContract = getOpenCollectivePurchaseContract(chainId, provider);
    return await PoolContract.list(collection,
        tokenId,
        true,
        0,
         amount,
        "0x0000000000000000000000000000000000000000", 
    200,
    "0x41554354494f4e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000003f48000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000013486173686d61736b73204c696f6e204661636500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000448534c4e00000000000000000000000000000000000000000000000000000000");
}

export async function approveNFT(collection, account, chainId, provider) {
    const nftToken = getCollectionContract(collection, chainId, provider);

    return await nftToken.isApprovedForAll(account, CONTRACTS_BY_NETWORK?.[chainId]?.address);
}



export async function setNFTApprovalForMarket(collection, approved, chainId, provider) {
    const marketContract = getContractObj('FraArtMarket', chainId, provider);
    const nftToken = getCollectionContract(collection, chainId, provider);
    try {
        const tx = await nftToken.setApprovalForAll(marketContract.address, approved);
        await tx.wait(2);
        return true;
    } catch (e) {
        console.log(e)
    }
    return false;
}
export async function setNFTApprovalForAuction(collection, approved, chainId, provider) {
    const auctionContract = getContractObj('FraArtAuction', chainId, provider);
    const nftToken = getCollectionContract(collection, chainId, provider);
    try {
        const tx = await nftToken.setApprovalForAll(auctionContract.address, approved);
        await tx.wait(2);
        return true;
    } catch (e) {
        console.log(e)
    }
    return false;
}
/**
 * Market Contract Management
 */
export async function listItem(collection, owner, token_id, price, chainId, provider) {
    const marketContract = getContractObj('FraArtMarket', chainId, provider);
    const marketContractInfo = getContractInfo('FraArtMarket', chainId);
    if (!marketContract || !marketContractInfo) return false
    try {
        let isApproved = await isNFTApprovedForMarket(collection, owner, chainId, provider);
        if (!isApproved) {
            isApproved = await setNFTApprovalForMarket(collection, true, chainId, provider);
        }
        if (isApproved) {
            const tx = await marketContract.list(collection, token_id, ethers.utils.parseEther(price));
            const receipt = await tx.wait(2);
            return true;
        }
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}
export async function delistItem(id, chainId, provider) {
    const marketContract = getContractObj('FraArtMarket', chainId, provider);
    if (!marketContract) return false
    try {
        const tx = await marketContract.delist(id)
        await tx.wait(2)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}
export async function buy(account, id, price, chainId, provider) {
    const marketContract = getContractObj('FraArtMarket', chainId, provider);
    if (!marketContract) return false;
    try {
        console.log("price: ", id, toWei(price).toString());
        const tx = await marketContract.buy(id, { value: toWei(price) });
        await tx.wait(2)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}
/**
 * Auction Contract Management
 */
export async function createAuction(collection, owner, token_id, startPrice, startTime, endTime, chainId, provider) {
    const auctionContract = getContractObj('FraArtAuction', chainId, provider);
    const auctionContractInfo = getContractInfo('FraArtAuction', chainId);
    if (!auctionContract || !auctionContractInfo) return false
    try {
        let isApproved = await isNFTApprovedForAuction(collection, owner, chainId, provider);
        if (!isApproved) {
            isApproved = await setNFTApprovalForAuction(collection, true, chainId, provider);
        }
        if (isApproved) {
            const tx = await auctionContract.createAuction(collection, token_id, ethers.utils.parseEther(startPrice), startTime, endTime);
            const receipt = await tx.wait(2);
            if (receipt.confirmations) {
                return true
            }
        }
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}
export async function finalizeAuction(id, chainId, provider) {
    const auctionContract = getContractObj('FraArtAuction', chainId, provider)
    if (!auctionContract) return false
    try {
        const tx = await auctionContract.finalizeAuction(id)
        await tx.wait(2)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}
export async function bidOnAuction(account, id, price, chainId, provider) {
    const auctionContract = getContractObj('FraArtAuction', chainId, provider)
    if (!auctionContract) return false;
    console.log(id, ethers.utils.parseEther(price).toString());
    try {
        const tx = await auctionContract.bidOnAuction(id, ethers.utils.parseEther(price), { value: ethers.utils.parseEther(price) });
        await tx.wait(2);
        return true
    } catch (e) {
        console.log("bidOnAuction: ", e);
        return false
    }
}