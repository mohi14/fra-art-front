import React, { useState } from "react";
import styled from "styled-components";

// icons
import CurrencyIcon from "../../../assets/images/icons/1.png";
import MoneyIcon from "../../../assets/images/icons/6.png";
import EthIcon from "../../../assets/images/icons/2.png";

interface MoneyBoxProps {
  active?: boolean;
}

export default function MoneyBox({ getAmount, amount, jpyRate, priceFraction,active }) {
  const [activeValue, setActive] = useState(active || false);

  const onClickHandler = () => {
    setActive(!activeValue);
    console.log(amount)
    getAmount(activeValue ? parseInt(amount) - parseInt(priceFraction) : parseInt(amount) + parseInt(priceFraction))
  };

  return (
    <MainContainerStyled>
      <BoxWrapperStyled
        className={activeValue ? "active" : ""}
        onClick={onClickHandler}
      >
        <div className="image-wrapper">
          <img src={MoneyIcon} alt="Money Icon" width="50" />
        </div>
        <div>
          <div className="icon-with-text">
            <div className="image-wrapper">
              <img src={CurrencyIcon} alt="Currency Icon" width="10" />
            </div>
            <div>
              <p className="text-1">{priceFraction ? priceFraction * jpyRate :"10,000"}</p>
            </div>
          </div>
        </div>
      </BoxWrapperStyled>
      <div>
        <div className="icon-with-text">
          <div className="image-wrapper">
            <img src={EthIcon} alt="Eth Icon" width="6" />
          </div>
          <div>
            <p className="text-2">{priceFraction ?? '0.2'}</p>
          </div>
        </div>
      </div>
    </MainContainerStyled>
  );
}

const { MainContainerStyled, BoxWrapperStyled } = {
  MainContainerStyled: styled.div`
    .icon-with-text {
      justify-content: center;
      gap: 2px;

      .image-wrapper {
        display: flex;
      }
    }

    .text-1 {
      font-size: 7px;
      font-weight: 600;
    }

    .text-2 {
      font-size: 7.5px;
    }
  `,

  BoxWrapperStyled: styled.div`
    border: 1px solid #c5c4c5;
    border-radius: 15px;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
    margin-bottom: 5px;

    &.active {
      border-color: transparent;
      background-color: #5271ff;

      img {
        filter: invert(1);
      }

      .icon-with-text {
        img {
          filter: brightness(200%);
        }

        p {
          color: #ffffff;
        }
      }
    }
  `,
};
