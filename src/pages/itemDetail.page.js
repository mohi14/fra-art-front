import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { Snackbar, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Countdown from "react-countdown";
import { getTokenBalance, listItem, delistItem, buy, createAuction, finalizeAuction, bidOnAuction } from '../utils/contracts';
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./styles/item-details.style";

const ItemDetail = (props) => {
  const { collection, id } = useParams();
  const [item, setItem] = useState(null);
  const { account, chainId, library } = useWeb3React();
  const [balance, setBalance] = useState(0);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [bidPrice, setBidPrice] = useState(0);
  const [putType, setPutType] = useState('fixed');
  const [putPrice, setPutPrice] = useState(0);
  const [startType, setStartType] = useState('now');
  const [startDate, setStartDate] = useState(null);
  const [endType, setEndType] = useState('1');
  const [endDate, setEndDate] = useState(null);
  const [listingStatus, setListingStatus] = useState(false);
  const [delistingStatus, setDelistingStatus] = useState(false);
  const [buyingStatus, setBuyingStatus] = useState(false);
  const [creatingAuctionStatus, setCreatingAuctionStatus] = useState(false);
  const [endingAuctionStatus, setEndingAuctionStatus] = useState(false);
  const [biddingStatus, setBiddingStatus] = useState(false);

  useEffect(() => {
    if (!!account && !!library) {
      getTokenBalance(account, 'main', 18, chainId, library)
        .then((balance) => {
          setBalance(parseFloat(balance));
        })
        .catch((e) => {
          console.log("get token balance error: ", e);
          setBalance(0)
        })
    }
  }, [account, chainId, library]);
  function fetchItem() {
    axios.get(`/api/item/${collection}/${id}`)
      .then(res => {
        setItem(res.data.item)
      })
      .catch(err => {
        setItem(undefined)
      })
  }
  useEffect(() => {
    if (!item) {
      fetchItem();
    }
  }, [item]);
  function putOnMarketPlace() {
    if (putType === 'fixed') {
      putFixed()
    } else if (putType === 'timed') {
      putAuction()
    }
  }
  function putFixed() {
    if (putPrice <= 0) {
      setSnackBarMessage("Please input price correctly!")
      setOpenSnackbar(true)
      return
    }
    setListingStatus(true)

    listItem(
      item.itemCollection,
      account,
      item.tokenId,
      putPrice,
      chainId,
      library.getSigner()
    ).then((tokenId) => {
      if (tokenId) {
        axios.get(`/api/sync_block`)
          .then((res) => {
            setListingStatus(false);
            setSnackBarMessage("Success");
            setOpenSnackbar(true);
            window.location.href = `${process.env.REACT_APP_BASE_URL}/profile/${account}`;
            return true;
          })
          .catch((error) => {
            if (error.response) {
              setListingStatus(false);
              setSnackBarMessage(error.response.data.message);
              setOpenSnackbar(true);
            }
          });
      } else {
        setListingStatus(false);
        setSnackBarMessage("Failed Transaction");
        setOpenSnackbar(true);
      }
    });
  }
  function putAuction() {
    if (putPrice <= 0) {
      setSnackBarMessage("Please input price correctly!")
      setOpenSnackbar(true)
      return
    }
    const currentTime = new Date().getTime()

    let startTimeStamp = 0
    if (startType === 'specific') {
      if (!startDate) {
        setSnackBarMessage("Please select start time.")
        setOpenSnackbar(true)
        return
      }
      const startTime = startDate.getTime()
      if (currentTime >= startTime) {
        setSnackBarMessage("The start time must be after the current time.")
        setOpenSnackbar(true)
        return
      }
      startTimeStamp = Math.floor(startTime / 1000)
    } else {
      startTimeStamp = Math.floor(currentTime / 1000)
    }
    let endTimeStamp = 0
    if (endType === 'specific') {
      if (!endDate) {
        setSnackBarMessage("Please select end time.")
        setOpenSnackbar(true)
        return
      }
      const endTime = endDate.getTime()
      endTimeStamp = Math.floor(endTime / 1000)
      if (currentTime >= endTime) {
        setSnackBarMessage("The end time must be after the current time.")
        setOpenSnackbar(true)
        return
      }
      if (startTimeStamp >= endTimeStamp) {
        setSnackBarMessage("The end time must be after the start time.")
        setOpenSnackbar(true)
        return
      }
    } else {
      const later = Number(endType)
      endTimeStamp = startTimeStamp + 86400 * later
    }
    setCreatingAuctionStatus(true)
    createAuction(
      item.itemCollection,
      account,
      item.tokenId,
      putPrice,
      startTimeStamp,
      endTimeStamp,
      chainId,
      library.getSigner()
    ).then((tokenId) => {
      if (tokenId) {
        axios.get(`/api/sync_block`)
          .then((res) => {
            setCreatingAuctionStatus(false);
            setSnackBarMessage("Success");
            setOpenSnackbar(true);
            window.location.href = `${process.env.REACT_APP_BASE_URL}/profile/${account}`;
            return true;
          })
          .catch((error) => {
            if (error.response) {
              setCreatingAuctionStatus(false);
              setSnackBarMessage(error.response.data.message);
              setOpenSnackbar(true);
            }
          });
      } else {
        setCreatingAuctionStatus(false);
        setSnackBarMessage("Failed Transaction");
        setOpenSnackbar(true);
      }
    });
  }
  function endAuction() {
    setEndingAuctionStatus(true)
    finalizeAuction(
      item.auction.id,
      chainId,
      library.getSigner()
    ).then((result) => {
      if (result) {
        axios.get(`/api/sync_block`)
          .then((res) => {
            setEndingAuctionStatus(false);
            setSnackBarMessage("Success");
            setOpenSnackbar(true);
            window.location.href = `${process.env.REACT_APP_BASE_URL}/profile/${account}`;
            return true;
          })
          .catch((error) => {
            if (error.response) {
              setEndingAuctionStatus(false);
              setSnackBarMessage(error.response.data.message);
              setOpenSnackbar(true);
            }
          });
      } else {
        setEndingAuctionStatus(false);
        setSnackBarMessage("Failed Transaction");
        setOpenSnackbar(true);
      }
    });
  }
  function unlistItem() {
    setDelistingStatus(true);
    delistItem(
      item.pair.id,
      chainId,
      library.getSigner()
    ).then((result) => {
      if (result) {
        axios.get(`/api/sync_block`)
          .then((res) => {
            setDelistingStatus(false);
            setSnackBarMessage("Success");
            setOpenSnackbar(true);
            window.location.href = `${process.env.REACT_APP_BASE_URL}/profile/${account}`;
            return true;
          })
          .catch((error) => {
            if (error.response) {
              setDelistingStatus(false);
              setSnackBarMessage(error.response.data.message);
              setOpenSnackbar(true);
            }
          });
      } else {
        setDelistingStatus(false);
        setSnackBarMessage("Failed Transaction");
        setOpenSnackbar(true);
      }
    });
  }
  function buyItem() {
    if (balance < item.pair.price) {
      setSnackBarMessage("Your available balance is less than the price!")
      setOpenSnackbar(true)
      return
    }
    setBuyingStatus(true)
    buy(
      account,
      item.pair.id,
      item.pair.price,
      chainId,
      library.getSigner()
    ).then((tokenId) => {
      if (tokenId) {
        axios.get(`/api/sync_block`)
          .then((res) => {
            setBuyingStatus(false);
            setSnackBarMessage("Success");
            setOpenSnackbar(true);
            window.location.href = `${process.env.REACT_APP_BASE_URL}/profile/${account}`;
            return true;
          })
          .catch((error) => {
            if (error.response) {
              setBuyingStatus(false);
              setSnackBarMessage(error.response.data.message);
              setOpenSnackbar(true);
            }
          });
      } else {
        setBuyingStatus(false);
        setSnackBarMessage("Failed Transaction");
        setOpenSnackbar(true);
      }
    });
  }
  function placeBid() {
    if (!(item?.auction.bids) && (bidPrice - item.auction.price < 0)) {
      setSnackBarMessage("Your bid must be higher than minimum bid price!")
      setOpenSnackbar(true);
      return;
    }
    if ((item?.auction.bids?.length > 0) && (bidPrice - item.auction.price * 1.05 <= 0)) {
      setSnackBarMessage("Your bid must be 5% higher than current bid!")
      setOpenSnackbar(true)
      return;
    }
    if (balance - bidPrice < 0) {
      setSnackBarMessage("Your available balance is less than the bid price!")
      setOpenSnackbar(true)
      return;
    }
    setBiddingStatus(true);
    bidOnAuction(
      account,
      item.auction.id,
      bidPrice,
      chainId,
      library.getSigner()
    ).then((result) => {
      if (result) {
        axios.get(`/api/sync_block`)
          .then((res) => {
            setBiddingStatus(false);
            closePlaceBidModal()
            setSnackBarMessage("Success");
            setOpenSnackbar(true);
            fetchItem()
            return true;
          })
          .catch((error) => {
            if (error.response) {
              setBiddingStatus(false);
              setSnackBarMessage(error.response.data.message);
              setOpenSnackbar(true);
            }
          });
      } else {
        setBiddingStatus(false);
        setSnackBarMessage("Failed Transaction");
        setOpenSnackbar(true);
      }
    });

  }
  function closePlaceBidModal() {
    setBidPrice(0);
  }
  const handleCloseDialog = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  function fixPriceValidator(value) {
    // if (!isNaN(parseFloat(value)) && parseFloat(value) !== 0) value = parseFloat(value).toString();
    setPutPrice(value);
  }
  function bidPriceValidator(value) {
    // if (!isNaN(parseFloat(value)) && parseFloat(value) !== 0) value = parseFloat(value).toString();
    setBidPrice(value);
  }
  const dateFormat = (timestamp) => {
    let dateString = new Date(timestamp * 1000).toISOString().slice(0, 10) + " " + new Date(timestamp * 1000).toISOString().slice(11, 19);
    return dateString;
  }
  return (
    <>
      {item && <section className="bg-item-detail d-table w-100">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="sticky-bar">
                <img
                  src={item?.mainData}
                  className="img-fluid rounded-md shadow"
                  alt=""
                />
              </div>
            </div>

            <div className="col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0">
              <div className="ms-lg-5">
                <div className="title-heading">
                  <h4 className="h3 fw-bold mb-0">{item.name}</h4>
                </div>

                {item.auction &&
                  <div className="row">
                    <div className="col-md-6 mt-4 pt-2">
                      <h6>Highest Bid</h6>
                      <h4 className="mb-0">{item.auction.price} {process.env.REACT_APP_COIN}</h4>
                      <small className="mb-0 text-muted">$~ USD</small>
                    </div>

                    <div className="col-md-6 mt-4 pt-2">
                      <h6>Auction Ending In</h6>
                      <Countdown
                        date={item.auction.endTime * 1000}
                        renderer={({ days, hours, minutes, seconds }) => (
                          <span>
                            {days}:{hours}:{minutes}:{seconds}
                          </span>
                        )}
                      />
                    </div>
                  </div>
                }
                {/* <div className='row'>
                  <div className="col-12 mt-4 pt-2">
                    {
                      item && props.user && account ?
                        <>
                          {item.ownerUser.address.toLowerCase() === props.user.address.toLowerCase() ?
                            <>
                              {!item?.auction && !item?.pair && <button className="btn btn-l btn-pills btn-primary me-2"
                                onClick={() => { setPutPrice(0); document.getElementById("openPutOnMarketplace").click() }}>
                                <i className="mdi mdi-gavel fs-5 me-2"></i> Put on marketplace</button>}
                              {item?.auction && <button className="btn btn-l btn-pills btn-primary me-2"
                                onClick={() => { setPutPrice(0); document.getElementById("openEndAuction").click(); }}>
                                <i className="mdi mdi-gavel fs-5 me-2"></i> End Auction</button>}
                              {item?.pair && <button className="btn btn-l btn-pills btn-primary me-2"
                                onClick={() => { document.getElementById("openUnlistOnMarketplace").click(); }}>
                                <i className="mdi mdi-gavel fs-5 me-2"></i> Unlist on marketplace</button>}
                            </>
                            :
                            <>
                              {item?.auction && <button className="btn btn-l btn-pills btn-primary me-2"
                                onClick={() => { document.getElementById("openPlaceBid").click(); }}>
                                <i className="mdi mdi-cart fs-5 me-2"></i> Place a Bid</button>}
                              {item?.pair && <>
                                <button className="btn btn-l btn-pills btn-primary me-2"
                                  onClick={() => { document.getElementById("openBuyNow").click(); }}>
                                  <i className="mdi mdi-cart fs-5 me-2"></i> Buy now for {item.pair.price} {process.env.REACT_APP_COIN}</button>
                              </>}
                            </>
                          }
                        </>
                        : <></>
                    }
                  </div>
                </div> */}

                <div className="row mt-4 pt-2">
                  <div className="col-12">
                    <ul
                      className="nav nav-tabs border-bottom"
                      id="myTab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="detail-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#detailItem"
                          type="button"
                          role="tab"
                          aria-controls="detailItem"
                          aria-selected="true"
                        >
                          Details
                        </button>
                      </li>
                      {item.auction && <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="bids-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#bids"
                          type="button"
                          role="tab"
                          aria-controls="bids"
                          aria-selected="false"
                        >
                          Bids
                        </button>
                      </li>}

                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="activity-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#activity"
                          type="button"
                          role="tab"
                          aria-controls="activity"
                          aria-selected="false"
                        >
                          Activity
                        </button>
                      </li>
                    </ul>
                    {/* Details TabContent */}
                    <div className="tab-content mt-4 pt-2" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="detailItem"
                        role="tabpanel"
                        aria-labelledby="detail-tab"
                      >
                        <p className="text-muted">
                          {item.description}
                        </p>
                        <h6>Owner</h6>
                        <div className="creators creator-primary d-flex align-items-center">
                          <div className="position-relative">
                            <Link to={`/profile/${item.ownerUser.address}`} className="text-dark name">
                              <img
                                src={item.ownerUser.profilePic}
                                className="avatar avatar-md-sm shadow-md rounded-pill"
                                alt=""
                              />
                              <span className="verified text-primary">
                                <i className="mdi mdi-check-decagram"></i>
                              </span>
                            </Link>

                          </div>

                          <div className="ms-3">
                            <h6 className="mb-0">
                              <Link to={`/profile/${item.ownerUser.address}`} className="text-dark name">{item.ownerUser.name}</Link>
                            </h6>
                          </div>
                        </div>
                      </div>
                      {/* Bids TabContent */}
                      <div className="tab-pane fade" id="bids" role="tabpanel" aria-labelledby="bids-tab">
                        {item.auction?.bids && item.auction.bids.map((bid, idx) => (
                          <div className="creators creator-primary d-flex align-items-center mb-4" key={`bid-${idx}`}>
                            <div className="position-relative">
                              <Link to={`/account/${bid.fromUser.address}`} className="text-dark name">
                                <img src={bid.fromUser.profilePic} className="avatar avatar-md-sm shadow-md rounded-pill" alt="" />
                              </Link>
                            </div>

                            <div className="ms-3">
                              <h6 className="mb-0">
                                {bid.bidPrice} {process.env.REACT_APP_COIN} <span className="text-muted">by</span>{" "}
                                <Link to={`/account/${bid.fromUser.address}`} className="text-dark name">@{bid.fromUser.name}</Link>
                              </h6>
                              <small className="text-muted">{dateFormat(bid.timestamp)}</small>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Activities TabContent */}
                      <div className="tab-pane fade" id="activity" role="tabpanel" aria-labelledby="activity-tab">
                        <div className="row g-4">
                          {item.events?.map((data, idx) => {
                            return (
                              <div className="col-12" key={`activity-${idx}`}>
                                <div className="card activity activity-primary rounded-md shadow p-4">
                                  <div className="d-flex align-items-center">
                                    <div className="position-relative">
                                      {(data.name === 'Liked' || data.name === 'MarketListed' || data.name === 'AuctionListed') &&
                                        <Link to={`/profile/${data.userFrom.address}`}>
                                          <img src={data.userFrom.profilePic} className="avatar avatar-md-md rounded-md shadow-md" alt="" /></Link>}
                                      {(data.name === 'MarketDelisted' || data.name === 'AuctionDelisted' || data.name === 'MarketSold') &&
                                        <Link to={`/profile/${data.userTo.address}`}>
                                          <img src={data.userTo.profilePic} className="avatar avatar-md-md rounded-md shadow-md" alt="" /></Link>}
                                      <div className="position-absolute top-0 start-0 translate-middle px-1 rounded-lg shadow-md bg-white">
                                        {(data.name === "MarketSold" || data.name === 'AuctionSold') ? (
                                          <i className="mdi mdi-account-check mdi-18px text-success"></i>
                                        ) : data.name === "Liked" ? (
                                          <i className="mdi mdi-heart mdi-18px text-danger"></i>
                                        ) : (
                                          <i className="mdi mdi-format-list-bulleted mdi-18px text-warning"></i>
                                        )}
                                      </div>
                                    </div>
                                    <span className="content ms-3">
                                      <div className="text-dark title mb-0 h6 d-block">{dateFormat(data.timestamp)}</div>
                                      <small className="text-muted d-block mt-1">
                                        {data.name} &nbsp;
                                        {data.name === 'Liked' && <Link to={`/profile/${data.from}`} className="link fw-bold">@{data.userFrom.name}</Link>}
                                        {data.name === 'MarketListed' && <Link to={`/profile/${data.from}`} className="link fw-bold">@{data.userFrom.name}</Link>}
                                        {data.name === 'AuctionListed' && <Link to={`/profile/${data.from}`} className="link fw-bold">@{data.userFrom.name}</Link>}
                                        {data.name === 'MarketDelisted' && <Link to={`/profile/${data.to}`} className="link fw-bold">@{data.userTo.name}</Link>}
                                        {data.name === 'AuctionDelisted' && <Link to={`/profile/${data.to}`} className="link fw-bold">@{data.userTo.name}</Link>}
                                        {(data.name === 'MarketSold' || data.name === 'AuctionSold') && <Link to={`/profile/${data.to}`} className="link fw-bold">@{data.userTo.name}</Link>}
                                      </small>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>}

      {/* Modal for Put on Marketplace */}
      <button id="openPutOnMarketplace" className="btn btn-pills btn-primary d-none" data-bs-target="#PutOnMarketplace" data-bs-toggle="modal"></button>
      <div
        className="modal fade"
        id="PutOnMarketplace"
        aria-hidden="true"
        aria-labelledby="bidtitle"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content border-0 shadow-md rounded-md">
            <div className="modal-header">
              <h5 className="modal-title" id="bidtitle">Put on Marketplace</h5>
              <button
                type="button"
                className="btn btn-close"
                data-bs-dismiss="modal"
              >
                <i className="uil uil-times fs-4"></i>
              </button>
            </div>
            <div className="modal-body p-4">
              <S.PutTypes>
                <S.PutType onClick={() => setPutType('fixed')} className={putType === 'fixed' ? 'active' : ''}>
                  <i className='uil uil-tag-alt fs-1'></i>
                  <S.TypeLabel>Fixed price</S.TypeLabel>
                </S.PutType>
                <S.PutType onClick={() => setPutType('timed')} className={putType === 'timed' ? 'active' : ''}>
                  <i className='uil uil-stopwatch fs-1'></i>
                  <S.TypeLabel>Timed auction</S.TypeLabel>
                </S.PutType>
              </S.PutTypes>
              {
                putType === 'fixed' &&
                <S.Field>
                  <S.label>Price</S.label>
                  <S.InputContainer>
                    <S.Input type={"number"} placeholder={"Enter Price"} onChange={event => fixPriceValidator(event.target.value)}
                      value={putPrice}
                      onKeyPress={(event) => {
                        if (!/^[0-9]*(\.[0-9]{0,4})?$/.test(putPrice + event.key)) {
                          event.preventDefault();
                        }
                      }} />
                    <S.InputUnit>{process.env.REACT_APP_COIN}</S.InputUnit>
                  </S.InputContainer>
                </S.Field>
              }
              {
                putType === 'timed' &&
                <>
                  <S.Field>
                    <S.label>Minimum bid</S.label>
                    <S.InputContainer>
                      <S.Input type={"number"} placeholder={"Enter minimum bid"} onChange={event => fixPriceValidator(event.target.value)}
                        value={putPrice}
                        onKeyPress={(event) => {
                          if (!/^[0-9]*(\.[0-9]{0,4})?$/.test(putPrice + event.key)) {
                            event.preventDefault();
                          }
                        }} />
                      <S.InputUnit>{process.env.REACT_APP_COIN}</S.InputUnit>
                    </S.InputContainer>
                  </S.Field>
                  <S.SelectRow>
                    <S.SelectField style={{ padding: 0 }}>
                      <S.label>Starting Date</S.label>
                      <S.StartingDateSelect name={"starting_date"} defaultValue={startType} onChange={event => setStartType(event.target.value)}>
                        <S.OrderByOption value={"now"}>Right after listing</S.OrderByOption>
                        <S.OrderByOption value={"specific"}>Pick specific date</S.OrderByOption>
                      </S.StartingDateSelect>
                      {
                        startType === "specific" &&
                        <DatePicker
                          selected={startDate}
                          onChange={value => setStartDate(value)}
                          className={"input-picker"}
                          showTimeSelect
                          dateFormat="Pp"
                        />
                      }
                    </S.SelectField>
                    <S.SelectField style={{ padding: 0 }}>
                      <S.label>Expiration Date</S.label>
                      <S.StartingDateSelect name={"expiration_date"} defaultValue={endType} onChange={event => setEndType(event.target.value)}>
                        <S.OrderByOption value={"1"}>1 day</S.OrderByOption>
                        <S.OrderByOption value={"3"}>3 days</S.OrderByOption>
                        <S.OrderByOption value={"5"}>5 days</S.OrderByOption>
                        <S.OrderByOption value={"7"}>7 days</S.OrderByOption>
                        <S.OrderByOption value={"specific"}>Pick specific date</S.OrderByOption>
                      </S.StartingDateSelect>
                      {
                        endType === "specific" &&
                        <DatePicker
                          selected={endDate}
                          onChange={value => setEndDate(value)}
                          className={"input-picker"}
                          showTimeSelect
                          dateFormat="Pp"
                        />
                      }
                    </S.SelectField>
                  </S.SelectRow>
                </>
              }
            </div>
            <div className="modal-footer">
              {
                listingStatus || creatingAuctionStatus ? <button className='btn btn-pills btn-primary'>
                  <i className="uil-exclamation-circle fs-5 me-2"></i> <CircularProgress style={{ width: "16px", height: "16px", color: "white", }} /> </button>
                  : <button className='btn btn-pills btn-primary' onClick={() => putOnMarketPlace()}>
                    <i className="uil-exclamation-circle fs-5 me-2"></i> Confirm</button>
              }
            </div>
          </div>
        </div>
      </div>
      {/* Modal for Unlist on Marketplace */}
      <button id="openUnlistOnMarketplace" className="btn btn-pills btn-primary d-none" data-bs-target="#UnlistOnMarketplace" data-bs-toggle="modal"></button>
      <div
        className="modal fade"
        id="UnlistOnMarketplace"
        aria-hidden="true"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content border-0 shadow-md rounded-md">
            <div className="modal-header">
              <h5 className="modal-title" id="bidtitle">Unlist on Marketplace</h5>
              <button
                type="button"
                className="btn btn-close"
                data-bs-dismiss="modal"
              >
                <i className="uil uil-times fs-4"></i>
              </button>
            </div>
            <div className="modal-body p-4">
              Are you sure you want to unlist this item ?
            </div>
            <div className="modal-footer">
              {
                delistingStatus ? <button className='btn btn-pills btn-primary'><i className="uil-exclamation-circle fs-5 me-2"></i> &nbsp;
                  <CircularProgress style={{ width: "16px", height: "16px", color: "white", }} /> </button>
                  : <button className='btn btn-pills btn-primary' onClick={() => unlistItem()}>
                    <i className="uil-exclamation-circle fs-5 me-2"></i> Unlist</button>
              }
            </div>
          </div>
        </div>
      </div>
      {/* Modal for Buy now */}
      <button id="openBuyNow" className="btn btn-pills btn-primary d-none" data-bs-target="#NftBuynow" data-bs-toggle="modal"></button>
      <div
        className="modal fade"
        id="NftBuynow"
        aria-hidden="true"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content border-0 shadow-md rounded-md">
            <div className="modal-header">
              <h5 className="modal-title" id="buyNft">
                Checkout
              </h5>
              <button
                type="button"
                className="btn btn-close"
                data-bs-dismiss="modal"
                id="close-modal"
              >
                <i className="uil uil-times fs-4"></i>
              </button>
            </div>
            <div className="modal-body p-4">
              <form>
                <div className="row">
                  <div className="col-12">
                    <div className="mb-4">
                      <label className="form-label fw-bold">
                        Your Price <span className="text-danger">*</span>
                      </label>
                      <input
                        name="name"
                        id="name"
                        type="text"
                        className="form-control"
                        value={item?.pair?.price + " " + process.env.REACT_APP_COIN}
                        readOnly
                      />
                    </div>
                  </div>
                  {/*end col*/}
                </div>
              </form>

              <div className="bg-soft-danger p-3 rounded shadow">
                <div className="d-flex align-items-center">
                  <i className="uil uil-exclamation-circle h2 mb-0 me-2"></i>
                  <div className="flex-1">
                    <h6 className="mb-0">This creator is not verified</h6>
                    <small className="mb-0">
                      Purchase this item at your own risk
                    </small>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                {
                  buyingStatus ? <button className="btn btn-pills btn-primary w-100"><i className="mdi mdi-cart fs-5 me-2"></i> &nbsp;
                    <CircularProgress style={{ width: "16px", height: "16px", color: "white", }} /></button>
                    : <button className="btn btn-pills btn-primary w-100" onClick={() => buyItem()}><i className="mdi mdi-cart fs-5 me-2"></i> Continue</button>
                }

                <form>
                  <div className="form-check align-items-center d-flex mt-2">
                    <input
                      className="form-check-input mt-0"
                      type="checkbox"
                      id="AcceptT&C"
                    />
                    <label className="form-check-label text-muted ms-2" htmlFor="AcceptT&C">
                      I Accept{" "}
                      <a href="" onClick={(e) => e.preventDefault()} className="text-primary">Terms And Condition</a>
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for End Auction */}
      <button id="openEndAuction" className="btn btn-pills btn-primary d-none" data-bs-target="#EndAuction" data-bs-toggle="modal"></button>
      <div
        className="modal fade"
        id="EndAuction"
        aria-hidden="true"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content border-0 shadow-md rounded-md">
            <div className="modal-header">
              <h5 className="modal-title" id="bidtitle">End Auction</h5>
              <button
                type="button"
                className="btn btn-close"
                data-bs-dismiss="modal"
              >
                <i className="uil uil-times fs-4"></i>
              </button>
            </div>
            <div className="modal-body p-4">
              Are you sure you want to unlist this auction ?
            </div>
            <div className="modal-footer">
              {
                endingAuctionStatus ? <button className='btn btn-pills btn-primary'><i className="uil-exclamation-circle fs-5 me-2"></i> &nbsp;
                  <CircularProgress style={{ width: "16px", height: "16px", color: "white", }} /> </button>
                  : <button className='btn btn-pills btn-primary' onClick={() => endAuction()}>
                    <i className="uil-exclamation-circle fs-5 me-2"></i> End Auction</button>
              }
            </div>
          </div>
        </div>
      </div>
      {/* Modal for Place a bid */}
      <button id="openPlaceBid" className="btn btn-pills btn-primary d-none" data-bs-target="#PlaceBid" data-bs-toggle="modal"></button>
      <div
        className="modal fade"
        id="PlaceBid"
        aria-hidden="true"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content border-0 shadow-md rounded-md">
            <div className="modal-header">
              <h5 className="modal-title" id="bidtitle">
                Place a Bid
              </h5>
              <button
                type="button"
                className="btn btn-close"
                data-bs-dismiss="modal"
                id="close-modal"
              >
                <i className="uil uil-times fs-4"></i>
              </button>
            </div>
            <div className="modal-body p-4">
              <form>
                <div className="row">
                  <div className="col-12">
                    <div className="mb-4">
                      <label className="form-label fw-bold">
                        Your Bid Price <span className="text-danger">*</span>
                      </label>
                      <input
                        type={"number"}
                        value={bidPrice}
                        onChange={event => bidPriceValidator(event.target.value)}
                        className="form-control"
                        placeholder="00.00 ETH"
                      />
                      <small className="text-muted">
                        <span className="text-dark">Note:</span> Bid price at least {item?.auction?.price} {process.env.REACT_APP_COIN} + 5%
                      </small>
                    </div>
                  </div>
                </div>
              </form>

              <div className="pt-3 border-top">
                <div className="d-flex justify-content-between">
                  <p className="fw-bold small"> You must bid at least:</p>
                  <p className="text-primary"> {item?.auction?.price * 1.05} {process.env.REACT_APP_COIN} </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {
                biddingStatus ? <button className='btn btn-pills btn-primary'><i className="mdi mdi-gavel fs-5 me-2"></i> &nbsp;
                  <CircularProgress style={{ width: "16px", height: "16px", color: "white", }} /> </button>
                  : <button className='btn btn-pills btn-primary' onClick={() => placeBid()}>
                    <i className="mdi mdi-gavel fs-5 me-2"></i> Place a Bid</button>
              }
            </div>
          </div>
        </div>
      </div>
      {/* Notification */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseDialog}
        message={snackBarMessage}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseDialog}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
};

export default ItemDetail;
