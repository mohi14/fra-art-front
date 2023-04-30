import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Title = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    display: inline-block;
    font-weight: bold;
`

const NFT3 = (props) => {
    const { item } = props;

    return (
        <>{item && <div className="col">
            <div className="card nft-items rounded-md shadow overflow-hidden mb-1">
                <div className="nft-image rounded-md position-relative overflow-hidden">
                    <Link to={`/item-details/${item.itemCollection}/${item.tokenId}`}>
                        <img src={item?.mainData} className="img-fluid" alt="" style={{ height: 250, width: '100%' }} />
                    </Link>
                </div>
                <div className="card-body content position-relative p-0 mt-3">
                    <Link to={`/item-details/${item.itemCollection}/${item.tokenId}`} className="text-dark">
                        <Title>{item.name}</Title>
                    </Link>
                </div>
            </div>
        </div>}</>

    )
}

export default NFT3;