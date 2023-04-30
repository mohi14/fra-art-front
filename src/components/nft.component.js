import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import axios from 'axios';
import "./styles/NFTStyles.css";

const NFT = (props) => {
    const { item } = props;
    const [auctionStatus, setAuctionStatus] = useState(false);
    const [auctionStatusMessage, setAuctionStatusMessage] = useState('');
    const [likeStatus, setLikeStatus] = useState(false);
    const { account } = useWeb3React();
    const actionLike = () => {
        if (!account || !item) return;
        let query = `/api/item/like`;
        let data = {
            address: account?.toLowerCase(),
            collection: item.itemCollection,
            tokenId: item.tokenId
        };
        axios.post(query, data).then(res => {
            setLikeStatus(res.data.likeStatus);
        }).catch(err => { })
    }
    useEffect(() => {
        if (!item || !account) return;
        if (item.likes.includes(account?.toLowerCase())) setLikeStatus(true);
        else setLikeStatus(false);
    }, [])

    useEffect(() => {
        if (item?.auction) {
            const currentTimestamp = new Date().getTime();
            if (item.auction.startTime * 1000 > currentTimestamp) {
                setAuctionStatusMessage('Auction has not started');
                setAuctionStatus(false);
            } else if (item.auction.endTime * 1000 > currentTimestamp) {
                setAuctionStatus(true);
                setAuctionStatusMessage('');
            } else {
                setAuctionStatusMessage('Auction has ended');
                setAuctionStatus(false);
            }
        }
    }, []);
    return (
			<>
				{item && (
					<div className='col'>
						<div className='card nft-items nft-primary rounded-md shadow overflow-hidden mb-1 p-3'>
							<div className='d-flex justify-content-between'>
								<div className='img-group'>
									<Link
										to={`/profile/${item.ownerUser.address}`}
										className='user-avatar'>
										<img
											src={item.ownerUser.profilePic}
											alt='user'
											className='avatar avatar-sm-sm img-thumbnail border-0 shadow-sm rounded-circle'
										/>
									</Link>
								</div>
								<span className='like-icon shadow-sm'>
									{likeStatus ? (
										<div
											onClick={() => actionLike()}
											className='text-muted icon-active'>
											<i className='mdi mdi-18px mdi-heart mb-0'></i>
										</div>
									) : (
										<div
											onClick={() => actionLike()}
											className='text-muted icon'>
											<i className='mdi mdi-18px mdi-heart mb-0'></i>
										</div>
									)}
								</span>
							</div>

							<div className='nft-image rounded-md mt-3 position-relative overflow-hidden'>
								<Link
									to={`/item-details/${item.itemCollection}/${item.tokenId}`}>
									<img src={item?.mainData} className='img-fluid' alt='' />
								</Link>
								<div className='position-absolute top-0 start-0 m-2'>
									<a
										href=''
										onClick={(e) => e.preventDefault()}
										className='badge badge-link bg-primary'>
										1 NFT
									</a>
								</div>
								<div
									className={`${
										item.auction ? "" : "hide-data"
									} position-absolute bottom-0 start-0 m-2 bg-gradient-primary text-white title-dark rounded-pill px-3`}>
									<i className='uil uil-clock'></i> &nbsp;
									<Countdown
										date={
											item.auction?.endTime ? item.auction.endTime * 1000 : 0
										}
										renderer={({ days, hours, minutes, seconds }) => (
											<span>
												{days}:{hours}:{minutes}:{seconds}
											</span>
										)}
									/>
								</div>
							</div>

							<div className='card-body content position-relative p-0 mt-3'>
								<Link
									to={`/item-details/${item.itemCollection}/${item.tokenId}`}
									className='title text-dark h6'>
									{item.name}
								</Link>

								<div className='d-flex justify-content-between mt-2'>
									{item.pair ? (
										<small className='rate fw-bold'>
											<span>Price: </span>
											<span>
												{item.pair.price} {process.env.REACT_APP_COIN}
											</span>
										</small>
									) : item.auction ? (
										<small className='rate fw-bold'>
											<span>Highest Bid: </span>
											<span>
												{item.auction.price} {process.env.REACT_APP_COIN}
											</span>
										</small>
									) : (
										<small className='rate fw-bold'>Not for sale</small>
									)}
									<small className='text-dark fw-bold'>1</small>
								</div>
							</div>
						</div>
					</div>
				)}
			</>
		);
}

export default NFT;