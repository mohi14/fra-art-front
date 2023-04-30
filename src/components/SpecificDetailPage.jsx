import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Col, Input, Modal, Row, Space, Typography } from "antd";
import MoneyBox from "./shared/rockpool/MoneyBox.tsx";
import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import axios from "axios";
import perpetualOpenCollectivePurchaseAbi from "../hooks/rockpool/open-collective-purchase/openCollectivePurchaseAbi.json";

import { useAccount, useBalance, useNetwork } from "wagmi";
// @ts-ignore
import { chainConfig } from "../hooks/ChainConfig";
// @ts-ignore
import { useSpecificPublicItemById } from "../hooks/rockpool/specific/useSpecificPublicItemById";
import {
  collectionDefault,
  ethereum,
  greenFlag,
  notAvailableIcon,
  openseaIcon,
  profileDefault,
} from "../utils/images.util";
import useSpecificJoinPool from "../hooks/rockpool/specific/useSpecificJoinPool";
import useClaimFractions from "../hooks/rockpool/specific/useClaimFractions";
import useSpecificLeavePool from "../hooks/rockpool/specific/useSpecificLeavePool";
// icons
import CurrencyIcon from "../assets/images/icons/1.png";
import EthIcon from "../assets/images/icons/2.png";
import FractionIcon from "../assets/images/icons/3.png";
import UserIcon from "../assets/images/icons/4.png";
import TimeIcon from "../assets/images/icons/5.png";
import SharesIcon from "../assets/images/icons/7.png";
import ActiveIcon from "../assets/images/icons/8.png";

// Static images
import NftImg from "../assets/images/collection/14.jpg";
import { ethers, utils } from "ethers";

