import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Col, Input, Modal, Row, Space, Typography } from "antd";
import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import axios from "axios";
import perpetualOpenCollectivePurchaseAbi from '../hooks/rockpool/open-collective-purchase/openCollectivePurchaseAbi.json'

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

// Static images
import NftImg from "../assets/images/collection/14.jpg";
import { ethers } from "ethers";

export default function SpecificPoolComponent({ chainId, specificPoolId }) {
  const account = useAccount();
  const { products } = chainConfig(chainId)
  const walletAddress = account?.address || "";
  let [reserveAmount, setReserveAmount] = useState('1500000000000000');
  console.log(chainId);
  const config = chainConfig(chainId);
  const { loading, items } = useSpecificPublicItemById(specificPoolId, chainId);
  const priceAfterFractionalization = new BigNumber(
    items?.targetPrice || 0
  ).multipliedBy(items?.priceMultiplier || 0);
  const progress = items?.targetPrice / items?.amount / 100;
  let [data, setData] = useState({
    id: 192,
    owner:"",
    fractions: 1000,
    priceMultiplier: 1000,
    targetPrice: 100,
    status: false,
    progress: 50,
    userParticipation: 15,
    isErc721Available: false,
    image: "https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png",
    price: 1000,
    fractionsCount: 800,
    reservePrice: 450,
    fee: 0,
    title: "NFT SAMPLE",
    amount: 900,
  });
  const isOwner = async (accountAddress) => {
    try {
      const provider = new ethers.providers.InfuraProvider('goerli', 'e5909f511a3f4297b5bfdc84f08dcb45');

      const contractErc20Fraction = new ethers.Contract(products.specific.contract.openCollectivePurchase,perpetualOpenCollectivePurchaseAbi , provider);
     const listing =  await contractErc20Fraction.listings(items?.id)
      return listing.seller == accountAddress
    } catch (error) {
      
      return error
    }
  }

  const [depositAmount, setDepositAmount] = useState("0");
  const [JPYPrice, setJPYPrice] = useState("0");
  const [jpyRate, setJpyRate] = useState("0");
  const [amount, setAmount] = useState("0");

  const canJoin = () => {
    if (!account?.address) {
      return false
    }
  else if(isWalletWithoutBalance){
    return false
  }
    return true
  }


  const { data: balance } = useBalance({
    addressOrName: account,
    token: "ETH",
  });
  
  const isPoolInicialized = !new BigNumber(items.amount).gt("0");
  const isWalletWithoutBalance =
    !new BigNumber(balance).toNumber() ||
    new BigNumber(depositAmount).gt(new BigNumber(balance));
  const { handleJoin, isExecutin: loadingJoin } = useSpecificJoinPool(
    chainId,
    walletAddress,
    data.id,
    amount,
    reserveAmount
  );
  const { handleLeave, isExecutin: loadingLeave } = useSpecificLeavePool(
    chainId,
    items,
    items.userParticipation || "0"
  );
  const { handleClaimFractions } = useClaimFractions(
    chainId,
    data.id,
    walletAddress
  );
  const isFractionalized = items?.fractions;
  const losePool =
    items && !loading && !isFractionalized && !items?.isErc721Available;
  const winningPool =
    !loading && items && items.status === true && isFractionalized;

   
  const maxValueDeposit = new BigNumber(items.targetPrice).minus(items.amount);
  const poolIsCompleted =
    Number((items.targetPrice / items.amount) * 100) >= 100;
  const activePool = !!items && items.isErc721Available;
  const { Text } = Typography;

  const handleRemoveParticipation = () => {
    Modal.confirm({
      title: "Remove funds",
      icon: <ExclamationCircleOutlined />,
      content: `You have ${
        items?.userParticipation || ""
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
      content: `You are adding ${
        amount || ""
      } ETH in participation. Do you want to add it?`,
      okText: "Add funds",
      cancelText: "Cancel",
      onOk:  async () => handleJoin(),
      cancelButtonProps: { style: { width: "100%", padding: "5px" } },
      okButtonProps: { style: { width: "100%", padding: "5px" } },
    });
  };

  const handleClaimParticipation = () => {
    Modal.confirm({
      title: "Claim",
      icon: <ExclamationCircleOutlined />,
      content: `You are Claiming ${
        items?.id || ""
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
            {Number(items?.fractionsCount || "0", 4).toFixed(3)} {items.name}
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
const fetchPrice =async()=>{
  await axios
			.get(
				"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=JPY"
			)
			.then((res) => setJpyRate(res.data.ethereum.jpy));
		let actual_price_in_jpy = jpyRate * items?.price;
		 setJPYPrice(actual_price_in_jpy)

}

  useEffect(()=>{
    fetchPrice()
  },[])
  return (
    <section className="bg-item-detail d-table w-100">
      <MainContainerStyled className="container">
        <div className="row">
          <ImageContainerStyled className="col-md-6">
            <img src={items?.image ? items?.image : "https://pbs.twimg.com/media/FI1uXXcUcAAcUi1.jpg"} alt="nft-image" />
          </ImageContainerStyled>
          <DetailContainerStyled className="col-md-5">
            <ContentWrapperStyled>
              <div className="first-container">
                <div className="first-container-head">
                  <div className="first-container-head-left">
                    <div className="icon-with-text">
                      <div>{/* logo */}</div>
                      <div>
                        <p className="text-md-2">38 Current amount reached</p>
                      </div>
                    </div>
                    <div className="icon-with-text">
                      <div>{/* logo */}</div>
                      <div>
                        <p className="text-lg">38</p>
                      </div>
                    </div>
                  </div>
                  <div className="icon-with-text">
                    <div>{/* logo */}</div>
                    <div>
                      <p className="text-md-2">Active Pool</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h1>{jpyRate * items?.amount} JPY</h1>
                </div>
                <div className="first-container-last">
                  <div className="first-container-last-top progress-bar"></div>{" "}
                  {/* progress bar */}
                  <div className="first-container-last-bottom">
                    <div>
                      <p className="text-md">
                        The target amount is {`${JPYPrice}`} JPY
                      </p>
                    </div>
                    <div className="icon-with-text">
                      <div>{/* logo */}</div>
                      <div>
                        <p className="text-lg">41.25</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="second-container">
                <div>
                  <div className="icon-with-text">
                    <div>{/* logo */}</div>
                    <div>
                      <p className="text-sm">Remaining shares /Total Shares</p>
                    </div>
                  </div>
                  <div>
                    <h4>{`${items?.fractionsCount/items?.fractions}`}</h4>
                  </div>
                </div>
                <div>
                  <div className="icon-with-text">
                    <div>{/* logo */}</div>
                    <div>
                      <p className="text-sm">Participants</p>
                    </div>
                  </div>
                  <div>
                    <h4>825</h4>
                  </div>
                </div>
                <div>
                  <div className="icon-with-text">
                    <div>{/* logo */}</div>
                    <div>
                      <p className="text-sm">Remaining time</p>
                    </div>
                  </div>
                  <div>
                    <h4>25 days</h4>
                  </div>
                </div>
              </div>
              <div className="third-container">
                <div className="icon-with-text">
                  <div>{/* logo */}</div>
                  <div>
                    <p className="text-md">
                      Buy Factional Shares: 10,000 JPY / Per Share
                    </p>
                  </div>
                </div>
                <div>
                  <div className="active">
                    <div className="box">
                      <div>{/* image */}</div>
                      <div className="icon-with-text">
                        <div>{/* logo */}</div>
                        <div>
                          <p>10,000</p>
                        </div>
                      </div>
                    </div>
                    <div className="icon-with-text">
                      <div>{/* logo */}</div>
                      <div>
                        <p>10,000</p>
                      </div>
                    </div>
                  </div>
                  <div className="active">
                    <div className="box">
                      <div>{/* image */}</div>
                      <div className="icon-with-text">
                        <div>{/* logo */}</div>
                        <div>
                          <p>10,000</p>
                        </div>
                      </div>
                    </div>
                    <div className="icon-with-text">
                      <div>{/* logo */}</div>
                      <div>
                        <p>10,000</p>
                      </div>
                    </div>
                  </div>
                  <div className="active">
                    <div className="box">
                      <div>{/* image */}</div>
                      <div className="icon-with-text">
                        <div>{/* logo */}</div>
                        <div>
                          <p>10,000</p>
                        </div>
                      </div>
                    </div>
                    <div className="icon-with-text">
                      <div>{/* logo */}</div>
                      <div>
                        <p>10,000</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="box">
                      <div>{/* image */}</div>
                      <div className="icon-with-text">
                        <div>{/* logo */}</div>
                        <div>
                          <p>10,000</p>
                        </div>
                      </div>
                    </div>
                    <div className="icon-with-text">
                      <div>{/* logo */}</div>
                      <div>
                        <p>10,000</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="box">
                      <div>{/* image */}</div>
                      <div className="icon-with-text">
                        <div>{/* logo */}</div>
                        <div>
                          <p>{items?.fractionsCount}</p>
                        </div>
                      </div>
                    </div>
                    <div className="icon-with-text">
                      <div>{/* logo */}</div>
                      <div>
                        <p>{items?.fractionsCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fourth-container">
                <div className="icon-with-text">
                  <div>{/* logo */}</div>
                  <div>
                    <p className="text-lg-1">{`${items?.fractions}`} /Shares</p>
                  </div>
                </div>
                <div className="icon-with-text">
                  <div>{/* logo */}</div>
                  <div>
                    <p className="text-lg">1.5</p>
                  </div>
                </div>
                <div>
                  <p className="text-lg-2">Total:&nbsp; ￥{`${JPYPrice}`}</p>
                </div>
              </div>
              <Input
          type='number'
          onChange={e => setAmount(e.target.value)}
          value={amount}
          addonBefore={'ETH'}
        />
            </ContentWrapperStyled>
            <ButtonWrapperStyled>
              <button disable={!canJoin() } onClick={handleJoinParticipation}>Join Pool</button>
            </ButtonWrapperStyled>
            <ButtonWrapperStyled>
              <button onClick={handleRemoveParticipation}>Leave Pool</button>
            </ButtonWrapperStyled>
            {!isOwner && !loading &&  <ButtonWrapperStyled>
              <button onClick={handleClaimParticipation}>Claim Pool</button>
            </ButtonWrapperStyled>}
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
    color: ${props => props.theme.black};
  }

  .ant-input-group-addon {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-right: none;
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.black};
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
    background-color: ${props => props.theme.white};
    padding-right: 12px;
    height: 48px;
    text-align: right;

    &:disabled {
      border-radius: 8px;
      border: none;
      box-shadow: none;
      outline: none;
      background-color: ${props => props.theme.gray['0']};
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
    border-color: ${props => props.theme.gray['1']};
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

    p {
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
      gap: 5px;
    }

    .first-container {
      padding: 10px;
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
        .first-container-last-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }

    .second-container {
      padding: 10px;
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
      padding: 10px;
      border: 2px solid #5271ff;
      margin-bottom: 20px;
      border-radius: 12px;
    }

    .fourth-container {
      padding: 10px;
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
      width: 100%;
      padding: 7px 0;
      border: none;
      background-color: #5271ff;
      color: #ffffff;
      border-radius: 12px;
    }
  `,
};
