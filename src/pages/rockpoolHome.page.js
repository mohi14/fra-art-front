import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import useIsDesktop from "../hooks/useIsDesktop";
import { useTranslation } from "react-i18next";
import {
  bluechip,
  client05,
  client06,
  client08,
  createPool,
  gif4,
  ownFrac,
  reachFaster,
  reachValue,
  rockBy,
  rockpoolImg,
  shareComm,
} from "../utils/images.util";

function RockpoolHome() {
  const { t } = useTranslation();
  const isDesktop = useIsDesktop();
  // fetch all the pool here!
  return (
    <>
      <section className="bg-half-170 d-table w-100">
        <div className="bg-overlay bg-gradient-primary opacity-8"></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-6">
              <div className="title-heading">
                <h6 className="text-light title-dark fw-normal">
                  FraPool: the best of the Opensea is here
                </h6>
                <h4 className="heading text-white title-dark fw-bold mb-3">
                  {t("buyCollectivelyToOwn")}
                </h4>
                <p className="text-white-50 para-desc mb-0 mb-0">
                  FraPool is a tool that allows you to collectively buy any NFT
                  (ERC721) listed at a fixed price on OpenSea.
                </p>

                <div className="mt-4 pt-2">
                  <Link
                    to="/rockpool/pools"
                    className="btn btn-pills btn-primary"
                  >
                    {t("joinPools")}
                  </Link>
                  <Link
                    to="/rockpool/create"
                    className="mx-3 btn btn-pills btn-outline-primary"
                  >
                    {t("createPool")}
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0">
              <div className="card bg-white nft-items nft-primary img-skewed rounded-md shadow overflow-hidden mb-1 p-3">
                <div className="d-flex justify-content-between">
                  <div className="img-group">
                    <Link to="/creator-profile" className="user-avatar">
                      <img
                        src={client08}
                        alt="user"
                        className="avatar avatar-sm-sm img-thumbnail border-0 shadow-sm rounded-circle"
                      />
                    </Link>
                    <Link to="/creator-profile" className="user-avatar ms-n3">
                      <img
                        src={client05}
                        alt="user"
                        className="avatar avatar-sm-sm img-thumbnail border-0 shadow-sm rounded-circle"
                      />
                    </Link>
                    <Link to="/creator-profile" className="user-avatar ms-n3">
                      <img
                        src={client06}
                        alt="user"
                        className="avatar avatar-sm-sm img-thumbnail border-0 shadow-sm rounded-circle"
                      />
                    </Link>
                  </div>

                  <span className="like-icon shadow-sm">
                    <a
                      href=""
                      onClick={(e) => e.preventDefault()}
                      className="text-muted icon"
                    >
                      <i className="mdi mdi-18px mdi-heart mb-0"></i>
                    </a>
                  </span>
                </div>

                <div className="nft-image rounded-md mt-3 position-relative overflow-hidden shadow">
                  <img src={gif4} className="img-fluid" alt="" />
                  <div className="position-absolute top-0 start-0 m-2">
                    <a
                      href=""
                      onClick={(e) => e.preventDefault()}
                      className="badge badge-link bg-primary"
                    >
                      GIFs
                    </a>
                  </div>
                </div>

                <div className="card-body content position-relative p-0 mt-3">
                  <div className="title text-dark h5">Deep Sea Phantasy</div>

                  <div className="d-flex justify-content-between mt-2">
                    <small className="rate fw-bold">20.5 ETH</small>
                    <small className="text-dark fw-bold">1 out of 10</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4 justify-content-center">
            <div className="col">
              <div className="card nft-items nft-primary rounded-md shadow overflow-hidden mb-1">
                <div className="nft-image rounded-md mt-3 position-relative overflow-hidden text-center">
                  <img src={bluechip} className="img-fluid" alt="" />
                </div>

                <div className="card-body content position-relative p-3 mt-3 bg-light text-center">
                  <h4 className="title fw-bold">{t("anEasierWaytoGet")}</h4>
                  <h4 className="title text-dark h6">
                    {t("byBuyingCollectively")}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card nft-items nft-primary rounded-md shadow overflow-hidden mb-1">
                <div className="nft-image rounded-md mt-3 position-relative overflow-hidden text-center">
                  <img src={reachFaster} className="img-fluid" alt="" />
                </div>

                <div className="card-body content position-relative p-3 mt-3 bg-light text-center">
                  <h4 className="title fw-bold">
                    {t("reachValueFasterThrough")}
                  </h4>
                  <h4 className="title text-dark h6">
                    {t("whenTheValueIsReached")}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card nft-items nft-primary rounded-md shadow overflow-hidden mb-1">
                <div className="nft-image rounded-md mt-3 position-relative overflow-hidden text-center">
                  <img src={rockBy} className="img-fluid" alt="" />
                </div>

                <div className="card-body content position-relative p-3 mt-3 bg-light text-center">
                  <h4 className="title fw-bold">{t("rockDiversifyingYour")}</h4>
                  <h4 className="title text-dark h6">
                    {t("itsYourTimeToHaveAn")}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-6 mb-4">
              <div className="title-heading">
                <h5 className="heading title-dark fw-bold">
                  {t("trustTheCodes")}:
                </h5>
                <h5 className="title-dark fw-normal mb-3 text-primary">
                  {t("youDontHaveToTrust")}
                </h5>
                <ul>
                  <li className="para-desc">{t("youCanCreateAPoolAndJoin")}</li>
                  <li className="para-desc">
                    {t("onceTheTargetPriceIsReached")}
                  </li>
                  <li className="para-desc">
                    {t("afterThatAllTheParticipants")}
                  </li>
                </ul>
                <p className="para-desc">{t("itsAllInADecentralized")}</p>
                <Link className="btn btn-primary" to="/rockpool/create">
                  {t("createPool")}
                </Link>
              </div>
            </div>

            <div className="col-lg-5 col-md-3 position-relative mt-0">
              <img className={!isDesktop && "img-fluid"} src={gif4} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h3 className="title mb-5 fw-bold">{t("fromOpenSeaToYourWallet")}</h3>
          <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4 justify-content-center">
            <div className="col">
              <div className="card nft-items nft-primary rounded-md shadow overflow-hidden mb-1">
                <div className="nft-image rounded-md mt-3 position-relative overflow-hidden text-center">
                  <img src={createPool} className="img-fluid" alt="" />
                </div>

                <div className="card-body content position-relative p-3 mt-3 bg-light hstack gap-2">
                  <h5 className="badge bg-primary rounded-lg">1</h5>
                  <h4 className="title text-dark h6">
                    {t("createAPoolOrJoin")}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card nft-items nft-primary rounded-md shadow overflow-hidden mb-1">
                <div className="nft-image rounded-md mt-3 position-relative overflow-hidden text-center">
                  <img src={shareComm} className="img-fluid" alt="" />
                </div>

                <div className="card-body content position-relative p-3 mt-3 bg-light hstack gap-2">
                  <h5 className="badge bg-primary rounded-lg">2</h5>
                  <h4 className="title text-dark h6">
                    {t("shareWithCommunities")}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card nft-items nft-primary rounded-md shadow overflow-hidden mb-1">
                <div className="nft-image rounded-md mt-3 position-relative overflow-hidden text-center">
                  <img src={reachValue} className="img-fluid" alt="" />
                </div>

                <div className="card-body content position-relative p-3 mt-3 bg-light hstack gap-2">
                  <h5 className="badge bg-primary rounded-lg">3</h5>
                  <h4 className="title text-dark h6">
                    {t("reachTheValueOfTheNFT")}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card nft-items nft-primary rounded-md shadow overflow-hidden mb-1">
                <div className="nft-image rounded-md mt-3 position-relative overflow-hidden text-center">
                  <img src={ownFrac} className="img-fluid" alt="" />
                </div>

                <div className="card-body content position-relative p-3 mt-3 bg-light hstack gap-2">
                  <h5 className="badge bg-primary rounded-lg">4</h5>
                  <h4 className="title text-dark h6">
                    {t("ownAFractionOfTheNFT")}
                  </h4>
                </div>
              </div>
            </div>
            <Link className="btn btn-primary" to="/rockpool/create">
              {t("startNow")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="bg-overlay bg-gradient-light opacity-6"></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-6">
              <div className="title-heading">
                <h5 className="heading title-dark fw-bold">
                  {t("discoverCollectSell")}
                </h5>
                <h5 className="title-dark fw-normal mb-3 text-primary">
                  {t("buyAnyNFTListed")}
                </h5>
                <h4 className="title-dark fw-normal fw-bold">
                  {t("joinAsYouWant")}
                </h4>
                <p className="para-desc">{t("createPublicPoolsInWhich")}</p>
                <h4 className="title-dark fw-normal mt-3 fw-bold">
                  {t("recieveACuratorFee")}
                </h4>
                <p className="para-desc">{t("theCuratorSetsTheFee")}</p>
                <h4 className="title-dark fw-normal mt-3 fw-bold">
                  {t("boostYourNFTCommunity")}
                </h4>
                <p className="para-desc">{t("createPrivatePoolsToRecieve")}</p>
              </div>
            </div>
            <div className="col-lg-5 col-md-3 mt-0">
              <img
                className={!isDesktop && "img-fluid"}
                src={rockpoolImg}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row justify-content-center text-center">
            <h3 className="title mb-5 fw-bold">{t("theBestOfTheOpenSea")}</h3>
            <iframe
              width="1300"
              height="730"
              src="https://www.youtube.com/embed/o-DCkoy25uk"
              title="FraArt - Trustless way of sharing ownership of NFTs"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <h2 className="title text-center fw-bold">{t("faq")}</h2>
            <div className="col-lg-8 col-md-7 col-12">
              <div className="accordion mt-4 pt-2">
                <div className="accordion-item rounded">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button border-0"
                      style={{ backgroundColor: "#F8F8FC" }}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq1"
                      aria-expanded="true"
                      aria-controls="faq1"
                    >
                      {t("howLongDoesItTake")}
                    </button>
                  </h2>
                  <div
                    id="faq1"
                    className="accordion-collapse border-0 collapse show"
                    aria-labelledby="headingOne"
                  >
                    <div className="accordion-body text-muted bg-white">
                      {t("itsPrettyFastAsFraPool")}
                    </div>
                  </div>
                </div>

                <div className="accordion-item rounded mt-2">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button border-0 collapsed"
                      style={{ backgroundColor: "#F8F8FC" }}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq2"
                      aria-expanded="false"
                      aria-controls="faq2"
                    >
                      {t("whoSetsTheCuratorsFee")}
                    </button>
                  </h2>
                  <div
                    id="faq2"
                    className="accordion-collapse border-0 collapse"
                    aria-labelledby="headingTwo"
                  >
                    <div className="accordion-body text-muted bg-white">
                      {t("thePerSonResponsibleForSettingThis")}
                    </div>
                  </div>
                </div>

                <div className="accordion-item rounded mt-2">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button border-0 collapsed"
                      style={{ backgroundColor: "#F8F8FC" }}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq3"
                      aria-expanded="false"
                      aria-controls="faq3"
                    >
                      {t("whatIsTheUseOfCreating")}
                    </button>
                  </h2>
                  <div
                    id="faq3"
                    className="accordion-collapse border-0 collapse"
                    aria-labelledby="headingThree"
                  >
                    <div className="accordion-body text-muted bg-white">
                      With Private Pools, you can stir up a community or use it
                      to own an NFT with your friends. Overall, it may have a
                      goal beyond the speed and ease of getting a great NFT.
                    </div>
                  </div>
                </div>

                <div className="accordion-item rounded mt-2">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button border-0 collapsed"
                      style={{ backgroundColor: "#F8F8FC" }}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq4"
                      aria-expanded="false"
                      aria-controls="faq4"
                    >
                      {t("whyUseFraPoolWhenICan")}
                    </button>
                  </h2>
                  <div
                    id="faq4"
                    className="accordion-collapse border-0 collapse"
                    aria-labelledby="headingFour"
                  >
                    <div className="accordion-body text-muted bg-white">
                      {t("youWillStillBeBuyingFromOpenSea")}
                    </div>
                  </div>
                </div>

                <div className="accordion-item rounded mt-2">
                  <h2 className="accordion-header" id="headingFive">
                    <button
                      className="accordion-button border-0 collapsed"
                      style={{ backgroundColor: "#F8F8FC" }}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq5"
                      aria-expanded="false"
                      aria-controls="faq5"
                    >
                      {t("whyDoesNFTNeedToBeListed")}
                    </button>
                  </h2>
                  <div
                    id="faq5"
                    className="accordion-collapse border-0 collapse"
                    aria-labelledby="headingFive"
                  >
                    <div className="accordion-body text-muted bg-white">
                      {t("becausePoolsNeedToHave")}
                    </div>
                  </div>
                </div>

                <div className="accordion-item rounded mt-2">
                  <h2 className="accordion-header" id="headingSix">
                    <button
                      className="accordion-button border-0 collapsed"
                      style={{ backgroundColor: "#F8F8FC" }}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq6"
                      aria-expanded="false"
                      aria-controls="faq6"
                    >
                      {t("whatIfSomeoneElseWants")}
                    </button>
                  </h2>
                  <div
                    id="faq6"
                    className="accordion-collapse border-0 collapse"
                    aria-labelledby="headingSix"
                  >
                    <div className="accordion-body text-muted bg-white">
                      {t("yourFractionIsYourOwnerShip")}
                    </div>
                  </div>
                </div>

                <div className="accordion-item rounded mt-2">
                  <h2 className="accordion-header" id="headingSeven">
                    <button
                      className="accordion-button border-0 collapsed"
                      style={{ backgroundColor: "#F8F8FC" }}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq7"
                      aria-expanded="false"
                      aria-controls="faq7"
                    >
                      {t("howCanISellMyFractionAfter")}
                    </button>
                  </h2>
                  <div
                    id="faq7"
                    className="accordion-collapse border-0 collapse"
                    aria-labelledby="headingSeven"
                  >
                    <div className="accordion-body text-muted bg-white">
                      {t("youCanSellYourFractionsAtAnyTime")}
                    </div>
                  </div>
                </div>

                <div className="accordion-item rounded mt-2">
                  <h2 className="accordion-header" id="headingEight">
                    <button
                      className="accordion-button border-0 collapsed"
                      style={{ backgroundColor: "#F8F8FC" }}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq8"
                      aria-expanded="false"
                      aria-controls="faq8"
                    >
                      {t("whatIfThePriceOfTheNFT")}
                    </button>
                  </h2>
                  <div
                    id="faq8"
                    className="accordion-collapse border-0 collapse"
                    aria-labelledby="headingEight"
                  >
                    <div className="accordion-body text-muted bg-white">
                      {t("everNFTPurchasedAndFractionalized")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "#F8F8FC" }}>
          <div className="py-5 container mt-100 mt-60">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="section-title text-center">
                  <h6 className="text-muted fw-normal">
                    {t("receiveRelavantNewsAndInformation")}
                  </h6>
                  <h4 className="title mb-2">
                    Subscribe to Fra-Art newsletter
                  </h4>
                  <div className="mt-2 pt-2">
                    <div className="row justify-content-center">
                      <div className="col-6">
                        <div className="form-icon position-relative">
                          <FiMail className="fea icon-sm icons" />
                          <input
                            type="email"
                            name="email"
                            id="emailsubscribe"
                            className="form-control ps-5 rounded"
                            placeholder="Your best email"
                            required
                            style={{ height: 46 }}
                          />
                        </div>
                      </div>
                      <div className="col-md-auto">
                        <input
                          type="submit"
                          id="submitsubscribe"
                          name="send"
                          className="btn btn-soft-primary h-100"
                          value={t("subscribe")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center">
                <h4 className="title mb-2">{t("tryNow")}</h4>
                <h6 className="text-muted fw-normal">
                  {t("receiveRelevantNews")}
                </h6>
                <div className="mt-2 pt-2">
                  <Link
                    className="btn btn-soft-primary h-100"
                    to="/rockpool/create"
                  >
                    Start Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RockpoolHome;
