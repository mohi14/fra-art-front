import { useState, useEffect,useCallback} from "react";
import { IoIosWarning } from "react-icons/io";
import { Contract, ethers, utils } from "ethers";
import { Link } from "react-router-dom";
import { item1, gif1, gif2, ethereum, iconGroup } from "../utils/images.util";
import { getTokenBalance, JoinPool, CreatePool } from "../utils/contracts";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import axios from "axios";
import useCreate from "../hooks/rockpool/open-collective-purchase/useCreate";
import perpetualOpenCollectivePurchaseAbi from "../hooks/rockpool/open-collective-purchase/openCollectivePurchaseAbi.json";

import "./new.css";
import useSpecificCreatePool from "../hooks/rockpool/specific/useSpecificCreatePool";
import { Button } from "react-bootstrap";
import { useAccount, useConnect, useNetwork } from "wagmi";
import { Modal } from "antd";
import { chainConfig } from "../hooks/ChainConfig";
const RockpoolCreate = () => {
  const { t } = useTranslation();
  const { address, isConnected } = useAccount()
  const { chain} = useNetwork()

  const { connect, connectors, error, isLoading, pendingConnector } =useConnect()
  let [priceMultiplier, setPriceMultiplier] = useState("1");
  const { products } = chainConfig(chain.id)

  let [extra, setExtra] = useState("0x41554354494f4e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000003f480000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000104d7574616e74204361742023313139340000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000054d54434659000000000000000000000000000000000000000000000000000000");
  let [contractAddress, setContractAddress] = useState("");
  let [link, setLink] = useState("");
  let [item, setItem] = useState({
    id:0,
    owner:"",
    fractions: 0,
    duration:0,
    priceMultiplier: 0,
    targetPrice: 0,
    status: false,
    progress: 0,
    userParticipation:0,
    isErc721Available: false,
    image: "",
    price: 0,
    fractionsCount: 0,
    reservePrice: 0,
    fee: 0,
    title: "",
    amount: 0,
  });
  console.log(connectors)
  const metamask=()=>{
    const connector = connectors[0]
    connect({ connector})
    if(isLoading){
    
    }
  }
  let [Collection, setCollection] = useState("");
  let [tokenId, setTokenId] = useState("0");
  const isMetaMaskInstalled = useCallback(() => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  }, []);
  let [duration, setDuration] = useState(10);
  let [allData, setAllData] = useState();
  const { chain: activeChain } = useNetwork();
 
  const walletChainId = activeChain?.id;
  const fetchData=async(item)=>{
    const query = "https://testnet.fra-art.com/api/createRockPool"
    axios.post(query, item).then(res => {
      console.log(res)
  }).catch(err => { })
  }

  
