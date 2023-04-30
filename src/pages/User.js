import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { TfiReload } from "react-icons/tfi";
import Web3 from "web3";
import {
  useAccount,
  useConnect,
  useNetwork,
  useSigner,
  useSwitchNetwork,
} from "wagmi";
import metamask from "../assets/images/svg/metamask.svg";
import coinbase from "../assets/images/svg/coinbase.svg";
import WalletConnectProvider from "@walletconnect/web3-provider";
import wallet from "../assets/images/svg/walletconnect.svg";
import { FaEthereum } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "./new.css";
import {
  BuyModal,
  BuyStep,
  BidModal,
  BidStep,
  useTokens,
  useTokenActivity,
  useListings,
  useAttributes,
} from "@reservoir0x/reservoir-kit-ui";

const User = () => {
  const { data: tokensasdf } = useTokens({
    tokens: ["0xe29f8038d1a3445ab22ad1373c65ec0a6e1161a4:622"],
  });

  const { data: activity } = useTokenActivity(
    "0xe29f8038d1a3445ab22ad1373c65ec0a6e1161a4:622"
  );
  const { data: atributesadfasfd } = useAttributes(
    "0xe29f8038d1a3445ab22ad1373c65ec0a6e1161a4"
  );

  const {
    data: listings,
    fetchNextPage,
    hasNextPage,
  } = useListings({
    token: ["0xe29f8038d1a3445ab22ad1373c65ec0a6e1161a4:622"],
  });
  // console.log("tok", tokensasdf);
  console.log("activity", activity);
  // console.log("listing", listings);
  // console.log("attribute", atributesadfasfd);

  const { t } = useTranslation();
  const { pid } = useParams();
  const { token } = useParams();
  const { address, isConnected } = useAccount();
  const [step, setStep] = useState(0);
  const [isloading, setIsloading] = useState(true);
  const openState = useState(false);
  const [collection, setCollection] = useState({});
  const [attribute, setAttribute] = useState([]);
  const [myPublicAddress, setMyPublicAddress] = useState(null);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const { data: signer } = useSigner();
  const { chain: activeChain } = useNetwork();
  const infuraKey = "144c623a861848f796ec67bbe424feb2";
  const [shownext, setShownext] = useState(false);
  const { switchNetworkAsync } = useSwitchNetwork({
    chainId: 1,
  });

  const isInTheWrongNetwork = Boolean(signer && activeChain?.id !== 1);
  const [payment, setPayment] = useState("");
  // useEffect(() => {
  //   fetch("http://localhost:8080/PaymentAPI/dhhasansaha11@gmail.com/10000")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);
  const canBuy = pid && token && !isInTheWrongNetwork;
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const handleShownext = () => {
    setTimeout(() => {
      setShownext(true);
    }, 0);
    setShow(false);
  };
  const isMetaMaskInstalled = useCallback(() => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  }, []);

  const _handleConnectWallet = useCallback(async () => {
    setShow(false);
    setShownext(false);
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
      const walletAddress =
        accounts[0].split("").slice(0, 6).join("") +
        "..." +
        accounts[0]
          .split("")
          .slice(accounts[0].length - 7, accounts[0].length)
          .join("");
      setMyPublicAddress(walletAddress);
      console.log();
    } catch (error) {
      console.error(error);
    }
  }, [isMetaMaskInstalled]);

  const walletConnectProvider = (chainIdParam) => {
    return {
      connect: async () => {
        console.log("WalletConnect");
        try {
          let providerData = {};
          switch (chainIdParam) {
            case 1:
              providerData = {
                infuraId: infuraKey,
                chainId: 1,
              };
              break;
            case 42:
              providerData = {
                infuraId: infuraKey,
                chainId: 42,
              };
              break;
            case 5:
              providerData = {
                infuraId: infuraKey,
                chainId: 5,
              };
              break;
            case 56:
              providerData = {
                chainId: 56,
                rpc: {
                  56: `https://bsc-dataseed.binance.org/`,
                },
                qrcodeModalOptions: {
                  mobileLinks: ["trust"],
                },
              };
              break;
            default:
              break;
          }
          const provider = new WalletConnectProvider(providerData);
          await provider.enable();
          const web3 = new Web3(provider);
          const account = (await web3.eth.getAccounts())[0];
          const chainId = await web3.eth.getChainId();

          if (account && chainId) {
            setMyPublicAddress(account);

            provider.on("accountsChanged", async (accounts) => {
              console.log("WC accountsChanged", accounts);
              if (accounts[0]) {
                setMyPublicAddress(accounts[0]);
              } else {
              }
            });

            provider.on("chainChanged", async (chainIdItem) => {
              console.log("WC chainChanged", chainIdItem);
            });

            provider.on("disconnect", async () => {
              console.log("WC disconnect");
            });

            console.log("WC account", account);
            console.log("WC chainId", chainId);
          }
        } catch (error) {
          console.log(error);
        }
      },
    };
  };
  // const isMetaMaskInstalled = useCallback(() => {
  //   const { ethereum } = window;
  //   return Boolean(ethereum && ethereum.isMetaMask);
  // }, []);

  // const _handleConnectWallet = useCallback(async () => {
  //   const modal = document.getElementById("modal-metamask");

  //   if (!isMetaMaskInstalled()) {
  //     modal.classList.add("show");
  //     modal.style.display = "block";
  //     return;
  //   }
  //   try {
  //     await window.ethereum.request({ method: "eth_requestAccounts" });
  //     const accounts = await window.ethereum.request({
  //       method: "eth_accounts",
  //     });
  //     const walletAddress =
  //       accounts[0].split("").slice(0, 6).join("") +
  //       "..." +
  //       accounts[0]
  //         .split("")
  //         .slice(accounts[0].length - 7, accounts[0].length)
  //         .join("");
  //     setMyPublicAddress(walletAddress);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [isMetaMaskInstalled]);

  const triggerBuy = (
    <button
      className="fs-6 fs-lg-2 btn2"
      style={{
        marginBottom: "20px",
        margin: "10px",
        border: "none",
        color: "white",
        width: "40%",
        fontWeight: "500",

        backgroundColor: "#76a7db",
        boxShadow: "1px 20px 20px 2px rgba(25, 26, 25,0.4)",
      }}
    >
      Buy Now
    </button>
  );

  const triggerAuction = (
    <button
      className="fs-6 fs-lg-2 btn2"
      style={{
        marginBottom: "20px",
        border: "none",
        color: "white",
        width: "40%",
        fontWeight: "500",

        backgroundColor: "#76a7db",
        boxShadow: "1px 20px 20px 2px rgba(25, 26, 25,0.4)",
      }}
    >
      Bid
    </button>
  );
  const [jpyRate, setJpyRate] = useState("251839");

  const handleSubmit = async (price) => {
    await axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=JPY"
      )
      .then((res) => setJpyRate(res.data.ethereum.jpy));
    let actual_price_in_jpy = jpyRate * price;
    console.log(Math.round(actual_price_in_jpy), "actual price");
    let obj = {
      email: email,
      price: Math.round(actual_price_in_jpy),
    };
    console.log("obj", obj);

    // try {
    //   const response = await axios.post(
    //     `https://test-panda.opediatech.com/payment`,
    //     obj
    //   );
    //   console.log("response", response.data);
    //   if (response.status === 200) {
    //     setShownext(false);
    //     setTimeout(() => {
    //       alert("Payment process sent to your mail, Please check");
    //     }, 150);
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
    try {
      const response = await axios.post(`/payment`, obj);
      console.log("response", response.data);
      if (response.status === 200) {
        setShownext(false);
        setTimeout(() => {
          alert("Payment process sent to your mail, Please check");
        }, 150);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetch(`https://testnets-api.opensea.io/api/v1/asset/${pid}/${token}`)
      .then((res) => res.json())
      .then((data) => {
        setCollection(data);
        setIsloading(false);
      });
  }, []);
  const attributeFunc = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "*/*",
        "x-api-key": "c8c99b47-ac0e-5677-915a-1f0571480193",
      },
    };
    fetch(
      `
    https://api-goerli.reservoir.tools/collections/${pid}/attributes/explore/v4`,
      options
    )
      .then((res) => res.json())
      .then((data) => setAttribute(data.attributes));
  };
  useEffect(() => {
    attributeFunc();
  }, []);

  const newAttribute = [];
  for (let i = 0; i < attribute.length; i++) {
    let neww = attribute[i];
    if (!attribute.includes) {
      newAttribute.push(neww);
    }
  }
  const uniqueArr = attribute.filter(
    (obj, index, self) => index === self.findIndex((t) => t.key === obj.key)
  );

  // console.log("trending page", pid);
  // console.log("trending collection: single", collection[0]);
  const metamask = async () => {
    let connector;
    console.log(connectors);
    if (typeof window.ethereum) {
      connector = connectors[0];
    } else {
      connector = connectors[2];
    }
    await connect({ connector });
    if (isLoading) {
    }
  };
  console.log("collection", collection);
  // const sortedData = activity.sort((a, b) => a.type.localeCompare(b.type));
  const newtimeDuration = (timestamp) => {
    const date = new Date(timestamp);
    const days = Math.floor(date / (24 * 60 * 60 * 1000));
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    if (days >= 1) {
      return `${days} days`;
    } else if (hours >= 1) {
      return `${hours} hours`;
    } else {
      return `${minutes} minutes`;
    }
  };

  const [filterData, setFiterData] = useState([]);

  const handleFilter = (data) => {
    if (filterData.length > 0) {
      return filterData.includes(data.type);
    } else {
      return true;
    }
  };

  const handleDataFiltering = (e) => {
    if (!filterData.includes(e.target.value)) {
      setFiterData((curent) => [...curent, e.target.value]);
    } else if (filterData.includes(e.target.value)) {
      const newFilterDatas = filterData.filter((i) => i !== e.target.value);
      setFiterData(newFilterDatas);
    }
  };

  const handleRefreshClick = () => {
    attributeFunc();
  };

  return (
    <>
      {isloading ? (
        ""
      ) : (
        <div>
          <div className="container py-5 my-5">
            <div className="row g-5">
              <div className="col-12 col-lg-6">
                <img
                  className="w-100 border rounded mb-4"
                  src={collection?.image_url}
                  alt=""
                />
                <div className="border rounded p-3">
                  <h6>{t("attributes")}</h6>
                  <div className="row g-3">
                    {collection.traits?.map((att, index) => (
                      <div key={index} className="col-12 col-lg-6 ">
                        <div className="bg-light rounded p-3">
                          <p className="text-primary p-0 m-0">
                            {" "}
                            {att?.trait_type}
                          </p>
                          <div className="d-flex justify-content-between">
                            <div>
                              <h6 className="p-0 m-0"> {att?.value}</h6>
                              <p className="p-0 m-0">{att?.trait_count}</p>
                            </div>
                            {/* <div>
                              <h6 className="p-0 m-0">
                                {" "}
                                {att?.floorAskPrices}
                              </h6>
                              <p className="p-0 m-0">floor price</p>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="border rounded p-3 mb-3">
                  <div className="d-flex justify-content-between">
                    <h5> {collection?.asset_contract?.name}</h5>

                    <button onClick={handleRefreshClick} className="reload">
                      <TfiReload className="reload-icon" />
                    </button>
                  </div>
                  <div className="d-flex gap-3 align-items-center">
                    <h6 className="mb-0">{t("owner")}</h6>
                    {collection && (
                      <img
                        width={20}
                        className="rounded-circle"
                        src={
                          collection?.top_ownerships[0]?.owner?.profile_img_url
                        }
                        alt=""
                      />
                    )}

                    <h6 className="mb-0">
                      {collection?.top_ownerships.length > 0 &&
                      collection?.top_ownerships[0]?.owner?.address ? (
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={`https://opensea.io/${collection?.top_ownerships[0]?.owner?.address}`}
                        >
                          {collection?.top_ownerships[0]?.owner?.address.slice(
                            0,
                            4
                          ) +
                            "..." +
                            collection?.top_ownerships[0]?.owner?.address?.slice(
                              collection?.top_ownerships[0]?.owner?.address
                                ?.length - 4,
                              collection?.top_ownerships[0]?.owner?.address
                                ?.length
                            )}
                        </a>
                      ) : (
                        <p>No Owner</p>
                      )}
                    </h6>
                  </div>
                </div>

                <div className="border rounded p-3 mb-3">
                  <div className="btnboxfix d-flex justify-content-between">
                    <div>
                      <h5>{t("listPrice")}</h5>
                      <p>
                        {collection?.collection?.stats?.average_price
                          ? collection?.collection?.stats?.average_price.toFixed(
                              4
                            )
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <h5>{t("topOffer")}</h5>
                      {/* {Math.max(
              collection?.floorSale["1day"],
              collection?.floorSale["7day"],
              collection?.floorSale["30day"]
            )} */}
                      {collection?.collection?.stats?.thirty_day_average_price
                        ? collection?.collection?.stats?.thirty_day_average_price.toFixed(
                            4
                          )
                        : "-"}
                    </div>
                  </div>
                  {!isConnected ? (
                    <Button
                      css={{ flex: 1, justifyContent: "center" }}
                      aria-haspopup="dialog"
                      color="primary"
                      onClick={() => metamask()}
                    >
                      Connect Now
                    </Button>
                  ) : (
                    <>
                      <BuyModal
                        trigger={triggerBuy}
                        tokenId={token}
                        collectionId={`${pid}`}
                        onClose={(data, stepData, currentStep) => {
                          if (currentStep === BuyStep.Complete) {
                            console.log("success");
                          }
                        }}
                      />
                      <BidModal
                        tokenId={token}
                        trigger={triggerAuction}
                        openState={openState}
                        collectionId={`${pid}`}
                        onClose={(data, stepData, currentStep) => {
                          if (currentStep === BidStep.Complete) {
                            console.log("success");
                          }
                        }}
                        onBidError={(error) => {
                          if (error) {
                            if (error.cause.code && error.cause.code === 4001) {
                              return;
                            }
                          }
                        }}
                      />
                    </>
                  )}
                </div>
                <div className="border rounded p-3 my-3">
                  <div className="d-flex gap-3 mb-4">
                    <button
                      className={
                        step === 0
                          ? "text-primary border-0 bg-transparent fw-bold"
                          : "text-black border-0 bg-transparent"
                      }
                      onClick={() => setStep(0)}
                    >
                      Info
                    </button>
                    <button
                      className={
                        step === 1
                          ? "text-primary border-0 bg-transparent fw-bold"
                          : "text-black border-0 bg-transparent"
                      }
                      onClick={() => setStep(1)}
                    >
                      Activity
                    </button>
                    <button
                      className={
                        step === 2
                          ? "text-primary border-0 bg-transparent fw-bold"
                          : "text-black border-0 bg-transparent"
                      }
                      onClick={() => setStep(2)}
                    >
                      Listings
                    </button>
                    <button
                      className={
                        step === 3
                          ? "text-primary border-0 bg-transparent fw-bold"
                          : "text-black border-0 bg-transparent"
                      }
                      onClick={() => setStep(3)}
                    >
                      Offers
                    </button>
                  </div>
                  {step === 0 && (
                    <div>
                      <div className="d-flex align-items-center mb-3">
                        <img
                          width={30}
                          className="rounded-3 me-3"
                          src={collection?.asset_contract?.image_url}
                          alt=""
                        />
                        <h6> {collection?.asset_contract?.name}</h6>
                      </div>
                      <p> {collection?.asset_contract?.description}</p>

                      <div className="textbox d-flex justify-content-between">
                        <p className="texts"> Contract Address :</p>
                        <a
                          href={`https://etherscan.io/address/${collection?.asset_contract?.address}`}
                          rel="noreferrer"
                          target="_blank"
                          className="fw-bold text-primary"
                        >
                          {" "}
                          {collection?.asset_contract?.address
                            ? collection?.asset_contract?.address.slice(0, 4) +
                              "..." +
                              collection?.asset_contract?.address.slice(
                                collection?.asset_contract?.address.length - 4,
                                collection?.asset_contract?.address.length
                              )
                            : "not available"}
                        </a>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p> Token ID :</p>
                        <p className="fw-bold">
                          {" "}
                          {collection?.token_id
                            ? collection?.token_id
                            : "not available"}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p> Token Standard :</p>
                        <p className="fw-bold">
                          {" "}
                          {collection?.asset_contract?.schema_name
                            ? collection?.asset_contract?.schema_name
                            : "not available"}
                        </p>
                      </div>
                    </div>
                  )}
                  {step === 1 && (
                    <div>
                      <div class="dropdown">
                        <button
                          class="d-flex justify-content-between align-items-center border-1 bg-light py-2 text-start px-3 rounded-3 dropdown-toggle w-100"
                          type="button"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span>All Events</span> <BsChevronDown />
                        </button>
                        <ul
                          class="dropdown-menu w-100 p-3"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <li>
                            <div class="d-flex justify-content-between form-check form-switch ps-0">
                              <label class="form-check-label" for="sale">
                                Sale
                              </label>
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="sale"
                                value="sale"
                                onClick={handleDataFiltering}
                              />
                            </div>
                          </li>
                          <li>
                            <div class="d-flex justify-content-between form-check form-switch ps-0">
                              <label class="form-check-label" for="transfer">
                                Transfer
                              </label>
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="transfer"
                                value="transfer"
                                onClick={handleDataFiltering}
                              />
                            </div>
                          </li>
                          <li>
                            <div class="d-flex justify-content-between form-check form-switch ps-0">
                              <label class="form-check-label" for="mint">
                                Mint
                              </label>
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="mint"
                                value="mint"
                                onClick={handleDataFiltering}
                              />
                            </div>
                          </li>
                          <li>
                            <div class="d-flex justify-content-between form-check form-switch ps-0">
                              <label class="form-check-label" for="ask">
                                Ask
                              </label>
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="ask"
                                value="ask"
                                onClick={handleDataFiltering}
                              />
                            </div>
                          </li>
                          <li>
                            <div class="d-flex justify-content-between form-check form-switch ps-0">
                              <label class="form-check-label" for="bid">
                                Bid
                              </label>
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="bid"
                                value="bid"
                                onClick={handleDataFiltering}
                              />
                            </div>
                          </li>
                        </ul>
                      </div>

                      {activity.filter(handleFilter).map((acti, index) => (
                        <div key={index}>
                          <div className="d-flex justify-content-between">
                            <div>
                              <p>{acti.type}</p>
                              <p>{acti.price}</p>
                            </div>
                            <div>
                              <p>
                                {" "}
                                {newtimeDuration(acti.timestamp) + " "}
                                ago
                              </p>
                              <p className="text-primary">
                                {acti.fromAddress.slice(0, 4)}...
                                {acti.fromAddress.slice(
                                  acti.fromAddress.length - 4,
                                  acti.fromAddress.length
                                )}{" "}
                                <span className="text-black">to </span>
                                {acti.fromAddress.slice(0, 4)}...
                                {acti.toAddress.slice(
                                  acti.toAddress.length - 4,
                                  acti.toAddress.length
                                )}{" "}
                              </p>
                            </div>
                          </div>
                          <hr />
                        </div>
                      ))}
                    </div>
                  )}
                  {step === 2 && <div>No List is available here</div>}
                  {step === 3 && <div>No offers made yet</div>}
                </div>

                <Modal
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  size="sm"
                  show={show}
                  onHide={() => setShow(false)}
                >
                  <Modal.Header closeButton className="mx-auto border-0 pb-0">
                    <Modal.Title className="mx-auto">
                      Connect Your Wallet
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p style={{ fontSize: "14px" }} className="text-center">
                      By connecting your wallet, you agree to our{" "}
                      <Link to="#">Terms of Service</Link> and our{" "}
                      <Link to="#">Privacy Policy</Link> .
                    </p>
                    <div
                      onClick={_handleConnectWallet}
                      id="connectWallet"
                      style={{ cursor: "pointer" }}
                      className="option d-flex justify-content-between align-items-center border-bottom"
                    >
                      <p style={{ fontSize: "20px" }} className="mb-0 fw-bold">
                        <img src={metamask} alt="" /> MetaMask
                      </p>
                      <AiOutlineArrowRight className="icon" />
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      className="option d-flex justify-content-between align-items-center border-bottom"
                    >
                      <p style={{ fontSize: "20px" }} className="mb-0 fw-bold">
                        <img src={wallet} alt="" /> Wallet Connect
                      </p>
                      <AiOutlineArrowRight className="icon" />
                    </div>

                    <div
                      style={{ cursor: "pointer" }}
                      className="option d-flex justify-content-between align-items-center border-bottom"
                    >
                      <p style={{ fontSize: "20px" }} className="mb-0 fw-bold">
                        <img src={coinbase} alt="" /> Coinbase Wallet
                      </p>
                      <AiOutlineArrowRight className="icon" />
                    </div>

                    <div
                      onClick={handleShownext}
                      style={{ cursor: "pointer" }}
                      className="option d-flex justify-content-between align-items-center border-bottom"
                    >
                      <p style={{ fontSize: "20px" }} className="mb-0 fw-bold">
                        <img src={coinbase} alt="" /> Bull Pass
                      </p>
                      <AiOutlineArrowRight className="icon" />
                    </div>

                    <p
                      style={{ cursor: "pointer" }}
                      className="text-center cursor-pointer pt-3"
                    >
                      I don't have a wallet{" "}
                    </p>
                  </Modal.Body>
                </Modal>

                <Modal show={shownext}>
                  <Modal.Header>
                    <Modal.Title>Bull Pass Payment</Modal.Title>
                    <Modal.Title
                      style={{ cursor: "pointer" }}
                      onClick={() => setShownext(false)}
                    >
                      X
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          id="exampleFormControlInput1"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div class="mb-3">
                        <p className="text-black">
                          Price: <FaEthereum />{" "}
                          {collection?.collection?.stats?.one_day_average_price
                            ? collection?.collection?.stats?.one_day_average_price.toFixed(
                                4
                              )
                            : "-"}
                        </p>
                      </div>
                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      // onClick={() => setShownext(false)}
                      onClick={() =>
                        handleSubmit(
                          collection?.collection?.stats?.one_day_average_price
                        )
                      }
                    >
                      Submit
                    </Button>
                  </Modal.Footer>
                </Modal>

                {/* <div className="border rounded p-3">
                  <h6>Attributes</h6>
                  <div className="row g-3">
                    {uniqueArr.map((att, index) => (
                      <div key={index} className="col-12 col-lg-6 ">
                        <div className="bg-light rounded p-3">
                          <p className="text-primary p-0 m-0"> {att?.key}</p>
                          <div className="d-flex justify-content-between">
                            <div>
                              <h6 className="p-0 m-0"> {att?.value}</h6>
                              <p className="p-0 m-0">
                                {att?.tokenCount} ({att?.onSaleCount / 100}%)
                              </p>
                            </div>
                            <div>
                              <h6 className="p-0 m-0">
                                {" "}
                                {att?.floorAskPrices}
                              </h6>
                              <p className="p-0 m-0">floor price</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>

            {/* <div className="row g-5 my-5">
    <h1 className="text-center">Sample Images</h1>
    {collection[0]?.sampleImages?.length === 0 && (
      <h1 className="text-danger text-center my-5">
        No Sample Image Available
      </h1>
    )}
    {collection[0]?.sampleImages?.map((pic, index) => (
      <div className="col-3" key={index}>
        <img className="w-100" src={pic} alt="" />
      </div>
    ))}
  </div> */}

            {/* <div
              class="modal fade"
              id="exampleModalToggle"
              aria-hidden="true"
              aria-labelledby="exampleModalToggleLabel"
              tabindex="-1"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalToggleLabel">
                      Wallet
                    </h5>
                    <button
                      type="button"
                      class="btn-close "
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      X
                    </button>
                  </div>
                  <div class="modal-body">
                    Empower your NFT Journey with buy and sell fractions of NFTs
                  </div>
                  <div class="modal-footer">
                    <button class="btn btn-primary">Buy</button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default User;
