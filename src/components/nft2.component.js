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

const NFT2 = (props) => {
    const { item, updateStorage, address, handleError } = props;
    const [flag, setFlag] = useState(false);
    const func_select = () => {
        if (!item || !address) return;
        let f_marketplace = sessionStorage.getItem('f_marketplace');
        if (!f_marketplace) {
            sessionStorage.setItem('f_marketplace', JSON.stringify({
                address: address?.toLowerCase(), nft: item, step: 1,
                vault: { name: '', symbol: '', price: 0, supply: 0 },
                type: 'fixed'
            }));
        } else {
            let f_data = JSON.parse(f_marketplace);
            if (f_data.nft) {
                handleError('You can select one NFT only!');
                return;
            }
            f_data.nft = item;
            sessionStorage.setItem('f_marketplace', JSON.stringify(f_data));
        }
        setFlag(true);
        updateStorage();
    }
    const func_unselect = () => {
        if (!item || !address) return;
        let f_marketplace = sessionStorage.getItem('f_marketplace');
        if (!f_marketplace) return;
        let f_data = JSON.parse(f_marketplace);
        if (!f_data.nft) return;
        f_data.nft = null;
        sessionStorage.setItem('f_marketplace', JSON.stringify(f_data));
        setFlag(false);
        updateStorage();
    }
    useEffect(() => {
        if (!item || !address) return;
        let f_marketplace = sessionStorage.getItem('f_marketplace');
        if (!f_marketplace) return;
        let f_data = JSON.parse(f_marketplace);
        if (!f_data.nft) return;
        if (f_data.nft.itemCollection === item.itemCollection && f_data.nft.tokenId === item.tokenId) setFlag(true);
    }, [item]);

    return (
        <>{item && <div className="col">
            <div className="card nft-items rounded-md shadow overflow-hidden mb-1 p-3">
                <div className="d-flex justify-content-between">
                    <div className="badge badge-link bg-warning">
                        Not Supported
                    </div>
                    <div className="badge badge-link bg-muted">1 NFT</div>
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
                    <Link to={`/item-details/${item.itemCollection}/${item.tokenId}`} className="text-dark">
                        <Title>{item?.token.name}</Title>
                    </Link>
                    <br />
                    {flag ?
                        <button className="btn btn-warning w-100" onClick={func_unselect}>Selected</button>
                        : <button className="btn btn-muted w-100" onClick={func_select}>Select NFT</button>}
                </div>

            </div>
        </div>}</>

    )
}

export default NFT2;