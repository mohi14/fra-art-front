import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NFT from '../components/nft.component';
import NFT_Fraction1 from '../components/nft.fraction1';
import { useTranslation } from "react-i18next";
import { client02, client03, gif4, gif5, gif6, item1, item2, item3, item4, item5, ofcDesk, prodToCard } from "../utils/images.util";

const followerData = [
  {
    name: "CutieGirl",
    location: "Brookfield, WI",
    image: client02,
    subMenu: [item1, item2, item3, item4, item5, gif4],
  },
  {
    name: "NorseQueen",
    location: "Brookfield, WI",
    image: client03,
    subMenu: [gif5, item2, gif6, item4, item5],
  },
];


const CreatorProfile = (props) => {
  const { t } = useTranslation();
  const { user, login } = props;
  let { address } = useParams();
  const { account, chainId, library, deactivate } = useWeb3React();


  const [curTab, setCurTab] = useState('onsale');
  const [addrValid, setAddresValid] = useState(false);
  const [authorProfile, setAuthorProfile] = useState(null);
  const [isProfile, setIsProfile] = useState(false);

  const [saleItems, setSaleItems] = useState([]);
  const [ownedItems, setOwnedItems] = useState([]);
  const [createdItems, setCreatedItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [activityItems, setActivityItems] = useState([]);
  const [fractionItems, setFractionItems] = useState([]);

  const [pageSale, setPageSale] = useState(1);
  const [pageOwned, setPageOwned] = useState(1);
  const [pageCreated, setPageCreated] = useState(1);
  const [pageLiked, setPageLiked] = useState(1);
  const [pageActivity, setPageActivity] = useState(1);
  const [pageFraction, setPageFraction] = useState(1);

  const [noItems, setNoItems] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialItemsLoaded, setInitialItemsLoaded] = useState(true);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {


    axios.get(`/api/user/${address ? address : ""}`)
      .then(res => {
        setAuthorProfile(res.data.user)
      })
  }, [address]);

  useEffect(() => {
    let connectorId = window.localStorage.getItem('connectorId')
    let authToken = window.localStorage.getItem('authToken')
    if(connectorId ==null && authToken == null ){
      return window.location = '/';
    }

    if (!!user) {
      login();
    }
  }, [user, account, library])

  useEffect(() => {
    if (address) {
      let pageName = curTab || 'onsale';
      let page = 1;
      if (pageName === 'owned') page = pageOwned;
      else if (pageName === 'created') page = pageCreated;
      else if (pageName === 'liked') page = pageLiked;
      else if (pageName === 'activity') page = pageActivity;
      else if (pageName === 'fraction') page = pageFraction;
      else page = pageSale;
      fetchItems(pageName, page);
    }
  }, [curTab, address, pageSale, pageOwned, pageLiked, pageActivity, pageFraction]);

  const fetchItems = (name, page) => {
    let query = `/api/item/?owner=${address}&page=${page}&onsale=true`;
    switch (name) {
      case 'owned':
        query = `/api/item/?owner=${address}&page=${page}`;
        break;
      case 'created':
        query = `/api/item/?creator=${address}&page=${page}`;
        break;
      case 'liked':
        query = `/api/item/like/?user=${account}&page=${page}`;
        break;
      case 'activity':
        query = `/api/user-activities/?user=${address}&page=${page}`;
        break;
      case 'fraction':
        query = `/api/fraction-owner/?owner=${address}&page=${page}`;
        break;
      default:
        break;
    }
    setLoading(true);
    axios.get(query)
      .then(res => {
        setLoading(false);
        if (name === 'owned') {
          initialItemsLoaded ? setOwnedItems(res.data.items) : setOwnedItems(ownedItems.concat(res.data.items));
        } else if (name === 'created') {
          initialItemsLoaded ? setCreatedItems(res.data.items) : setCreatedItems(createdItems.concat(res.data.items));
        } else if (name === 'liked') {
          initialItemsLoaded ? setLikedItems(res.data.items) : setLikedItems(likedItems.concat(res.data.items));
        } else if (name === 'activity') {
          initialItemsLoaded ? setActivityItems(res.data.items) : setActivityItems(activityItems.concat(res.data.items));
        } else if (name === 'fraction') {
          initialItemsLoaded ? setFractionItems(res.data.items) : setFractionItems(fractionItems.concat(res.data.items));
        } else {
          initialItemsLoaded ? setSaleItems(res.data.items) : setSaleItems(saleItems.concat(res.data.items));
        }
        if (res.data?.items?.length === 0) setNoItems(true);
      }).catch(err => {
        setLoading(false);
        if (name === 'owned') setOwnedItems([]);
        else if (name === 'created') setCreatedItems([]);
        else if (name === 'liked') setLikedItems([]);
        else if (name === 'activity') setActivityItems([]);
        else if (name === 'fraction') setFractionItems([]);
        else setSaleItems([]);
        setNoItems(true);
        console.log(err);
      })
  }

  function loadMore() {
    if (!loading) {
      setInitialItemsLoaded(false);
      if (curTab === 'owned') setPageOwned(pageOwned + 1);
      else if (curTab === 'created') setPageCreated(pageCreated + 1);
      else if (curTab === 'liked') setPageLiked(pageLiked + 1);
      else if (curTab === 'activity') setPageActivity(pageActivity + 1);
      else if (curTab === 'fraction') setPageFraction(pageFraction + 1);
      else setPageSale(pageSale + 1);
    }
  }

  const tabClick = (tabName) => {
    setInitialItemsLoaded(true)
    setCurTab(tabName);
    setNoItems(false);
    if (tabName === 'owned') setPageOwned(1);
    else if (tabName === 'created') setPageCreated(1);
    else if (tabName === 'liked') setPageLiked(1);
    else if (tabName === 'activity') setPageActivity(1);
    else if (tabName === 'fraction') setPageFraction(1);
    else setPageSale(1);
  }

  useEffect(() => {
    if (authorProfile?.address) {
      let authorAddr = authorProfile.address.toLowerCase();
      if (ethers.utils.isAddress(authorAddr)) {
        setAddresValid(true);
        if (authorAddr === account?.toLowerCase()) setIsProfile(true);
        else setIsProfile(false);
      } else {
        setAddresValid(false);
      }
    }
  }, [authorProfile, account]);

  const handleCopy = () => {
    setSnackBarMessage("Copied!");
    setOpenSnackbar(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  const dateFormat = (timestapm) => {
    let dateString = new Date(timestapm * 1000).toISOString().slice(0, 10) + " " + new Date(timestapm * 1000).toISOString().slice(11, 19);
    return dateString;
  }
  return (
    <>
      <section className="bg-creator-profile">
        {addrValid && <div className="container">
          <div className="profile-banner">
            <div className="position-relative d-inline-block">
              <img
                src={authorProfile.profileCover}
                className="rounded-md shadow-sm img-fluid"
                id="profile-banner"
                alt=""
              />
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col">
              <div className="text-center mt-n80">
                <div className="profile-pic">
                  <div className="position-relative d-inline-block">
                    <img
                      src={authorProfile.profilePic}
                      className="avatar avatar-medium img-thumbnail rounded-pill shadow-sm"
                      id="profile-image"
                      alt=""
                    />
                  </div>
                </div>

                <div className="content mt-3">
                  <h5 className="mb-3">{authorProfile.name}</h5>
                  <small className="text-muted px-2 py-1 rounded-lg shadow">
                    {authorProfile.address}
                    <CopyToClipboard text={authorProfile.address || ''}
                      onCopy={() => handleCopy()}>
                      <a
                        href=""
                        onClick={(e) => e.preventDefault()}
                        className="text-primary h5 ms-1"
                      >
                        <i className="uil uil-copy"></i>
                      </a>
                    </CopyToClipboard>

                  </small>
                  <h6 className="mt-3 mb-0">{authorProfile.bio}</h6>

                  {isProfile ? <div className="mt-4">
                    <Link
                      to="/profile-edit"
                      className="btn btn-pills btn-outline-primary mx-1"
                    >
                      {t("editProfile")}
                    </Link>
                    <Link
                      to="/profile-edit"
                      className="btn btn-pills btn-icon btn-outline-primary mx-1"
                    >
                      <i className="uil uil-folder-upload"></i>
                    </Link>
                  </div> : <></>}
                </div>
              </div>
            </div>
          </div>
        </div>}

        <div className="container mt-100 mt-60">
          <div className="row">
            <div className="col-12">
              <ul
                className="nav nav-tabs border-bottom"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="Sale-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Sale"
                    type="button"
                    role="tab"
                    aria-controls="Sale"
                    aria-selected="true"
                    onClick={() => tabClick('onsale')}
                  >
                    {t("onSale")}
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="Create-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#CreateItem"
                    type="button"
                    role="tab"
                    aria-controls="CreateItem"
                    aria-selected="false"
                    onClick={() => tabClick('created')}
                  >
                    {t("created")}
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="Collection-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Collection"
                    type="button"
                    role="tab"
                    aria-controls="Collection"
                    aria-selected="false"
                    onClick={() => tabClick('owned')}
                  >
                    {t("owned")}
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="Fraction-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Fraction"
                    type="button"
                    role="tab"
                    aria-controls="Fraction"
                    aria-selected="false"
                    onClick={() => tabClick('fraction')}
                  >
                    {t("fractions")}
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="Liked-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Liked"
                    type="button"
                    role="tab"
                    aria-controls="Liked"
                    aria-selected="false"
                    onClick={() => tabClick('liked')}
                  >
                    {t("liked")}
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="Activites-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Activites"
                    type="button"
                    role="tab"
                    aria-controls="Activites"
                    aria-selected="false"
                    onClick={() => tabClick('activity')}
                  >
                    {t("activites")}
                  </button>
                </li>
              </ul>

              <div className="tab-content mt-4 pt-2" id="myTabContent">
                {/* On Sale */}
                <div
                  className="tab-pane fade show active"
                  id="Sale"
                  role="tabpanel"
                  aria-labelledby="Sale-tab"
                >
                  <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4">
                    {saleItems?.length ? saleItems.map((item, index) => (
                      <NFT key={`onsale-${index}`} item={item} />
                    )) : <>
                      <div className="content">
                        <h5 className="mb-4">{t("noItems")}</h5>
                      </div>
                    </>}
                  </div>
                </div>
                {/* Created */}
                <div
                  className="tab-pane fade"
                  id="CreateItem"
                  role="tabpanel"
                  aria-labelledby="Create-tab"
                >
                  <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4">
                    {createdItems?.length ? createdItems.map((item, index) => (
                      <NFT key={`created-${index}`} item={item} />
                    )) : <>
                      <div className="content">
                        <h5 className="mb-4">{t("noItems")}</h5>
                      </div>
                    </>}
                  </div>
                </div>
                {/* Liked */}
                <div
                  className="tab-pane fade"
                  id="Liked"
                  role="tabpanel"
                  aria-labelledby="Liked-tab"
                >
                  {likedItems?.length ? <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4">
                    {likedItems.map((item, index) => (
                      <NFT key={`created-${index}`} item={item} />
                    ))}</div> : <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-8 text-center">
                      <img src={ofcDesk} className="img-fluid" alt="" />
                      <div className="content">
                        <h5 className="mb-4">{t("noItems")}</h5>
                        <p className="text-muted">
                         {t("showYourAppriciationForOthersWork")}
                        </p>
                      </div>
                    </div>
                  </div>}
                </div>
                {/* Collections / Owned */}
                <div
                  className="tab-pane fade "
                  id="Collection"
                  role="tabpanel"
                  aria-labelledby="Collection-tab"
                >
                  {ownedItems?.length ? <>
                    <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4">
                      {ownedItems.map((item, index) => (
                        <NFT key={`owned-${index}`} item={item} />
                      ))}
                    </div>
                  </> : <>
                    <div className="row justify-content-center">
                      <div className="col-lg-5 col-md-8 text-center">
                        <img src={prodToCard} className="img-fluid" alt="" />

                        <div className="content mt-4">
                          <h5 className="mb-4">{t("noCollection")}</h5>
                          <p className="text-muted">
                           {t("saveInterestingShotsIntoPersonalized")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>}
                </div>
                {/* Followers */}
                <div
                  className="tab-pane fade"
                  id="Followers"
                  role="tabpanel"
                  aria-labelledby="Followers-tab"
                >
                  <h5 className="mb-4">{followerData?.length} {t("followers")}</h5>
                  <div className="row g-4">
                    {followerData?.map((data) => {
                      return (
                        <div className="col-md-6" key={data?.name}>
                          <div className="p-4 rounded-md shadow users user-primary">
                            <div className="d-flex align-items-center">
                              <div className="position-relative">
                                <img
                                  src={data?.image}
                                  className="avatar avatar-md-md rounded-pill shadow-sm img-thumbnail"
                                  alt=""
                                />
                                <div className="position-absolute bottom-0 end-0">
                                  <a
                                    href=""
                                    onClick={(e) => e.preventDefault()}
                                    className="btn btn-icon btn-pills btn-sm btn-primary"
                                  >
                                    <i className="uil uil-plus"></i>
                                  </a>
                                </div>
                              </div>

                              <div className="content ms-3">
                                <h6 className="mb-0">
                                  <Link
                                    to="/creator-profile"
                                    className="text-dark name"
                                  >
                                    CutieGirl
                                  </Link>
                                </h6>
                                <small className="text-muted d-flex align-items-center">
                                  <i className="uil uil-map-marker fs-5 me-1"></i>{" "}
                                  {data?.location}
                                </small>
                              </div>
                            </div>

                            <div className="border-top my-4"></div>
                            <div className="row row-cols-xl-6 g-3">
                              {data?.subMenu?.map((sub, index) => (
                                <div className="col" key={index * 10}>
                                  <Link
                                    to="/item-details"
                                    className="user-item"
                                  >
                                    <img
                                      src={sub}
                                      className="img-fluid rounded-md shadow-sm"
                                      alt=""
                                    />
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Activities */}
                <div
                  className="tab-pane fade"
                  id="Activites"
                  role="tabpanel"
                  aria-labelledby="Activites-tab"
                >
                  {activityItems?.length ? <div className="row g-4">
                    {activityItems?.map((data, index) => {
                      return (
                        data.item && <div className="col-12" key={`activity-${index}`}>
                          <div className="card activity activity-primary rounded-md shadow p-4">
                            <div className="d-flex align-items-center">
                              <div className="position-relative">
                                <Link to={data.tokenId === -1 ? `/marketplace/details/${data.itemCollection}` : `/item-details/${data.itemCollection}/${data.tokenId}`}>
                                  <img src={data.item?.mainData} className="avatar avatar-md-md rounded-md shadow-md" alt="" />
                                </Link>

                                <div className="position-absolute top-0 start-0 translate-middle px-1 rounded-lg shadow-md bg-white">
                                  {data.name === "MarketSold" ? (
                                    <i className="mdi mdi-account-check mdi-18px text-success"></i>
                                  ) : data.name === "Liked" ? (
                                    <i className="mdi mdi-heart mdi-18px text-danger"></i>
                                  ) : (
                                    <i className="mdi mdi-format-list-bulleted mdi-18px text-warning"></i>
                                  )}
                                </div>
                              </div>

                              <span className="content ms-3">
                                {data.tokenId === -1 ? <>
                                  <Link to={`/marketplace/details/${data.itemCollection}`} className="text-dark title mb-0 h6 d-block">
                                    {data.fraction.name}
                                  </Link></> : <>
                                  <Link to={`/item-details/${data.itemCollection}/${data.tokenId}`} className="text-dark title mb-0 h6 d-block">
                                    {data.item.name}
                                  </Link>
                                </>}

                                <small className="text-muted d-block mt-1">
                                  {data.name} by &nbsp;
                                  {data.name === 'Liked' && <a href={`${process.env.REACT_APP_BLOCK_EXPLORER}address/${data.from}`} target="_blank"
                                    className="link fw-bold" rel="noreferrer">@{data.fromUser.name}</a>}
                                  {data.name === 'MarketListed' && <a href={`${process.env.REACT_APP_BLOCK_EXPLORER}address/${data.from}`} target="_blank"
                                    className="link fw-bold" rel="noreferrer">@{data.fromUser.name}</a>}
                                  {data.name === 'AuctionListed' && <a href={`${process.env.REACT_APP_BLOCK_EXPLORER}address/${data.from}`} target="_blank"
                                    className="link fw-bold" rel="noreferrer">@{data.fromUser.name}</a>}
                                  {data.name === 'MarketDelisted' && <a href={`${process.env.REACT_APP_BLOCK_EXPLORER}address/${data.from}`} target="_blank"
                                    className="link fw-bold" rel="noreferrer">@{data.toUser.name}</a>}
                                  {data.name === 'AuctionDelisted' && <a href={`${process.env.REACT_APP_BLOCK_EXPLORER}address/${data.from}`} target="_blank"
                                    className="link fw-bold" rel="noreferrer">@{data.toUser.name}</a>}
                                  {(data.name === 'MarketSold' || data.name === 'AuctionSold') && <a href={`${process.env.REACT_APP_BLOCK_EXPLORER}address/${data.from}`}
                                    target="_blank" className="link fw-bold" rel="noreferrer">@{data.toUser.name}</a>}
                                  {(data.tokenId === -1) && "You"}
                                </small>

                                <small className="text-muted d-block mt-1">
                                  {dateFormat(data.timestamp)}
                                </small>
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div> : <div className="col-lg-5 col-md-8 text-center">
                    <img src={ofcDesk} className="img-fluid" alt="" />
                    <div className="content">
                      <h5 className="mb-4">{t("noItems")}</h5>
                      <p className="text-muted">
                       {t("showYourAppriciationForOthersWork")}
                      </p>
                    </div>
                  </div>}
                </div>
                {/* Fractions */}
                <div
                  className="tab-pane fade"
                  id="Fraction"
                  role="tabpanel"
                  aria-labelledby="Fraction-tab"
                >
                  {fractionItems?.length ? <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4">
                    {fractionItems.map((item, index) => (
                      <NFT_Fraction1 key={`fraction-${index}`} item={item} />
                    ))}</div> : <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-8 text-center">
                      <img src={ofcDesk} className="img-fluid" alt="" />
                      <div className="content">
                        <h5 className="mb-4">{t("noItems")}</h5>
                        <p className="text-muted">
                          {t("theteIsNotAnyFractionForYou")}
                        </p>
                      </div>
                    </div>
                  </div>}
                </div>
                {/* Load More */}
                <div className="mt-4 text-center" style={{ display: noItems ? "none" : "" }}>
                  <button className="btn btn-pills btn-primary mx-1" onClick={() => loadMore()}>
                    {loading ? "Loading..." : "Load more"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default CreatorProfile;
