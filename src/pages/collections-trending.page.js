import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatNum1 } from "../utils";
import { bg1 } from "../utils/images.util";
import "./trending.css";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import { FaEthereum } from "react-icons/fa";

const TrendingCollections = (props) => {
  const { t } = useTranslation();
  const limit = 10;
  const [continueToken, setContinueToken] = useState("");
  const [collections, setCollections] = useState([]);
  const [pageCol, setPageCol] = useState(1);
  const [noItems, setNoItems] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSort, setDataSort] = useState("30");
  const fetchPopularCols = () => {
    let url = `https://api-goerli.reservoir.tools/collections/v5?sortBy${
      dataSort === "allTime" ? "" : "="
    }${dataSort}DayVolume&limit=${limit}`;

    if (continueToken) url = url + `&continuation=${continueToken}`;
    const options = {
      method: "GET",
      headers: {
        accept: "*/*",
        "x-api-key": "c8c99b47-ac0e-5677-915a-1f0571480193",
      },
    };
    setLoading(true);
    axios
      .get(url, options)
      .then((res) => {
        if (pageCol > 1 && continueToken)
          setCollections(collections.concat(res.data.collections));
        else setCollections(res.data.collections);
        if (res.data.collections.length < limit) setNoItems(true);
        setContinueToken(res.data.continuation);
        setLoading(false);
      })
      .catch((err) => {
        console.log("tredingCollections: ", err);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchPopularCols();
  }, [pageCol, dataSort]);
  function loadMore() {
    if (!loading) {
      setPageCol(pageCol + 1);
    }
  }
  const handleFilter = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setDataSort(e.target.value);
  };
  console.log(collections);
  return (
    <>
      {/* 
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
      </section> */}
      <div className="container custom__container mt-5">
        <div className="mt-5 pt-5 d-flex justify-content-between">
          <h3>Popular Collections</h3>
          <div className="select_box_container">
            <Form.Select onChange={handleFilter} aria-label="Default select">
              <option value="1">1 {t("day")}</option>
              <option value="7">7{t("day")}</option>
              <option value="30">30 {t("day")}</option>
              <option value="allTime"> {t("All Time")}</option>
            </Form.Select>
          </div>
        </div>
      </div>
      {/* <div className="position-relative">
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
      </div> */}

      <section className="section">
        {/* <div className="container">
          <div className="">
            <div className="row mt-2">
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <div className="text-dark h6 pt-1 pe-3">Collection</div>
                </div>
              </div>
              <div className="col-6 d-flex align-items-center text-dark">
                <div className="row w-100">
                  <div className="col-3">IMG</div>
                  <div className="col-3">Volume(ETH)</div>
                  <div className="col-3">Floor Price(ETH)</div>
                  <div className="col-3">Supply</div>
                </div>
              </div>
            </div>
          </div>

          {collections?.map((col, idx) => (
            <div className="border-bottom" key={`trending-collection-${idx}`}>
              <Link
                // href={`https://www.reservoir.market/collections/${col.id}`}
                to={`/trending/${col.id}`}
              >
                <div className="row mt-2">
                  <div className="col-6">
                    <div className="d-flex align-items-center mb-2">
                      <div className="text-dark h6 pt-1 pe-3">{idx + 1}</div>
                      <div className="position-relative">
                        <img
                          src={col.image}
                          className="avatar avatar-md-sm rounded-pill shadow-sm img-thumbnail"
                          alt=""
                        />
                        <strong className="text-dark h6 ps-3">
                          {col.name}
                        </strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex align-items-center text-dark">
                    <div className="row w-100">
                      <div className="col-3">
                        <div className="d-flex">
                          {col.sampleImages.map((pic) => (
                            <div className="me-2">
                              <img
                                className="rounded-3"
                                width={30}
                                src={pic}
                                alt=""
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-3">
                        {formatNum1(col.volume["1day"])}{" "}
                      </div>
                      <div className="col-3">
                        {formatNum1(col.floorAsk.price?.amount?.decimal)}
                      </div>
                      <div className="col-3">{col.tokenCount}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          <div
            className="mt-4 text-center"
            style={{ display: noItems ? "none" : "" }}
          >
            <button
              className="btn btn-pills btn-primary mx-1"
              onClick={() => loadMore()}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        </div> */}
        <div className="container custom__container">
          <div className="my-2">
            <div className="table_section2">
              <table className="table caption-top shadow rounded">
                <thead>
                  <tr
                    style={{
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "#9BA1A6",
                    }}
                  >
                    <th scope="col">Collection</th>
                    <th scope="col"></th>
                    <th className="text-end" scope="col">
                      Volume(ETH)
                    </th>
                    <th className="text-end" scope="col">
                      Floor Price(ETH)
                    </th>
                    <th className="text-end" scope="col">
                      Supply
                    </th>
                  </tr>
                </thead>

                {/* collection list */}
                <tbody>
                  {collections?.map((col, idx) => {
                    return (
                      <tr key={idx} className="pointer hover-background">
                        {/* <th style={{ fontSize: "14px" }} scope="row">
                          {idx + 1}
                        </th> */}
                        <td
                          // onClick={() => setUserId(collection?.primaryContract)}
                          style={{
                            width: "500px",
                            fontSize: "16px",
                            fontWeight: "500",
                          }}
                        >
                          <Link to={`/trending/${col.id}`}>
                            <div className="position-relative">
                              <span
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "500",
                                  color: "#11181C",
                                  marginRight: "20px",
                                }}
                              >
                                {" "}
                                {idx + 1}
                              </span>

                              <img
                                width={50}
                                height={50}
                                src={col.image}
                                className="rounded-3"
                                alt=""
                              />
                              <strong
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "500",
                                  color: "#11181C",
                                }}
                                className=" ps-3"
                              >
                                {col.name}
                              </strong>
                            </div>
                          </Link>{" "}
                        </td>
                        <td>
                          <div className="d-flex justify-content-start">
                            {col.sampleImages.map((pic) => (
                              <div className="me-2">
                                <img
                                  className="rounded-3"
                                  width={50}
                                  height={50}
                                  src={pic}
                                  alt=""
                                />
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="text-end">
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#11181C",
                            }}
                          >
                            <FaEthereum />
                            {formatNum1(col.volume["1day"])}{" "}
                          </div>
                          <div
                            className={
                              col.volumeChange["30day"] * 100 < 0
                                ? "text-danger "
                                : "text-success "
                            }
                            style={{ fontSize: "12px" }}
                          >
                            {(col.volumeChange["30day"] * 100).toFixed(2)}%
                          </div>
                        </td>
                        <td
                          className="text-end"
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#11181C",
                          }}
                        >
                          {" "}
                          {formatNum1(col.floorAsk.price?.amount?.decimal)}
                        </td>
                        <td
                          className="text-end"
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#11181C",
                          }}
                        >
                          {col.tokenCount}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="mt-4 text-center"
            style={{ display: noItems ? "none" : "" }}
          >
            <button
              className="btn btn-pills btn-primary mx-1"
              onClick={() => loadMore()}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrendingCollections;
