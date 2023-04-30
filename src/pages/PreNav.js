import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BiCartAlt } from "react-icons/bi";
import { GoLightBulb } from "react-icons/go";
import { MdOutlineDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";
import metamask from "../assets/images/svg/metamask.svg";
import coinbase from "../assets/images/svg/coinbase.svg";
import wallet from "../assets/images/svg/walletconnect.svg";
import { AiOutlineArrowRight } from "react-icons/ai";

const PreNav = () => {
  const [show, setShow] = useState(false);
  const [baseFee, setBaseFee] = useState([]);
  const [ethPrice, setEthPrice] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch("https://api.nftgo.io/api/v1/home/ETH-gas-fee")
      .then((res) => res.json())
      .then((data) => setBaseFee(data));
  }, []);
  useEffect(() => {
    fetch("https://api.nftgo.io/api/v1/asset/eth-usd-rate")
      .then((res) => res.json())
      .then((data) => setEthPrice(data));
  }, []);
  console.log("basefeeee", ethPrice);

  return (
    <div className="prenav shadow-sm">
      <div className="d-flex justify-content-between">
        <div className="prenav_left">
          <p className="mb-0">sentiment:</p>
          <p className="mb-0">NFT Volume (24H):</p>
          <p className="mb-0">${ethPrice.data?.rate.toFixed(0)}</p>
          <p className="mb-0">{baseFee.data?.baseFee} Gwei</p>
        </div>
        <div className="prenav_right">
          <BiCartAlt />
          <GoLightBulb />
          <MdOutlineDarkMode />
          <div>
            <button className="wallet_btn" onClick={handleShow}>
              Connect Your Wallet
            </button>

            <Modal
              //   style={{ width: "720px" }}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              size="lg"
              show={show}
              onHide={handleClose}
            >
              <Modal.Header closeButton>
                <Modal.Title className="text-center">
                  Connect Your Wallet
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p className="text-center">
                  By connecting your wallet, you agree to our{" "}
                  <Link to="#">Terms of Service</Link> and our{" "}
                  <Link to="#">Privacy Policy</Link> .
                </p>
                <div className="option d-flex justify-content-between align-items-center">
                  <p className="mb-0 fw-bold">
                    <img src={metamask} alt="" /> MetaMask
                  </p>
                  <AiOutlineArrowRight className="icon" />
                </div>
                <div className="option d-flex justify-content-between align-items-center">
                  <p className="mb-0 fw-bold">
                    <img src={wallet} alt="" /> Wallet Connect
                  </p>
                  <AiOutlineArrowRight className="icon" />
                </div>
                <div className="option d-flex justify-content-between align-items-center">
                  <p className="mb-0 fw-bold">
                    <img src={coinbase} alt="" /> Coinless Wallet
                  </p>
                  <AiOutlineArrowRight className="icon" />
                </div>
                <p className="text-center cursor-pointer">
                  I don't have a wallet{" "}
                </p>
              </Modal.Body>
              {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer> */}
            </Modal>
          </div>
          {/* <button className="wallet_btn" type="">
            Connect Your Wallet
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default PreNav;
