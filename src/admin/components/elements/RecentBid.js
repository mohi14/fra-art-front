import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWeb3React } from '@web3-react/core';
import axios from "axios";
import { AuthStateContext } from "../../../context/authContext";

const RecentBid = (props) => {
  const { account } = useWeb3React();

  const {userAddress, setUserAddress}= useContext(AuthStateContext)

  
  const [items, setItems] = useState([]);
  const [counts, setCounts] = useState({ 'fixed': 0, 'auction': 0, 'creator': 0, 'cancel': 0 });
  
  const fetchItems = () => {
    let query = `/api/admin-bids/?owner=${account || userAddress}`;
    axios.get(query)
      .then(res => {
        setItems(res.data.items);
        setCounts(res.data.counts);
      }).catch(err => {
        setItems([]);
        console.log(err);
      })
  }
  useEffect(()=>{
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
  // console.log("account", account)
  // console.log("user", items)

  return (
    <> {(account || userAddress) && <div className="row">
      <div className="col-xl-3 col-sm-6">
        <div className="stat-widget d-flex align-items-center">
          <div className="widget-icon me-3 bg-primary">
            <span>
              <i className="ri-file-copy-2-line"></i>
            </span>
          </div>
          <div className="widget-content">
            <h3>{counts.fixed}</h3>
            <p>Artworks</p>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6">
        <div className="stat-widget d-flex align-items-center">
          <div className="widget-icon me-3 bg-success">
            <span>
              <i className="ri-file-list-3-line"></i>
            </span>
          </div>
          <div className="widget-content">
            <h3>{counts.auction}</h3>
            <p>Auction</p>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6">
        <div className="stat-widget d-flex align-items-center">
          <div className="widget-icon me-3 bg-warning">
            <span>
              <i className="ri-file-paper-line"></i>
            </span>
          </div>
          <div className="widget-content">
            <h3>{counts.creator}</h3>
            <p>Creators</p>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6">
        <div className="stat-widget d-flex align-items-center">
          <div className="widget-icon me-3 bg-danger">
            <span>
              <i className="ri-file-paper-2-line"></i>
            </span>
          </div>
          <div className="widget-content">
            <h3>{counts.cancel}</h3>
            <p>Canceled</p>
          </div>
        </div>
      </div>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header flex-row">
            <h4 className="card-title">Active Bids </h4>
          </div>
          <div className="card-body p-0 bs-0 bg-transparent">
            <div className="bid-table">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Item List</th>
                      <th>Open Price</th>
                      <th>Your Offer</th>
                      <th>Recent Offer</th>
                      <th>Time Left</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items?.map((data, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={data.item?.mainData}
                              alt=""
                              width="60"
                              className="me-3 rounded"
                            />
                            <div className="flex-grow-1">
                              <h6 className="mb-0">{data.item.name}</h6>
                              <p className="mb-0">{data.owner.name}</p>
                            </div>
                          </div>
                        </td>
                        <td>{data.auction.startPrice} ETH</td>
                        <td>{data.bidPrice} ETH</td>
                        <td>
                          <img
                            src={data.owner?.profilePic}
                            alt=""
                            width="40"
                            className="me-2 rounded-circle"
                          />
                          {data.bidPrice} ETH
                        </td>
                        <td>{calcTime(data.auction.endTime)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>}
    </>
  );
};

export default RecentBid;
