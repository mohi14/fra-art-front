import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiCheckCircle, FiShare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ClockItem from "../components/ClockItem";
import { shorter, ZERO_ADDRESS } from "../utils";
import "../components/styles/NFTStyles.css";
import { getTokenBalance } from "../utils/contracts";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import {
  aCallClaim,
  aCallRedeem,
  aCallBalanceOf,
  aCallBidder,
  aCallIsOwner,
  aCallBidRangeOf,
  aCallBidding,
  aCallCancel,
  pCreateOrder,
  pUpdateOrder,
  pCancelOrder,
  pExecuteOrder,
} from "../utils/fraction";
import {
  notFoundImg,
  ethereum,
  collectionDefault,
  userPlus,
  balancerIcon,
  uniswapIcon,
  sushiswapIcon,
} from "../utils/images.util";
import "./new.css";
const Title = styled.span`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
	display: inline-block;
	font-weight: bold;
`;
const DetailsAuctionFraction = (props) => {
	const { t } = useTranslation();
	const { item } = props;
	const { account, chainId, library } = useWeb3React();
	const [bidder, setBidder] = useState(ZERO_ADDRESS);
	const [isOwner, setIsOwner] = useState(false);
	const [minBidPrice, setMinBidPrice] = useState(0);
	const [maxBidPrice, setMaxBidPrice] = useState(0);
	const [snackBarMessage, setSnackBarMessage] = useState("");
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [balance, setBalance] = useState(0);
	const [eBalance, setEBalance] = useState(0);
	const [userBidPrice, setUserBidPrice] = useState(0);
	const [inRedeem, setInRedeem] = useState(false);
	const [inClaim, setInClaim] = useState(false);
	const [inBidding, setInBidding] = useState(false);

	const [myOrder, setMyOrder] = useState(null);
	const [orders, setOrders] = useState([]);
	const [cOrderAmount, setCOrderAmount] = useState(0);
	const [cOrderPrice, setCOrderPrice] = useState(0);
	const [bPayAmount, setBPayAmount] = useState(0);
	const [bReceiveTokens, setBReceiveTokens] = useState(0);
	const [uOrderAmount, setUOrderAmount] = useState(0);
	const [uOrderPrice, setUOrderPrice] = useState(0);
	const [inCOrder, setInCOrder] = useState(false);
	const [inUOrder, setInUOrder] = useState(false);
	const [inROrder, setInROrder] = useState(false);
	const [inBOrder, setInBOrder] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") return;
		setOpenSnackbar(false);
	};
	const handleError = (msg) => {
		setSnackBarMessage(msg);
		setOpenSnackbar(true);
	};
	useEffect(() => {
		if (!account || !item) return;
		aCallBalanceOf(item.address, account, chainId, library.getSigner())
			.then((res) => {
				if (res !== -1) {
					setBalance(res);
				}
			})
			.catch();
		aCallBidder(item.address, chainId, library.getSigner())
			.then((res) => setBidder(res))
			.catch((err) => setBidder(ZERO_ADDRESS));
		aCallIsOwner(item.address, account, chainId, library.getSigner())
			.then((res) => setIsOwner(res))
			.catch((err) => setIsOwner(false));
		aCallBidRangeOf(item.address, account, chainId, library.getSigner())
			.then((res) => {
				setMinBidPrice(parseFloat(res.minPrice.toFixed(5)));
				setMaxBidPrice(parseFloat(res.maxPrice.toFixed(5)));
				setUserBidPrice(parseFloat(res.minPrice.toFixed(5)));
			})
			.catch();
		// Define My BookOrder
		setOrders(item.orders);
		let mFlag = false;
		for (let i = 0; i < item.orders.length; i++) {
			if (account?.toLowerCase() === item.orders[i].seller) {
				mFlag = true;
				setMyOrder(item.orders[i]);
				setUOrderAmount(item.orders[i].bookAmount);
				setUOrderPrice(item.orders[i].bookPrice);
				break;
			}
		}
		if (!mFlag) {
			setMyOrder(null);
			setUOrderAmount(0);
			setUOrderPrice(0);
		}
		// Get ETH Balance
		getTokenBalance(account, "main", 18, chainId, library)
			.then((res) => {
				setEBalance(parseFloat(res));
			})
			.catch((err) => {
				console.log("ETH Balance Error: ", err.message);
				setEBalance(0);
			});
	}, [account, item]);
	const bidding = async () => {
		if (!account || !item) return;
		if (
			parseFloat(userBidPrice) > maxBidPrice ||
			parseFloat(userBidPrice) < minBidPrice
		) {
			handleError("Your bid price is not available.");
			return;
		}
		if (item.kickoff + item.duration < Date.now() / 1000) {
			handleError("The auction has endded already!");
			return;
		}
		setInBidding(true);
		aCallBidding(
			item.address,
			account,
			userBidPrice,
			chainId,
			library.getSigner()
		)
			.then((res) => {
				setInBidding(false);
				if (!res) {
					handleError("Your bid is failed to place!, please try again");
					return;
				}





				handleError("You placed a bid with new price successfully!");
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
				setInBidding(false);
			});
	};
	const redeem = async () => {
		if (!account || !item) return;
		console.log("Redeem: ", item.kickoff, item.duration, Date.now() / 1000);
		if (item.kickoff + item.duration > Date.now() / 1000) {
			handleError("You can redeem after auction is endded!");
			return;
		}
		setInRedeem(true);
		aCallRedeem(item.address, chainId, library.getSigner())
			.then((res) => {
				setInRedeem(false);
				if (res) {
					handleError("Redeem is success!");
					window.location.reload();
				} else {
					handleError("Redeem is failed!");
				}
			})
			.catch((err) => {
				console.log(err);
				setInRedeem(false);
			});
	};
	const claim = async () => {
		if (!account || !item) return;
		setInClaim(true);
		aCallClaim(item.address, chainId, library.getSigner())
			.then((res) => {
				setInClaim(false);
				if (res) {
					handleError("Claim is success!");
					window.location.reload();
				} else {
					handleError("Claim is failed!");
				}
			})
			.catch((err) => {
				console.log(err);
				setInClaim(false);
			});
	};
	const cancelAuction = async () => {
		if (!account || !item) return;
		setInRedeem(true);
		aCallCancel(item.address, chainId, library.getSigner())
			.then((res) => {
				setInRedeem(false);
				if (res) {
					handleError("You canceled your auction successfully!");
					window.location.reload();
				} else {
					handleError("Cancelling is failed!");
				}
			})
			.catch((err) => {
				console.log(err);
				setInRedeem(false);
			});
	};
	const set_cOrderAmount = (flag, value) => {
		value = parseFloat(value);
		if (flag) {
			value = (balance * value) / 100;
		} else {
			if (value > balance) value = balance;
		}
		setCOrderAmount(value);
	};
	const createOffer = async () => {
		if (!account || !item) return;
		let _bookAmount = parseFloat(cOrderAmount);
		if (isNaN(_bookAmount) || _bookAmount === 0 || _bookAmount > balance) {
			setSnackBarMessage("Invalid amount");
			setOpenSnackbar(true);
			return;
		}
		let _bookPrice = parseFloat(cOrderPrice);
		if (isNaN(_bookPrice) || _bookPrice <= 0) {
			setSnackBarMessage("Invalid price");
			setOpenSnackbar(true);
			return;
		}
		setInCOrder(true);
		pCreateOrder(
			false,
			item.address,
			_bookAmount,
			_bookPrice,
			account,
			chainId,
			library.getSigner()
		)
			.then((res) => {
				if (res) {
					setSnackBarMessage("Success to create your offer!");
					setOpenSnackbar(true);
					//send bid record to db
					axios.post('/api/bids', {
						isSold: false,
						address: item.address,
						bookAmount: _bookAmount,
						bookPrice: _bookPrice,
						account: account,
						chainId: chainId,
						signer: library.getSigner()
					  })
					  .then(response => {
						console.log(response.data);
					  })
					  .catch(error => {
						console.error(error);
					  });
					  
					setTimeout(() => {
						window.location.reload();
					}, 2000);
				} else {
					setSnackBarMessage("Failed to create your offer!");
					setOpenSnackbar(true);
				}
				setInCOrder(false);
			})
			.catch((err) => {
				console.log("pCreateOrder: ", err);
				setInCOrder(false);
			});
	};
	const set_uOrderAmount = (value) => {
		if (!myOrder) return;
		value = parseFloat(value);
		if (value > balance + myOrder.bookAmount)
			value = balance + myOrder.bookAmount;
		setUOrderAmount(value);
	};
	const updateOffer = async () => {
		if (!account || !item || !myOrder) return;
		let _bookAmount = parseFloat(uOrderAmount);
		if (
			isNaN(_bookAmount) ||
			_bookAmount === 0 ||
			_bookAmount > balance + myOrder.bookAmount
		) {
			setSnackBarMessage("Invalid amount");
			setOpenSnackbar(true);
			return;
		}
		let _bookPrice = parseFloat(uOrderPrice);
		if (isNaN(_bookPrice) || _bookPrice <= 0) {
			setSnackBarMessage("Invalid price");
			setOpenSnackbar(true);
			return;
		}
		setInUOrder(true);
		pUpdateOrder(
			false,
			myOrder.orderId,
			myOrder.bookToken,
			_bookAmount,
			_bookPrice,
			account,
			chainId,
			library.getSigner()
		)
			.then((res) => {
				if (res) {
					setSnackBarMessage("Success to update your offer!");
					setOpenSnackbar(true);
					setTimeout(() => {
						window.location.reload();
					}, 2000);
				} else {
					setSnackBarMessage("Failed to update your offer!");
					setOpenSnackbar(true);
				}
				setInUOrder(false);
			})
			.catch((err) => {
				console.log("pUpdateOrder: ", err);
				setInUOrder(false);
			});
	};
	const cancelOffer = () => {
		if (!account || !item || !myOrder) return;
		setInROrder(true);
		pCancelOrder(myOrder.orderId, chainId, library.getSigner())
			.then((res) => {
				if (res) {
					setSnackBarMessage("Success to cancel your offer!");
					setOpenSnackbar(true);
					setTimeout(() => {
						window.location.reload();
					}, 2000);
				} else {
					setSnackBarMessage("Failed to cancel your offer!");
					setOpenSnackbar(true);
				}
				setInROrder(false);
			})
			.catch((err) => {
				console.log("pCancelOrder: ", err);
				setInROrder(false);
			});
	};
	const set_bOrderAmount = (flag, value) => {
		if (orders.length === 0) return;
		let _bookAmount = orders[0].bookAmount;
		let _bookPrice = orders[0].bookPrice;
		let maxAmount = _bookAmount * _bookPrice;
		value = parseFloat(value);
		if (flag) {
			if ((eBalance * value) / 100 >= maxAmount) {
				setBPayAmount(maxAmount);
				setBReceiveTokens(_bookAmount);
			} else {
				let _reqAmount = (eBalance * value) / 100;
				setBPayAmount(_reqAmount);
				setBReceiveTokens(_reqAmount / _bookPrice);
			}
		} else {
			if (value >= maxAmount) {
				setBPayAmount(maxAmount);
				setBReceiveTokens(_bookAmount);
			} else {
				setBPayAmount(value);
				setBReceiveTokens(value / _bookPrice);
			}
		}
	};
	const executeOffer = () => {
		if (!account || !item || !orders.length) return;
		const order = orders[0];
		let _requireTokens = parseFloat(bReceiveTokens);
		if (
			isNaN(_requireTokens) ||
			_requireTokens === 0 ||
			_requireTokens > order.bookAmount
		) {
			setSnackBarMessage("Invalid amount");
			setOpenSnackbar(true);
			return;
		}
		let _bPayAmount = parseFloat(bPayAmount);
		if (isNaN(_bPayAmount) || _bPayAmount <= 0) {
			setSnackBarMessage("Invalid price");
			setOpenSnackbar(true);
			return;
		}
		setInBOrder(true);
		pExecuteOrder(
			order.orderId,
			_requireTokens,
			_bPayAmount,
			chainId,
			library.getSigner()
		)
			.then((res) => {
				if (res) {
					setSnackBarMessage("Success to buy Fractions!");
					//send post transaction/order data request to db
					const data = {
						orderId: order.orderId,
						requireTokens: _requireTokens,
						bPayAmount: _bPayAmount,
						chainId: chainId,
						signer: library.getSigner()
					};
					axios.post('/api/nft/order/create', data)
					.then(response => {
						console.log('Order created:', response.data);
					})
					.catch(error => {
						console.error('Error creating order:', error);
					});
					setOpenSnackbar(true);
					setTimeout(() => {
						window.location.reload();
					}, 2000);
				} else {
					setSnackBarMessage("Failed to buy Fractions!");
					setOpenSnackbar(true);
				}
				setInBOrder(false);
			})
			.catch((err) => {
				console.log("pExecuteOrder: ", err);
				setInBOrder(false);
			});
	};

	return (
		<section className='bg-item-detail d-table w-100'>
			{item && (
				<div className='container'>
					<div className='row'>
						<div className='d-flex flex-wrap flex-row flex-xs-column'>
							<div className='col-12 col-md-6 col-lg'>
								<div className='sticky-bar'>
									{!item.item ? (
										<img
											src={notFoundImg}
											className='img-fluid rounded-md shadow'
											alt=''
										/>
									) : (
										<div className='col-12 col-md-6'>
											<div className='detail-imgbox card nft-items rounded-md shadow overflow-hidden mb-1'>
												<div className='nft-image rounded-md position-relative overflow-hidden'>
													<Link
														to={`/item-details/${item.item.itemCollection}/${item.item.tokenId}`}>
														<img
															src={item.item?.mainData}
															className='detail-img img-fluid'
															alt=''
															style={{ width: "100%" }}
														/>
													</Link>
												</div>
												<div className='card-body content position-relative p-0 mt-3'>
													<Link
														to={`/item-details/${item.item.itemCollection}/${item.item.tokenId}`}
														className='text-dark'>
														<Title>{item.item?.name}</Title>
													</Link>
												</div>
											</div>
										</div>
									)}
									<div className='  col-12 d-flex flex-row flex-wrap justify-content-between hstack gap-3 mt-4 '>
										<button className='btn btn-pills btn-soft-primary'>
											<label>
												<img
													src={ethereum}
													style={{ paddingRight: 8 }}
													alt=''
												/>
											</label>
											Ethereum
										</button>
										<button className='btn btn-pills btn-soft-primary'>
											<span style={{ paddingRight: 8 }}>
												<FiShare />
											</span>
											Share
										</button>
										<button className='btn btn-pills btn-soft-primary'>
											<span style={{ paddingRight: 8 }}>
												<i className='uil uil-discord'></i>
											</span>
											Community
										</button>
									</div>
								</div>
							</div>

							<div className='col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0'>
								<div className='ms-lg-5'>
									<h5 className='text-dark d-flex align-items-center'>
										<FiCheckCircle
											style={{ marginRight: 10, color: "green" }}
										/>
										{t("verifiesByFA")} Auction
									</h5>
									<div className='title-heading'>
										<h4 className='h3 fw-bold mb-0'>{item.name}</h4>
									</div>
									<div className='hstack'>
										<h6>Auction Ending In</h6>
										<h6 className='ms-auto'>
											<ClockItem
												kickoff={item.kickoff}
												duration={item.duration}
											/>
										</h6>
									</div>
									<div className='row'>
										<div className='col-12 col-md gap-1 d-flex flex-row flex-wrap'>
											<div className='price-box col-md-4 mt-2'>
												<h6 className='text-left'>{t("reservePrice")}</h6>
												<h4 className='mb-0 text-gradient-primary'>
													<strong>
														{item.price} {process.env.REACT_APP_COIN}
													</strong>
												</h4>
											</div>
											<div className='price-box col-md-4 mt-2'>
												<h6 className='text-left'>{t("valuation")}</h6>
												<h4 className='mb-0 text-gradient-primary'>
													<strong>
														{item.price} {process.env.REACT_APP_COIN}
													</strong>
												</h4>
											</div>
											<div className='price-box col-md-4 mt-2'>
												<h6 className='text-left'>{t("supply")}</h6>
												<h4 className='mb-0 text-gradient-primary'>
													<strong>
														{item.supply} {item.symbol}
													</strong>
												</h4>
											</div>
										</div>
									</div>

									<div className='my-3'>
										<ul
											className='nav nav-tabs border-bottom'
											id='myTab'
											role='tablist'>
											{myOrder && (
												<li className='nav-item' role='presentation'>
													<button
														className='nav-link active'
														id='updateOffer-tab'
														data-bs-toggle='tab'
														data-bs-target='#updateOffer'
														type='button'
														role='tab'
														aria-controls='updateOffer'
														aria-selected='true'>
														Update offer
													</button>
												</li>
											)}
											{!myOrder && balance > 0 && (
												<li className='nav-item' role='presentation'>
													<button
														className={`nav-link ${!myOrder && "active"}`}
														id='createOffer-tab'
														data-bs-toggle='tab'
														data-bs-target='#createOffer'
														type='button'
														role='tab'
														aria-controls='createOffer'
														aria-selected='true'>
														Create offer
													</button>
												</li>
											)}
											{!myOrder && orders.length > 0 && (
												<li className='nav-item' role='presentation'>
													<button
														className={`nav-link ${
															!myOrder &&
															!balance &&
															orders.length > 0 &&
															"active"
														}`}
														id='fractions-tab'
														data-bs-toggle='tab'
														data-bs-target='#fractionsItem'
														type='button'
														role='tab'
														aria-controls='fractionsItem'
														aria-selected='true'>
														{t("buyFractions")}
													</button>
												</li>
											)}
											<li className='nav-item' role='presentation'>
												<button
													className={`nav-link ${
														!myOrder &&
														!balance &&
														orders.length === 0 &&
														"active"
													}`}
													id='bid-tab'
													data-bs-toggle='tab'
													data-bs-target='#bidTab'
													type='button'
													role='tab'
													aria-controls='bidTab'
													aria-selected='true'>
													{t("placeBid")}
												</button>
											</li>
											{(isOwner ||
												bidder?.toLowerCase() === account?.toLowerCase()) && (
												<li className='nav-item' role='presentation'>
													<button
														className='nav-link'
														id='manage-tab'
														data-bs-toggle='tab'
														data-bs-target='#manageTab'
														type='button'
														role='tab'
														aria-controls='manageTab'
														aria-selected='true'>
														Manage Auction
													</button>
												</li>
											)}
										</ul>

										<div className='tab-content mt-3'>
											{myOrder && (
												<div
													className={`tab-pane fade show active`}
													id='updateOffer'
													role='tabpanel'
													aria-labelledby='updateOffer-tab'>
													<div className='hstack mt-3 mb-3'>
														<p className='my-auto me-2'>{t("supply")}</p>
														<input
															className='ms-auto input-number input-no-border'
															type='number'
															style={{ border: "none", textAlign: "right" }}
															value={uOrderAmount}
															onChange={(event) =>
																set_uOrderAmount(event.target.value)
															}
														/>
													</div>
													<div className='hstack mb-3'>
														<p className='my-auto'>Price</p>
														<input
															className='ms-auto input-number input-no-border'
															type='number'
															style={{ border: "none", textAlign: "right" }}
															value={uOrderPrice}
															onChange={(event) =>
																setUOrderPrice(event.target.value)
															}
														/>
														<img
															src={ethereum}
															className='ms-2'
															alt='eth'
															width={24}
														/>
													</div>
													<div className='hstack mt-4 mb-3'>
														{inUOrder ? (
															<button className='btn btn-primary w-100 m-2'>
																Processing...
															</button>
														) : (
															<button
																className='btn btn-primary w-100 m-2'
																onClick={updateOffer}>
																Update Offer
															</button>
														)}
														{inROrder ? (
															<button className='btn btn-primary w-100 m-2'>
																Processing...
															</button>
														) : (
															<button
																className='btn btn-primary w-100 m-2'
																onClick={cancelOffer}>
																Cancel Offer
															</button>
														)}
													</div>
												</div>
											)}

											{!myOrder && balance > 0 && (
												<div
													className={`tab-pane fade ${
														!myOrder && "show active"
													}`}
													id='createOffer'
													role='tabpanel'
													aria-labelledby='createOffer-tab'>
													<div className='hstack mt-3 mb-3'>
														<p className='my-auto me-2'>{t("supply")}</p>
														<button
															className='badge badge-link bg-secondary'
															onClick={() => set_cOrderAmount(true, 100)}>
															USE MAX
														</button>
														<input
															className='ms-auto input-number input-no-border'
															type='number'
															style={{ border: "none", textAlign: "right" }}
															value={cOrderAmount}
															onChange={(event) =>
																set_cOrderAmount(false, event.target.value)
															}
														/>
													</div>
													<div className='hstack mt-3 mb-3'>
														<div className='row w-100'>
															<div className='col-md-3'>
																<button
																	className='badge badge-link bg-secondary w-100'
																	onClick={() => set_cOrderAmount(true, 10)}>
																	10%
																</button>
															</div>
															<div className='col-md-3'>
																<button
																	className='badge badge-link bg-secondary w-100'
																	onClick={() => set_cOrderAmount(true, 25)}>
																	25%
																</button>
															</div>
															<div className='col-md-3'>
																<button
																	className='badge badge-link bg-secondary w-100'
																	onClick={() => set_cOrderAmount(true, 50)}>
																	50%
																</button>
															</div>
															<div className='col-md-3'>
																<button
																	className='badge badge-link bg-secondary w-100'
																	onClick={() => set_cOrderAmount(true, 75)}>
																	75%
																</button>
															</div>
														</div>
													</div>
													<div className='hstack mb-3'>
														<p className='my-auto'>Price</p>
														<input
															className='ms-auto input-number input-no-border'
															type='number'
															style={{ border: "none", textAlign: "right" }}
															value={cOrderPrice}
															onChange={(event) =>
																setCOrderPrice(event.target.value)
															}
														/>
														<img
															src={ethereum}
															className='ms-2'
															alt='eth'
															width={24}
														/>
													</div>
													{inCOrder ? (
														<button className='btn btn-primary w-100 mt-4 mb-3'>
															Processing...
														</button>
													) : (
														<button
															className='btn btn-primary w-100 mt-4 mb-3'
															onClick={createOffer}>
															Create offer
														</button>
													)}
												</div>
											)}

											{!myOrder && orders.length > 0 && (
												<div
													className={`tab-pane fade ${
														!myOrder &&
														!balance &&
														orders.length > 0 &&
														"show active"
													}`}
													id='fractionsItem'
													role='tabpanel'
													aria-labelledby='fractions-tab'>
													<div className='hstack'>
														<h5>{t("You Pay")}</h5>
														<h5 className='ms-auto'>You Receive</h5>
														<p className='ms-auto'>
															{t("balance")}: {eBalance.toFixed(5)} ETH
														</p>
													</div>
													<div className='hstack gap-3'>
														<img src={ethereum} alt='eth' width={30} />
														<p className='my-auto'>ETH</p>
														<button
															className='badge badge-link bg-secondary'
															onClick={() => set_bOrderAmount(true, 100)}>
															USE MAX
														</button>
														<h5 className='ms-auto'>
															{bReceiveTokens.toFixed(5)}
														</h5>
														<input
															className='ms-auto input-number input-no-border'
															type='number'
															style={{ border: "none", textAlign: "right" }}
															value={bPayAmount.toFixed(5)}
															onChange={(event) =>
																set_bOrderAmount(false, event.target.value)
															}
														/>
													</div>
													<div className='hstack'>
														<p className='ms-auto'>
															$
															{(
																bPayAmount * process.env.REACT_APP_ETH_PRICE
															).toFixed(5)}
														</p>
													</div>
													<div className='hstack mb-3'>
														<div className='row w-100'>
															<div className='col-md-3'>
																<button
																	className='badge badge-link bg-secondary w-100'
																	onClick={() => set_bOrderAmount(true, 10)}>
																	10%
																</button>
															</div>
															<div className='col-md-3'>
																<button
																	className='badge badge-link bg-secondary w-100'
																	onClick={() => set_bOrderAmount(true, 25)}>
																	25%
																</button>
															</div>
															<div className='col-md-3'>
																<button
																	className='badge badge-link bg-secondary w-100'
																	onClick={() => set_bOrderAmount(true, 50)}>
																	50%
																</button>
															</div>
															<div className='col-md-3'>
																<button
																	className='badge badge-link bg-secondary w-100'
																	onClick={() => set_bOrderAmount(true, 75)}>
																	75%
																</button>
															</div>
														</div>
													</div>
													{inBOrder ? (
														<button className='btn btn-primary w-100 mb-3'>
															Processing...
														</button>
													) : (
														<button
															className='btn btn-primary w-100 mb-3'
															onClick={executeOffer}>
															{t("buyFractions")}
														</button>
													)}
												</div>
											)}

											<div
												id='bidTab'
												role='tabpanel'
												aria-labelledby='bid-tab'
												className={`tab-pane fade ${
													!myOrder &&
													!balance &&
													orders.length === 0 &&
													"show active"
												}`}>
												<p>
													You can place a bid with more than 10% cost than the
													highest bidder's cost. Also, only bidder can redeem
													the NFT to get. Others will get refuned their cost.
												</p>
												<div className='hstack'>
													<h5>Highest Bid</h5>
													<p className='ms-auto'>
														{item.bidder ? item.bidder.newPrice : item.price}{" "}
														{process.env.REACT_APP_COIN}
													</p>
												</div>
												<div className='hstack' style={{ marginTop: -20 }}>
													<p className='ms-auto' style={{ fontSize: 12 }}>
														$
														{(item.bidder ? item.bidder.newPrice : item.price) *
															process.env.REACT_APP_ETH_PRICE}
													</p>
												</div>
												<div className='hstack'>
													<h6>Minimum price</h6>
													<p className='ms-auto'>
														{minBidPrice} {process.env.REACT_APP_COIN}
													</p>
												</div>
												<div className='hstack'>
													<h6>Maximum price</h6>
													<p className='ms-auto'>
														{maxBidPrice} {process.env.REACT_APP_COIN}
													</p>
												</div>
												{!item.released && (
													<div className='mt-3 mb-3'>
														<label className='form-label'>Your Bid Price</label>
														<input
															type='number'
															className='form-control input-number'
															placeholder={`Bid price in ${process.env.REACT_APP_COIN}`}
															value={userBidPrice}
															onChange={(event) =>
																setUserBidPrice(event.target.value)
															}
														/>
													</div>
												)}
												{item.released ? (
													<>
														{inClaim ? (
															<button className='btn btn-primary w-100 mt-4 mb-3'>
																Processing...
															</button>
														) : balance > 0 ? (
															<button
																className='btn btn-primary w-100 mb-3'
																onClick={() => claim()}>
																{}CLAIM
															</button>
														) : (
															<></>
														)}
													</>
												) : (
													<>
														{inBidding ? (
															<button className='btn btn-primary w-100 mt-4 mb-3'>
																Processing...
															</button>
														) : (
															<button
																className='btn btn-primary w-100 mt-4 mb-3'
																onClick={() => bidding()}>
																Place Bid
															</button>
														)}
													</>
												)}
											</div>
											{(isOwner ||
												bidder?.toLowerCase() === account?.toLowerCase()) && (
												<div
													className='tab-pane fade'
													id='manageTab'
													role='tabpanel'
													aria-labelledby='manage-tab'>
													<div className='hstack'>
														<h5>Highest Bid</h5>
														<p className='ms-auto'>
															{item.price} {process.env.REACT_APP_COIN}
														</p>
													</div>
													{inRedeem ? (
														<button className='btn btn-primary w-100 mt-4 mb-3'>
															Processing...
														</button>
													) : (
														<>
															{isOwner && (
																<button
																	className='btn btn-primary w-100 mt-4 mb-3'
																	onClick={() => cancelAuction()}>
																	Cancel Auction
																</button>
															)}
															{bidder?.toLowerCase() ===
																account?.toLowerCase() && (
																<button
																	className='btn btn-primary w-100 mt-4 mb-3'
																	onClick={() => redeem()}>
																	Redeem Auction
																</button>
															)}
														</>
													)}
												</div>
											)}
										</div>
									</div>

									<div className='order-details mt-3'>
										<h5>{t("orderDetails")}</h5>
										<div
											className='rounded-md'
											style={{
												border: "1px solid rgba(255, 255, 255, 0.5)",
												padding: "15px 15px 0px 15px",
											}}>
											<div className='hstack gap-3'>
												<p>{t("myFractions")}</p>
												<p>{((balance / item.supply) * 100).toFixed(2)}%</p>
												<p className='ms-auto'>
													{balance.toFixed(5)} {item.symbol}
												</p>
											</div>
											<div className='hstack gap-3' style={{ marginTop: -15 }}>
												<p>{t("payAmount")}</p>
												<p>
													{(
														((item.supply - balance) / item.supply) *
														100
													).toFixed(2)}
													%
												</p>
												<p className='ms-auto'>
													{((item.supply - balance) * userBidPrice).toFixed(5)}{" "}
													{process.env.REACT_APP_COIN}
												</p>
											</div>
										</div>
									</div>

									<div className='row mt-4'>
										<div className='col-12'>
											<ul
												className='nav nav-tabs border-bottom'
												id='myTab2'
												role='tablist'>
												<li className='nav-item' role='presentation'>
													<button
														className='nav-link active'
														id='detail-tab'
														data-bs-toggle='tab'
														data-bs-target='#detailItem'
														type='button'
														role='tab'
														aria-controls='detailItem'
														aria-selected='true'>
														Orders
													</button>
												</li>
												<li className='nav-item' role='presentation'>
													<button
														className='nav-link'
														id='member-tab'
														data-bs-toggle='tab'
														data-bs-target='#memberItem'
														type='button'
														role='tab'
														aria-controls='memberItem'
														aria-selected='false'>
														Members ({item.holders.length})
													</button>
												</li>
												<li className='nav-item' role='presentation'>
													<button
														className='nav-link'
														id='contract-tab'
														data-bs-toggle='tab'
														data-bs-target='#contractInfo'
														type='button'
														role='tab'
														aria-controls='contractInfo'
														aria-selected='false'>
														Contract Info
													</button>
												</li>
											</ul>

											<div className='tab-content mt-3'>
												<div
													className='tab-pane fade show active'
													id='detailItem'
													role='tabpanel'
													aria-labelledby='detail-tab'>
													{orders.length ? (
														<div className='bg-light rounded'>
															<div className='row w-100 p-3'>
																<div className='col-md-4'>
																	<p className='text-dark my-auto text-center w-100'>
																		Seller
																	</p>
																</div>
																<div className='col-md-4'>
																	<p className='text-dark my-auto text-right w-100'>
																		Amount({item.symbol})
																	</p>
																</div>
																<div className='col-md-4'>
																	<p className='text-dark my-auto text-right w-100'>
																		Price({process.env.REACT_APP_COIN})
																	</p>
																</div>
															</div>
															{orders.map((order, index) => (
																<div
																	className='row align-items-center w-100 p-3 pt-0'
																	key={`book-order-${index}`}>
																	<div className='col-md-4'>
																		<Link className='my-auto' to={"/home"}>
																			<div className='d-flex align-items-center'>
																				<img
																					className=''
																					src={order.bookSeller.profilePic}
																					width={35}
																					style={{ borderRadius: 10 }}
																					alt=''
																				/>
																				<div className='text-dark p-2'>
																					{order.bookSeller.name}
																				</div>
																			</div>
																		</Link>
																	</div>
																	<div className='col-md-4'>
																		<p className='text-dark my-auto'>
																			{order.bookAmount}
																		</p>
																	</div>
																	<div className='col-md-4'>
																		<p className='text-dark my-auto'>
																			{order.bookPrice}
																		</p>
																	</div>
																</div>
															))}
														</div>
													) : (
														<div>
															There is not any offer to buy in fraction.
														</div>
													)}
												</div>
												<div
													className='tab-pane fade'
													id='memberItem'
													role='tabpanel'
													aria-labelledby='member-tab'>
													{item.holders.length > 0 ? (
														<div
															className='row justify-content-start'
															style={{
																height: "100%",
																maxHeight: 200,
																overflowY: "auto",
															}}>
															{item.holders.map((m, mi) => (
																<Link
																	to={`/profile/${m.holder.address}`}
																	className='col-12 d-flex align-items-center justify-content-between mb-2'
																	key={`member-${mi}`}>
																	<div className='d-flex align-items-center'>
																		<img
																			className=''
																			src={m.holder.profilePic}
																			width={35}
																			style={{ borderRadius: 10 }}
																			alt=''
																		/>
																		<div className='text-dark p-2'>
																			{m.holder.name}
																		</div>
																	</div>
																	<div className='text-dark'>
																		{((m.balance / item.supply) * 100).toFixed(
																			2
																		)}{" "}
																		%
																	</div>
																</Link>
															))}
														</div>
													) : (
														<>
															<img
																src={userPlus}
																width={50}
																className='mx-auto d-flex mb-3'
																alt=''
															/>
															<p className='text-muted text-center'>
																This pool is still empty.
																<br />
																Get it started and invite your friends!
															</p>
														</>
													)}
												</div>
												<div
													className='tab-pane fade'
													id='contractInfo'
													role='tabpanel'
													aria-labelledby='contract-tab'>
													<div className='hstack gap-3 mb-4'>
														<div className='hstack gap-3'>
															<img src={collectionDefault} width={50} alt='' />
															<p className='text-dark my-auto'>
																Collection
																<br />
																<strong style={{ maxWidth: 100 }}>
																	{item?.collection?.name}
																</strong>
															</p>
														</div>
														<Link
															to={`/profile/${item.seller}`}
															className='hstack gap-3'>
															<img
																src={item.sellerUser.profilePic}
																width={50}
																alt=''
															/>
															<p className='text-dark my-auto'>
																Seller
																<br />
																<strong>{item.sellerUser.name}</strong>
															</p>
														</Link>
													</div>
													<div className='hstack justify-content-between bg-light p-3 rounded'>
														<p className='text-dark my-auto'>
															{shorter(item.item.itemCollection)}
														</p>
														<p className='text-dark my-auto'>
															Token Id: {item.item.tokenId}
														</p>
														<p className='text-dark my-auto'>Edition: 1/1</p>
													</div>
													<div className='hstack gap-3 mt-2 mb-2'>
														<a
															className='btn btn-pills btn-soft-primary'
															href={`${process.env.REACT_APP_OPENSEA}${item.item.itemCollection}/${item.item.tokenId}`}
															target='_blank'
															rel='noreferrer'>
															View on OpenSea
														</a>
														<a
															className='btn btn-pills btn-soft-primary'
															href={`${process.env.REACT_APP_BLOCK_EXPLORER}address/${item.item.itemCollection}`}
															target='_blank'
															rel='noreferrer'>
															Block Explorer
														</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<h3 className='title-heading my-4'>
						<b>Liquidity Overview</b>
					</h3>
					<div
						className='p-4 mt-4 rounded-md'
						style={{ border: "1px solid rgba(255, 255, 255, 0.5)" }}>
						<h4 className='mb-1'>Limit Order</h4>
						<p className='text-dark lh-lg'>
							A limit order is a type of exchange order that allows traders to
							sell tokens at a specified price. A limit order will only be
							executed at the limit price. This stipulation allows traders to
							better control the prices they trade.
						</p>
						<div className='row gap-3 align-items-center'>
							<div className='col-md-auto hstack gap-1'>
								<img
									src={item.item?.mainData}
									alt=''
									width={50}
									style={{ borderRadius: 50 }}
								/>
								<img src={ethereum} alt='' width={50} />
							</div>

							<p className='col-md-auto'>
								<b>MTCAT/ETH</b>
								<br />
								Order Book
							</p>
							<p className='col-md-auto'>
								Total Tokens Locked
								<br />
								<b>5,000 MTCAT</b>
							</p>
							<p className='col-md-auto'>
								Token Average Price
								<br />
								<b>0.00004 ETH</b>
							</p>
							<p className='col-md-auto'>
								Total Cost
								<br />
								<b>0.2 ETH</b>
							</p>
							<button className='col-md-auto ms-auto btn btn-primary'>
								See All Orders
							</button>
						</div>
					</div>
					<div
						className='p-4 mt-4 rounded-md'
						style={{ border: "1px solid rgba(255, 255, 255, 0.5)" }}>
						<h4 className='mb-1'>AMM Liquidity Pools</h4>
						<p className='text-dark lh-lg'>
							Automated Market Maker (AMMs) allow digital assets to be traded
							without permission and automatically by using liquidity pools
							instead of a traditional market of buyers and sellers. On a
							traditional exchange platform, buyers and sellers offer up
							different prices for an asset.
						</p>
						<div className='row mt-4 gap-3 align-items-center'>
							<div className='col-md-auto hstack gap-1'>
								<img
									src={item.item?.mainData}
									alt=''
									width={50}
									style={{ borderRadius: "50%" }}
								/>
								<img src={ethereum} width={50} alt='image' />
							</div>
							<div className='col-md-auto'>
								<h5>
									<b>Liquidity Pool</b>
								</h5>
								<p>Choose an AMM to provide liquidity</p>
							</div>

							<div className='col-md-auto ms-auto'>
								<div className='row gap-2'>
									<button className='col-md-auto btn btn-secondary'>
										<img
											src={balancerIcon}
											width={20}
											alt=''
											style={{ marginRight: 10 }}
										/>
										Balancer
									</button>
									<button className='col-md-auto btn btn-secondary'>
										<img
											src={uniswapIcon}
											width={20}
											alt=''
											style={{ marginRight: 10 }}
										/>
										Uniswap V2
									</button>
									<button className='col-md-auto btn btn-secondary'>
										<img
											src={uniswapIcon}
											width={20}
											alt=''
											style={{ marginRight: 10 }}
										/>
										Uniswap V3
									</button>
									<button className='col-md-auto btn btn-secondary'>
										<img
											src={sushiswapIcon}
											width={20}
											alt=''
											style={{ marginRight: 10 }}
										/>
										Sushi Swap
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				open={openSnackbar}
				autoHideDuration={3000}
				onClose={handleClose}
				message={snackBarMessage}
				action={
					<React.Fragment>
						<IconButton
							size='small'
							aria-label='close'
							color='inherit'
							onClick={handleClose}>
							<CloseIcon fontSize='small' />
						</IconButton>
					</React.Fragment>
				}
			/>
		</section>
	);
};

export default DetailsAuctionFraction;
