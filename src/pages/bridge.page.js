import { FiArrowRight } from "react-icons/fi";
import { IoIosWarning } from "react-icons/io";

import {
  ethereum,
  MetaMask_Fox,
  bnbIcon,
  iconLogoDark,
} from "../utils/images.util";

const Bridge = () => {
  return (
    <section className="bg-item-detail d-table w-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <h4 className="display-6 text-dark title-dark fw-medium">
              Network Swap
            </h4>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <h5 className="mb-2">Token Supply</h5>
            <p style={{ fontSize: 14 }}>
              Total Supply: 99,916,281
              <br />
              Max Supply: 100,000,000.00
              <br />
              <br />
              Information about the circulating supply and its distribution over
              time can be found on the Token Transparency
            </p>
            <h5 className="mb-4 mt-4">
              <strong>Network Breakdown</strong>
            </h5>
            <div>
              <div
                className="hstack gap-3 bg-light px-4 py-2 mb-3 rounded-md shadow-sm"
                style={{ width: "fit-content" }}
              >
                <img src={ethereum} width={90} className="mb-2" alt="eth" />
                <p>
                  <strong>
                    Ethereum Mainnet
                    <br />
                    92,555,446.18 FA (92.63%)
                  </strong>
                  <br />
                  <span style={{ fontSize: 14 }}>
                    Issued: 100,000,000
                    <br />
                    Burned: 0
                    <br />
                    Locked: 7,444,553.82
                  </span>
                </p>
              </div>
              <p style={{ fontSize: 14 }}>
                Operator -{" "}
                <a
                  href="0xF9a7c456341fAFc861909c2FF17C8c6366234f2F"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  0xF9a7c456341fAFc861909c2FF17C8c6366234f2F
                </a>
                <br />
                Time-Locked Vault -{" "}
                <a
                  href="0x09567066a42c087218053525Fb2fB19A0bA78A6f"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  0x09567066a42c087218053525Fb2fB19A0bA78A6f
                </a>
                <br />
                Multisig -{" "}
                <a
                  href="0xc718E5a5b06ce7FEd722B128C0C0Eb9c5c902D92"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  0xc718E5a5b06ce7FEd722B128C0C0Eb9c5c902D92
                </a>
              </p>
            </div>
            <div>
              <div
                className="hstack gap-3 bg-light px-4 py-2 mb-3 rounded-md shadow-sm"
                style={{ width: "fit-content" }}
              >
                <img src={bnbIcon} width={90} className="mb-2" alt="eth" />
                <p>
                  <strong>
                    BNB Smart Chain
                    <br />
                    7,360,834.82 FA (7.37%)
                  </strong>
                  <br />
                  <span style={{ fontSize: 14 }}>
                    Issued: 100,000,000
                    <br />
                    Burned: 0
                    <br />
                    Locked: 92,639,165.18
                  </span>
                </p>
              </div>
              <p style={{ fontSize: 14 }}>
                Operator -{" "}
                <a
                  href="0xF9a7c456341fAFc861909c2FF17C8c6366234f2F"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  0xF9a7c456341fAFc861909c2FF17C8c6366234f2F
                </a>
                <br />
                Time-Locked Vault -{" "}
                <a
                  href="0x09567066a42c087218053525Fb2fB19A0bA78A6f"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  0x09567066a42c087218053525Fb2fB19A0bA78A6f
                </a>
                <br />
                Multisig -{" "}
                <a
                  href="0x4e9cA8ca6A113FC3Db72677aa04C8DE028618377"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  0x4e9cA8ca6A113FC3Db72677aa04C8DE028618377
                </a>
              </p>
            </div>
          </div>

          <div
            className="col-md-6 p-5 bg-white rounded-md shadow-sm"
            style={{ height: "fit-content" }}
          >
            <h5 className="text-dark d-flex">Asset</h5>
            <div className="hstack gap-2 bg-light p-3 rounded-md shadow-sm mb-3">
              <img src={iconLogoDark} width={30} className="mb-2" alt="eth" />
              <p className="mb-0">FraArt</p>
            </div>
            <div className="hstack gap-3">
              <div className="text-center">
                <h6>From</h6>
                <div className="bg-light p-3 rounded-md shadow-sm">
                  <img src={ethereum} width={40} className="mb-2" alt="eth" />
                  <p className="mb-0">Ethereum Mainnet</p>
                </div>
              </div>
              <div className="text-center my-auto mx-3">
                <FiArrowRight />
              </div>
              <div className="text-center">
                <h6>To</h6>
                <div className="bg-light p-3 rounded-md shadow-sm">
                  <img src={bnbIcon} width={40} className="mb-2" alt="bnb" />
                  <p className="mb-0">BNB Smart Chain</p>
                </div>
              </div>
            </div>
            <div className="hstack my-3 align-items-end gap-1">
              <div className="col-md-auto">
                <label className="form-label">Amount Available: 0</label>
                <input
                  name="fractionName"
                  id="fractionName"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-md-2">
                <button className="btn btn-muted rounded-sm w-100 py-2 mt-3 mt-md-0">
                  MAX
                </button>
              </div>
            </div>
            <p style={{ fontSize: 13 }}>
              Fee: 10 FA
              <br />
              <strong>You will receive ≈ 0 FA</strong>
            </p>
            <p style={{ fontSize: 13, marginBottom: 0 }}>Destination Address</p>
            <p className="hstack bg-light p-3 rounded-md shadow-sm">
              <img
                src={MetaMask_Fox}
                width={25}
                alt="metamask"
                style={{ marginRight: 5 }}
              />
              <strong>0x41f455283d623...</strong>
            </p>
            <div className="hstack mb-3">
              <IoIosWarning
                className="text-warning"
                style={{ fontSize: 48, marginRight: 10 }}
              />
              <p className="my-auto" style={{ fontSize: 12 }}>
                You will receive FA at the same wallet address. The transfer
                takes at least 30 minutes. Please, switch networks in order to
                check your balance.
              </p>
            </div>
            <button className="btn btn-primary rounded-md w-100">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bridge;
