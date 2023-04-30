import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useWeb3React } from '@web3-react/core';
import { ethereum, polygon, arrowRight } from "../utils/images.util";
import axios from "axios";
import DatePicker from 'react-datepicker';
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { notFoundImg } from "../utils/images.util";
import NFT2 from "../components/nft2.component";
import "../components/styles/NFTStyles.css";
import { isApprovedFractionalizer, isApprovedAuctionFractionalizer, setApproveFractionalizer, setApproveAuctionFractionalizer, callFractionalize, callAuctionFractionalize } from "../utils/fraction";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./styles/item-details.style";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
const Title = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    display: inline-block;
    font-weight: bold;
`;

const CreateFractionalNFT = (props) => {
  const { t } = useTranslation();
  const { account, chainId, library } = useWeb3React();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [noItems, setNoItems] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialItemsLoaded, setInitialItemsLoaded] = useState(true);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [step, setStep] = useState(1);
  useEffect(() => {
    if (account) {
      fetchItems('owned', page);
    }
  }, [account, page]);
  const fetchItems = (name, page) => {
    let query = `/api/item/?owner=${account}&page=${page}&owned=true`;
    setLoading(true);
    axios.get(query)
      .then(res => {
        setLoading(false);
        initialItemsLoaded ? setItems(res.data.items) : setItems(items.concat(res.data.items));
        if (res.data.items.length === 0) setNoItems(true);
      }).catch(err => {
        setLoading(false);
        setItems([]);
        setNoItems(true);
        console.log(err);
      })

  }

  const clickStep = (num) => {
    if (!account) return;
    setStep(num);
    let f_marketplace = sessionStorage.getItem('f_marketplace');
    if (!f_marketplace) sessionStorage.setItem('f_marketplace', JSON.stringify({
      address: account?.toLowerCase(), nft: null, step: 1,
      vault: { name: '', symbol: '', price: 0, supply: 0 },
      type: 'fixed'
    }));
    else {
      let f_data = JSON.parse(f_marketplace);
      if (account?.toLowerCase() !== f_data.address) return;
      f_data.step = num;
      sessionStorage.setItem('f_marketplace', JSON.stringify(f_data));
    }
  }
  useEffect(() => {
    checkStorage();
  }, [account]);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  function loadMore() {
    if (!loading) {
      setInitialItemsLoaded(false);
      setPage(page + 1);
    }
  }
  const handleError = (msg) => {
    setSnackBarMessage(msg);
    setOpenSnackbar(true);
  }
  // Second page
  const [type2, setType2] = useState('auction');
  const [name2, setName2] = useState('');
  const [symbol2, setSymbol2] = useState('');
  const [price2, setPrice2] = useState('');
  const [supply2, setSupply2] = useState('');
  const [startType, setStartType] = useState('now');
  const [startDate, setStartDate] = useState(null);
  const [endType, setEndType] = useState('1');
  const [endDate, setEndDate] = useState(null);
  const [step3, setStep3] = useState(false);
  const [feeFlag, setFeeFlag] = useState(false);
  const [inFractionalize, setInFractionalize] = useState(false);
  const [inApprove, setInApprove] = useState(false);







  useEffect(() => {

    if (!selectedItem) { setStep3(false); return; }
    if (!name2) { setStep3(false); return; }
    if (!symbol2) { setStep3(false); return; }
    if (!price2 || parseFloat(price2) <= 0) { setStep3(false); return; }
    if (!supply2 || parseInt(supply2) < 1) { setStep3(false); return; }
    setStep3(true);
    let f_marketplace = sessionStorage.getItem('f_marketplace');
    let f_data = JSON.parse(f_marketplace);
    if (account?.toLowerCase() !== f_data.address) return;
    f_data.vault.name = name2;
    f_data.vault.symbol = symbol2;
    f_data.vault.price = price2;
    f_data.vault.supply = supply2;
    f_data.type = type2;
    sessionStorage.setItem('f_marketplace', JSON.stringify(f_data));
  }, [type2, name2, symbol2, price2, supply2, selectedItem]);

  const checkApproval = async () => {
    if (!account || step !== 3) return;
    let _flag = true;
    if (type2 === 'auction') {
      let isApproved = await isApprovedAuctionFractionalizer(selectedItem.itemCollection, selectedItem.tokenId, chainId, library.getSigner());
      if (isApproved) selectedItem.isApproved = true;
      else _flag = false;
    } else {
      let isApproved = await isApprovedFractionalizer(selectedItem.itemCollection, selectedItem.tokenId, chainId, library.getSigner());
      if (isApproved) selectedItem.isApproved = true;
      else _flag = false;
    }
    setSelectedItem(selectedItem);
    setFeeFlag(_flag);
  }
  useEffect(() => {
    checkApproval();
  }, [account, step]);
  const onApprove = async (collection, tokenId) => {
    if (!account) return;
    setInApprove(true);
    if (type2 === 'auction') {
      const res = await setApproveAuctionFractionalizer(collection, tokenId, chainId, library.getSigner());
      setInApprove(false);
      if (res) {
        handleError("NFT Token is approved successfully!");
        checkApproval();
      } else handleError("Approving is failed!");
    } else {
      const res = await setApproveFractionalizer(collection, tokenId, chainId, library.getSigner());
      setInApprove(false);
      if (res) {
        handleError("NFT Token is approved successfully!");
        checkApproval();
      } else handleError("Approving is failed!");
    }
  }
  const checkStorage = () => {
    let f_marketplace = sessionStorage.getItem('f_marketplace');
    if (!f_marketplace) return;
    let f_data = JSON.parse(f_marketplace);
    if (account?.toLowerCase() !== f_data.address) {
      sessionStorage.removeItem("f_marketplace");
      return;
    }
    setSelectedItem(f_data.nft);
    setStep(parseInt(f_data.step));
    setName2(f_data.vault.name);
    setSymbol2(f_data.vault.symbol);
    setPrice2(f_data.vault.price);
    setSupply2(f_data.vault.supply);
    setType2(f_data.type);
  }
  const onFractionalize = async () => {
    setInFractionalize(true);
    let _target = selectedItem.itemCollection;
    let _tokenId = selectedItem.tokenId;
    if (type2 === 'fixed') {
      callFractionalize(_target, _tokenId, name2, symbol2, supply2, price2, chainId, library.getSigner()).then(res => {
        if (res) {
          handleError("Fractionalizing is success!");
          //post data to backend db
          axios.post('/api/nfts', {
            // address: 'ssdfasfasfasdadfsadfsafasdfasdfs',
            // txhash: 'asfasfasdfasdf',
            name: name2,
            symbol: symbol2,
            supply: supply2,
            price: price2,
            target: _target,
            tokenId: _tokenId,
            // released: false,
            // seller: ,
            // flag: false,
            // kickoff: 0,
            duration: 0,
            fee: 0
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
          
          sessionStorage.removeItem('f_marketplace');
          window.location.href = `/profile/${account}`
        } else handleError("Fractionalizing is failed!");
        setInFractionalize(false);
      }).catch(err => { console.log(err); setInFractionalize(false); })
    } else if (type2 === 'auction') {
      const currentTime = new Date().getTime()
      let startTimeStamp = 0
      if (startType === 'specific') {
        if (!startDate) {
          handleError("Please select start time.");
          setInFractionalize(false);
          return;
        }
        const startTime = startDate.getTime()
        if (currentTime >= startTime) {
          handleError("The start time must be after the current time.");
          setInFractionalize(false);
          return;
        }
        startTimeStamp = Math.floor(startTime / 1000)
      } else {
        startTimeStamp = Math.floor(currentTime / 1000)
      }
      let endTimeStamp = 0
      if (endType === 'specific') {
        if (!endDate) {
          handleError("Please select end time.");
          setInFractionalize(false);
          return;
        }
        const endTime = endDate.getTime()
        endTimeStamp = Math.floor(endTime / 1000)
        if (currentTime >= endTime) {
          handleError("The end time must be after the current time.");
          setInFractionalize(false);
          return;
        }
      } else {
        const later = Number(endType);
        endTimeStamp = startTimeStamp + 86400 * later;
      }
      const durationTimestamp = endTimeStamp - startTimeStamp;
      if (durationTimestamp < 1800) {
        handleError("The end time must be more than 30min than the start time.");
        setInFractionalize(false);
        return;
      }

     
      callAuctionFractionalize(_target, _tokenId, name2, symbol2, supply2, price2, startTimeStamp, durationTimestamp, chainId, library.getSigner()).then(res => {
        if (res) {
          handleError("Fractionalizing is success!");
          sessionStorage.removeItem('f_marketplace');
          window.location.href = `/profile/${account}`
        } else handleError("Fractionalizing is failed!");
        setInFractionalize(false);
      }).catch(err => { console.log(err); setInFractionalize(false); })
    }
  }
  return (
    <>
      <section className="bg-half-100 w-100 pb-0 mb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
            <Button className=" text-left d-block mb-4" variant="primary">
               {t("fractionalizeNFT")}
            </Button>
              {/* <h4 className="text-dark title-dark fw-normal">
                {t("fractionalizeNFT")}
              </h4> */}
            </div>
            <div className="col-lg-4">
              {/* <div className="hstack gap-3 justify-content-end">
                <button className="btn btn-soft-primary">
                  <img src={ethereum} style={{ paddingRight: "15px" }}  alt="image"/>
                  Ethereum
                </button>
                <button className="btn btn-soft-primary">
                  <img src={polygon} style={{ paddingRight: "15px" }}  alt="image"/>
                  Polygon
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <section className="section pb-5">
        <div className="container">
          <div className="hstack justify-content-center gap-4">
            <button
              className={step === 1 ? "text-dark" : "text-muted"}
              disabled={!account}
              onClick={() => clickStep(1)}
              style={{
                all: "none",
                cursor: "pointer",
                border: " none",
                background: "transparent",
              }}
            >
              <span
                className={
                  step === 1
                    ? "badge bg-primary"
                    : step === 2 || step === 3
                      ? "badge bg-success"
                      : "badge bg-dark2"
                }
                style={{
                  fontSize: 20,
                  borderRadius: "50%",
                  width: 30,
                  marginRight: 15,
                }}
              >
                1
              </span>
              Select NFTs
            </button>
            <img src={arrowRight} height={20}  alt="image"/>
            <button
              className={step === 2 ? "text-dark" : "text-muted"}
              disabled={!account || !selectedItem}
              onClick={() => clickStep(2)}
              style={{
                all: "none",
                cursor: "pointer",
                border: " none",
                background: "transparent",
              }}
            >
              <span
                className={
                  step === 2
                    ? "badge bg-primary"
                    : step === 3 ? "badge bg-success" : "badge bg-dark2"
                }
                style={{
                  fontSize: 20,
                  borderRadius: "50%",
                  width: 30,
                  marginRight: 15,
                }}
              >
                2
              </span>
              Settings
            </button>
            <img src={arrowRight} height={20}  alt="image"/>
            <button
              className={step === 3 ? "text-dark" : "text-muted"}
              style={{ all: "none", cursor: "pointer", border: " none", background: "transparent" }}
              disabled={!account || !step3}
              onClick={() => clickStep(3)}
            >
              <span
                className={step === 3 ? "badge bg-primary" : "badge bg-dark2"}
                style={{
                  fontSize: 20,
                  borderRadius: "50%",
                  width: 30,
                  marginRight: 15,
                }}
              >
                3
              </span>
              Fees
            </button>
          </div>
        </div>
      </section>
     
      <section className="section pt-0">
        {!account && <section className="section pt-0">
          <div className="container text-center">
            <p style={{ fontSize: 18 }}>
              Please connect your wallet
              <br />
              <span style={{ fontSize: 14 }}>
                To fractionalize a NFT you should connect the wallet
              </span>
            </p>
            <button
              className="btn btn-soft-primary"
              onClick={props.connectAccount}
            >
              Connect Wallet
            </button>
          </div>
        </section>}
        {account && step === 1 && <>
          <section className="section pt-0" style={{ paddingBottom: 40 }}>
            <div
              className="rounded-md p-3 container text-center"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
              <p style={{ fontSize: 18 }}>
                There are no NFTs in your wallet!
                <br />
                <span style={{ fontSize: 15 }}>What you could do</span>
              </p>
              <div className="row justify-content-center text-center">
                <div className="col-xl-4 col-md-5">
                  <ul
                    style={{
                      fontSize: 15,
                      listStylePosition: "inside",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    <li>Check your network (Polygon, Ethereum, etc)</li>
                    <li>Refresh the page</li>
                    <li>Check if your wallet is connected</li>
                    <li>
                      Or <span className="text-primary">buy</span> ur first
                      NFT!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <div className="container mt-4 pt-2 mt-lg-0 pt-lg-0">
            <div className="d-flex justify-content-between mb-3">
              <h4>{selectedItem ? 'Selected a NFT' : 'You should select a NFT'}</h4>
              {selectedItem ? <button className="btn btn-primary rounded-md" onClick={() => clickStep(2)}> Next 🠮 </button>
                : <button className="btn btn-muted rounded-md" style={{ cursor: 'no-drop' }}> Next 🠮 </button>}
            </div>
            <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4">
              {items.map((data, index) => {
                return (
                  <NFT2 item={data} updateStorage={checkStorage} address={account} handleError={handleError} key={`fractional-step1-${index}`} />
                );
              })}
            </div>
          </div>

          {/* Load More */}
          <div className="mt-4 text-center" style={{ display: noItems ? "none" : "" }}>
            <button className="btn btn-pills btn-primary mx-1" onClick={() => loadMore()}>
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        </>}
        {account && step >= 2 && <div className="container text-center">
          <div className="row">
            <div className="col-md-6 text-center">
              <div className="sticky-bar p-3" style={{}}>
                {!selectedItem ? <img
                  src={notFoundImg}
                  className="img-fluid rounded-md shadow"
                  alt=""
                /> : <div className="col">
                  <div className="card nft-items rounded-md shadow overflow-hidden mb-1">
                    <div className="nft-image rounded-md position-relative overflow-hidden">
                      <Link to={`/item-details/${selectedItem.itemCollection}/${selectedItem.tokenId}`}>
                        <img src={selectedItem?.mainData} className="img-fluid" alt="" style={{ width: '100%' }} />
                      </Link>
                    </div>
                    <div className="card-body content position-relative p-0 mt-3">
                      <Link to={`/item-details/${selectedItem.itemCollection}/${selectedItem.tokenId}`} className="text-dark">
                        <Title>{selectedItem.name}</Title>
                      </Link>
                    </div>
                  </div>
                </div>}
              </div>
            </div>
            {step === 2 && <div className="col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0">
              <div className="p-4 bg-white rounded-md shadow-sm pb-5">
                <div className="row mb-3">
                  <label className="form-label">Choose selling method</label>
                  <div className="col-md-6">
                    <button className={`btn ${type2 === 'fixed' ? 'btn-dark' : 'btn-muted'} rounded-md w-100 mt-3`}
                      style={{ fontSize: 13 }}
                      onClick={() => setType2('fixed')}
                    >
                      Fixed Price <br />
                      Sell at a fixed price
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      className={`btn ${type2 === 'auction' ? 'btn-dark' : 'btn-muted'} rounded-md w-100 mt-3`}
                      style={{ fontSize: 13 }}
                      onClick={() => setType2('auction')}
                    >
                      Auction <br />
                      Auction to the highest bidder
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Vault NFTs</label>
                  <input type="text" className="form-control" placeholder="Vault name"
                    value={name2} onChange={event => setName2(event.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Token & Price</label>
                  <input type="number" className="form-control input-number" placeholder={`Reserve price in ${process.env.REACT_APP_COIN}`}
                    value={price2} onChange={event => setPrice2(event.target.value)} />
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <input type="number" className="form-control input-number" placeholder="Token supply"
                      value={supply2} onChange={event => setSupply2(event.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Token symbol"
                      value={symbol2} onChange={event => setSymbol2(event.target.value)} />
                  </div>
                </div>
                {type2 === 'auction' && <>
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
                </>}
                {step3 ? <button className="btn btn-primary rounded-md w-100 mt-3" onClick={() => clickStep(3)}>
                  Next 🠮
                </button> : <button className="btn btn-muted rounded-md w-100 mt-3" style={{ cursor: 'no-drop' }}>
                  Next 🠮
                </button>}
              </div>
            </div>}
            {step === 3 && <div className="col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0">
              <div className="bg-white rounded-md shadow-sm p-3 mt-2">
                <h6 className="text-start">Unlock NFTs</h6>
                <div className="hstack justify-content-between bg-light p-3 rounded mt-2">
                  <div><img className="f-image" src={selectedItem?.mainData} alt="" /></div>
                  <div><span className="f-title">{selectedItem.name}</span></div>
                  <div>1 NFT</div>
                  <div>
                    {inApprove ? (<button className="btn btn-success btn-sm">Approving...</button>)
                      : (selectedItem.isApproved ?
                        <button className="btn btn-success btn-sm" disabled>Approved</button>
                        : <button className="btn btn-primary btn-sm" onClick={() => onApprove(selectedItem.itemCollection, selectedItem.tokenId)}>Approve</button>)}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-md shadow-sm p-3 mt-2">
                <h6 className="text-start">Mint Vault & Fractionalize</h6>
                <div className={`hstack flex-sm-column bg-light p-3 rounded ${feeFlag ? '' : 'd-none'}`}>
                  <p className="text-dark my-auto text-start">
                    Minting, in regards to NFTs,
                    is the process of taking a digital asset and converting
                    the digital file into a digital asset stored on the blockchain,
                    making it officially a commodity that can be bought and sold.
                  </p>
                  {feeFlag ?
                    (inFractionalize ? <button className="btn btn-primary w-100 mt-3" disabled>Paying...</button>
                      : <button className="btn btn-primary w-100 mt-3" onClick={() => onFractionalize()}>Pay fee</button>)
                    : <button className="btn btn-muted w-100 mt-3" disabled>Pay fee</button>}
                </div>
              </div>
            </div>}
          </div>
        </div>}
      </section>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        message={snackBarMessage}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
};

export default CreateFractionalNFT;
