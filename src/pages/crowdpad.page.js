import { useState, useEffect } from "react";
import Choices from "choices.js";

import {
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  gif1,
  gif2,
  gif3,
  gif4,
  gif5,
  gif6,
  ethereum,
  polygon,
  poolProgress,
  iconGroup,
} from "../utils/images.util";
import { Link } from "react-router-dom";

const Crowdpad = () => {
  const [checkButton, setCheckButton] = useState(0);

  const AuctionData = [
    {
      image: gif1,
      title: "Deep Sea Phantasy",
      id: 1,
      price: 0.4,
      type: "GIFs",
      progress: 50,
      nfts: 1,
      filter: ["all", "games"],
    },
    {
      image: item1,
      title: "CyberPrimal 042 LAN",
      id: 2,
      price: 0.4,
      type: "Arts",
      progress: 5,
      nfts: 1,
      filter: ["all", "art"],
    },
    {
      image: gif2,
      title: "Crypto Egg Stamp #5",
      id: 3,
      price: 0.4,
      type: "Games",
      progress: 75,
      nfts: 1,
      filter: ["all", "music", "meme"],
    },
    {
      image: item2,
      title: "Colorful Abstract Painting",
      id: 4,
      price: 0.4,
      type: "Art",
      progress: 12,
      nfts: 1,
      filter: ["all", "video"],
    },
    {
      image: item3,
      title: "Liquid Forest Princess",
      id: 5,
      price: 0.4,
      type: "",
      progress: 18,
      nfts: 1,
      filter: ["all", "video", "meme"],
    },
    {
      image: gif3,
      title: "Spider Eyes Modern Art",
      id: 6,
      price: 0.4,
      type: "GIFs",
      progress: 25,
      nfts: 1,
      filter: ["all", "games"],
    },
    {
      image: item4,
      title: "Synthwave Painting",
      id: 7,
      price: 0.4,
      type: "",
      progress: 30,
      nfts: 1,
      filter: ["all", "art"],
    },
    {
      image: gif4,
      title: "Contemporary Abstract",
      id: 8,
      price: 0.4,
      type: "GIFs",
      progress: 44,
      nfts: 1,
      filter: ["all", "music"],
    },
    {
      image: item5,
      title: "Valkyrie Abstract Art",
      id: 9,
      price: 0.4,
      type: "",
      progress: 21,
      nfts: 1,
      filter: ["all", "video", "meme"],
    },
    {
      image: gif5,
      title: "The girl with the firefly",
      id: 10,
      price: 0.4,
      type: "",
      progress: 4,
      nfts: 1,
      filter: ["all", "art"],
    },
    {
      image: item6,
      title: "Dodo hide the seek",
      id: 11,
      price: 0.4,
      type: "",
      progress: 18,
      nfts: 1,
      filter: ["all", "games"],
    },
    {
      image: gif6,
      title: "Pinky Ocean",
      id: 12,
      price: 0.4,
      type: "",
      progress: 20,
      nfts: 1,
      filter: ["all", "music"],
    },
  ];

  useEffect(() => {
    new Choices("#filter-type");
  }, []);

  const [allData, setAllData] = useState(AuctionData);
  const [type, setType] = useState("all");

  return (
		<>
			<section className='bg-half-100 w-100 pb-0 mb-0'>
				<div className='container'>
					<div className='row'>
						<div className='col-lg-8'>
							<h4 className='display-6 text-dark title-dark fw-medium'>
								Join CrowdPads
							</h4>
						</div>
						<div className='col-lg-4'>
							<div className='hstack gap-3 justify-content-end'>
								<button className='btn btn-soft-primary'>
									<img src={ethereum} style={{ paddingRight: "15px" }} alt='' />
									Ethereum
								</button>
								<button className='btn btn-soft-primary'>
									<img src={polygon} style={{ paddingRight: "15px" }} alt='' />
									Polygon
								</button>
							</div>
						</div>
					</div>
					<div className='hstack'>
						<div className='d-flex gap-3'>
							<button
								className={checkButton == 0 ? "btn btn-dark" : "btn btn-light"}
								onClick={() => {
									setCheckButton(0);
								}}>
								Live
							</button>
							<button
								className={checkButton == 1 ? "btn btn-dark" : "btn btn-light"}
								onClick={() => {
									setCheckButton(1);
								}}>
								Closed
							</button>
						</div>

						<div className='ms-auto col-lg-2 col-md-6'>
							<div className='filter-search-form position-relative filter-border'>
								<select
									className='form-select'
									data-trigger
									name='filter-type'
									id='filter-type'
									aria-label='Default select example'
									defaultValue={"Recent"}>
									<option value='1'>Recent</option>
									<option value='2'>Old</option>
									<option value='3'>A-Z</option>
									<option value='4'>Z-A</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className='section pt-4'>
				<div className='container'>
					<div className='row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4'>
						{allData.map((data) => {
							return (
								<div className='col' key={data.title}>
									<div className='card nft-items nft-primary rounded-md shadow overflow-hidden mb-1 p-3'>
										<div className='d-flex justify-content-between'>
											<div className='img-group'>
												<a href='/' className='user-avatar'>
													<span className='badge badge-link bg-muted'>
														<img
															src={iconGroup}
															alt='user'
															width={15}
															className='avatar-sm-sm rounded-circle'
														/>
														<span style={{ marginLeft: 10, fontWeight: 600 }}>
															1
														</span>
													</span>
												</a>
											</div>
											<img
												src={ethereum}
												style={{ marginLeft: "5px" }}
												alt=''
											/>
										</div>

										<div className='nft-image rounded-md mt-3 position-relative overflow-hidden'>
											<Link to={`/crowdpad/details/${data.id}`}>
												<img src={data.image} className='img-fluid' alt='' />
											</Link>

											<div className='position-absolute top-0 start-0 m-2'>
												<span className='badge badge-link bg-primary'>
													{data.nfts} NFT
												</span>
											</div>
										</div>

										<div className='card-body content position-relative p-0 mt-3'>
											<Link
												to={`/crowdpad/details/${data.id}`}
												className='title text-dark h6'>
												{data.title}
											</Link>

											<div className='d-flex justify-content-between mt-2'>
												<small className='rate fw-bold'>{data.price} ETH</small>
											</div>

											<hr />
											<div className='hstack justify-content-between my-3 gap-1'>
												<small className='text-dark fw-bold'>
													<img src={poolProgress} width={15} alt='' />
													<span style={{ marginLeft: 10, fontSize: 13 }}>
														Pool Progress
													</span>
												</small>

												<div
													className='progress bg-muted'
													style={{
														height: 8,
														width: "30%",
													}}>
													<div
														className='progress-bar'
														role='progressbar'
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
							);
						})}
					</div>
				</div>
			</section>
		</>
	);
};

export default Crowdpad;
