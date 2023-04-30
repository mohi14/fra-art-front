import React, { useState, useCallback, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { client01, logoLight, logoDark } from "../utils/images.util";
import "../../src/pages/new.css";
import PreNav from "../pages/PreNav";
import { BiCartAlt } from "react-icons/bi";
import { GoLightBulb } from "react-icons/go";
import Web3 from "web3";
import { MdOutlineDarkMode } from "react-icons/md";
import metamask from "../assets/images/svg/metamask.svg";
import coinbase from "../assets/images/svg/coinbase.svg";
import wallet from "../assets/images/svg/walletconnect.svg";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Badge, Button, Modal } from "react-bootstrap";
import { TbWorld } from "react-icons/tb";
import { ParamsContext } from "../context/ParamsProvider";
import { AuthStateContext } from "../context/authContext";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Header from "../admin/components/layout/Header";
import fraArtLogo from "../utils/logo/fra-art-logo.png";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import createPool from "../assets/images/8.png";
import joinPool from "../assets/images/9.png";
import { useWeb3React } from "@web3-react/core";
import updatedLogo from "../assets/images/updated-logo.png";
import { CartPopover } from "@reservoir0x/reservoir-kit-ui";

const Navbar = ({ nav, connectAccount }) => {
  const { t } = useTranslation();
  const { setActive, authTkn, cartItems } = useContext(AuthStateContext);

  const [myPublicAddress, setMyPublicAddress] = useState("qhut0...hfteh45");
  const [headerId, setHeaderId] = useState(0);
  const [value, setValue] = useState("");
  const [collections, setCollection] = useState([]);

  const [show, setShow] = useState(false);
  const [shownext, setShownext] = useState(false);

  const { account, chainId, library } = useWeb3React();

  const [logo, setLogo] = useState("");

  useEffect(() => {}, [account]);
  // const handleClosenext = () =>{)};
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

  const checkWalletConnet = useCallback(async () => {
    if (isMetaMaskInstalled()) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (!!accounts[0]) {
        const walletAddress =
          accounts[0].split("").slice(0, 6).join("") +
          "..." +
          accounts[0]
            .split("")
            .slice(accounts[0].length - 7, accounts[0].length)
            .join("");
        setMyPublicAddress(walletAddress);
      }
    }
  }, [isMetaMaskInstalled]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [autheticateToken, setAuthToken] = useState(null);

  useEffect(() => {
    let authToken = localStorage.getItem("authToken");
    setAuthToken(authToken);
    checkWalletConnet();
  }, [checkWalletConnet, autheticateToken]);

  // language change
  // useEffect(() => {
  //   const script = document.createElement("script");

  //   script.src =
  //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //   script.async = true;
  //   document.body.appendChild(script);

  //   console.log("google translate", window.googleTranslateElementInit);
  //   window.googleTranslateElementInit = () => {
  //     new window.google.translate.TranslateElement(
  //       {
  //         pageLanguage: "en,ja",
  //         includedLanguages: "en,ja",
  //         layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
  //       },
  //       "google_translate_element"
  //     );
  //   };
  //   return () => {
  //     // document.body.removeChild(script);
  //     delete window.googleTranslateElementInit;
  //   };
  // }, []);

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
    } catch (error) {
      console.error(error);
    }
  }, [isMetaMaskInstalled]);

  const getClosest = (elem, selector) => {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(
              s
            ),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;
        };
    }

    // Get the closest matching element
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem;
    }
    return null;
  };

  const activateMenu = () => {
    var menuItems = document.getElementsByClassName("sub-menu-item");
    if (menuItems) {
      var matchingMenuItem = null;
      for (var idx = 0; idx < menuItems.length; idx++) {
        if (menuItems[idx].href === window.location.href) {
          matchingMenuItem = menuItems[idx];
        }
      }

      if (matchingMenuItem) {
        matchingMenuItem.classList.add("active");
        var immediateParent = getClosest(matchingMenuItem, "li");
        if (immediateParent) {
          immediateParent.classList.add("active");
        }

        var parent = getClosest(matchingMenuItem, ".parent-menu-item");
        if (parent) {
          parent.classList.add("active");
          var parentMenuitem = parent.querySelector(".menu-item");
          if (parentMenuitem) {
            parentMenuitem.classList.add("active");
          }
          var parentOfParent = getClosest(parent, ".parent-parent-menu-item");
          if (parentOfParent) {
            parentOfParent.classList.add("active");
          }
        } else {
          var parentOfParent = getClosest(
            matchingMenuItem,
            ".parent-parent-menu-item"
          );
          if (parentOfParent) {
            parentOfParent.classList.add("active");
          }
        }
      }
    }
  };

  const _handleWalletConnect = useCallback(async () => {
    setShow(false);
    setShownext(false);
    try {
      const provider = new WalletConnectProvider({
        infuraId: "84842078b09946638c03157f83405213", // Required
      });

      //  Enable session (triggers QR Code modal)
      await provider.enable();
      const web3 = new Web3(provider);
      let accounts = await web3.eth.getAccounts();

      const walletAddress =
        accounts[0].split("").slice(0, 6).join("") +
        "..." +
        accounts[0]
          .split("")
          .slice(accounts[0].length - 7, accounts[0].length)
          .join("");
      setMyPublicAddress(walletAddress);
    } catch (error) {
      console.error(error);
    }
  }, [isMetaMaskInstalled]);
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const toggleMenu = () => {
    document.getElementById("isToggle").classList.toggle("open");
    var isOpen = document.getElementById("navigation");

    if (document.getElementById("isToggle").classList.contains("open")) {
      isOpen.style.display = "block";
    } else {
      isOpen.style.display = "none";
    }
    isOpen.addEventListener("click", function () {
      document.getElementById("isToggle").classList.remove("open");
      isOpen.style.display = "none";
    });
  };

  useEffect(() => {
    if (nav.includes("crowdpad")) {
      setHeaderId(1);
    } else if (nav.includes("rockpool")) {
      setHeaderId(2);
    } else if (nav.includes("marketplace")) {
      setHeaderId(3);
    } else {
      setHeaderId(0);
    }
  }, [nav]);

  useEffect(() => {
    checkWalletConnet();
  }, [checkWalletConnet]);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "*/*",
        "x-api-key": "c8c99b47-ac0e-5677-915a-1f0571480193",
      },
    };
    fetch(
      `https://api-goerli.reservoir.tools/collections/v5?sortBy=floorAskPrice`,
      options
    )
      .then((res) => res.json())
      .then((data) => setCollection(data.collections));
  }, []);

  //   console.log(value);

  // language change functionality start

  const [activeLang, setActiveLang] = useState("");

  const handleJapanese = () => {
    i18next.changeLanguage("ja");
    setActiveLang("ja");
  };

  const handleEnglish = () => {
    i18next.changeLanguage("en");
    setActiveLang("en");
  };

  const url = process.env.REACT_APP_BASE_URL;

  const [openState, setOpenState] = useState(false);

  useEffect(() => {
    const langu = localStorage.getItem("i18nextLng");
    setActiveLang(langu);

    fetch(`${url}/api/system-config/all-picture-configuration`)
      .then((res) => res.json())
      .then((data) => setLogo(data));
  }, []);
  // language change functionality end

  console.log("la", cartItems);

  return (
    <>
      <header id="topnav" className="defaultscroll sticky">
        <div className="container custom__container">
          <a className="logo" href="/">
            <span className="d-none d-lg-block">
              {/* <img src={logoDark} height='42' className={"l-dark"} alt='' />
							<img src={logoLight} height='42' className={"l-light"} alt='' /> */}
              <img
                src={logo ? logo[0]?.projectLogo : updatedLogo}
                height="56"
                className={"l-dark"}
                alt=""
              />
              <img
                src={logo ? logo[0]?.projectLogo : updatedLogo}
                height="56"
                className={"l-light"}
                alt=""
              />
            </span>
            <span className="d-lg-none">
              {/* <img src={logoDark} height='42' className={"l-dark"} alt='' />
							<img src={logoLight} height='42' className={"l-light"} alt='' /> */}
              <img
                src={logo ? logo[0]?.projectLogo : updatedLogo}
                height="46"
                className={"l-dark"}
                alt=""
              />
              <img
                src={logo ? logo[0]?.projectLogo : updatedLogo}
                height="46"
                className={"l-light"}
                alt=""
              />
            </span>
          </a>
          <div className="menu-extras">
            <div className="menu-item">
              <button
                className="navbar-toggle"
                id="isToggle"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu();
                }}
              >
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            </div>
          </div>

          <ul className="buy-button list-inline mb-0 ">
            <li className="list-inline-item mb-0 me-2 en">
              {/* <div id="google_translate_element"></div> */}
              {/* <div>Language</div> */}
              <a
                className=" nav-link dropdown-toggle"
                href="#"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {t("lang")}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-light"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li onClick={handleJapanese}>
                  <a className="dropdown-item" href="#">
                    <span className="">
                      JA <span>(日本語)</span>
                    </span>
                  </a>
                </li>
                <li onClick={handleEnglish}>
                  <a className="dropdown-item" href="#">
                    <span className="">
                      EN <span>(English)</span>
                    </span>
                  </a>
                </li>

                {/* <li><a class="dropdown-item" href="#">Something else here</a></li> */}
              </ul>
              {/* <TbWorld className="fs-4" /> <span className="fw-bold">EN</span> */}
              {/* <TbWorld className="fs-4" /> <span className="fw-bold">EN</span>
              <div className="en_hov shadow">
                <p>JP</p>
                <p>KE</p>
                <p>LV</p>
              </div> */}
              {/* <div class="dropdown">
                <button
                  class="border-0 bg-transparent dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <TbWorld className="fs-4" />{" "}
                  <span className="fw-bold">EN</span>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Japan
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Japan
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Japan
                    </a>
                  </li>
                </ul>
              </div> */}
            </li>
            <li
              style={{ cursor: "pointer" }}
              className="list-inline-item mb-0 me-3"
            >
              <CartPopover
                trigger={
                  <button onClick={() => setOpenState()}>
                    <BiCartAlt className="fs-3" />{" "}
                    <Badge className="rounded-circle" bg="primary">
                      {cartItems.length}
                    </Badge>
                  </button>
                }
                side={"bottom"}
                openState={openState}
                tokenUrl={
                  "https://api-goerli.reservoir.tools/0x10b8b56d53bfa5e374f38e6c0830bad4ebee33e6/7530"
                }
                onConnectWallet={() => {}}
              />
            </li>

            <li className="list-inline-item mb-0">
              {account || autheticateToken || authTkn ? (
                <Header />
              ) : (
                <div>
                  <button
                    className="wallet_btn py-1 px-3"
                    onClick={() => setShow(true)}
                  >
                    {t("connectWallet")}
                  </button>

                  <Modal
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    size="sm"
                    show={show}
                    onHide={() => setShow(false)}
                  >
                    <Modal.Header closeButton className="mx-auto border-0 pb-0">
                      <Modal.Title className="mx-auto">
                        {t("connectWallet")}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p style={{ fontSize: "14px" }} className="text-center">
                        {t("byConnectiongYourWallet")}{" "}
                        <Link to="#">{t("termsOfService")}</Link> {t("andOur")}{" "}
                        <Link to="#">{t("privacyPolicy")}</Link> .
                      </p>
                      <div
                        // onClick={_handleConnectWallet}
                        onClick={connectAccount}
                        id="connectWallet"
                        style={{ cursor: "pointer" }}
                        className="option d-flex justify-content-between align-items-center border-bottom"
                      >
                        <p style={{ fontSize: "20px" }} className="mb-0">
                          <img src={metamask} alt="" /> {t("metaMask")}
                        </p>
                        <AiOutlineArrowRight className="icon" />
                      </div>
                      <div
                        onClick={handleShownext}
                        style={{ cursor: "pointer" }}
                        className="option d-flex justify-content-between align-items-center border-bottom"
                      >
                        <p style={{ fontSize: "20px" }} className="mb-0">
                          <img src={coinbase} alt="" /> {t("bullPass")}
                        </p>
                        <AiOutlineArrowRight className="icon" />
                      </div>
                      <div
                        onClick={_handleWalletConnect}
                        style={{ cursor: "pointer" }}
                        className="option d-flex justify-content-between align-items-center border-bottom"
                      >
                        <p style={{ fontSize: "20px" }} className="mb-0">
                          <img src={wallet} alt="" /> {t("walletConnect")}
                        </p>
                        <AiOutlineArrowRight className="icon" />
                      </div>

                      {/* <div
												style={{ cursor: "pointer" }}
												className='option d-flex justify-content-between align-items-center border-bottom'>
												<p
													style={{ fontSize: "20px" }}
													className='mb-0 fw-bold'>
													<img src={coinbase} alt='' /> Coinbase Wallet
												</p>
												<AiOutlineArrowRight className='icon' />
											</div> */}

                      {/* <p
												style={{ cursor: "pointer" }}
												className='text-center cursor-pointer pt-3'>
												{t("iDOntHaveAWallet")}{" "}
												
											</p> */}

                      <Link
                        onClick={() => setShow(false)}
                        to="/login"
                        style={{
                          height: "3rem",
                          margin: "0px",
                          padding: "0px",
                          cursor: "pointer",
                          border: "1px solid blue",
                          borderRadius: "1rem",
                          color: "blue",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        className="text-center cursor-pointer"
                      >
                        Login | Signup
                      </Link>
                    </Modal.Body>
                  </Modal>

                  <Modal show={shownext}>
                    <Modal.Header>
                      <Modal.Title>{t("bullPassPayment")}</Modal.Title>
                      <span
                        style={{
                          cursor: "pointer",
                          border: "1px solid",
                          borderRadius: "50%",
                          fontSize: "15px !important",
                          padding: "0 6px",
                        }}
                        onClick={() => setShownext(false)}
                      >
                        X
                      </span>
                    </Modal.Header>
                    <Modal.Body>
                      <form>
                        <div class="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            {t("emailAddress")}
                          </label>
                          <input
                            type="email"
                            class="form-control"
                            id="exampleFormControlInput1"
                          />
                        </div>
                        <div class="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            {t("price")}
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput1"
                          />
                        </div>
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={() => setShownext(false)}
                      >
                        {t("submit")}
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              )}
            </li>
          </ul>

          <div id="navigation">
            {headerId === 0 ? (
              <ul
                style={{ flexWrap: "nowrap" }}
                className="navigation-menu nav-left"
              >
                <li className="parent-parent-menu-item me-2">
                  <Link className="" to="/">
                    {t("home")}
                  </Link>
                </li>
                <li className="parent-parent-menu-item me-2">
                  <Link className="" to="/trending-collections">
                    {t("collection")}
                  </Link>
                </li>
                {/* <li className="parent-parent-menu-item"> */}

                {/* <li className="parent_collection pointer parent-parent-menu-item me-2">
                  {t("collection")}
                  <ul className="child_collection shadow rounded  p-3  d-flex flex-column gap-3">
                    <li className="w-100  px-2 d-flex flex-column py-2">
                      <Link
                        to="/trending"
                        onClick={() => setActive("trending")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.2163 6.34564C15.6865 7.12698 15.2231 9.34233 15.3861 10.7497C13.5814 8.45137 13.6553 5.80809 13.6553 2C7.86688 4.36392 9.21308 11.1801 9.04016 13.2499C7.58419 11.9589 7.30893 8.87505 7.30893 8.87505C5.77208 9.73174 5.00159 12.0195 5.00159 13.8751C5.00159 18.3625 8.35922 22 12.5018 22C16.6439 22 20.0016 18.3625 20.0016 13.8751C20.0016 11.2085 18.194 9.97808 18.2163 6.34521V6.34564Z"
                              fill="#868C9F"
                            ></path>
                          </svg>
                          <div>
                            <p className="text-text">{t("trending")}</p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("trackingWhatsHotinRealTime")}
                            </div>
                          </div>
                        </div>
                      </Link>{" "}
                    </li>
                    <li className="w-100  px-2 py-2">
                      <Link
                        to="/hot"
                        className="d-flex gap-2"
                        onClick={() => setActive("hot")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M22.1395 2.31368C22.4105 2.37721 22.6218 2.58832 22.6849 2.85904C23.6006 6.84614 22.5107 11.1946 19.4112 14.2945C18.9738 14.7312 18.5039 15.1341 18.0055 15.4996C17.865 15.6032 17.7668 15.7513 17.725 15.9208C17.3241 17.5391 16.4782 19.0992 15.1837 20.3934C14.605 20.9729 13.9561 21.4774 13.2519 21.8954C12.6543 22.2497 11.9493 21.643 12.19 20.9911C12.5704 19.9624 12.7569 18.8517 12.7576 17.7062C12.7157 17.7131 12.6739 17.7213 12.6322 17.7295C12.5769 17.7403 12.5217 17.7511 12.4661 17.759C11.5305 16.9551 10.6253 16.117 9.75273 15.2452C8.88093 14.3725 8.04285 13.4674 7.23897 12.5321C7.24692 12.4763 7.25774 12.4209 7.26857 12.3655C7.2767 12.3238 7.28483 12.2822 7.29175 12.2404C6.14653 12.2414 5.03552 12.428 4.0071 12.808C3.35569 13.0486 2.749 12.3435 3.1028 11.7456C3.52048 11.0415 4.02501 10.3926 4.60451 9.81435C5.8995 8.51937 7.45888 7.67371 9.07787 7.27251C9.24744 7.23073 9.39551 7.133 9.49911 6.99201C9.86463 6.4937 10.2675 6.02387 10.7042 5.58658C13.8031 2.48765 18.1524 1.39766 22.1395 2.31368ZM14.1836 10.8144C15.1519 11.7827 16.7218 11.7827 17.6901 10.8144C18.6584 9.84612 18.6584 8.27649 17.6901 7.30794C16.7218 6.33963 15.1519 6.33963 14.1836 7.30794C13.2155 8.27649 13.2155 9.84612 14.1836 10.8144ZM3.23884 21.7596C2.36884 20.8894 5.42485 16.4229 6.14579 15.702C6.86626 14.981 8.15626 15.1022 9.02602 15.9727C9.89625 16.8422 10.0172 18.1315 9.29625 18.8524C8.57555 19.5731 4.10884 22.6296 3.23884 21.7596Z"
                              fill="#868C9F"
                            ></path>
                          </svg>
                          <div>
                            <p className="text-text">{t("hotMints")}</p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("hotCollectionsMintingNow")}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="w-100  px-2 py-2">
                      <Link
                        to="/newly"
                        className="d-flex gap-2"
                        onClick={() => setActive("newly")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.30626 7.55784C2.23501 10.6302 2.23501 15.6044 5.28376 18.6767C6.93751 14.8504 9.885 11.6543 13.5638 9.75235C10.4475 12.3858 8.26501 16.0658 7.50001 20.241C10.425 21.6252 14.025 21.1188 16.4438 18.6992C20.3587 14.7829 21 3 21 3C21 3 9.22126 3.64147 5.30626 7.55784Z"
                              fill="#868C9F"
                            ></path>
                          </svg>
                          <div>
                            <p className="text-text">{t("newlyAdded")}</p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("recentlyIncludedCollections")}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="w-100  px-2 py-2">
                      <Link
                        to="/top"
                        className="d-flex gap-2"
                        onClick={() => setActive("top")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="color-change"
                          >
                            <path
                              d="M3.52827 19.65L4.86827 20.21V11.18L2.43827 17.04C2.02827 18.06 2.51827 19.23 3.52827 19.65ZM23.0283 15.95L18.0683 3.98C17.7583 3.23 17.0283 2.77 16.2583 2.75C15.9983 2.75 15.7283 2.79 15.4683 2.9L8.09827 5.95C7.34827 6.26 6.88827 6.98 6.86827 7.75C6.85827 8.02 6.90827 8.29 7.01827 8.55L11.9783 20.52C12.2883 21.28 13.0283 21.74 13.8083 21.75C14.0683 21.75 14.3283 21.7 14.5783 21.6L21.9383 18.55C22.9583 18.13 23.4483 16.96 23.0283 15.95ZM8.87827 8.75C8.32827 8.75 7.87827 8.3 7.87827 7.75C7.87827 7.2 8.32827 6.75 8.87827 6.75C9.42827 6.75 9.87827 7.2 9.87827 7.75C9.87827 8.3 9.42827 8.75 8.87827 8.75ZM6.87827 19.75C6.87827 20.85 7.77827 21.75 8.87827 21.75H10.3283L6.87827 13.41V19.75Z"
                              fill="#868C9F"
                            ></path>
                          </svg>
                          <div>
                            <p className="text-text">{t("topCollection")}</p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("highValueCollectionsWithKeyMetrics")}
                            </div>
                          </div>
                        </div>
                      </Link>{" "}
                    </li>
                  </ul>
                </li> */}
                {/* <li class=" dropdown">
                  <button
                    style={{ padding: "25px 0" }}
                    class="border-0 bg-transparent dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Collections
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <Link to="/trending" class="dropdown-item" href="#">
                        All Collection
                      </Link>
                    </li>
                    <li>
                      <Link to="/hot" class="dropdown-item" href="#">
                        Hot Collections
                      </Link>
                    </li>
                    <li>
                      <Link to="/newly" class="dropdown-item" href="#">
                        Newly Added
                      </Link>
                    </li>
                    <li>
                      <Link to="/top" class="dropdown-item" href="#">
                        Top Collection
                      </Link>
                    </li>
                  </ul>
                </li> */}

                {/* <li className="parent-parent-menu-item">
                  <Link to="/crowdpad">Crowdpad</Link>
                </li> */}
                {/* <li className="parent-parent-menu-item me-3">
                  <Link className="fw-bold" to="/rockpool">
                    {t("fraPool")}
                  </Link>
                </li> */}

                <li
                  style={{ fontSize: "18px" }}
                  className="parent_collection  px-2 py-3  fix-navmenu pointer parent-parent-menu-item me-2"
                >
                  <Link
                    to="/rockpool"
                    className="linkfix"
                    onClick={() => setActive("hot")}
                  >
                    {t("fraPool")}
                  </Link>
                  <ul className="child_collection shadow rounded  px-0  d-flex flex-column">
                    <li className="w-100  px-2 d-flex flex-column py-2">
                      <Link
                        to="/rockpool/pools"
                        onClick={() => setActive("hot")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img width={30} src={joinPool} alt="" />
                          <div>
                            <p className="text-text">{t("joinPool")}</p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("joinPool")}
                            </div>
                          </div>
                        </div>
                      </Link>{" "}
                    </li>
                    <li className="w-100  px-2 d-flex flex-column py-2">
                      <Link
                        to="/rockpool/create"
                        onClick={() => setActive("hot")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img width={30} src={createPool} alt="" />
                          <div>
                            <p className="text-text"> {t("createPool")}</p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("createPool")}
                            </div>
                          </div>
                        </div>
                      </Link>{" "}
                    </li>
                    <li className="w-100  px-2 d-flex flex-column py-2">
                      <Link
                        to="/marketplace/create"
                        onClick={() => setActive("hot")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img width={30} src={createPool} alt="" />
                          <div>
                            <p className="text-text">
                              {" "}
                              {t("fractionalizeNft")}
                            </p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("fractionalizeNft")}
                            </div>
                          </div>
                        </div>
                      </Link>{" "}
                    </li>
                    {/* <li className='px-2 py-2 fixcss'>
											<Link
												to='/rockpool/pools'
												className=''
												onClick={() => setActive("hot")}>
												{t("joinPool")}
											</Link>
										</li> */}
                    {/* <li className='  px-2 py-2 fixcss'>
											<Link
												to='/rockpool/create'
												className=''
												onClick={() => setActive("hot")}>
												{t("createPool")}
											</Link>
										</li> */}
                  </ul>
                </li>
                <li className="parent-parent-menu-item">
                  <Link to="/marketplace">{t("marketPlace")}</Link>
                </li>

                <li className="list-inline-item mb-0  me-2">
                  <div className="search-bar ms-4">
                    <div id="itemSearch" className="menu-search mb-0">
                      <form
                        role="search"
                        method="get"
                        id="searchItemform"
                        className="searchform"
                      >
                        <input
                          style={{ marginTop: "20px" }}
                          type="search"
                          className="search p-1 ps-5 pe-5 form-control border rounded "
                          name="s"
                          id="searchItem"
                          placeholder="search..."
                          value={value}
                          onChange={handleChange}
                        />

                        <input
                          className="d-none"
                          type="submit"
                          id="searchItemsubmit"
                          value="Search"
                        />
                      </form>
                    </div>
                  </div>
                  <div className="bg-white shadow rounded">
                    {collections
                      .filter((item) => {
                        const searchTerm = value.toLocaleLowerCase();
                        const collectionName = item.name.toLocaleLowerCase();
                        // if()
                        return (
                          searchTerm && collectionName.startsWith(searchTerm)
                        );
                      })
                      .slice(0, 5)
                      .map((itm) => (
                        <Link
                          className="bg-white shadow"
                          to={`/trending/${itm?.primaryContract}`}
                        >
                          <div className="p-2 d-flex align-items-center gap-2">
                            <div>
                              <img
                                width={20}
                                height={20}
                                src={itm.image}
                                className="rounded-circle"
                                alt=""
                              />
                            </div>
                            <div className="text-text">{itm.name}</div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </li>

                {/* <li className="parent-parent-menu-item">
                  <Link to="/bridge">Bridge</Link>
                </li> */}
              </ul>
            ) : headerId === 1 ? (
              <ul className="navigation-menu nav-right">
                <li className="parent-parent-menu-item me-2">
                  <Link className="" to="/trending-collections">
                    {t("collection")}
                  </Link>
                </li>
                <li className="d-none parent_collection pointer parent-parent-menu-item me-2">
                  {t("collection")}
                  <ul className="child_collection shadow rounded  p-3  d-flex flex-column gap-3">
                    <li className="w-100  px-2 d-flex flex-column py-2">
                      <Link
                        to="/trending"
                        onClick={() => setActive("trending")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.2163 6.34564C15.6865 7.12698 15.2231 9.34233 15.3861 10.7497C13.5814 8.45137 13.6553 5.80809 13.6553 2C7.86688 4.36392 9.21308 11.1801 9.04016 13.2499C7.58419 11.9589 7.30893 8.87505 7.30893 8.87505C5.77208 9.73174 5.00159 12.0195 5.00159 13.8751C5.00159 18.3625 8.35922 22 12.5018 22C16.6439 22 20.0016 18.3625 20.0016 13.8751C20.0016 11.2085 18.194 9.97808 18.2163 6.34521V6.34564Z"
                              fill="#868C9F"
                            ></path>
                          </svg>
                          <div>
                            <p className="text-text">{t("trending")}</p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("trackingWhatsHotinRealTime")}
                            </div>
                          </div>
                        </div>
                      </Link>{" "}
                    </li>
                    <li className="w-100  px-2 py-2">
                      <Link
                        to="/hot"
                        className="d-flex gap-2"
                        onClick={() => setActive("hot")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M22.1395 2.31368C22.4105 2.37721 22.6218 2.58832 22.6849 2.85904C23.6006 6.84614 22.5107 11.1946 19.4112 14.2945C18.9738 14.7312 18.5039 15.1341 18.0055 15.4996C17.865 15.6032 17.7668 15.7513 17.725 15.9208C17.3241 17.5391 16.4782 19.0992 15.1837 20.3934C14.605 20.9729 13.9561 21.4774 13.2519 21.8954C12.6543 22.2497 11.9493 21.643 12.19 20.9911C12.5704 19.9624 12.7569 18.8517 12.7576 17.7062C12.7157 17.7131 12.6739 17.7213 12.6322 17.7295C12.5769 17.7403 12.5217 17.7511 12.4661 17.759C11.5305 16.9551 10.6253 16.117 9.75273 15.2452C8.88093 14.3725 8.04285 13.4674 7.23897 12.5321C7.24692 12.4763 7.25774 12.4209 7.26857 12.3655C7.2767 12.3238 7.28483 12.2822 7.29175 12.2404C6.14653 12.2414 5.03552 12.428 4.0071 12.808C3.35569 13.0486 2.749 12.3435 3.1028 11.7456C3.52048 11.0415 4.02501 10.3926 4.60451 9.81435C5.8995 8.51937 7.45888 7.67371 9.07787 7.27251C9.24744 7.23073 9.39551 7.133 9.49911 6.99201C9.86463 6.4937 10.2675 6.02387 10.7042 5.58658C13.8031 2.48765 18.1524 1.39766 22.1395 2.31368ZM14.1836 10.8144C15.1519 11.7827 16.7218 11.7827 17.6901 10.8144C18.6584 9.84612 18.6584 8.27649 17.6901 7.30794C16.7218 6.33963 15.1519 6.33963 14.1836 7.30794C13.2155 8.27649 13.2155 9.84612 14.1836 10.8144ZM3.23884 21.7596C2.36884 20.8894 5.42485 16.4229 6.14579 15.702C6.86626 14.981 8.15626 15.1022 9.02602 15.9727C9.89625 16.8422 10.0172 18.1315 9.29625 18.8524C8.57555 19.5731 4.10884 22.6296 3.23884 21.7596Z"
                              fill="#868C9F"
                            ></path>
                          </svg>
                          <div>
                            <p className="text-text">{t("hotMints")}</p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("hotCollectionsMintingNow")}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="w-100  px-2 py-2">
                      <Link
                        to="/newly"
                        className="d-flex gap-2"
                        onClick={() => setActive("newly")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.30626 7.55784C2.23501 10.6302 2.23501 15.6044 5.28376 18.6767C6.93751 14.8504 9.885 11.6543 13.5638 9.75235C10.4475 12.3858 8.26501 16.0658 7.50001 20.241C10.425 21.6252 14.025 21.1188 16.4438 18.6992C20.3587 14.7829 21 3 21 3C21 3 9.22126 3.64147 5.30626 7.55784Z"
                              fill="#868C9F"
                            ></path>
                          </svg>
                          <div>
                            <p className="text-text">{t("newlyAdded")}</p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("recentlyIncludedCollections")}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="w-100  px-2 py-2">
                      <Link
                        to="/top"
                        className="d-flex gap-2"
                        onClick={() => setActive("top")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="color-change"
                          >
                            <path
                              d="M3.52827 19.65L4.86827 20.21V11.18L2.43827 17.04C2.02827 18.06 2.51827 19.23 3.52827 19.65ZM23.0283 15.95L18.0683 3.98C17.7583 3.23 17.0283 2.77 16.2583 2.75C15.9983 2.75 15.7283 2.79 15.4683 2.9L8.09827 5.95C7.34827 6.26 6.88827 6.98 6.86827 7.75C6.85827 8.02 6.90827 8.29 7.01827 8.55L11.9783 20.52C12.2883 21.28 13.0283 21.74 13.8083 21.75C14.0683 21.75 14.3283 21.7 14.5783 21.6L21.9383 18.55C22.9583 18.13 23.4483 16.96 23.0283 15.95ZM8.87827 8.75C8.32827 8.75 7.87827 8.3 7.87827 7.75C7.87827 7.2 8.32827 6.75 8.87827 6.75C9.42827 6.75 9.87827 7.2 9.87827 7.75C9.87827 8.3 9.42827 8.75 8.87827 8.75ZM6.87827 19.75C6.87827 20.85 7.77827 21.75 8.87827 21.75H10.3283L6.87827 13.41V19.75Z"
                              fill="#868C9F"
                            ></path>
                          </svg>
                          <div>
                            <p className="text-text">{t("topCollection")}</p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("highValueCollectionsWithKeyMetrics")}
                            </div>
                          </div>
                        </div>
                      </Link>{" "}
                    </li>
                  </ul>
                </li>

                <li
                  style={{ fontSize: "18px" }}
                  className="parent_collection  px-2 py-3  fix-navmenu pointer parent-parent-menu-item me-2"
                >
                  <Link
                    to="/rockpool"
                    className="linkfix"
                    onClick={() => setActive("hot")}
                  >
                    {t("fraPool")}
                  </Link>
                  <ul className="child_collection shadow rounded  px-0  d-flex flex-column">
                    <li className="w-100  px-2 d-flex flex-column py-2">
                      <Link
                        to="/rockpool/pools"
                        onClick={() => setActive("hot")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img width={30} src={joinPool} alt="" />
                          <div>
                            <p className="text-text">{t("joinPool")}</p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("joinPool")}
                            </div>
                          </div>
                        </div>
                      </Link>{" "}
                    </li>
                    <li className="w-100  px-2 d-flex flex-column py-2">
                      <Link
                        to="/rockpool/create"
                        onClick={() => setActive("hot")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img width={30} src={createPool} alt="" />
                          <div>
                            <p className="text-text"> {t("createPool")}</p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("createPool")}
                            </div>
                          </div>
                        </div>
                      </Link>{" "}
                    </li>
                    <li className="w-100  px-2 d-flex flex-column py-2">
                      <Link
                        to="/marketplace/create"
                        onClick={() => setActive("hot")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img width={30} src={createPool} alt="" />
                          <div>
                            <p className="text-text">
                              {" "}
                              {t("fractionalizeNft")}
                            </p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("fractionalizeNft")}
                            </div>
                          </div>
                        </div>
                      </Link>{" "}
                    </li>
                  </ul>
                </li>

                <li className="parent-parent-menu-item">
                  <Link to="/crowdpad">{t("joinFraPad")}</Link>
                </li>
                <li className="parent-parent-menu-item">
                  <Link to="/crowdpad/create">{t("createFraPad")}</Link>
                </li>
              </ul>
            ) : headerId === 2 ? (
              <ul className="navigation-menu nav-left">
                <li className="parent-parent-menu-item">
                  <Link to="/">{t("home")}</Link>
                </li>
                <li className="parent-parent-menu-item me-2">
                  <Link className="" to="/trending-collections">
                    {t("collection")}
                  </Link>
                </li>
                <li className="d-none parent_collection pointer parent-parent-menu-item me-2">
                  {t("collection")}
                  <ul className="child_collection shadow rounded  p-3  d-flex flex-column gap-3">
                    <li className="w-100  px-2 d-flex flex-column py-2">
                      <Link
                        to="/trending"
                        onClick={() => setActive("trending")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.2163 6.34564C15.6865 7.12698 15.2231 9.34233 15.3861 10.7497C13.5814 8.45137 13.6553 5.80809 13.6553 2C7.86688 4.36392 9.21308 11.1801 9.04016 13.2499C7.58419 11.9589 7.30893 8.87505 7.30893 8.87505C5.77208 9.73174 5.00159 12.0195 5.00159 13.8751C5.00159 18.3625 8.35922 22 12.5018 22C16.6439 22 20.0016 18.3625 20.0016 13.8751C20.0016 11.2085 18.194 9.97808 18.2163 6.34521V6.34564Z"
                              fill="#868C9F"
                            ></path>
                          </svg>
                          <div>
                            <p className="text-text">{t("trending")}</p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("trackingWhatsHotinRealTime")}
                            </div>
                          </div>
                        </div>
                      </Link>{" "}
                    </li>
                    <li className="w-100  px-2 py-2">
                      <Link
                        to="/hot"
                        className="d-flex gap-2"
                        onClick={() => setActive("hot")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M22.1395 2.31368C22.4105 2.37721 22.6218 2.58832 22.6849 2.85904C23.6006 6.84614 22.5107 11.1946 19.4112 14.2945C18.9738 14.7312 18.5039 15.1341 18.0055 15.4996C17.865 15.6032 17.7668 15.7513 17.725 15.9208C17.3241 17.5391 16.4782 19.0992 15.1837 20.3934C14.605 20.9729 13.9561 21.4774 13.2519 21.8954C12.6543 22.2497 11.9493 21.643 12.19 20.9911C12.5704 19.9624 12.7569 18.8517 12.7576 17.7062C12.7157 17.7131 12.6739 17.7213 12.6322 17.7295C12.5769 17.7403 12.5217 17.7511 12.4661 17.759C11.5305 16.9551 10.6253 16.117 9.75273 15.2452C8.88093 14.3725 8.04285 13.4674 7.23897 12.5321C7.24692 12.4763 7.25774 12.4209 7.26857 12.3655C7.2767 12.3238 7.28483 12.2822 7.29175 12.2404C6.14653 12.2414 5.03552 12.428 4.0071 12.808C3.35569 13.0486 2.749 12.3435 3.1028 11.7456C3.52048 11.0415 4.02501 10.3926 4.60451 9.81435C5.8995 8.51937 7.45888 7.67371 9.07787 7.27251C9.24744 7.23073 9.39551 7.133 9.49911 6.99201C9.86463 6.4937 10.2675 6.02387 10.7042 5.58658C13.8031 2.48765 18.1524 1.39766 22.1395 2.31368ZM14.1836 10.8144C15.1519 11.7827 16.7218 11.7827 17.6901 10.8144C18.6584 9.84612 18.6584 8.27649 17.6901 7.30794C16.7218 6.33963 15.1519 6.33963 14.1836 7.30794C13.2155 8.27649 13.2155 9.84612 14.1836 10.8144ZM3.23884 21.7596C2.36884 20.8894 5.42485 16.4229 6.14579 15.702C6.86626 14.981 8.15626 15.1022 9.02602 15.9727C9.89625 16.8422 10.0172 18.1315 9.29625 18.8524C8.57555 19.5731 4.10884 22.6296 3.23884 21.7596Z"
                              fill="#868C9F"
                            ></path>
                          </svg>
                          <div>
                            <p className="text-text">{t("hotMints")}</p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("hotCollectionsMintingNow")}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="w-100  px-2 py-2">
                      <Link
                        to="/newly"
                        className="d-flex gap-2"
                        onClick={() => setActive("newly")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.30626 7.55784C2.23501 10.6302 2.23501 15.6044 5.28376 18.6767C6.93751 14.8504 9.885 11.6543 13.5638 9.75235C10.4475 12.3858 8.26501 16.0658 7.50001 20.241C10.425 21.6252 14.025 21.1188 16.4438 18.6992C20.3587 14.7829 21 3 21 3C21 3 9.22126 3.64147 5.30626 7.55784Z"
                              fill="#868C9F"
                            ></path>
                          </svg>
                          <div>
                            <p className="text-text">{t("newlyAdded")}</p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("recentlyIncludedCollections")}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="w-100  px-2 py-2">
                      <Link
                        to="/top"
                        className="d-flex gap-2"
                        onClick={() => setActive("top")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="color-change"
                          >
                            <path
                              d="M3.52827 19.65L4.86827 20.21V11.18L2.43827 17.04C2.02827 18.06 2.51827 19.23 3.52827 19.65ZM23.0283 15.95L18.0683 3.98C17.7583 3.23 17.0283 2.77 16.2583 2.75C15.9983 2.75 15.7283 2.79 15.4683 2.9L8.09827 5.95C7.34827 6.26 6.88827 6.98 6.86827 7.75C6.85827 8.02 6.90827 8.29 7.01827 8.55L11.9783 20.52C12.2883 21.28 13.0283 21.74 13.8083 21.75C14.0683 21.75 14.3283 21.7 14.5783 21.6L21.9383 18.55C22.9583 18.13 23.4483 16.96 23.0283 15.95ZM8.87827 8.75C8.32827 8.75 7.87827 8.3 7.87827 7.75C7.87827 7.2 8.32827 6.75 8.87827 6.75C9.42827 6.75 9.87827 7.2 9.87827 7.75C9.87827 8.3 9.42827 8.75 8.87827 8.75ZM6.87827 19.75C6.87827 20.85 7.77827 21.75 8.87827 21.75H10.3283L6.87827 13.41V19.75Z"
                              fill="#868C9F"
                            ></path>
                          </svg>
                          <div>
                            <p className="text-text">{t("topCollection")}</p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("highValueCollectionsWithKeyMetrics")}
                            </div>
                          </div>
                        </div>
                      </Link>{" "}
                    </li>
                  </ul>
                </li>

                <li
                  style={{ fontSize: "18px" }}
                  className="parent_collection  px-2 py-3  fix-navmenu pointer parent-parent-menu-item me-2"
                >
                  <Link
                    to="/rockpool"
                    className="linkfix"
                    onClick={() => setActive("hot")}
                  >
                    {t("fraPool")}
                  </Link>
                  <ul className="child_collection shadow rounded  px-0  d-flex flex-column">
                    <li className="w-100  px-2 d-flex flex-column py-2">
                      <Link
                        to="/rockpool/pools"
                        onClick={() => setActive("hot")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img width={30} src={joinPool} alt="" />
                          <div>
                            <p className="text-text">{t("joinPool")}</p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("joinPool")}
                            </div>
                          </div>
                        </div>
                      </Link>{" "}
                    </li>
                    <li className="w-100  px-2 d-flex flex-column py-2">
                      <Link
                        to="/rockpool/create"
                        onClick={() => setActive("hot")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img width={30} src={createPool} alt="" />
                          <div>
                            <p className="text-text"> {t("createPool")}</p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("createPool")}
                            </div>
                          </div>
                        </div>
                      </Link>{" "}
                    </li>
                    <li className="w-100  px-2 d-flex flex-column py-2">
                      <Link
                        to="/marketplace/create"
                        onClick={() => setActive("hot")}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img width={30} src={createPool} alt="" />
                          <div>
                            <p className="text-text">
                              {" "}
                              {t("fractionalizeNft")}
                            </p>
                            <div
                              className="subtitle"
                              style={{ fontSize: "12px" }}
                            >
                              {t("fractionalizeNft")}
                            </div>
                          </div>
                        </div>
                      </Link>{" "}
                    </li>
                  </ul>
                </li>
                <li className="parent-parent-menu-item">
                  <Link to="/marketplace">{t("marketPlace")}</Link>
                </li>

                {/* <li className="parent-parent-menu-item">
                  <Link to="/rockpool/pools">{t("joinPool")}</Link>
                </li>
                <li className="parent-parent-menu-item">
                  <Link to="/rockpool/create">{t("createPool")}</Link>
                </li> */}
              </ul>
            ) : (
              headerId === 3 && (
                // <ul className="navigation-menu nav-right">
                //   <li className="parent-parent-menu-item">
                //     <Link to="/marketplace">Explore</Link>
                //   </li>
                //   <li className="parent-parent-menu-item">
                //     <Link to="/marketplace/create">Fractionalize NFTs</Link>
                //   </li>
                // </ul>
                <ul
                  style={{ flexWrap: "nowrap" }}
                  className="navigation-menu nav-left"
                >
                  <li className="parent-parent-menu-item me-2">
                    <Link className="" to="/">
                      {t("home")}
                    </Link>
                  </li>
                  {/* <li className="parent-parent-menu-item"> */}
                  <li className="parent-parent-menu-item me-2">
                    <Link className="" to="/trending-collections">
                      {t("collection")}
                    </Link>
                  </li>
                  <li className="d-none parent_collection pointer parent-parent-menu-item me-2">
                    {t("collection")}
                    <ul className="child_collection shadow rounded  p-3  d-flex flex-column gap-3">
                      <li className="w-100  px-2 d-flex flex-column py-2">
                        <Link
                          to="/trending"
                          onClick={() => setActive("trending")}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18.2163 6.34564C15.6865 7.12698 15.2231 9.34233 15.3861 10.7497C13.5814 8.45137 13.6553 5.80809 13.6553 2C7.86688 4.36392 9.21308 11.1801 9.04016 13.2499C7.58419 11.9589 7.30893 8.87505 7.30893 8.87505C5.77208 9.73174 5.00159 12.0195 5.00159 13.8751C5.00159 18.3625 8.35922 22 12.5018 22C16.6439 22 20.0016 18.3625 20.0016 13.8751C20.0016 11.2085 18.194 9.97808 18.2163 6.34521V6.34564Z"
                                fill="#868C9F"
                              ></path>
                            </svg>
                            <div>
                              <p className="text-text">{t("trending")}</p>
                              <div
                                className="subtitle"
                                style={{ fontSize: "12px" }}
                              >
                                {t("trackingWhatsHotinRealTime")}
                              </div>
                            </div>
                          </div>
                        </Link>{" "}
                      </li>
                      <li className="w-100  px-2 py-2">
                        <Link
                          to="/hot"
                          className="d-flex gap-2"
                          onClick={() => setActive("hot")}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M22.1395 2.31368C22.4105 2.37721 22.6218 2.58832 22.6849 2.85904C23.6006 6.84614 22.5107 11.1946 19.4112 14.2945C18.9738 14.7312 18.5039 15.1341 18.0055 15.4996C17.865 15.6032 17.7668 15.7513 17.725 15.9208C17.3241 17.5391 16.4782 19.0992 15.1837 20.3934C14.605 20.9729 13.9561 21.4774 13.2519 21.8954C12.6543 22.2497 11.9493 21.643 12.19 20.9911C12.5704 19.9624 12.7569 18.8517 12.7576 17.7062C12.7157 17.7131 12.6739 17.7213 12.6322 17.7295C12.5769 17.7403 12.5217 17.7511 12.4661 17.759C11.5305 16.9551 10.6253 16.117 9.75273 15.2452C8.88093 14.3725 8.04285 13.4674 7.23897 12.5321C7.24692 12.4763 7.25774 12.4209 7.26857 12.3655C7.2767 12.3238 7.28483 12.2822 7.29175 12.2404C6.14653 12.2414 5.03552 12.428 4.0071 12.808C3.35569 13.0486 2.749 12.3435 3.1028 11.7456C3.52048 11.0415 4.02501 10.3926 4.60451 9.81435C5.8995 8.51937 7.45888 7.67371 9.07787 7.27251C9.24744 7.23073 9.39551 7.133 9.49911 6.99201C9.86463 6.4937 10.2675 6.02387 10.7042 5.58658C13.8031 2.48765 18.1524 1.39766 22.1395 2.31368ZM14.1836 10.8144C15.1519 11.7827 16.7218 11.7827 17.6901 10.8144C18.6584 9.84612 18.6584 8.27649 17.6901 7.30794C16.7218 6.33963 15.1519 6.33963 14.1836 7.30794C13.2155 8.27649 13.2155 9.84612 14.1836 10.8144ZM3.23884 21.7596C2.36884 20.8894 5.42485 16.4229 6.14579 15.702C6.86626 14.981 8.15626 15.1022 9.02602 15.9727C9.89625 16.8422 10.0172 18.1315 9.29625 18.8524C8.57555 19.5731 4.10884 22.6296 3.23884 21.7596Z"
                                fill="#868C9F"
                              ></path>
                            </svg>
                            <div>
                              <p className="text-text">{t("hotMints")}</p>
                              <div
                                className="subtitle"
                                style={{ fontSize: "12px" }}
                              >
                                {t("hotCollectionsMintingNow")}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li className="w-100  px-2 py-2">
                        <Link
                          to="/newly"
                          className="d-flex gap-2"
                          onClick={() => setActive("newly")}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.30626 7.55784C2.23501 10.6302 2.23501 15.6044 5.28376 18.6767C6.93751 14.8504 9.885 11.6543 13.5638 9.75235C10.4475 12.3858 8.26501 16.0658 7.50001 20.241C10.425 21.6252 14.025 21.1188 16.4438 18.6992C20.3587 14.7829 21 3 21 3C21 3 9.22126 3.64147 5.30626 7.55784Z"
                                fill="#868C9F"
                              ></path>
                            </svg>
                            <div>
                              <p className="text-text">{t("newlyAdded")}</p>
                              <div
                                className="subtitle"
                                style={{ fontSize: "12px" }}
                              >
                                {t("recentlyIncludedCollections")}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li className="w-100  px-2 py-2">
                        <Link
                          to="/top"
                          className="d-flex gap-2"
                          onClick={() => setActive("top")}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="color-change"
                            >
                              <path
                                d="M3.52827 19.65L4.86827 20.21V11.18L2.43827 17.04C2.02827 18.06 2.51827 19.23 3.52827 19.65ZM23.0283 15.95L18.0683 3.98C17.7583 3.23 17.0283 2.77 16.2583 2.75C15.9983 2.75 15.7283 2.79 15.4683 2.9L8.09827 5.95C7.34827 6.26 6.88827 6.98 6.86827 7.75C6.85827 8.02 6.90827 8.29 7.01827 8.55L11.9783 20.52C12.2883 21.28 13.0283 21.74 13.8083 21.75C14.0683 21.75 14.3283 21.7 14.5783 21.6L21.9383 18.55C22.9583 18.13 23.4483 16.96 23.0283 15.95ZM8.87827 8.75C8.32827 8.75 7.87827 8.3 7.87827 7.75C7.87827 7.2 8.32827 6.75 8.87827 6.75C9.42827 6.75 9.87827 7.2 9.87827 7.75C9.87827 8.3 9.42827 8.75 8.87827 8.75ZM6.87827 19.75C6.87827 20.85 7.77827 21.75 8.87827 21.75H10.3283L6.87827 13.41V19.75Z"
                                fill="#868C9F"
                              ></path>
                            </svg>
                            <div>
                              <p className="text-text">{t("topCollection")}</p>
                              <div
                                className="subtitle"
                                style={{ fontSize: "12px" }}
                              >
                                {t("highValueCollectionsWithKeyMetrics")}
                              </div>
                            </div>
                          </div>
                        </Link>{" "}
                      </li>
                    </ul>
                  </li>
                  {/* <li class=" dropdown">
                  <button
                    style={{ padding: "25px 0" }}
                    class="border-0 bg-transparent dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Collections
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <Link to="/trending" class="dropdown-item" href="#">
                        All Collection
                      </Link>
                    </li>
                    <li>
                      <Link to="/hot" class="dropdown-item" href="#">
                        Hot Collections
                      </Link>
                    </li>
                    <li>
                      <Link to="/newly" class="dropdown-item" href="#">
                        Newly Added
                      </Link>
                    </li>
                    <li>
                      <Link to="/top" class="dropdown-item" href="#">
                        Top Collection
                      </Link>
                    </li>
                  </ul>
                </li> */}

                  {/* <li className="parent-parent-menu-item">
                  <Link to="/crowdpad">Crowdpad</Link>
                </li> */}

                  <li
                    style={{ fontSize: "18px" }}
                    className="parent_collection  px-2 py-3  fix-navmenu pointer parent-parent-menu-item me-2"
                  >
                    <Link
                      to="/rockpool"
                      className="linkfix"
                      onClick={() => setActive("hot")}
                    >
                      {t("fraPool")}
                    </Link>
                    <ul className="child_collection shadow rounded  px-0  d-flex flex-column">
                      <li className="w-100  px-2 d-flex flex-column py-2">
                        <Link
                          to="/rockpool/pools"
                          onClick={() => setActive("hot")}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <img width={30} src={joinPool} alt="" />
                            <div>
                              <p className="text-text">{t("joinPool")}</p>
                              <div
                                className="subtitle"
                                style={{ fontSize: "12px" }}
                              >
                                {t("joinPool")}
                              </div>
                            </div>
                          </div>
                        </Link>{" "}
                      </li>
                      <li className="w-100  px-2 d-flex flex-column py-2">
                        <Link
                          to="/rockpool/create"
                          onClick={() => setActive("hot")}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <img width={30} src={createPool} alt="" />
                            <div>
                              <p className="text-text"> {t("createPool")}</p>
                              <div
                                className="subtitle"
                                style={{ fontSize: "12px" }}
                              >
                                {t("createPool")}
                              </div>
                            </div>
                          </div>
                        </Link>{" "}
                      </li>
                      <li className="w-100  px-2 d-flex flex-column py-2">
                        <Link
                          to="/marketplace/create"
                          onClick={() => setActive("hot")}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <img width={30} src={createPool} alt="" />
                            <div>
                              <p className="text-text">
                                {" "}
                                {t("fractionalizeNft")}
                              </p>
                              <div
                                className="subtitle"
                                style={{ fontSize: "12px" }}
                              >
                                {t("fractionalizeNft")}
                              </div>
                            </div>
                          </div>
                        </Link>{" "}
                      </li>
                    </ul>
                  </li>
                  <li className="parent-parent-menu-item">
                    <Link to="/marketplace">{t("marketPlace")}</Link>
                  </li>
                  <li className="list-inline-item mb-0 me-2">
                    <div className="search-bar">
                      <div id="itemSearch" className="menu-search mb-0">
                        <form
                          role="search"
                          method="get"
                          id="searchItemform"
                          className="searchform"
                        >
                          <input
                            style={{ marginTop: "20px" }}
                            type="search"
                            className="search p-1 ps-5 pe-5 form-control border rounded "
                            name="s"
                            id="searchItem"
                            value={value}
                            onChange={handleChange}
                          />

                          <input
                            className="d-none"
                            type="submit"
                            id="searchItemsubmit"
                            value="Search"
                          />
                        </form>
                      </div>
                    </div>
                    <div className="bg-white shadow rounded">
                      {collections
                        .filter((item) => {
                          const searchTerm = value.toLocaleLowerCase();
                          const collectionName = item.name.toLocaleLowerCase();
                          // if()
                          return (
                            searchTerm && collectionName.startsWith(searchTerm)
                          );
                        })
                        .slice(0, 5)
                        .map((itm) => (
                          <Link
                            className="bg-white shadow"
                            to={`/trending/${itm?.primaryContract}`}
                          >
                            <div className="p-2 d-flex align-items-center gap-2">
                              <div>
                                <img
                                  width={20}
                                  height={20}
                                  src={itm.image}
                                  className="rounded-circle"
                                  alt=""
                                />
                              </div>
                              <div className="text-text">{itm.name}</div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </li>

                  {/* <li className="parent-parent-menu-item">
                  <Link to="/bridge">Bridge</Link>
                </li> */}
                </ul>
              )
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
