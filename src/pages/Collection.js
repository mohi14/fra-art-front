/** @format */

import React, { useContext, useEffect, useState, CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ParamsContext } from "../context/ParamsProvider";
import { FaEthereum } from "react-icons/fa";
import CollectionNav from "./CollectionNav";
import { AuthStateContext } from "../context/authContext";
import { useTranslation } from "react-i18next";
import "./trending.css";
import "./new.css";
import Pagination from "../utils/Pagination";
// import { useState } from "react";
import Form from "react-bootstrap/Form";

const Collection = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState(50);
  const { setUserId } = useContext(AuthStateContext);
  // const [selectedPerson, setSelectedPerson] = useState(people[0]);

  const [collections, setCollection] = useState([]);
  const [newCollections, setNewCollections] = useState([]);
  const [allNewCollections, setAllNewCollections] = useState([]);
  const [dataSort, setDataSort] = useState("1h");

  const [load, setLoad] = useState(20);
  const [show, setShow] = useState(true);

  const handleChange = (event) => {
    const searchValue = event.target.value;

    const searchedData = allNewCollections.filter((item) => {
      const searchTerm = searchValue.toLocaleLowerCase();
      const collectionName = item.collection?.name.toLocaleLowerCase();
      return searchTerm && collectionName.startsWith(searchTerm);
    });

    if (searchValue.length > 0) {
      setNewCollections(searchedData);
    } else {
      setNewCollections(allNewCollections);
    }

    console.log(searchedData);
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "*/*",
        "x-api-key": "c8c99b47-ac0e-5677-915a-1f0571480193",
      },
    };
    fetch(`https://api-goerli.reservoir.tools/collections/v5`, options)
      .then((res) => res.json())
      .then((data) => setCollection(data.collections));
  }, []);

  useEffect(() => {
    fetch(
      `https://api.nftgo.io/api/v1/ranking/trending-collections?sortby=saleNum&asc=-1&offset=0&limit=100&range=${dataSort}`
    )
      .then((res) => res.json())
      .then((data) => {
        setNewCollections(data?.data?.list);
        setAllNewCollections(data?.data?.list);
      });
  }, [dataSort]);

  const handleLoadMore = () => {
    setLoad(load + 20);
  };
  useEffect(() => {
    if (load >= collections.length) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [load]);

  // console.log("okCollection", collections);
  const lastIndex = page * amount;
  const firstIndex = lastIndex - amount;
  const currentLinks = newCollections.slice(firstIndex, lastIndex);

  console.log(firstIndex, lastIndex, "1st last");
  const handleFilter = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setDataSort(e.target.value);
  };

  return (
    <div>
      <div className="container custom__container my-5 ">
        <p
          style={{ fontSize: "24px", fontWeight: "500" }}
          className="text-start page-heading"
        >
          {t("trending")}
        </p>
        <p
          style={{ fontSize: "12px", fontWeight: "400", color: "#666666" }}
          className="text-start "
        >
          {t("trendingPageSubHeading")}
        </p>

        <CollectionNav></CollectionNav>

        {/* data sorting navbar start */}
        <div className="d-flex justify-content-between select_box_container_area my-2">
          <div>
            <input
              style={{ width: "300px", borderRadius: "50px" }}
              class="search form-control ps-5"
              type="search"
              placeholder={t("search")}
              aria-label="Search"
              onChange={handleChange}
            />
          </div>
          <div className="select_box_container">
            <Form.Select onChange={handleFilter} aria-label="Default select">
              <option value="5m">5 {t("min")}</option>
              <option value="10m">10 {t("min")}</option>
              <option value="30m">30 {t("min")}</option>
              <option value="1h">1 {t("hr")}</option>
              <option value="6h">6 {t("hr")}</option>
              <option value="12h">12 {t("hr")}</option>
              <option value="24h">24 {t("hr")}</option>
            </Form.Select>
          </div>

          {/* <div className="border d-flex gap-3 align-items-center px-3 bg-light rounded pointer">
            <div
              onClick={() => setDataSort("5m")}
              className={
                dataSort === "5m" && "bg-primary p-1 rounded text-light"
              }
            >
              5{t("min")}
            </div>
            <div
              onClick={() => setDataSort("10m")}
              className={
                dataSort === "10m" && "bg-primary p-1 rounded text-light"
              }
            >
              10{t("min")}
            </div>
            <div
              onClick={() => setDataSort("30m")}
              className={
                dataSort === "30m" && "bg-primary p-1 rounded text-light"
              }
            >
              30{t("min")}
            </div>
            <div
              onClick={() => setDataSort("1h")}
              className={
                dataSort === "1h" && "bg-primary p-1 rounded text-light"
              }
            >
              1{t("hr")}
            </div>
            <div
              onClick={() => setDataSort("6h")}
              className={
                dataSort === "6h" && "bg-primary p-1 rounded text-light"
              }
            >
              6{t("hr")}
            </div>
            <div
              onClick={() => setDataSort("12h")}
              className={
                dataSort === "12h" && "bg-primary p-1 rounded text-light"
              }
            >
              12{t("hr")}
            </div>
            <div
              onClick={() => setDataSort("24h")}
              className={
                dataSort === "24h" && "bg-primary p-1 rounded text-light"
              }
            >
              24{t("hr")}
            </div>
          </div> */}
        </div>

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
                  <th scope="col">{t("collection")}</th>
                  <th className="text-end" scope="col">
                    {t("flootPrice")}
                  </th>
                  <th className="text-end" scope="col">
                    {" "}
                    {t("volume")}({dataSort})
                  </th>
                  <th className="text-end" scope="col">
                    {" "}
                    {t("sales")}({dataSort})
                  </th>
                  <th className="text-end" scope="col">
                    {t("holers")}
                  </th>
                  <th className="text-end" scope="col">
                    {t("listed")}
                  </th>
                </tr>
              </thead>

              {/* collection list */}
              <tbody>
                {currentLinks
                  // .slice(0, load)
                  .map((collection, index) => {
                    return (
                      <tr key={index} className="pointer hover-background">
                        <th style={{ fontSize: "14px" }} scope="row">
                          {firstIndex === 0 ? index + 1 : index + 51}
                        </th>
                        <td
                          // onClick={() => setUserId(collection?.primaryContract)}
                          style={{ width: "305px" }}
                        >
                          <Link
                            to={`/trending/${collection.collection?.collTags?.contract}`}
                          >
                            <img
                              width={40}
                              height={40}
                              className="rounded-circle  me-4"
                              src={collection.collection?.logo}
                              alt=""
                            />
                            <span
                              style={{ fontSize: "14px" }}
                              className="text-black "
                            >
                              {collection.collection?.name.slice(0, 10)}
                            </span>
                          </Link>{" "}
                        </td>
                        <td>
                          <div className="text-end">
                            <div style={{ fontSize: "14px" }}>
                              <FaEthereum />
                              {collection.floorPrice?.tokenPrice}
                            </div>
                            <div
                              className="text-secondary "
                              style={{ fontSize: "12px" }}
                            >
                              {(collection.floorPriceChange * 100).toFixed(3)}%
                            </div>
                          </div>
                        </td>
                        <td className="text-end">
                          <div style={{ fontSize: "14px" }}>
                            <FaEthereum />
                            {collection.volumeEth.toFixed(2)}
                          </div>
                          <div
                            className={
                              collection.volumeEthChange * 100 < 0
                                ? "text-danger "
                                : "text-success "
                            }
                            style={{ fontSize: "12px" }}
                          >
                            {(collection.volumeEthChange * 100).toFixed(2)}%
                          </div>
                        </td>
                        <td className="text-end">
                          <div style={{ fontSize: "14px" }}>
                            {collection.saleNum}
                          </div>
                          <div
                            className={
                              collection.saleNumChange * 100 < 0
                                ? "text-danger "
                                : "text-success "
                            }
                            style={{ fontSize: "12px" }}
                          >
                            {(collection.saleNumChange * 100).toFixed(2)}%
                          </div>
                        </td>
                        <td style={{ fontSize: "14px" }} className="text-end">
                          {collection.holderNum}
                        </td>
                        <td style={{ fontSize: "14px" }} className="text-end">
                          {(
                            (collection.listingNum / collection.supply) *
                            100
                          ).toFixed(2)}
                          %
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {/* {show && (
            <button onClick={handleLoadMore} type="">
              Load More
            </button>
          )} */}
          <Pagination
            page={page}
            setPage={setPage}
            members={newCollections.length}
            amount={amount}
          />
        </div>
      </div>
    </div>
  );
};

export default Collection;
