import React, { useState, useEffect } from "react";
import { tns } from "tiny-slider/src/tiny-slider";
import Choices from "choices.js";
import { Link } from "react-router-dom";
import axios from "axios";
import NFT_Fraction2 from "../components/nft.fraction2";
import BannerSlider from "./BannerSlider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "react-i18next";
import Collection from "./Collection";
import CollectionHome from "./CollectionHome";
import "./trending.new.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import YouTube from "react-youtube";
import ReactPlayer from "react-player";
import "./homestyle.css";

const Home = (props) => {
  const { t } = useTranslation();
  const { account, chainId, library, deactivate } = useWeb3React();
  // console.log("acc", account);
  const [banner, setBanner] = useState("");
  const loadTinySlider = () => {
    if (
      document.getElementsByClassName("tiny-five-item-nav-arrow").length > 0
    ) {
      var slider6 = tns({
        container: ".tiny-five-item-nav-arrow",
        controls: true,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        controlsText: [
          '<i className="mdi mdi-chevron-left "></i>',
          '<i className="mdi mdi-chevron-right"></i>',
        ],
        nav: false,
        speed: 400,
        gutter: 10,
        responsive: {
          992: {
            items: 5,
          },
          767: {
            items: 3,
          },
          320: {
            items: 1,
          },
        },
      });
    }
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    new Choices("#choices-criteria");
    var singleCategorie = document.getElementById("choices-type");
    if (singleCategorie) {
      var singleCategories = new Choices("#choices-type");
    }
  }, []);
  const [auctionItems, setAuctionItems] = useState([]);
  const [topSellers, setTopSellers] = useState([]);
  const [popularCols, setPopularCols] = useState([]);
  const [volumeCollection, setVolumeCollection] = useState([]);
  const [collections, setCollections] = useState([]);

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
      .then((data) => setCollections(data.collections));
  }, []);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "*/*",
        "x-api-key": "c8c99b47-ac0e-5677-915a-1f0571480193",
      },
    };
    fetch(
      `https://api-goerli.reservoir.tools/collections/v5?sortBy=allTimeVolume`,
      options
    )
      .then((res) => res.json())
      .then((data) => setVolumeCollection(data.collections));
  }, []);

  const fetchAuctionItems = () => {
    axios
      .get(`/api/fractions?saleType=auction&sortBy=recent&page=1`)
      .then((res) => {
        setAuctionItems(res.data.items);
      })
      .catch((e) => {
        console.log(e);
        setAuctionItems([]);
      });
  };
  const fetchTopSellers = () => {
    axios
      .get(`/api/sellers?page=1&pageLimit=8`)
      .then((res) => {
        setTopSellers(res.data.sellers);
        loadTinySlider();
      })
      .catch((e) => {
        console.log(e);
        setTopSellers([]);
      });
  };
  const fetchPopularCols = () => {
    let url = `https://api-goerli.reservoir.tools/collections/v5?sortBy=allTimeVolume&limit=3`;
    const options = {
      method: "GET",
      headers: {
        accept: "*/*",
        "x-api-key": "c8c99b47-ac0e-5677-915a-1f0571480193",
      },
    };
    axios
      .get(url, options)
      .then((res) => {
        setPopularCols(res.data.collections);
      })
      .catch((err) => {
        console.log("tredingCollections: ", err);
      });
  };

  const url = process.env.REACT_APP_BASE_URL;

  const getBanner = () => {
    fetch(`/api/system-config/all-carousel-pictures?title=`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const status = data.filter((d) => d.status === true);
          setBanner(status);
        }
      });
  };
  useEffect(() => {
    fetchAuctionItems();
    fetchTopSellers();
    fetchPopularCols();
    getBanner();
  }, []);
  const [searchTxt, setSearchTxt] = useState("");
  const [searchSaleType, setSearchSaleType] = useState("all");
  const [searchSort, setSearchSort] = useState("recent");
  const searchForm = (e) => {
    e.preventDefault();
    window.location.href = `/marketplace?sale=${searchSaleType}&name=${searchTxt}&sort=${searchSort}`;
  };
  console.log(banner, "banner");

  console.log("collectionss", collections);

  return (
    <>
      <section className="bg-half-100 d-table w-100 pb-0">
        <div
          className="container custom__container position-relative"
          style={{ zIndex: 1 }}
        >
          {/* style={{ padding:"280px 0" }} */}
          <div className="rounded-md shadow-sm position-relative overflow-hidden player_height">
            <div className="bg-video-wrapper">
              {/* <iframe src="https://player.vimeo.com/video/502163294?background=1&autoplay=1&loop=1&byline=0&title=0"></iframe> */}

              {/* <iframe
                width="560"
                height="315"
                src={
                  banner
                    ? `${banner[0]?.youtubeLink}?autoplay=1&loop=&mute=1`
                    : `https://www.youtube.com/embed/TDkS7AYrqDk?autoplay=1&loop=1`
                }
                title="YouTube video player"
                allow="autoplay; encrypted-media"
                allowFullScreen
                loop
              /> */}
              {/* <YouTube videoId="TDkS7AYrqDk" opts={opts} onEnd={onEnd} /> */}
              <ReactPlayer
                url="https://www.youtube.com/watch?v=TDkS7AYrqDk"
                playing={true}
                loop={true}
                controls={false}
                width="640"
                height={600}
              />
            </div>

            {/* <div className="bg-overlay bg-linear-gradient-2"></div> */}
            <div className="row justify-content-center my-5">
              <div className="col-12">
                <div className="title-heading text-center px-4">
                  <h4 className="display-6 text-white title-dark fw-medium mb-3">
                    {/* The way to Find <br /> any{" "}
                    <span className="text-gradient-primary">Digital</span>{" "}
                    Content */}
                    {/* Empower your{" "}
                    <span className="text-gradient-primary">NFT Journey</span>{" "}
                    <br /> with buy and sell fractions of NFTs */}
                    {/* {t("empowerYourNFTJourney")} */}
                  </h4>
                  {/* <p className="text-white title-dark mb-0">
                    {t("fractionalizationIsAlso")}
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="co\trending\0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7l-12">
              <div className="features-absolute">
                <div className="row justify-content-center" id="reserve-form">
                  <div className="col-xl-10 mt-lg-5 ">
                    <div className="card bg-white feature-top border-0 shadow rounded">
                      <form className="d-none" onSubmit={searchForm}>
                        <div className="registration-form text-dark text-start">
                          <div className="row g-lg-0">
                            <div className="col-lg-3 col-md-6">
                              <div className="filter-search-form position-relative filter-border">
                                <i className="uil uil-search icons"></i>
                                <input
                                  type="text"
                                  className="form-control filter-input-box bg-light border-0"
                                  placeholder="Search your keaywords"
                                  value={searchTxt}
                                  onChange={(e) => setSearchTxt(e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mt-3 mt-md-0">
                              <div className="filter-search-form position-relative filter-border">
                                <i className="uil uil-usd-circle icons"></i>
                                <select
                                  className="form-select"
                                  id="choices-criteria"
                                  // defaultValue={searchSaleType}
                                  value={searchSaleType}
                                  onChange={(e) =>
                                    setSearchSaleType(e.target.value)
                                  }
                                >
                                  <option value="all">All Products</option>
                                  <option value="fixed">{t("buyNow")}</option>
                                  <option value="auction">
                                    {t("liveAuction")}
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mt-3 mt-lg-0">
                              <div className="filter-search-form position-relative filter-border">
                                <i className="uil uil-window icons"></i>
                                <select
                                  className="form-select"
                                  id="choices-type"
                                  // defaultValue={searchSort}
                                  value={searchSort}
                                  onChange={(e) =>
                                    setSearchSort(e.target.value)
                                  }
                                >
                                  <option value="recent">Recent</option>
                                  <option value="old">Old</option>
                                  <option value="az">A-Z</option>
                                  <option value="za">Z-A</option>
                                </select>
                              </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mt-3 mt-lg-0">
                              <input
                                type="submit"
                                id="search"
                                name="search"
                                style={{ height: 60 }}
                                className="btn btn-primary rounded-md searchbtn submit-btn w-100"
                                value="Search"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                      {/* <BannerSlider volumeCollection={volumeCollection} /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container custom__container mt-5 mt-60 section_wrap mb-5 ">
          <div
            className="row justify-content-center"
            style={{ position: "relative" }}
          >
            <div className="col-12">
              <div className="d-flex justify-content-between">
                <div className="trending_btn">
                  <Link
                    style={{ fontSize: "20px" }}
                    to="/"
                    className={`d-block`}
                  >
                    <Button
                      className="col-12 text-left d-block "
                      variant="primary"
                    >
                      {t("popularCollection")}
                    </Button>
                  </Link>
                </div>
              </div>
              {/* <p className="text-muted mb-0">{t("bestCollectionOfWeek")}</p> */}
            </div>
            {/* <div
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                width: "auto",
              }}
            >
              <div className="text-center d-block">
                <a
                  href="/trending-collections"
                  className="btn btn-link primary text-dark"
                >
                  See More <i className="uil uil-arrow-right"></i>
                </a>
              </div>
            </div> */}
          </div>

          <div className="row">
            {collections?.slice(0, 4)?.map((data, index) => {
              return (
                <div className="col-lg-3 col-md-6 mt-4 pt-2" key={index}>
                  <Link
                    to={`/trending/${data?.primaryContract}`}
                    // onClick={() => setUserId(data?.primaryContract)}
                  >
                    <div className="card bg-white collections collection-primary rounded-md shadow p-2 pb-0">
                      <div className="row g-2">
                        <div className="col-12">
                          <img
                            style={{ maxHeight: "245px", objectFit: "cover" }}
                            src={data?.sampleImages[0]}
                            className="img-fluid shadow-sm rounded-md"
                            alt=""
                          />
                        </div>

                        <div className="col-4">
                          <img
                            style={{ objectFit: "cover" }}
                            src={data?.sampleImages[1]}
                            className="img-fluid popular-small-img shadow-sm rounded-md"
                            alt=""
                          />
                        </div>

                        <div className="col-4">
                          <img
                            style={{ objectFit: "cover" }}
                            src={data?.sampleImages[2]}
                            className="img-fluid popular-small-img shadow-sm rounded-md"
                            alt=""
                          />
                        </div>

                        <div className="col-4">
                          <img
                            style={{ objectFit: "cover" }}
                            src={data?.sampleImages[3]}
                            className="img-fluid popular-small-img shadow-sm rounded-md"
                            alt=""
                          />
                        </div>
                      </div>

                      <div className="content text-center p-4 mt-n5">
                        <div className="position-relative d-inline-flex">
                          <img
                            src={data?.image}
                            className="avatar avatar-small popular-small-img  rounded-pill img-thumbnail shadow-md"
                            alt=""
                          />
                          <span className="verified text-primary">
                            <i className="mdi mdi-check-decagram"></i>
                          </span>
                        </div>

                        <div className="mt-2">
                          <a href="" className="text-dark topName title h5">
                            {data?.name}
                          </a>
                          <p className="text-muted mb-0 small">
                            {data.onSaleCount} Items
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div className="container custom__container section_wrap mb-5">
          <div className="row align-items-end  pb-2">
            <div className="col-md-8">
              <div className="d-flex justify-content-between">
                <div className="trending_btn">
                  <Link
                    style={{ fontSize: "20px" }}
                    to="/"
                    className={`d-block`}
                  >
                    <Button
                      className="col-12 text-left d-block "
                      variant="primary"
                    >
                      {t("topCollection")}
                    </Button>
                  </Link>
                </div>
              </div>
              {/* <p className="text-muted mb-0">{t("bestCollectionOfWeek")}</p> */}
            </div>

            <div className="col-md-4">
              <div className="text-end d-md-block d-none">
                <Link to="/top" className="btn btn-link primary text-dark">
                  See More <i className="uil uil-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-12 mt-3">
              <Carousel
                infinite={true}
                // swipeable={true}
                swipeable={true}
                // showDots={true}
                autoPlay={true}
                autoPlaySpeed={2000}
                removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
                responsive={responsive}
              >
                {volumeCollection?.map((data, index) => {
                  return (
                    <div className="tiny-slide" key={index}>
                      <Link to={`/trending/${data.primaryContract}`}>
                        <div className="card creators creators-two creator-primary rounded-md shadow overflow-hidden mx-2 my-3">
                          <div
                            className="py-5"
                            width={300}
                            style={{ background: `url(${data.banner})` }}
                          ></div>
                          <div className="position-relative mt-n5">
                            <img
                              src={data.image}
                              className="avatar avatar-md-md rounded-pill shadow-sm bg-light img-thumbnail mx-auto d-block"
                              alt=""
                            />

                            <div className="content text-center pt-2 p-4">
                              <a
                                href="/"
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                                className=" text-truncate text-dark h6 name d-block mb-0"
                              >
                                {data.name}
                              </a>
                              <small className="text-muted">
                                @
                                {data.floorAsk?.token?.contract &&
                                  data.floorAsk?.token?.contract.slice(0, 4) +
                                    "..." +
                                    data.floorAsk?.token?.contract.slice(
                                      data.floorAsk?.token?.contract.length - 4,
                                      data.floorAsk?.token?.contract.length
                                    )}
                              </small>

                              <div className="mt-3">
                                <a
                                  href=""
                                  onClick={(e) => e.preventDefault()}
                                  className="btn btn-pills btn-soft-primary"
                                >
                                  Info
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="text-center d-md-none d-block">
                <a href="/" className="btn btn-link primary text-dark">
                  See More<i className="uil uil-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container custom__container section_wrap">
          <CollectionHome />
        </div>

        {/* Best Sellers */}
        {/* <div className="container mt-100 mt-60">
          <div className="row align-items-end mb-4 pb-2">
            <div className="col-md-8">
              <div className="section-title">
                <h4 className="title mb-2">Best Creators & Sellers</h4>
                <p className="text-muted mb-0">
                  Best sellers of the week's NFTs
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mt-3">
              <div className="tiny-five-item-nav-arrow">
                {topSellers?.map((data, index) => {
                  if (!data.seller) return null;
                  return (
                    <div className="tiny-slide" key={index}>
                      <div className="card creators creators-two creator-primary rounded-md shadow overflow-hidden mx-2 my-3">
                        <div
                          className="py-5"
                          style={{
                            background: `url(${data.seller.profileCover})`,
                            backgroundSize: "cover",
                          }}
                        ></div>
                        <div className="position-relative mt-n5">
                          <img
                            src={data.seller.profilePic}
                            className="avatar avatar-md-md rounded-pill shadow-sm bg-light img-thumbnail mx-auto d-block"
                            alt=""
                          />

                          <div className="content text-center pt-2 p-4">
                            <Link
                              to={`/profile/${data.seller.address}`}
                              className="text-dark h6 name d-block mb-0"
                            >
                              {data.seller.name}
                            </Link>
                            <div style={{ fontSize: 12, fontWeight: "bold" }}>
                              VOLUME: {data.totalAmount}{" "}
                              {process.env.REACT_APP_COIN}
                            </div>

                            <div className="mt-3">
                              <Link
                                to={`/profile/${data.seller.address}`}
                                className="btn btn-pills btn-soft-primary"
                              >
                                View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div> */}
        {/* Top Collections */}
      </section>

      {/* Live Auction */}
      <div className="container custom__container mt-4 pt-2 mt-lg-5 pt-lg-0 mb-5 section_wrap">
        <div className="row align-items-end mb-2  pb-2">
          <div className="col-md-8">
            <div className="d-flex justify-content-between">
              <div className="trending_btn">
                <Link style={{ fontSize: "20px" }} to="/" className={`d-block`}>
                  <Button
                    className="col-12 text-left d-block "
                    variant="primary"
                  >
                    {t("livepool")}
                  </Button>
                </Link>
              </div>
            </div>
            <p className="text-muted mb-0">Latest Pool NFTs</p>
          </div>
        </div>
        <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-2 g-4">
          {auctionItems?.map((item, idx) => {
            return <NFT_Fraction2 item={item} key={`home_auction_${idx}`} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
