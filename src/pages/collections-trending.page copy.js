import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { formatNum1 } from "../utils";
import { bg1 } from "../utils/images.util";

const TrendingCollections = (props) => {
  const limit = 10;
  const [continueToken, setContinueToken] = useState('')
  const [collections, setCollections] = useState([]);
  const [pageCol, setPageCol] = useState(1);
  const [noItems, setNoItems] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchPopularCols = () => {
    let url = `https://api-goerli.reservoir.tools/collections/v5?sortBy=1DayVolume&limit=${limit}`;
    if (continueToken) url = url + `&continuation=${continueToken}`;
    const options = {
			method: 'GET',
			headers: {accept: '*/*', 'x-api-key': 'c8c99b47-ac0e-5677-915a-1f0571480193'}
		  };
    setLoading(true);
    axios.get(url, options).then(res => {
      if (pageCol > 1 && continueToken) setCollections(collections.concat(res.data.collections));
      else setCollections(res.data.collections);
      if (res.data.collections.length < limit) setNoItems(true);
      setContinueToken(res.data.continuation);
      setLoading(false)
    }).catch(err => { console.log("tredingCollections: ", err); setLoading(false) });
  }
  useEffect(() => {
    fetchPopularCols();
  }, [pageCol]);
  function loadMore() {
    if (!loading) {
      setPageCol(pageCol + 1);
    }
  }
  return (
    <>
      <section className="bg-half-170 d-table w-100" style={{ background: `url(${bg1}) bottom` }}>
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <h5 className="heading fw-semibold sub-heading text-white title-dark">Trending Collections</h5>
                <p className="text-white-50 para-desc mx-auto mb-0">Last 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="shape overflow-hidden text-white">
          <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="">
            <div className="row mt-2">
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <div className="text-dark h6 pt-1 pe-3">Collection</div>
                </div>
              </div>
              <div className="col-6 d-flex align-items-center text-dark">
                <div className="row w-100">
                  <div className="col-4">Volume(ETH)</div>
                  <div className="col-4">Floor Price(ETH)</div>
                  <div className="col-4">Supply</div>
                </div>
              </div>
            </div>
          </div>

          {collections?.map((col, idx) => (
            <div className="border-bottom" key={`trending-collection-${idx}`}>
              <a href={`https://www.reservoir.market/collections/${col.id}`} target='_blank'>
                <div className="row mt-2">
                  <div className="col-6">
                    <div className="d-flex align-items-center mb-2">
                      <div className="text-dark h6 pt-1 pe-3">{idx + 1}</div>
                      <div className="position-relative">
                        <img src={col.image} className="avatar avatar-md-sm rounded-pill shadow-sm img-thumbnail" alt="" />
                        <strong className="text-dark h6 ps-3">{col.name}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex align-items-center text-dark">
                    <div className="row w-100">
                      <div className="col-4">{formatNum1(col.volume['1day'])} </div>
                      <div className="col-4">{formatNum1(col.floorAsk.price?.amount?.decimal)}</div>
                      <div className="col-4">{col.tokenCount}</div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}

          <div className="mt-4 text-center" style={{ display: noItems ? "none" : "" }}>
            <button className="btn btn-pills btn-primary mx-1" onClick={() => loadMore()}>
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        </div>
      </section>

    </>
  );
};

export default TrendingCollections;
