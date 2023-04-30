import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { iconGroup, ethereum, flashIcon, labelIcon } from '../utils/images.util';

const NFT_Fraction1 = (props) => {
    const { item } = props;
    const [ownership, setOwnerShip] = useState(0);
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        if (!item) return;
        for (let i = 0; i < item.holders.length; i++) {
            if (item.holders[i].account !== item.account) continue;
            let percentBalance = parseInt(item.holders[i].balance * 100 / item.fraction.supply);
            setOwnerShip(percentBalance);
            setBalance(item.holders[i].balance);
        }
    }, [item]);

    return (
			<>
				{item && (
					<div className='col'>
						<Link to={`/marketplace/details/${item.fraction.address}`}>
							<div className='card nft-items rounded-md shadow overflow-hidden mb-1 p-3'>
								<div className='d-flex justify-content-between'>
									<div className='img-group'>
										<div className='user-avatar'>
											<span className='badge badge-link bg-dark2'>
												<img
													src={iconGroup}
													alt='user'
													width={15}
													className='avatar-sm-sm rounded-circle'
												/>
												<span style={{ marginLeft: 10, fontWeight: 600 }}>
													{item.holders.length}
												</span>
											</span>
										</div>
									</div>
									<img src={ethereum} style={{ marginLeft: "5px" }} alt='' />
								</div>

								<div className='nft-image rounded-md mt-3 position-relative overflow-hidden'>
									<img
										src={item.item?.mainData}
										className='img-fluid'
										alt=''
										style={{ height: 250, width: "100%" }}
									/>

									<div className='position-absolute top-0 start-0 m-2'>
										<span className='badge badge-link bg-primary'>1 NFT</span>
									</div>
								</div>

								<div className='card-body content position-relative p-0 mt-3'>
									<div className='title text-dark h6'>{item.fraction.name}</div>
									<div
										className='text-dark'
										style={{ fontSize: 14, fontWeight: "bold" }}>
										Balance: {balance} {item.fraction.symbol}
									</div>
									<hr />
									<div style={{ textAlign: "center" }}>
										<div className='d-flex' style={{ alignItems: "center" }}>
											<div
												className='text-dark'
												style={{ fontSize: 12, paddingRight: 5 }}>
												Ownership
											</div>
											<div className='progress' style={{ width: "100%" }}>
												<div
													className='progress-bar'
													role='progressbar'
													style={{ width: `${ownership}%` }}
													aria-valuenow={`${ownership}`}
													aria-valuemin='0'
													aria-valuemax='100'></div>
											</div>
											<div
												className='text-dark'
												style={{ fontSize: 12, paddingLeft: 5 }}>
												{ownership}%
											</div>
										</div>
									</div>
								</div>
							</div>
						</Link>
					</div>
				)}
			</>
		);
}

export default NFT_Fraction1;