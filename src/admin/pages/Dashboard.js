import React, { useState, useEffect, useContext } from "react";
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import RecentBid from "../components/elements/RecentBid";
import TopCreators from "../components/elements/TopCreators";
import Layout from "../components/layout/Layout";
import RecentActivity from "../components/elements/RecentActivity";
import { AuthStateContext } from "../../context/authContext";

const Dashboard = () => {
  const { account } = useWeb3React();
  const [oneAuction, setOneAuction] = useState(null);
  const {userAddress, setUserAddress}= useContext(AuthStateContext)
  
  const fetchOneAuction = () => {
    let query = `/api/admin-dashboard-auction/?owner=${account || userAddress}`;
    axios.get(query)
      .then(res => {
        setOneAuction(res.data.item);
      }).catch(err => {
        setOneAuction(null);
        console.log(err);
      })
  };
  useEffect(() => {
    let address = localStorage.getItem('userAddress')
    setUserAddress(address)
    fetchOneAuction();
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
      {(account || userAddress) && <Layout
        headTitle="Dashboard"
        pageTitle="Dashboard"
        pageTitleSub={"Welcome FraArt Dashboard"}
        pageClass={"dashboard"}
      >
        <div className="row">
          {oneAuction && <div className="col-xxl-6">
            <div className="card top-bid">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <img src={oneAuction?.mainData} className="img-fluid rounded" alt="" />
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <img src={oneAuction.ownerUser.profilePic} alt="" className="me-3 avatar-img" />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">
                          {oneAuction.ownerUser.name}
                          <span className="circle bg-success"></span>
                        </h6>
                      </div>
                    </div>
                    <h4 className="card-title">{oneAuction.name}</h4>
                    <div className="d-flex justify-content-between mt-3 mb-3">
                      <div className="text-start">
                        <p className="mb-2">Auction Time</p>
                        <h5 className="text-muted">{calcTime(oneAuction.auction.endTime)}</h5>
                      </div>
                      <div className="text-end">
                        <p className="mb-2">Current Bid</p>
                        <h5 className="text-muted">{oneAuction.bids.length ? oneAuction.bids[0].bidPrice + ' ETH': 'No bids'}</h5>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <a href={`/item-details/${oneAuction.itemCollection}/${oneAuction.tokenId}`} className="btn btn-secondary w-100">View Details</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>}

          <div className="col-xxl-4 col-xl-12">
            <div className="card m-0">
              <div className="card-header">
                <h4 className="card-title">Recent Activity</h4>
              </div>
              <div className="card-body p-0">
                <RecentActivity />
              </div>
            </div>
          </div>
          <div className="col-xxl-8 col-xl-12">
            <TopCreators />
          </div>
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header flex-row">
                <h4 className="card-title">Recent Bid </h4>
              </div>
              <div className="card-body bs-0 bg-transparent p-0">
                <div className="bid-table">
                  <RecentBid />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>}
    </>
  );
}

export default Dashboard;