useEffect(()=>{
  // fetchData()
},[allData])

	const { handleCreate,
		isExecutin } = useSpecificCreatePool(contractAddress, tokenId, priceMultiplier, extra, walletChainId)
    const handleRemoveParticipation = () => {
      Modal.confirm({
        title: "Create Pool",
        icon: <ExclamationCircleOutlined />,
        content: `You are creating a POOL for 
        ${tokenId} Do you want to do it?`,
        okText: "Create Pool",
        cancelText: "Cancel",
        onOk: async () => createPool(link),
        cancelButtonProps: { style: { width: "100%", padding: "5px" } },
        okButtonProps: { style: { width: "100%", padding: "5px" } },
      });
    };
	const createPool = async (e) => {
    console.log(e)
		const regex = /0x[a-fA-F0-9]{40}/g;
		const matches = regex.exec(e);
		setContractAddress(contractAddress = matches ? matches[0] : null)
		const lastSlashIndex = e.lastIndexOf("/");
		setTokenId(tokenId = e.substr(lastSlashIndex + 1))

	 await fetch(`https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}?format=json`)
			.then(res =>  res.json())
			.then((data) => setCollection(Collection = data))
      const type = 'AUCTION'
		const types = ['bytes32', 'string', 'string', 'uint256', 'uint256'];
		const values = [utils.formatBytes32String(type), Collection?.name == null ? Collection?.asset_contract?.name: Collection?.name, Collection?.asset_contract?.symbol,"8000",parseInt(utils.parseEther((Collection?.collection?.stats?.average_price).toString())).toString()];
console.log(utils.formatBytes32String(type), Collection?.name == null ? Collection?.asset_contract?.name: Collection?.name, Collection?.asset_contract?.symbol,"8000",parseInt(utils.parseEther((Collection?.collection?.stats?.average_price).toString())))

		setExtra(extra = utils.defaultAbiCoder.encode(types, values))
	
    await handleCreate()
    const provider = new ethers.providers.InfuraProvider(
      "goerli",
      "e5909f511a3f4297b5bfdc84f08dcb45"
      );
     

      const contractErc20Fraction = new ethers.Contract(products.specific.contract.openCollectivePurchase, perpetualOpenCollectivePurchaseAbi, provider);
      setItem(item ={
        amount: 0,
        duration: Date.now() + 8000,
        fee:0,
        fractions:0,
        fractionsCount:0,
        tokenId,
        priceMultiplier,
        image: Collection?.image_url,
        owner: address,
        isErc721Available:true,
        listingId:parseInt(await contractErc20Fraction.listingCount()) - 1,
        price:(Collection?.collection?.stats?.average_price).toString(),
        status:true,
        reservePrice: (Collection?.collection?.stats?.average_price).toString(),
        targetPrice: (Collection?.collection?.stats?.average_price).toString(),
        title:Collection?.name == null ? Collection?.asset_contract?.name: Collection?.name,
        progress: 0,
        userParticipation:0

      })
    await fetchData(item)
  
  
 }

	


  return (
    <>
      <section className="bg-half-100 w-100 pb-0 mb-0">
        <div className="container">
           <Button className=" text-left d-block mb-4" variant="primary">
            {t("createPoolFromOpensea")}
            </Button>
          <div className="row justify-content-center mt-1">
           
            <div className="col-lg-8 text-center">
            
              {/* <h4 className=" text-dark title-dark fw-normal">
                {t("createPoolFromOpensea")}
              </h4> */}
              <p>{t("buyAnyNFTListeOnOpenSeaAt")}</p>
              <div className="hstack gap-1">
                <div className="form-floating w-100">
                  <input
                    type="email"
                    className="form-control"
                    id="LoginEmail"
                    placeholder="Enter OpenSea listing at a fixed price."
                    onChange={(e) => setLink(e.target.value)}
                  />
                  <label htmlFor="LoginEmail" style={{ fontSize: 14 }}>
                    {t("enterTheURLOfAnListingAtA")}
                  </label>
                </div>
           
             <Link
                
                  className="btn btn-secondary rounded-sm"
                  type="submit"
                  onClick={isConnected ? () => handleRemoveParticipation() :()=> metamask()}
                >
                  {t("startAPool")}
                </Link>:

                

              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section pt-2">
        <div className="container">
          <div>
            <Button className=" text-left d-block mb-4" variant="primary">
              {t("joinPools")}
            </Button>
          </div>
          <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4">
            {allData?.map((data) => {
              return (
                <div className="col-6 col-sm-6   " key={data.title}>
                  <div className="card nft-items nft-primary rounded-md shadow overflow-hidden mb-1 p-3">
                    <div className="fixlayout -d-flex justify-content-between">
                      <div className="img-group">
                        <a href="/" className="user-avatar">
                          <span className="badge badge-link bg-muted">
                            <img
                              src={iconGroup}
                              alt="user"
                              width={15}
                              className="img-group-img avatar-sm-sm rounded-circle"
                            />
                            <span style={{ marginLeft: 10, fontWeight: 600 }}>
                              1
                            </span>
                          </span>
                        </a>
                      </div>
                      <img
                        src={ethereum}
                        className="ethereumPic"
                        style={{ marginLeft: "5px" }}
                        alt=""
                      />
                    </div>

                    <div className="nft-image rounded-md mt-3 position-relative overflow-hidden">
                      <Link to={`/rockpool/details/${data.id}`}>
                        <img src={data.image} className="img-fluid" alt="" />
                      </Link>

                      <div className="position-absolute top-0 start-0 m-2">
                        <span className="badge badge-link bg-primary">
                          {data.nfts} NFT
                        </span>
                      </div>
                    </div>

                    <div className="card-body content position-relative p-0 mt-3">
                      <Link
                        to={`/rockpool/details/${data.id}`}
                        className="title text-dark h6"
                      >
                        {data.title}
                      </Link>

                      <div className="d-flex justify-content-between mt-2">
                        Accumulated{" "}
                        <small className="rate fw-bold">{data.price} ETH</small>
                      </div>

                      <hr />
                      <div className="d-flex flex-column flex-lg-row hstack justify-content-start my-3 gap-1">
                        <small className="col-6 text-dark fw-bold">
                          <IoIosWarning size={18} />
                          <span style={{ marginLeft: 5, fontSize: 13 }}>
                            Pool Lost
                          </span>
                        </small>

                        <div className="col-6 d-flex flex-row justify-content-start align-items-center">
                          <div
                            className=" progress bg-secondary"
                            style={{
                              height: 8,
                              width: "30%",
                            }}
                          >
                            <div
                              className="progress-bar bg-warning"
                              role="progressbar"
                              style={{
                                width: `${data.progress}%`,
                              }}
                            />
                          </div>

                          <small style={{ fontSize: 14, marginLeft: 5 }}>
                            {data.progress}%
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default RockpoolCreate;
