import React, { useContext, useEffect, useState } from "react";
import { useWeb3React } from '@web3-react/core';
import axios from 'axios';
import { ipfsBaseURL, getIpfsHashFromFile } from "../../../utils/ipfs";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AuthStateContext } from "../../../context/authContext";

const errorMessages = {
  photo: "Photo required",
  username: "Full name is required",
  email: "Email is invalid",
  bio: "Present Bio is required",
  twitter: "Twitter is required",
  website: "Website link is required"
};

function PersonalInfo() {
  const { account, library } = useWeb3React();
  const [authorProfile, setAuthorProfile] = useState(null);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [website, setWebsite] = useState("");
  const [updating, setUpdating] = useState(false);

  const {userAddress, setUserAddress}= useContext(AuthStateContext)

  useEffect(() => {
const address = localStorage.getItem("userAddress")
setUserAddress(address)
    axios.get(`/api/user/${account ? account : address}`)
      .then(res => {
        let _name = res.data.user.name;
        let _photo = res.data.user.profilePic;
        let _email = res.data.user.googleLink;
        let _bio = res.data.user.bio;
        let _twitter = res.data.user.twitterLink;
        let _website = res.data.user.facebookLink;
        setUsername(_name);
        setPhoto(_photo);
        setEmail(_email);
        setBio(_bio);
        setTwitter(_twitter);
        setWebsite(_website);
        setAuthorProfile(res.data.user);
      })
  }, [account]);

  function updateProfile(event) {
    event.preventDefault();
    if (!username || !bio  || !twitter || !email) return;
    setUpdating(true);
    let data = {
      address: account || userAddress,
      name: username || "",
      bio: bio || "",
      profilePic: photo,
      facebookLink: event.target.website.value,
      twitterLink: twitter,
      googleLink: email,
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
      // setProfileImgUploading(true)
      getIpfsHashFromFile(event.target.files[0]).then((hash) => {
        setPhoto(`${ipfsBaseURL}${hash}`);
        // setProfileImgUploading(false);
      });
    }
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <>
      {authorProfile && <div className="card">
        <div className="card-header">
          <h4 className="card-title">Personal Information</h4>
        </div>
        <div className="card-body">

          <form onSubmit={updateProfile}>
            <div className="row">
              <div className="col-xxl-12">
                <div className="d-flex align-items-center mb-3">
                  <img className="me-3 rounded-circle me-0 me-sm-3" src={photo} width="55" height="55" alt="" />
                  <div className="media-body">
                    <h4 className="mb-0">{username}</h4>
                    <p className="mb-0">Max file size is 20mb</p>
                  </div>
                </div>
              </div>
              <div className="col-12 mb-3">
                <input
                  type="file"
                  className={`${photo ? " is-invalid" : ""}`}
                  accept="image/*" multiple={false}
                  onChange={handleProfileFile}
                />
              </div>

              <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className={"form-control" + (!username ? " is-invalid" : "")}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <div className="invalid-feedback">{errorMessages.username}</div>
              </div>

              <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className={"form-control" + (!email ? " is-invalid" : "")}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <div className="invalid-feedback">{errorMessages.email}</div>
              </div>

              <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3">
                <label className="form-label">Twitter</label>
                <input
                  type="text"
                  className={"form-control" + (!twitter ? " is-invalid" : "")}
                  value={twitter}
                  onChange={(event) => setTwitter(event.target.value)}
                />
                <div className="invalid-feedback">{errorMessages.twitter}</div>
              </div>
              <div className="col-xxl-12 col-xl-12 col-lg-12 mb-3">
                <label className="form-label">Bio</label>
                <input
                  type="text"
                  className={"form-control" + (!bio ? " is-invalid" : "")}
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                />
                <div className="invalid-feedback">{errorMessages.bio}</div>
              </div>

              <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3">
                <label className="form-label d-none">Website</label>
                <input
                  type="hidden"
                  // className={"form-control" + (!website ? " is-invalid" : "")}
                  className="form-control" 
                  value="xyz.com"
                name='website'
                  onChange={(event) => setWebsite(event.target.value)}
                />
                <div className="invalid-feedback">{errorMessages.website}</div>
              </div>

            </div>

            <div className="mt-3">
              <button type="submit" className="btn btn-primary mr-2">
                {updating ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
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
      </div>}
    </>
  );
}
export default PersonalInfo;