export default function SpecificPoolComponent({ chainId, specificPoolId }) {
  const account = useAccount();
  const { products } = chainConfig(chainId);
  const walletAddress = account?.address || "";
  let [reserveAmount, setReserveAmount] = useState('1500000000000000');
  const config = chainConfig(chainId);
  const { loading, items } = useSpecificPublicItemById(specificPoolId, chainId);
  let [listedItem, setListedItem] = useState(false)
  const [depositAmount, setDepositAmount] = useState("0");
  let [JPYPrice, setJPYPrice] = useState("0");
  let [jpyRate, setJpyRate] = useState("0");
  let [amount, setAmount] = useState("0");
  let [priceFraction, setPriceFraction] = useState(null);
  let [isPoolInicialized, setisPoolInicialized] = useState("0");
  let [isWalletWithoutBalance, setisWalletWithoutBalance] = useState("0");
  const priceAfterFractionalization = new BigNumber(
    items?.targetPrice || 0
  ).multipliedBy(items?.priceMultiplier || 0);
  const progress = items?.targetPrice / items?.amount / 100;
  let [data, setData] = useState({
    id: 199,
    owner: "",
    fractions: 1000,
    priceMultiplier: 1000,
    targetPrice: 100,
    status: false,
    progress: 50,
    userParticipation: 15,
    isErc721Available: false,
    image:
      "https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png",
    price: 1000,
    fractionsCount: 800,
    reservePrice: "0.01",
    fee: 0,
    title: "NFT SAMPLE",
    amount: 900,
  });


  const getListing = async () => {
    try {
      const provider = new ethers.providers.InfuraProvider(
        "goerli",
        "144c623a861848f796ec67bbe424feb2"
      );

      const contractErc20Fraction = new ethers.Contract(products.specific.contract.openCollectivePurchase, perpetualOpenCollectivePurchaseAbi, provider);
      console.log("listingItem", items?.listingId)

      const listing = await contractErc20Fraction.listings(specificPoolId)
      setListedItem(listedItem = listing)

    } catch (error) {
      console.log(error)
      return error;
    }
  };



  const getAmount = (amt) => {
    setAmount(amount = amt)
  }
  const canJoin = () => {
    if (!account?.address) {
      return false;
    } else if (isWalletWithoutBalance) {
      return false;
    }
    return true;
  };

  const { data: balance } = useBalance({
    addressOrName: account,
    token: "ETH",
  });



  const { handleJoin, isExecutin: loadingJoin } = useSpecificJoinPool(
    chainId,
    walletAddress,
    items,
    amount,
    (items?.reservePrice)?.toString()
  );
  const { handleLeave, isExecutin: loadingLeave } = useSpecificLeavePool(
    chainId,
    items,
    items?.userParticipation || "0"
  );
  const { handleClaimFractions, isExecutin: loadClaim } = useClaimFractions(
    chainId,
    items.listingId,
    walletAddress
  );
  const isFractionalized = items?.fractions;
  const losePool =
    items && !loading && !isFractionalized && !items?.isErc721Available;
  const winningPool =
    !loading && items && items.status === true && isFractionalized;

  const maxValueDeposit = new BigNumber(items?.targetPrice).minus(items?.amount);
  const poolIsCompleted =
    Number((items?.targetPrice / items?.amount) * 100) >= 100;
  const activePool = !!items && items?.isErc721Available;
  const { Text } = Typography;

  const handleRemoveParticipation = () => {
    Modal.confirm({
      title: "Remove funds",
      icon: <ExclamationCircleOutlined />,
      content: `You have ${items?.userParticipation || ""
        } ETH of participation. Do you want to remove it?`,
      okText: "Remove participation",
      cancelText: "Cancel",
      onOk: async () => handleLeave(),
      cancelButtonProps: { style: { width: "100%", padding: "5px" } },
      okButtonProps: { style: { width: "100%", padding: "5px" } },
    });
  };

  const handleJoinParticipation = () => {
    Modal.confirm({
      title: "Add funds",
      icon: <ExclamationCircleOutlined />,
      content: `You are adding ${amount ?? "0"
        } ETH in participation. Do you want to add it?`,
      okText: "Add funds",
      cancelText: "Cancel",
      onOk: async () => handleJoin(),
      cancelButtonProps: { style: { width: "100%", padding: "5px" } },
      okButtonProps: { style: { width: "100%", padding: "5px" } },
    });
  };

  const handleClaimParticipation = () => {
    Modal.confirm({
      title: "Claim",
      icon: <ExclamationCircleOutlined />,
      content: `You are Claiming from ${items?.id || ""
        } Fraction Do you want to claim it?`,
      okText: "Claim",
      cancelText: "Cancel",
      onOk: async () => handleClaim(),
      cancelButtonProps: { style: { width: "100%", padding: "5px" } },
      okButtonProps: { style: { width: "100%", padding: "5px" } },
    });
  };
  const handleOwnerClaimParticipation = () => {
    Modal.confirm({
      title: "Claim",
      icon: <ExclamationCircleOutlined />,
      content: `You are Claiming ${items?.id || ""
        } Fraction Do you want to add it?`,
      okText: "Claim",
      cancelText: "Cancel",
      onOk: async () => handleClaim(),
      cancelButtonProps: { style: { width: "100%", padding: "5px" } },
      okButtonProps: { style: { width: "100%", padding: "5px" } },
    });
  };



  const handleUseMax = () => {
    const maxValue = maxValueDeposit.gt(new BigNumber(balance))
      ? new BigNumber(balance).toString()
      : maxValueDeposit.toString();
    setDepositAmount(maxValue);
  };

  const handleClaim = () => {
    Modal.confirm({
      title: "Claim fractions",
      content: (
        <span>
          You have
          <strong>{Number(items?.amount).toFixed(4)} ETH</strong>
          of participation, that is equal to
          <strong>
            {Number(listedItem?.fractionsCount || "0", 4).toFixed(3)} {items.name}
          </strong>
          Do you want to claim it?
        </span>
      ),
      okText: "Claim",
      cancelText: "Cancel",
      onOk: async () => {
        await handleClaimFractions();
      },
    });
  };
  const fetchPrice = async () => {
    await axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=JPY"
      )
      .then((res) => setJpyRate(jpyRate = res.data.ethereum.jpy));
    let actual_price_in_jpy = (jpyRate * items?.price).toFixed(4);
    console.log("")
    setJPYPrice(JPYPrice = actual_price_in_jpy);
  };

  useEffect(() => {
    getListing()
    fetchPrice();
    setPriceFraction(priceFraction = (items?.reservePrice / listedItem?.fractionsCount) * 10)
    setisPoolInicialized(isPoolInicialized = !new BigNumber(items?.amount).gt("0"))
    setisWalletWithoutBalance(isWalletWithoutBalance =
      !new BigNumber(balance).toNumber() ||
      new BigNumber(depositAmount).gt(new BigNumber(balance)))
  }, [jpyRate, priceFraction, isPoolInicialized, JPYPrice]);

  return (
    <section className="bg-item-detail d-table w-100">
      <MainContainerStyled className="container">
        <div className="row">
          <ImageContainerStyled className="col-md-6">
            <img
              src={
                items?.image
                  ? items?.image
                  : "https://pbs.twimg.com/media/FI1uXXcUcAAcUi1.jpg"
              }
              alt="nft-image"
            />
          </ImageContainerStyled>
          <DetailContainerStyled className="col-md-5">
            <ContentWrapperStyled>
              <div className="first-container">
                <div className="first-container-head">
                  <div className="first-container-head-left">
                    <div className="icon-with-text">
                      <div>
                        <img
                          src={CurrencyIcon}
                          alt="Currency Icon"
                          width="20"
                        />
                      </div>
                      <div>
                        <p className="text-md-2">{items?.amount} ETH Current amount reached</p>
                      </div>
                    </div>
                    <div className="icon-with-text">
                      <div>
                        <img src={EthIcon} alt="Eth Icon" width="15" />
                      </div>
                      <div>
                        <p className="text-lg">{items?.amount}</p>
                      </div>
                    </div>
                  </div>
                  <div className="icon-with-text">
                    <div>
                      <img src={ActiveIcon} alt="Active Icon" width="15" />
                    </div>
                    <div>
                      <p className="text-md-2">Active Pool</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h1>{JPYPrice ?? 0} JPY</h1>
                </div>
                <div className="first-container-last">
                  <div className="first-container-last-top">
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="first-container-last-bottom">
                    <div>
                      <p className="text-md">
                        The target amount is {`${JPYPrice ?? 0}`} JPY
                      </p>
                    </div>
                    <div className="icon-with-text">
                      <div>
                        <img src={EthIcon} alt="Eth Icon" width="15" />
                      </div>
                      <div>
                        <p className="text-lg">{items?.amount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="second-container">
                <div>
                  <div className="icon-with-text">
                    <div>
                      <img src={FractionIcon} alt="Fraction Icon" width="20" />
                    </div>
                    <div>
                      <p className="text-sm">Pool Amount in ETH</p>
                    </div>
                  </div>
                  <div>
                    {/* <h4>{`${utils.formatEther(listedItem ? (Number(listedItem?.amount) - Number(listedItem?.reserveAmount)).toString(): "0")}`}</h4> */}
                    <h4>{`${items?.amount}`}</h4>
                  </div>
                </div>
                <div>
                  <div className="icon-with-text">
                    <div>
                      <img src={UserIcon} alt="User Icon" width="15" />
                    </div>
                    <div>
                      <p className="text-sm">Participants</p>
                    </div>
                  </div>
                  <div>
                    <h4>{items?.userParticipation ?? 0}</h4>
                  </div>
                </div>
                <div>
                  <div className="icon-with-text">
                    <div>
                      <img src={TimeIcon} alt="Time Icon" width="15" />
                    </div>
                    <div>
                      <p className="text-sm">Remaining time</p>
                    </div>
                  </div>
                  <div>
                    <h4>{(items?.duration / 86400)}</h4>
                  </div>
                </div>
              </div>
              <div className="third-container">
                <div className="icon-with-text">
                  <div>
                    <img src={FractionIcon} alt="Fraction Icon" width="30" />
                  </div>
                  <div>
                    <p className="text-md">
                      Buy Factional Shares: 10,000 JPY / Per Share
                    </p>
                  </div>
                </div>
                <div className="money-box-wrapper">
                  <MoneyBox getAmount={getAmount} jpyRate={jpyRate} priceFraction={items ? ((items?.price)/8).toFixed(3) : 1} amount={amount} />
                  <MoneyBox getAmount={getAmount} jpyRate={jpyRate} priceFraction={items ? ((items?.price)/8).toFixed(3) : 1} amount={amount} />
                  <MoneyBox getAmount={getAmount} jpyRate={jpyRate} priceFraction={items ? ((items?.price)/8).toFixed(3) : 1} amount={amount} />
                  <MoneyBox getAmount={getAmount} jpyRate={jpyRate} priceFraction={items ? ((items?.price)/8).toFixed(3) : 1} amount={amount} />
                  <MoneyBox getAmount={getAmount} jpyRate={jpyRate} priceFraction={items ? ((items?.price)/8).toFixed(3) : 1} amount={amount} />
                  <MoneyBox getAmount={getAmount} jpyRate={jpyRate} priceFraction={items ? ((items?.price)/8).toFixed(3) : 1} amount={amount} />
                  <MoneyBox getAmount={getAmount} jpyRate={jpyRate} priceFraction={items ? ((items?.price)/8).toFixed(3) : 1} amount={amount} />
                  <MoneyBox getAmount={getAmount} jpyRate={jpyRate} priceFraction={items ? ((items?.price)/8).toFixed(3) : 1} amount={amount} />
                  <MoneyBox getAmount={getAmount} jpyRate={jpyRate} priceFraction={items ? ((items?.price)/8).toFixed(3) : 1} amount={amount} />
                </div>
              </div>
              <div className="fourth-container">
                <div className="icon-with-text">
                  <div>
                    <img src={SharesIcon} alt="Shares Icon" width="20" />
                  </div>
                  <div>
                    <p className="text-lg-1">{`${listedItem?.fractionsCount / parseInt(listedItem?.reservePrice)}`} /Shares</p>
                  </div>
                </div>
                <div className="icon-with-text">
                  <div>
                    <img src={EthIcon} alt="Eth Icon" width="15" />
                  </div>
                  <div>
                    <p className="text-lg">{items ? (items?.price) : "0"}</p>
                  </div>
                </div>
                <div>
                  <p className="text-lg-2">Total:&nbsp; ￥{`${JPYPrice ?? "0"}`}</p>
                </div>
              </div>
              <Input
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                addonBefore={"ETH"}
              />
            </ContentWrapperStyled>
            <ButtonWrapperStyled>
              <button disable={!canJoin()} onClick={handleJoinParticipation}>
                Join Pool
              </button>
              <button onClick={handleRemoveParticipation}>Leave Pool</button>
              {account && listedItem.seller == walletAddress && !loading && <button onClick={handleOwnerClaimParticipation}>Claim Pool</button>}
            </ButtonWrapperStyled>
          </DetailContainerStyled>
        </div>
      </MainContainerStyled>
    </section>
  );
}

