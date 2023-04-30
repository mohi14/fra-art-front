import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FiCamera } from "react-icons/fi";
import { useWeb3React } from '@web3-react/core'
import axios from 'axios';
import { ipfsBaseURL, getIpfsHashFromFile } from "../utils/ipfs";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from 'react-i18next';

const CreatorProfileEdit = (props) => {
  const { t } = useTranslation();
  const { user, login } = props;
  const [userProfile, setUserProfile] = useState(undefined)
  const { account,library } = useWeb3React();
  const [updating, setUpdating] = useState(false)
  const [snackBarMessage, setSnackBarMessage] = useState("")
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [newName, setNewName] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newFacebook, setNewFacebook] = useState("");
  const [newTwitter, setNewTwitter] = useState("");
  const [newGoogle, setNewGoogle] = useState("");
  const [newVine, setNewVine] = useState("");
  const [newProfileCoverSrc, setNewProfileCoverSrc] = useState("")
  const [newProfilePicSrc, setNewProfilePicSrc] = useState("")
  const [coverImgUploading, setCoverImgUploading] = useState(false)

  const [profileImgUploading, setProfileImgUploading] = useState(false)
  const [AccountToken, setAuthToken] = useState();
  useEffect(() => {
    let connectorId = window.localStorage.getItem('connectorId')
    let authToken = window.localStorage.getItem('authToken')
    setAuthToken(authToken);
    if(connectorId ==null && authToken == null ){
      return window.location = '/';
    }
    
    if (!!user) {
      login();
    }
  }, [user, account, library,AccountToken]);

  useEffect(() => {
    if (account && !userProfile) {
      getUser()
    }
  }, [user]);
  
  function getUser() {
    axios.get(`/api/user/${account}`)
      .then(res => {
        setUserProfile(res.data.user);
        setNewProfilePicSrc(res.data.user.profilePic);
        setNewProfileCoverSrc(res.data.user.profileCover);
        setNewName(res.data.user.name);
        setNewBio(res.data.user.bio);
        setNewFacebook(res.data.user.facebookLink);
        setNewTwitter(res.data.user.twitterLink);
        setNewGoogle(res.data.user.googleLink);
        setNewVine(res.data.user.vineLink);
      })
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  function updateProfile(event) {
    event.preventDefault();
    setUpdating(true);
    let data = {
      address: account,
      name: newName || t("noName"),
      bio: newBio || "",
      profilePic: newProfilePicSrc,
      profileCover: newProfileCoverSrc,
      facebookLink: newFacebook,
      twitterLink: newTwitter,
      googleLink: newGoogle,
      vineLink: newVine
    };

    axios.post("/api/user/update", data)
      .then(res => {
        setUpdating(false);
        setSnackBarMessage("Success");
        setOpenSnackbar(true);
      })
      .catch(err => {
        setUpdating(false)
        setSnackBarMessage(err.response.data.message)
        setOpenSnackbar(true)
      })
  }
  function handleProfileFile(event) {
    const fileType = event.target.files[0].type.split("/")[0]
    if (fileType === "image") {
      setProfileImgUploading(true)
      getIpfsHashFromFile(event.target.files[0]).then((hash) => {
        setNewProfilePicSrc(`${ipfsBaseURL}${hash}`);
        setProfileImgUploading(false);
      });
    }
  }
  function handleCoverFile(event) {
    const fileType = event.target.files[0].type.split("/")[0]
    if (fileType === "image") {
      setCoverImgUploading(true)
      getIpfsHashFromFile(event.target.files[0]).then((hash) => {
        setNewProfileCoverSrc(`${ipfsBaseURL}${hash}`);
        setCoverImgUploading(false)
      });
    }
  }

  const [follow, setFollow] = useState(true);
  const [job, setJob] = useState(true);
  const [unsubscribe, setUnsubscribe] = useState(true);

  return (
    <>{(account || AccountToken) && <>
      <section
        className="bg-half-170 d-table w-100"
        style={{ backgroundImage: `url(${coverImgUploading ? '/img/loading.gif' : newProfileCoverSrc})`, backgroundSize: 'cover' }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <h5 className="heading fw-semibold sub-heading text-white title-dark">
                {t("editProfile")}
                </h5>
                <p className="text-white-50 para-desc mx-auto mb-0">
                  {t("uploadYourCoverImg")} &nbsp;
                  <span className="btn btn-icon btn-sm btn-pills btn-primary">
                    <input
                      id="pro-cover"
                      name="profile-cover"
                      type="file"
                      className="d-none"
                      accept="image/*" multiple={false}
                      onChange={handleCoverFile}
                    />
                    <FiCamera className="icons" onClick={() => document.getElementById('pro-cover').click()} />
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="position-middle-bottom">
            <nav aria-label="breadcrumb" className="d-block">
              <ul
                className="breadcrumb breadcrumb-muted mb-0 p-0"
                style={{ backgroundColor: "transparent" }}
              >
                <li className="breadcrumb-item">
                  <Link to="/">{t("fra-art")}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                 {t("editProfile")}
                </li>
              </ul>
            </nav>
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
          <div className="row">
            <div className="col-lg-9">
              <h5>
              {t("youCanSetpreferred")}
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-7 col-12 order-2 order-md-1 mt-4 pt-2">
              <div className="rounded-md shadow">
                <div className="p-4 border-bottom">
                  <h5 className="mb-0">      {t("editProfile")} :</h5>
                </div>

                <div className="p-4">
                  <form className="profile-edit" onSubmit={(event) => updateProfile(event)}>
                    <div className="row">
                      <div className="col-12 mb-4">
                        <label className="form-label h6">{t("displayName")}</label>
                        <input
                          name="name"
                          id="first"
                          type="text"
                          className="form-control"
                          value={newName || ""} onChange={e => setNewName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12 mb-4">
                        <label className="form-label h6">URL</label>
                        <div className="form-icon">
                          <input
                            type="text"
                            className="form-control"
                            value={`${process.env.REACT_APP_BASE_URL}/profile/${account}`}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="col-12 mb-4">
                        <label className="form-label h6">{t("bio")}</label>
                        <textarea
                          rows="3"
                          className="form-control"
                          placeholder={t("digitalArtist")}
                          value={newBio || ""} onChange={e => setNewBio(e.target.value)}
                        />
                      </div>

                      <div className="col-12 mb-4">
                        <label className="form-label h6">{t("twitterAccount")}</label>
                        <p className="text-muted">
                        {t("linkTwitter")}
                        </p>
                        <div className="form-icon">
                          <input
                            type="text"
                            className="form-control"
                            value={newTwitter || ""} onChange={e => setNewTwitter(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-12 mb-4">
                        <label className="form-label h6">Website</label>
                        <div className="form-icon">
                          <input
                            type="text"
                            className="form-control"
                            value={newFacebook || ""} onChange={e => setNewFacebook(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-12 mb-4">
                        <label className="form-label h6">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={newGoogle || ""} onChange={e => setNewGoogle(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-primary rounded-md"
                        >
                         {t("updateProfile")}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* <div className="rounded-md shadow mt-4">
                <div className="p-4 border-bottom">
                  <h5 className="mb-0">{t("アカウント通知")} :</h5>
                </div>

                <div className="p-4">
                  <div className="d-flex justify-content-between pb-4">
                    <h6 className="mb-0">{t("whenSomeone")}</h6>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="noti1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="noti1"
                      ></label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between py-4 border-top">
                    <h6 className="mb-0">{t("someoneFollow")}</h6>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        checked={follow}
                        onClick={() => setFollow(!follow)}
                        onChange={() => { }}
                        id="noti2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="noti2"
                      ></label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between py-4 border-top">
                    <h6 className="mb-0">{t("shareActivity")}</h6>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="noti3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="noti3"
                      ></label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between py-4 border-top">
                    <h6 className="mb-0">{t("someoneMessage")}</h6>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="noti4"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="noti4"
                      ></label>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div className="rounded-md shadow mt-4">
                <div className="p-4 border-bottom">
                  <h5 className="mb-0">{t("marketingNotifications")} :</h5>
                </div>

                <div className="p-4">
                  <div className="d-flex justify-content-between pb-4">
                    <h6 className="mb-0">{t("salePromotion")}</h6>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="noti5"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="noti5"
                      ></label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between py-4 border-top">
                    <h6 className="mb-0">{t("companyNews")}</h6>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="noti6"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="noti6"
                      ></label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between py-4 border-top">
                    <h6 className="mb-0">{t("weeklyJobs")}</h6>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        checked={job}
                        onClick={() => setJob(!job)}
                        onChange={() => { }}
                        id="noti7"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="noti7"
                      ></label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between py-4 border-top">
                    <h6 className="mb-0">{t("UnsubscribeNews")}</h6>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        checked={unsubscribe}
                        onClick={() => setUnsubscribe(!unsubscribe)}
                        onChange={() => { }}
                        id="noti8"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="noti8"
                      ></label>
                    </div>
                  </div>
                </div>
              </div> */}

            </div>

            <div className="col-lg-4 col-md-5 col-12 order-1 order-md-2 mt-4 pt-2">
              <div className="card ms-lg-5">
                <div className="profile-pic">
                  <input
                    id="pro-img"
                    name="profile-image"
                    type="file"
                    className="d-none"
                    accept="image/*" multiple={false}
                    onChange={handleProfileFile}
                  />
                  <div className="position-relative d-inline-block">
                    <img
                      src={profileImgUploading ? '/img/loading.gif' : newProfilePicSrc}
                      className="avatar avatar-medium img-thumbnail rounded-pill shadow-sm"
                      id="profile-image"
                      alt=""
                    />
                    <label
                      className="icons position-absolute bottom-0 end-0"
                      htmlFor="pro-img"
                    >
                      <span className="btn btn-icon btn-sm btn-pills btn-primary">
                        <FiCamera className="icons" />
                      </span>
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-muted mb-0">
                {t("400*400")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        message={snackBarMessage}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>}
    </>
  );
};

export default CreatorProfileEdit;
