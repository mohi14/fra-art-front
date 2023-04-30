import { ethers } from "ethers";
import { getCollectionContract, getFractonsContract, getAuctionFractonsContract, getContractObj, 
    FRACTION_DECIMAL, ZERO_ADDRESS } from ".";
import { toWei, toEth } from "./contracts";
/**
 * NFT Approval
 */
export async function isApprovedFractionalizer(collection, tokenId, chainId, provider) {
    const Contract = getContractObj('Fractionalizer', chainId, provider);
    const nftToken = getCollectionContract(collection, chainId, provider);
    let approvalAddress = await nftToken.getApproved(tokenId);
    return approvalAddress.toLowerCase() === Contract.address.toLowerCase();
}
export async function setApproveFractionalizer(collection, tokenId, chainId, provider) {
    const Contract = getContractObj('Fractionalizer', chainId, provider);
    const nftToken = getCollectionContract(collection, chainId, provider);
    try {
        const tx = await nftToken.approve(Contract.address, tokenId);
        await tx.wait(1);
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}
export async function isApprovedAuctionFractionalizer(collection, tokenId, chainId, provider) {
    const Contract = getContractObj('AuctionFractionalizer', chainId, provider);
    const nftToken = getCollectionContract(collection, chainId, provider);
    let approvalAddress = await nftToken.getApproved(tokenId);
    return approvalAddress.toLowerCase() === Contract.address.toLowerCase();
}
export async function setApproveAuctionFractionalizer(collection, tokenId, chainId, provider) {
    const Contract = getContractObj('AuctionFractionalizer', chainId, provider);
    const nftToken = getCollectionContract(collection, chainId, provider);
    try {
        const tx = await nftToken.approve(Contract.address, tokenId);
        await tx.wait(1);
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}
export async function getAllowanceForPeerMarket(flag, bookToken, account, spender, chainId, provider) {
    let Contract;
    if (flag) Contract = getAuctionFractonsContract(bookToken, chainId, provider);
    else Contract = getFractonsContract(bookToken, chainId, provider);
    try {
        let allowance = await Contract.allowance(account, spender);
        console.log(allowance.toString());
        return parseFloat(allowance);
    } catch (e) {
        console.log("AllowancePeerMarket: ", e);
        return 0;
    }
}
export async function setApproveForPeerMarket(flag, bookToken, bookAmount, spender, chainId, provider) {
    let Contract;
    if (flag) Contract = getAuctionFractonsContract(bookToken, chainId, provider);
    else Contract = getFractonsContract(bookToken, chainId, provider);
    try {
        const tx = await Contract.approve(spender, bookAmount);
        await tx.wait(1);
        return true;
    } catch (e) {
        console.log("ApprovePeerMarket: ", e);
        return false;
    }
}

/**
 * Fractionalizer
 * target: NFT collection address
 * tokenId: NFT token id
 * name: Vault name
 * symbol: Vault symbol
 * fractionscount: supply of fraction ERC20 token
 * fractionPrice: price of fraction: reserve price
 */
export async function callFractionalize(target, tokenId, name, symbol, fractionscount, fractionPrice, chainId, provider) {
    const Contract = getContractObj('Fractionalizer', chainId, provider);
    try {
        let f_price = toWei(fractionPrice);
        let f_count = parseInt(fractionscount).toFixed(0);
        let f_count_format = ethers.utils.parseUnits(f_count, FRACTION_DECIMAL);
        const tx = await Contract.fractionalize(target, tokenId, name, symbol, f_count_format, f_price);
        await tx.wait(2);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
export async function callBalanceOf(fraction, account, chainId, provider) {
    const Contract = getFractonsContract(fraction, chainId, provider);
    try {
        const tx = await Contract.balanceOf(account);
        return parseFloat(ethers.utils.formatUnits(tx, FRACTION_DECIMAL));
    } catch (e) {
        console.log(e);
        return -1;
    }
}
export async function callRedeem(fraction, amount, chainId, provider) {
    const Contract = getFractonsContract(fraction, chainId, provider);
    try {
        let f_amount = toWei(amount);
        const tx = await Contract.redeem({ value: f_amount });
        await tx.wait(2);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
export async function callClaim(fraction, chainId, provider) {
    const Contract = getFractonsContract(fraction, chainId, provider);
    try {
        const tx = await Contract.claim();
        await tx.wait(2);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
/**
 * AuctionFractionalizer
 * target: NFT collection address
 * tokenId: NFT token id
 * name: Vault name
 * symbol: Vault symbol
 * fractionscount: supply of fraction ERC20 token
 * fractionPrice: price of fraction: reserve price
 * kickoff: start time
 * duration: end time
 * fee: % (1e18 * 10%)
 */
export async function callAuctionFractionalize(target, tokenId, name, symbol, fractionscount, fractionPrice, kickoff, duration, chainId, provider) {
    const Contract = getContractObj('AuctionFractionalizer', chainId, provider);
    try {
        let f_price = toWei(fractionPrice);
        let f_count = parseInt(fractionscount).toFixed(0);
        let f_count_format = ethers.utils.parseUnits(f_count, FRACTION_DECIMAL);
        console.log(target, tokenId, name, symbol, f_count_format.toString(), f_price.toString(), kickoff, duration);
        const tx = await Contract.fractionalize(target, tokenId, name, symbol, f_count_format, f_price, kickoff, duration);
        await tx.wait(2);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
export async function aCallBalanceOf(fraction, account, chainId, provider) {
    const Contract = getAuctionFractonsContract(fraction, chainId, provider);
    try {
        const tx = await Contract.balanceOf(account);
        return parseFloat(ethers.utils.formatUnits(tx, FRACTION_DECIMAL));
    } catch (e) {
        console.log(e);
        return -1;
    }
}
export async function aCallBidder(fraction, chainId, provider) {
    const Contract = getAuctionFractonsContract(fraction, chainId, provider);
    try {
        return await Contract.bidder();
    } catch (e) {
        console.log(e);
        return ZERO_ADDRESS;
    }
}
export async function aCallIsOwner(fraction, account, chainId, provider) {
    const Contract = getAuctionFractonsContract(fraction, chainId, provider);
    try {
        return await Contract.isOwner(account);
    } catch (e) {
        console.log(e);
        return false;
    }
}
export async function aCallBidRangeOf(fraction, account, chainId, provider) {
    const Contract = getAuctionFractonsContract(fraction, chainId, provider);
    try {
        const tx = await Contract.bidRangeOf(account);
        const minPrice = toEth(ethers.utils.parseUnits(tx._minFractionPrice.toString(), FRACTION_DECIMAL));
        const maxPrice = toEth(ethers.utils.parseUnits(tx._maxFractionPrice.toString(), FRACTION_DECIMAL));
        return {minPrice: parseFloat(minPrice), maxPrice: parseFloat(maxPrice)};
    } catch (e) {
        console.log(e);
        return {minPrice: 0, maxPrice: 0};
    }
}
export async function aCallBidding(fraction, account, newPrice, chainId, provider) {
    const Contract = getAuctionFractonsContract(fraction, chainId, provider);
    try {
        let _newPrice = ethers.utils.parseUnits(newPrice.toString(), (18 - FRACTION_DECIMAL));
        const payAmount = await Contract.bidAmountOf(account, _newPrice);
        const tx = await Contract.bid(_newPrice, {value: payAmount});
        await tx.wait(2);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
export async function aCallCancel(fraction, chainId, provider) {
    const Contract = getAuctionFractonsContract(fraction, chainId, provider);
    try {
        const tx = await Contract.cancel();
        await tx.wait(2);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
export async function aCallRedeem(fraction, chainId, provider) {
    const Contract = getAuctionFractonsContract(fraction, chainId, provider);
    try {
        const tx = await Contract.redeem();
        await tx.wait(2);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
export async function aCallClaim(fraction, chainId, provider) {
    const Contract = getAuctionFractonsContract(fraction, chainId, provider);
    try {
        const tx = await Contract.claim();
        await tx.wait(2);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
// PeerMarket
export async function pCreateOrder(flag, _bookToken, _bookAmount, _bookPrice, account, chainId, provider) {
    const Contract = getContractObj('PeerMarket', chainId, provider);
    try {
        let bookAmount = ethers.utils.parseUnits(_bookAmount.toString(), FRACTION_DECIMAL);
        let allowance = await getAllowanceForPeerMarket(flag, _bookToken, account, Contract.address, chainId, provider);
        if (allowance < bookAmount) {
            let approveTx = await setApproveForPeerMarket(flag, _bookToken, bookAmount, Contract.address, chainId, provider);
            if (!approveTx) {
                console.log("Failed to approve for PeerMarket");
                return false;
            }
        }
        let bookPrice = ethers.utils.parseUnits(_bookPrice.toString(), (18 - FRACTION_DECIMAL));
        const tx = await Contract.createOrder(_bookToken, bookAmount, bookPrice);
        await tx.wait(2);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
export async function pUpdateOrder(flag, _orderId, _bookToken, _bookAmount, _bookPrice, account, chainId, provider) {
    const Contract = getContractObj('PeerMarket', chainId, provider);
    try {
        let bookAmount = ethers.utils.parseUnits(_bookAmount.toString(), FRACTION_DECIMAL);
        let allowance = await getAllowanceForPeerMarket(flag, _bookToken, account, Contract.address, chainId, provider);
        if (allowance < bookAmount) {
            let approveTx = await setApproveForPeerMarket(flag, _bookToken, bookAmount, Contract.address, chainId, provider);
            if (!approveTx) {
                console.log("Failed to approve for PeerMarket");
                return false;
            }
        }
        let bookPrice = ethers.utils.parseUnits(_bookPrice.toString(), (18 - FRACTION_DECIMAL));
        const tx = await Contract.updateOrder(_orderId, bookAmount, bookPrice);
        await tx.wait(2);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
export async function pCancelOrder(_orderId, chainId, provider) {
    const Contract = getContractObj('PeerMarket', chainId, provider);
    try {
        const tx = await Contract.cancelOrder(_orderId);
        await tx.wait(2);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
export async function pExecuteOrder(_orderId, _execAmount, _payAmount, chainId, provider) {
    const Contract = getContractObj('PeerMarket', chainId, provider);
    try {
        let execAmount = ethers.utils.parseUnits(_execAmount.toString(), FRACTION_DECIMAL);
        let payAmount = toWei(_payAmount);
        console.log(_orderId, execAmount.toString(), payAmount.toString());
        const tx = await Contract.executeOrder(_orderId, execAmount, {value: payAmount});
        await tx.wait(2);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}