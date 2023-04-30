import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatNum1 } from "../utils";
import { bg1 } from "../utils/images.util";
import "./trending.css";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

const CollectionHome = () => {
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
  return (
    <div>
      <section className="section">
        <div className="">
          <div className="my-2">
            <div className="table_section2">
              <table className="table caption-top shadow rounded">
                <thead>
                  <tr
                    className=""
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#111119",
                    }}
                  >
                    <th scope="col">#</th>
                    <th scope="col">Volume(ETH)</th>
                    <th scope="col"></th>
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
                        <th style={{ fontSize: "14px" }} scope="row">
                          {idx + 1}
                        </th>
                        <td
                          // onClick={() => setUserId(collection?.primaryContract)}
                          style={{ width: "305px" }}
                        >
                          <Link to={`/trending/${col.id}`}>
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
                          </Link>{" "}
                        </td>
                        <td className="text-end">
                          <div className="d-flex justify-content-end">
                            {col.sampleImages.map((pic) => (
                              <div className="me-2">
                                <img
                                  className="rounded-3"
                                  width={50}
                                  src={pic}
                                  alt=""
                                />
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="text-end">
                          {" "}
                          {formatNum1(col.volume["1day"])}{" "}
                        </td>
                        <td className="text-end">
                          {" "}
                          {formatNum1(col.floorAsk.price?.amount?.decimal)}
                        </td>
                        <td className="text-end">{col.tokenCount}</td>
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
    </div>
  );
};

export default CollectionHome;
