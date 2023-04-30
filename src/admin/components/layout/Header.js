import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { useWeb3React } from "@web3-react/core";
import { shorter } from "../../../utils";
import { useTranslation } from "react-i18next";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from "axios";
import { AuthStateContext } from "../../../context/authContext";
import { ethers } from "ethers";
function Header(props) {


  // console.log('poo',props)
  const { t } = useTranslation();
  const { account, chainId, library, deactivate } = useWeb3React();
  const { user, login,logout } = props;

  
  const {setAuthTkn,userAddress, setUserAddress}= useContext(AuthStateContext)
  

  const [photo, setPhoto]= useState("")

  
  const proPic = "https://nftgo.io/tempImg/avatar-0.png"
  const [autheticateToken, setAuthToken] = useState(null);
  const [address, setAddress] = useState(null);

  const [balance, setBalance] = useState(0);

  const getBalance = async (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(address);
    const balanceInEth = ethers.utils.formatEther(balance);
   setBalance(balanceInEth.slice(0,4))
}
  useEffect(() => {
    account && getBalance(account)
    if (!!user) {
      login();
    }
    
  }, [balance])


  useEffect(() => {
    const address = localStorage.getItem("userAddress")
    setUserAddress(address)
    axios.get(`/api/user/${account ? account : address}`)
      .then(res => {
        setPhoto(res.data.user.profilePic);
      })
  }, []);

  useEffect(()=>{
    let authToken =localStorage.getItem('authToken')
    let userAddress =localStorage.getItem('userAddress')
    console.log('aa',authToken)
       setAuthToken(authToken)
       setAddress(userAddress)
  },[])

  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  // const [balance, setBalance] = useState(0);

 
  const handleCopy = () => {
    setSnackBarMessage("Copied!");
    setOpenSnackbar(true);
  };

  const disconnect = async ()=>{
    try {
      
     const connector =  localStorage.getItem('connectorId');
     if(connector){
    localStorage.removeItem('connectorId');
      deactivate()
      logout();
     }else{
    localStorage.removeItem('authToken');
     localStorage.removeItem('userAddress');
     setAuthTkn(null)
     
     }
     
     return window.location("/");
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <>
      {user ||
        ((account || autheticateToken) && (
          <div className="header">
            <div className="container">
              <div className="row">
                <div className="col-xxl-12">
                  { (account || autheticateToken) && (
                    <li className="list-inline-item mb-0">
                      <div className="dropdown dropdown-primary">
                        <button
                          type="button"
                          className="btn btn-pills dropdown-toggle p-0"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <img
                            src={photo ? photo : proPic}
                            width={32}
                            height={32}
                            style={{ borderRadius: "100%", cursor: "pointer" }}
                            alt=""
                          />
                        </button>
                        <div
                          className="dropdown-menu dd-menu dropdown-menu-end bg-white shadow border-0 mt-3 pb-3 pt-0 overflow-hidden rounded"
                          style={{ minWidth: 200 }}
                        >
                          <div className="position-relative">
                            <div className="pt-5 pb-3 bg-gradient-primary"></div>
                            <div className="px-3">
                              <div className="d-flex align-items-end mt-n4">
                                <img
                                   src={photo ? photo : proPic}
                                  className="rounded-pill avatar avatar-md-sm img-thumbnail shadow-md"
                                  alt=""
                                />
                                <h6 className="text-dark fw-bold mb-0 ms-1">
                                  {user?.name}
                                </h6>
                              </div>
                              <div className="mt-2">
                                <small className="text-start text-dark d-block fw-bold">
                                  {t("wallet")}:
                                </small>
                                <div className="d-flex justify-content-between align-items-center">
                                  <small
                                    id="myPublicAddress"
                                    className="text-muted"
                                  >
                                    {shorter(account) || address}
                                  </small>
                                  <CopyToClipboard
                                    text={account || address}
                                    onCopy={() => handleCopy()}
                                  >
                                    <a
                                      href=""
                                      onClick={(e) => e.preventDefault()}
                                      className="text-primary"
                                    >
                                      <i className="uil uil-copy"></i>
                                    </a>
                                  </CopyToClipboard>
                                </div>
                              </div>

                              <div className="mt-2">
                                <small className="text-dark">
                                  {t("balance")}:{" "}
                                  <span className="text-primary fw-bold">
                                    {balance} 
                                    {process.env.REACT_APP_COIN}
                                  </span>
                                </small>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2">
                            {/* <Link
                              className="dropdown-item small fw-semibold text-dark d-flex align-items-center"
                              to={`/profile/${account || address}`}
                            >
                              <span className="mb-0 d-inline-block me-1">
                                <i className="uil uil-user align-middle h6 mb-0 me-1"></i>
                              </span>{" "}
                              {t("myProfile")}
                            </Link> */}
                            {/* <Link
                              className="dropdown-item small fw-semibold text-dark d-flex align-items-center"
                              to="/profile-edit"
                            >
                              <span className="mb-0 d-inline-block me-1">
                                <i className="uil uil-cog align-middle h6 mb-0 me-1"></i>
                              </span>
                              {t("settings")}
                            </Link> */}
                            <Link
                                className="dropdown-item small fw-semibold text-dark d-flex align-items-center"
                                to={`/profile/${account || address}`}
                              >
                                <span className="mb-0 d-inline-block me-1">
                                  <i className="uil uil-cog align-middle h6 mb-0 me-1"></i>
                                </span>
                                {t("myProfile")}
                              </Link>
                           
                            <div className="dropdown-divider border-top"></div>
                            <div
                              className="dropdown-item small fw-semibold text-dark d-flex align-items-center"
                              onClick={disconnect}
                              style={{ cursor: "pointer" }}
                            >
                              <span className="mb-0 d-inline-block me-1">
                                <i className="uil uil-sign-out-alt align-middle h6 mb-0 me-1"></i>
                              </span>
                              {t("logOut")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
export default Header;
