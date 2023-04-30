import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { BuyModal, BuyStep, useTokens } from '@reservoir0x/reservoir-kit-ui'
import { iconGroup, ethereum, flashIcon, labelIcon } from '../utils/images.util';
const NFT1 = (props) => {
    const { item } = props;

    return (
        <>{item && <div className="col">
            <div className="card nft-items rounded-md shadow overflow-hidden mb-1 p-3">
                <div className="d-flex justify-content-between">
                    <div className="img-group">
                        <a href="/" className="user-avatar">
                            <span className="badge badge-link bg-dark2">
                                <img src={iconGroup} alt="user" width={15} className="avatar-sm-sm rounded-circle" />
                                <span style={{ marginLeft: 10, fontWeight: 600 }}>1</span>
                            </span>
                        </a>
                    </div>
                    <img src={ethereum} style={{ marginLeft: "5px" }} alt="" />
                </div>

                <div className="nft-image rounded-md mt-3 position-relative overflow-hidden">
                    <Link to={`/item-details/${item.itemCollection}/${item.tokenId}`}>
                        <img src={item?.mainData} className="img-fluid" alt="" style={{ height: 250, width: '100%' }} />
                    </Link>
                    <div className="position-absolute top-0 start-0 m-2">
                        <span className="badge badge-link bg-primary">1 NFT</span>
                    </div>
                </div>

                <div className="card-body content position-relative p-0 mt-3">
                    <div style={{ fontSize: 14, fontWeight: 'bold' }}>{item.name}</div>
                    <div className="d-flex justify-content-between mt-2">
                        {
                            item.pair
                                ? (<small className="text-secondary fw-bold"><span>Price: </span><span>{item.pair.price} {process.env.REACT_APP_COIN}</span></small>)
                                : (item.auction
                                    ? (<small className="text-secondary fw-bold"><span>Highest Bid: </span><span>{item.auction.price} {process.env.REACT_APP_COIN}</span></small>)
                                    : <small className="text-secondary fw-bold">Not for sale</small>)
                        }
                    </div>
                    <hr />
                    <div style={{textAlign: 'center'}}>
                        {
                            item.pair ? (
                                <>
                                <Link className="btn btn-soft-secondary justify-content-start" to={`/item-details/${item.itemCollection}/${item.tokenId}`}>
                                    <img alt="" src={flashIcon} style={{ paddingRight: 10 }} width={30} /> Buy Now
                                </Link>
                                 {/* <BuyModal
      trigger={trigger}
      tokenId={item?.tokenId}
      collectionId={item?.itemCollection}
      onClose={(data, stepData, currentStep) => {
          if (mutate && currentStep == BuyStep.Complete) mutate()
        }}
        /> */}
        </>
                            ) : (item.auction
                                ? (
                                    <Link className="btn btn-soft-secondary justify-content-start" to={`/item-details/${item.itemCollection}/${item.tokenId}`}>
                                        <img alt="" src={labelIcon} style={{ paddingRight: 10 }} width={30} /> Place Bid
                                    </Link>
                                ) : (
                                    <Link className="btn btn-soft-secondary justify-content-start"
                                        to={`/item-details/${item.itemCollection}/${item.tokenId}`}>Not for sale</Link>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>}</>

    )
}

export default NFT1;