import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { AuthStateContext } from "../../../context/authContext";

const SavedItems = () => {
  const { account, chainId, library } = useWeb3React();
  const {userAddress, setUserAddress}= useContext(AuthStateContext)
   
  const [items, setItems] = useState([]);
  const fetchItems = () => {
    let query = `/api/admin-favorites/?owner=${account || userAddress}`;
    axios.get(query)
      .then(res => {
        setItems(res.data.items);
      }).catch(err => {
        setItems([]);
        console.log(err);
      })
  }
  useEffect(() => {
    let address = localStorage.getItem('userAddress')
    setUserAddress(address)
    fetchItems()
  }, [userAddress]);
  const calcTime = (timestamp) => {
    let _timestamp = timestamp - Date.now();
    if (_timestamp <= 0) return "00h:00m:00s";
    else dateFormat(timestamp);
  }
  const dateFormat = (timestamp) => {
    let dateString = new Date(timestamp * 1000).toISOString().slice(0, 10) + " " + new Date(timestamp * 1000).toISOString().slice(11, 19);
    return dateString;
  }
  return (
    <>
      {items.map((data, i) => (
        <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6" key={`admin-like-${i}`}>
          <div className="card items">
            <div className="card-body">
              <div className="items-img position-relative">
                <img src={data?.mainData} className="img-fluid rounded mb-3" alt="" />
                <img src={data.ownerUser.profilePic} className="creator" width="50" alt="" />
              </div>

              <h4 className="card-title">{data.name}</h4>
              <p>{data.description}</p>

              <div className="d-flex justify-content-between">
                <div className="text-start">
                  {
                    data.auction
                      ? (<><p className="mb-2">Auction Time</p><h5 className="text-muted">{calcTime(data.auction.endTime)}</h5></>)
                      : <p className="mb-2">No Auction</p>
                  }
                </div>
                <div className="text-end">
                  {
                    data.pair
                      ? (<p className="mb-2">Price: <strong className="text-primary">{data.pair.price} {process.env.REACT_APP_COIN}</strong></p>)
                      : (data.auction
                        ? (<p className="mb-2">Highest Bid: <strong className="text-primary">{data.auction.price} {process.env.REACT_APP_COIN}</strong></p>)
                        : <p className="mb-2">Not for sale</p>)
                  }
                </div>
              </div>

              <div className="d-flex justify-content-center mt-3">
                <Link to={`/item-details/${data.itemCollection}/${data.tokenId}`} className="btn btn-outline-primary">
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SavedItems;
