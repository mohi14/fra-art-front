import React, { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';

function RecentActivity() {
  const { account, chainId, library } = useWeb3React();
  const [items, setItems] = useState([]);
  const fetchItems = () => {
    let query = `/api/user-activities/?user=${account}`;
    axios.get(query)
      .then(res => {
        setItems(res.data.items);
      }).catch(err => {
        setItems([]);
        console.log(err);
      })
  }
  useEffect(() => {
    if (!account) return;
    fetchItems()
  }, [account]);
  const dateFormat = (timestamp) => {
    let dateString = new Date(timestamp * 1000).toISOString().slice(0, 10) + " " + new Date(timestamp * 1000).toISOString().slice(11, 19);
    return dateString;
  }
  return (
		<>
			{account && items.length && (
				<div className='activity-content'>
					<PerfectScrollbar>
						<ul>
							{items.map((data, i) => (
								<li
									className='d-flex justify-content-between align-items-center'
									key={`dashboard-activity-${i}`}>
									<div className='d-flex align-items-center'>
										<div className='activity-user-img me-3'>
											<img
												src={data.item?.mainData}
												alt=''
												width='50'
												height='50'
											/>
										</div>
										<div className='activity-info'>
											<h5 className='mb-0'>
												{data.tokenId === -1
													? data.fraction.name
													: data.item.name}
											</h5>
											<p>
												{data.name === "Liked" && `Saved this item by you`}
												{data.name === "MarketListed" &&
													`Listed on marketplace by you for ${data.price} ETH`}
												{data.name === "AuctionListed" &&
													`Created an auction by you for ${data.price} ETH`}
												{data.name === "MarketDelisted" &&
													`Delisted from marketplace by you`}
												{data.name === "AuctionDelisted" &&
													`Cancelled an auction by you`}
												{(data.name === "MarketSold" ||
													data.name === "AuctionSold") &&
													`Purchased by you for ${data.price}`}
												{data.name === "CreateFixedFraction" &&
													`Created a Fixed Fractional NFT for ${data.price} ETH`}
											</p>
										</div>
									</div>
									<div className='text-end'>
										<span className=' text-muted'>
											{dateFormat(data.timestamp)}
										</span>
									</div>
								</li>
							))}
						</ul>
					</PerfectScrollbar>
				</div>
			)}
		</>
	);
}
export default RecentActivity;
