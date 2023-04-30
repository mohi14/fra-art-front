import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ethereum, polygon, arrowRight } from "../utils/images.util";

import {
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  gif1,
  gif2,
  gif3,
  gif4,
  gif5,
  gif6,
  notFoundImg,
} from "../utils/images.util";

const CrowdpadCreate = () => {
  const AuctionData = [
    {
      image: gif1,
      title: "Deep Sea Phantasy",
      id: "May 29, 2022 6:0:0",
      type: "GIFs",
      filter: ["all", "games"],
    },
    {
      image: item1,
      title: "CyberPrimal 042 LAN",
      id: "",
      type: "Arts",
      filter: ["all", "art"],
    },
    {
      image: gif2,
      title: "Crypto Egg Stamp #5",
      id: "",
      type: "Games",
      filter: ["all", "music", "meme"],
    },
    {
      image: item2,
      title: "Colorful Abstract Painting",
      id: "June 03, 2022 5:3:1",
      type: "",
      filter: ["all", "video"],
    },
    {
      image: item3,
      title: "Liquid Forest Princess",
      id: "",
      type: "",
      filter: ["all", "video", "meme"],
    },
    {
      image: gif3,
      title: "Spider Eyes Modern Art",
      id: "June 10, 2022 1:0:1",
      type: "GIFs",
      filter: ["all", "games"],
    },
    {
      image: item4,
      title: "Synthwave Painting",
      id: "",
      type: "",
      filter: ["all", "art"],
    },
    {
      image: gif4,
      title: "Contemporary Abstract",
      id: "",
      type: "GIFs",
      filter: ["all", "music"],
    },
    {
      image: item5,
      title: "Valkyrie Abstract Art",
      id: "",
      type: "",
      filter: ["all", "video", "meme"],
    },
    {
      image: gif5,
      title: "The girl with the firefly",
      id: "",
      type: "",
      filter: ["all", "art"],
    },
    {
      image: item6,
      title: "Dodo hide the seek",
      id: "",
      type: "",
      filter: ["all", "games"],
    },
    {
      image: gif6,
      title: "Pinky Ocean",
      id: "June 10, 2022 1:0:1",
      type: "",
      filter: ["all", "music"],
    },
  ];

  const [allData, setAllData] = useState(AuctionData);

  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [connected, setConnected] = useState(false);

  const isMetaMaskInstalled = useCallback(() => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  }, []);

  const checkWalletConnet = useCallback(async () => {
    if (isMetaMaskInstalled()) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (!!accounts[0]) {
        setConnected(true);
        sessionStorage.setItem("connected", true);
      }
    }
  }, [isMetaMaskInstalled]);

  useEffect(() => {
    checkWalletConnet();
  }, [checkWalletConnet]);

  const _handleConnectWallet = useCallback(async () => {
    const modal = document.getElementById("modal-metamask");

    if (!isMetaMaskInstalled()) {
      modal.classList.add("show");
      modal.style.display = "block";
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (!!accounts[0]) {
        setConnected(true);
        sessionStorage.setItem("connected", true);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMetaMaskInstalled]);

  useEffect(() => {
    setConnected(JSON.parse(sessionStorage.getItem("connected")));
    setStepOne(true);
    setStepTwo(false);
    setStepThree(false);
  }, []);

  return (
    <>
      <section className="bg-half-100 w-100 pb-0 mb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h4 className="display-6 text-dark title-dark fw-medium">
                Create a Crowdpad
              </h4>
            </div>
            <div className="col-lg-4">
              <div className="hstack gap-3 justify-content-end">
                <button className="btn btn-soft-primary">
                  <img src={ethereum} style={{ paddingRight: "15px" }}  alt="image"/>
                  Ethereum
                </button>
                <button className="btn btn-soft-primary">
                  <img src={polygon} style={{ paddingRight: "15px" }}  alt="image"/>
                  Polygon
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section pb-5">
        <div className="container">
          <div className="hstack justify-content-center gap-4">
            <button
              className={stepOne ? "text-dark" : "text-muted"}
              disabled={!connected}
              onClick={() => {
                if (connected) {
                  setStepOne(true);
                  setStepTwo(false);
                  setStepThree(false);
                }
              }}
              style={{
                all: "none",
                cursor: "pointer",
                border: " none",
                background: "transparent",
              }}
            >
              <span
                className={
                  stepOne
                    ? "badge bg-primary"
                    : stepTwo || stepThree
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
              className={stepTwo ? "text-dark" : "text-muted"}
              disabled={!connected}
              onClick={() => {
                if (connected) {
                  setStepOne(false);
                  setStepTwo(true);
                  setStepThree(false);
                }
              }}
              style={{
                all: "none",
                cursor: "pointer",
                border: " none",
                background: "transparent",
              }}
            >
              <span
                className={
                  stepTwo
                    ? "badge bg-primary"
                    : stepThree
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
                2
              </span>
              Settings
            </button>
            <img src={arrowRight} height={20}  alt="image"/>
            <button
              className={stepThree ? "text-dark" : "text-muted"}
              style={{
                all: "none",
                cursor: "pointer",
                border: " none",
                background: "transparent",
              }}
            >
              <span
                className={stepThree ? "badge bg-primary" : "badge bg-dark2"}
                disabled={!connected}
                onClick={() => {
                  if (connected) {
                    setStepOne(false);
                    setStepTwo(false);
                    setStepThree(true);
                  }
                }}
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
        {!connected ? (
          <section className="section pt-0">
            <div className="container text-center">
              <p style={{ fontSize: 18 }}>
                Please connect your wallet
                <br />
                <span style={{ fontSize: 14 }}>
                  To fractionalize a NFT you should connect the wallet
                </span>
              </p>
              <button
                className="btn btn-soft-light"
                onClick={_handleConnectWallet}
              >
                Connect Wallet
              </button>
            </div>
          </section>
        ) : connected && stepOne ? (
          <>
            <section className="section pt-0">
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
              <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4">
                {allData.map((data) => {
                  return (
                    <div className="col" key={data.title}>
                      <div className="card nft-items nft-primary rounded-md shadow overflow-hidden mb-1 p-3">
                        <div className="d-flex justify-content-between">
                          <div className="badge badge-link bg-warning">
                            Not Supported
                          </div>
                          <div className="badge badge-link bg-muted">1 NFT</div>
                        </div>

                        <div className="nft-image rounded-md mt-3 position-relative overflow-hidden">
                          <Link to={`/crowdpad/details/${data.id}`}>
                            <img
                              src={data.image}
                              className="img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>

                        <div className="card-body content position-relative p-0 mt-3">
                          <Link
                            to={`/marketplace/details/${data.id}`}
                            className="title text-dark h6"
                          >
                            {data.title}
                          </Link>
                          <br />
                          <button className="mt-3 btn btn-muted w-100">
                            Select NFT
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          connected &&
          stepTwo && (
            <div className="container text-center">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div className="sticky-bar">
                    <img
                      src={notFoundImg}
                      className="img-fluid rounded-md shadow"
                      alt=""
                    />
                  </div>
                </div>

                <div className="col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0">
                  <div className="p-4 bg-white rounded-md shadow-sm pb-5">
                    <div className="row mb-3">
                      <label className="form-label">
                        Choose selling method
                      </label>
                      <div className="col-md-6">
                        <button
                          className="btn btn-dark rounded-md w-100 mt-3"
                          style={{ fontSize: 13 }}
                        >
                          Fixed Price <br />
                          Sell at a fixed price
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button
                          className="btn btn-dark rounded-md w-100 mt-3"
                          style={{ fontSize: 13 }}
                        >
                          Auction <br />
                          Auction to the highest bidder
                        </button>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Vault NFTs</label>
                      <input
                        name="fractionName"
                        id="fractionName"
                        type="text"
                        className="form-control"
                        placeholder="Vault name"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Token & Price</label>
                      <input
                        name="fractionName"
                        id="fractionName"
                        type="text"
                        className="form-control"
                        placeholder="Reserve price in MATIC"
                      />
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <input
                          name="fractionSymbol"
                          id="fractionSymbol"
                          type="text"
                          className="form-control"
                          placeholder="Token supply"
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          name="priceMultiplier"
                          id="priceMultiplier"
                          type="text"
                          className="form-control"
                          placeholder="Token symbol"
                        />
                      </div>
                    </div>

                    <button className="btn btn-primary rounded-md w-100 mt-3">
                      Next 🠮
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </section>
    </>
  );
};

export default CrowdpadCreate;
