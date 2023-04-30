import { FiClock, FiShare } from "react-icons/fi";
import { useParams } from "react-router-dom";

import {
  ethereum,
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
  profileDefault,
  collectionDefault,
  userPlus,
  greenFlag,
} from "../utils/images.util";

const CrowdpadDetails = () => {
  const { id } = useParams();

  const AuctionData = [
    {
      image: gif1,
      title: "Deep Sea Phantasy",
      id: 1,
      price: 0.4,
      type: "GIFs",
      progress: 50,
      nfts: 1,
      participants: [
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
      ],
      filter: ["all", "games"],
    },
    {
      image: item1,
      title: "CyberPrimal 042 LAN",
      id: 2,
      price: 0.4,
      type: "Arts",
      progress: 5,
      nfts: 1,
      participants: [],
      filter: ["all", "art"],
    },
    {
      image: gif2,
      title: "Crypto Egg Stamp #5",
      id: 3,
      price: 0.4,
      type: "Games",
      progress: 75,
      nfts: 1,
      participants: [
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
      ],
      filter: ["all", "music", "meme"],
    },
    {
      image: item2,
      title: "Colorful Abstract Painting",
      id: 4,
      price: 0.4,
      type: "Art",
      progress: 12,
      nfts: 1,
      participants: [
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
      ],
      filter: ["all", "video"],
    },
    {
      image: item3,
      title: "Liquid Forest Princess",
      id: 5,
      price: 0.4,
      type: "",
      progress: 18,
      nfts: 1,
      participants: [],
      filter: ["all", "video", "meme"],
    },
    {
      image: gif3,
      title: "Spider Eyes Modern Art",
      id: 6,
      price: 0.4,
      type: "GIFs",
      progress: 25,
      nfts: 1,
      participants: [],
      filter: ["all", "games"],
    },
    {
      image: item4,
      title: "Synthwave Painting",
      id: 7,
      price: 0.4,
      type: "",
      progress: 30,
      nfts: 1,
      participants: [],
      filter: ["all", "art"],
    },
    {
      image: gif4,
      title: "Contemporary Abstract",
      id: 8,
      price: 0.4,
      type: "GIFs",
      progress: 44,
      nfts: 1,
      participants: [
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
      ],
      filter: ["all", "music"],
    },
    {
      image: item5,
      title: "Valkyrie Abstract Art",
      id: 9,
      price: 0.4,
      type: "",
      progress: 21,
      nfts: 1,
      participants: [],
      filter: ["all", "video", "meme"],
    },
    {
      image: gif5,
      title: "The girl with the firefly",
      id: 10,
      price: 0.4,
      type: "",
      progress: 4,
      nfts: 1,
      participants: [],
      filter: ["all", "art"],
    },
    {
      image: item6,
      title: "Dodo hide the seek",
      id: 11,
      price: 0.4,
      type: "",
      progress: 18,
      nfts: 1,
      participants: [],
      filter: ["all", "games"],
    },
    {
      image: gif6,
      title: "Pinky Ocean",
      id: 12,
      price: 0.4,
      type: "",
      progress: 20,
      nfts: 1,
      participants: [
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
        { id: 0, address: "0x9e6...ef07b", val: 0.0001 },
      ],
      filter: ["all", "music"],
    },
  ];

  return (
    <section className="bg-item-detail d-table w-100">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="sticky-bar">
              <img
                src={AuctionData[id - 1].image}
                className="img-fluid rounded-md shadow"
                alt=""
              />
              <div className="hstack gap-3 mt-4 justify-content-center">
                <button className="btn btn-pills btn-soft-primary">
                  <lable>
                    <img src={ethereum} style={{ paddingRight: 8 }}  alt="image"/>
                  </lable>
                  Ethereum
                </button>
                <button className="btn btn-pills btn-soft-primary">
                  <span style={{ paddingRight: 8 }}>
                    <FiShare />
                  </span>
                  Share
                </button>
                <button className="btn btn-pills btn-soft-primary">
                  <span style={{ paddingRight: 8 }}>
                    <i className="uil uil-discord"></i>
                  </span>
                  Community
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0">
            <div className="ms-lg-5">
              <h5 className="text-dark d-flex">
                <img src={greenFlag} width={20} style={{ marginRight: 10 }} alt="image" />
                Active Pool
              </h5>
              <div className="title-heading">
                <h4 className="h3 fw-bold mb-0">{AuctionData[id - 1].title}</h4>
              </div>

              <div className="row">
                <div className="col-md-6 mt-4">
                  <h6>Target Price</h6>
                  <h4 className="mb-0 text-gradient-primary">
                    <strong>{AuctionData[id - 1].price} ETH</strong>
                  </h4>
                </div>
                <div className="hstack justify-content-start mt-3 gap-3">
                  <small className="text-dark fw-bold">
                    <span style={{ fontSize: 14 }}>Pool Progress</span>
                  </small>

                  <div
                    className="progress"
                    style={{
                      height: 8,
                      backgroundColor: "#3c4858",
                      width: "30%",
                    }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${AuctionData[id - 1].progress}%`,
                      }}
                    />
                  </div>

                  <small style={{ fontSize: 14, marginLeft: 5 }}>
                    {AuctionData[id - 1].progress}%
                  </small>
                </div>
                <div className="col-12 mt-4">
                  <div className="hstack gap-2 mb-3">
                    <FiClock />
                    <h6 className="my-auto text-dark">3 Days</h6>
                  </div>
                  <button className="btn btn-l btn-pills btn-primary">
                    Connect Wallet to Join
                  </button>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <ul
                    className="nav nav-tabs border-bottom"
                    id="myTab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="detail-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#detailItem"
                        type="button"
                        role="tab"
                        aria-controls="detailItem"
                        aria-selected="true"
                      >
                        Pool Details
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="participant-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#participantItem"
                        type="button"
                        role="tab"
                        aria-controls="participantItem"
                        aria-selected="false"
                      >
                        Participants ({AuctionData[id - 1].participants.length})
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="desc-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#descriptionItem"
                        type="button"
                        role="tab"
                        aria-controls="descriptionItem"
                        aria-selected="false"
                      >
                        Description
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content mt-3">
                    <div
                      className="tab-pane fade show active"
                      id="detailItem"
                      role="tabpanel"
                      aria-labelledby="detail-tab"
                    >
                      <h3>Pool Details</h3>
                      <p className="text-dark">
                        Fraction Name
                        <br />
                        <strong>Pathway Home</strong>
                      </p>
                      <p className="text-dark">
                        Fraction
                        <br />
                        <strong>SYMBOL PATH</strong>
                      </p>
                      <p className="text-dark">
                        Reserve Price after Fractionalization
                        <br />
                        <strong>4.5 ETH</strong>
                      </p>
                      <div
                        className="hstack gap-3 bg-light py-3 px-4 rounded"
                        style={{ width: "fit-content" }}
                      >
                        <div className="hstack gap-3">
                          <img src={collectionDefault} width={50}  alt="image"/>
                          <p className="text-dark my-auto">
                            Collection
                            <br />
                            <strong>FraArt</strong>
                          </p>
                        </div>
                        <div className="hstack gap-3">
                          <img src={profileDefault} width={50}  alt="image"/>
                          <p className="text-dark my-auto">
                            Seller
                            <br />
                            <strong>John</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="participantItem"
                      role="tabpanel"
                      aria-labelledby="participant-tab"
                    >
                      {AuctionData[id - 1].participants.length > 0 ? (
                        <div
                          style={{
                            height: "100%",
                            maxHeight: 200,
                            overflowY: "auto",
                          }}
                        >
                          {AuctionData[id - 1].participants.map((p) => (
                            <div className="hstack text-dark my-3">
                              <img
                                src={profileDefault}
                                width={20}
                                style={{ marginRight: 10 }}  alt="image"
                              />
                              <h6 className="my-auto">{p.address}</h6>
                              <h6 className="ms-auto my-auto">{p.val} ETH</h6>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          <img
                            src={userPlus}
                            width={50}
                            className="mx-auto d-flex mb-3"  alt="image"
                          />
                          <p className="text-muted text-center">
                            This pool is still empty.
                            <br />
                            Get it started and invite your friends!
                          </p>
                        </>
                      )}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="descriptionItem"
                      role="tabpanel"
                      aria-labelledby="desc-tab"
                    >
                      <p className="text-muted">
                        This piece was inspired by the road back home.
                      </p>
                      <div className="hstack justify-content-between bg-light p-3 rounded">
                        <p className="text-dark my-auto">0x9c8a2b3...</p>
                        <p className="text-dark my-auto">Token Id: 21...</p>
                        <p className="text-dark my-auto">Nº of copies: 1/1</p>
                      </div>
                      <div className="hstack gap-3 mt-4">
                        <button className="btn btn-pills btn-soft-primary">
                          View on OpenSea
                        </button>
                        <button className="btn btn-pills btn-soft-primary">
                          Block Explorer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="title-heading my-4">How it works</h3>
        <p className="text-dark lh-lg">
          With NFT Crowdfunding, the NFT is for sale at an initial reserve
          price, a so-called Target Price, and multiple people can join to buy a
          part of it. As soon as the Target Price is met, a timer is triggered
          allowing other users to participate in the purchase of the NFT,
          consequently increasing its final value. At the end of the countdown,
          the NFT is fractionalized and all the participants in the NFT
          Crowdfunding receive a proportional number of Fractions according to
          their contribution. Immediately thereafter, the NFT is made available
          to be repurchased in the FraArt marketplace via auction
        </p>
      </div>
    </section>
  );
};

export default CrowdpadDetails;