const {
  MainContainerStyled,
  ImageContainerStyled,
  DetailContainerStyled,
  ContentWrapperStyled,
  ButtonWrapperStyled,
} = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    > div {
      display: flex;
      gap: 8px;
      flex-direction: row;
      align-items: center;
    }
  `,
  Input: styled(Input)`
    input {
      height: 48px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 18px;
      color: ${(props) => props.theme.black};
    }

    .ant-input-group-addon {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      border-right: none;
      background-color: ${(props) => props.theme.white};
      color: ${(props) => props.theme.black};
      padding: 0 12px;
      height: 48px;
      display: flex;
      align-items: center;

      > span {
        > img {
          height: 24px;
          width: 24px;
        }
      }
    }

    .ant-input {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      border-left: none;
      background-color: ${(props) => props.theme.white};
      padding-right: 12px;
      height: 48px;
      text-align: right;

      &:disabled {
        border-radius: 8px;
        border: none;
        box-shadow: none;
        outline: none;
        background-color: ${(props) => props.theme.gray["0"]};
        padding-right: 12px;
        height: 48px;
      }

      &:active,
      &:focus,
      &:hover {
        box-shadow: none;
        outline: none;
      }
    }

    .ant-input-group {
      display: flex;
    }

    .ant-input-group-addon {
      width: 145px;

      > span {
        justify-content: flex-start;
        align-items: center;
      }
    }

    .ant-input-group-addon,
    .ant-input {
      border-color: ${(props) => props.theme.gray["1"]};
    }
  `,
  MainContainerStyled: styled.div`
    padding: 43px 0 17px 20px;
    border: 1px solid #5271ff;
    border-radius: 12px;
  `,

  ImageContainerStyled: styled.div`
    padding-right: 7px;

    img {
      max-width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,

  DetailContainerStyled: styled.div``,

  ContentWrapperStyled: styled.div`
    padding: 10px 14px 19px 10px;
    border: 1px solid #5271ff;
    border-radius: 12px;

    p,
    h1 {
      margin-bottom: 0;
    }

    .text-sm {
      font-size: 8px;
      font-weight: 500;
      color: #666a6d;
    }

    .text-md {
      font-size: 9px;
      font-weight: 700;
      color: #666a6d;
    }

    .text-md-2 {
      font-size: 10px;
      font-weight: 500;
      color: #666a6d;
    }

    .text-lg {
      font-size: 14px;
      font-weight: 600;
      color: #000000;
    }

    .text-lg-1 {
      font-size: 14.5px;
      font-weight: 600;
      color: #545454;
    }

    .text-lg-2 {
      font-size: 16.5px;
      font-weight: 600;
      color: #545454;
    }

    .icon-with-text {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .first-container {
      padding: 5px 10px;
      margin-bottom: 6px;
      border: 2px solid #5271ff;
      border-radius: 12px;

      .first-container-head {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .first-container-head-left {
          display: flex;
          align-items: center;
          gap: 15px;
        }
      }

      .first-container-last {
        .first-container-last-top {
          .progress-bar {
            position: relative;
            height: 17px;
            width: 100%;
            background-color: #919296;
            border-radius: 30px;
            border: 2px solid #95999d;

            .progress {
              position: absolute;
              top: 0;
              height: 100%;
              background: rgb(72, 169, 205);
              background: linear-gradient(
                90deg,
                rgba(72, 169, 205, 1) 81%,
                rgba(255, 255, 255, 1) 100%
              );
              border-radius: 30px;
            }
          }
        }

        .first-container-last-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }

    .second-container {
      padding: 5px 10px;
      margin-bottom: 9px;
      border: 2px solid #5271ff;
      border-radius: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h4 {
        text-align: center;
      }
    }

    .third-container {
      padding: 5px 10px;
      border: 2px solid #5271ff;
      margin-bottom: 20px;
      border-radius: 12px;

      .money-box-wrapper {
        display: flex;
        justify-content: space-between;
        gap: 4px;
        flex-wrap: wrap;
        align-items: flex-end;
        margin-top: 11px;
      }
    }

    .fourth-container {
      padding: 5px 10px;
      border: 2px solid #5271ff;
      border-radius: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,

  ButtonWrapperStyled: styled.div`
    margin-top: 10px;

    button {
      width: 30%;
      padding: 7px 0;
      margin:2px;
      border: none;
      background-color: #5271ff;
      color: #ffffff;
      border-radius: 12px;
    }
  `,
};
