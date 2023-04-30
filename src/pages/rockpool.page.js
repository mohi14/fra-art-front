import { useState, useEffect } from "react";
import { IoIosWarning } from "react-icons/io";
import Choices from "choices.js";
import { useTranslation } from "react-i18next";
import "./new.css";
import { Button } from "react-bootstrap";
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
	iconGroup,
} from "../utils/images.util";
import { Link } from "react-router-dom";
import axios from "axios";
import { utils } from "ethers";

const Rockpool = () => {
	const { t } = useTranslation();
	const [checkButton, setCheckButton] = useState(0);
	let [allData, setAllData] = useState();
	const fetchData=async()=>{
		await axios.get('https://testnet.fra-art.com/api/getRockpool')
		.then(response => setAllData(allData = response.data));
		console.log(allData)
	  }
	useEffect(() => {
		fetchData()
		new Choices("#filter-type");
	}, []);

	const [type, setType] = useState("all");

	return (
		<>
			<section className='bg-half-100 w-100 pb-0 mb-0'>
				<div className='container'>
					<div className='row'>
						<div className='col-lg-8'>
						<Button className=" text-left d-block mb-4" variant="primary">
								{t("joinPools")}
								</Button>
							{/* <h4 className='text-dark title-dark fw-normal'>
								{t("joinPools")}
							</h4> */}
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
								Winner
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
						{allData?.map((data) => {
							console.log(data.listingId)
							return (
								<div className='col-6 col-sm-6   ' key={data.title}>
									<div className='card nft-items nft-primary rounded-md shadow overflow-hidden mb-1 p-3'>
										<div className='fixlayout -d-flex justify-content-between'>
											<div className='img-group'>
												<a href={`/rockpool/details/${data?.listingId}`} className='user-avatar'>
													<span className='badge badge-link bg-muted'>
														<img
															src={iconGroup}
															alt='user'
															width={15}
															className='img-group-img avatar-sm-sm rounded-circle'
														/>
														<span style={{ marginLeft: 10, fontWeight: 600 }}>
															1
														</span>
													</span>
												</a>
											</div>
											<img
												src={ethereum}
												className='ethereumPic'
												style={{ marginLeft: "5px" }}
												alt=''
											/>
										</div>

										<div className='nft-image rounded-md mt-3 position-relative overflow-hidden'>
											<Link to={`/rockpool/details/${data?.listingId}`}>
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
												to={`/rockpool/details/${data.listingId}`}
												className='title text-dark h6'>
												{data.title}
											</Link>

											<div className='d-flex justify-content-between mt-2'>
												Accumulated{" "}
												<small className='rate fw-bold'>{(data?.price)?.toFixed(4)} ETH</small>
											</div>

											<hr />
											<div className='d-flex flex-column flex-lg-row hstack justify-content-start my-3 gap-1'>
												<small className='col-6 text-dark fw-bold'>
													<IoIosWarning size={18} />
													<span style={{ marginLeft: 5, fontSize: 13 }}>
														Pool Lost
													</span>
												</small>

												<div className='col-6 d-flex flex-row justify-content-start align-items-center'>
													<div
														className=' progress bg-secondary'
														style={{
															height: 8,
															width: "30%",
														}}>
														<div
															className='progress-bar bg-warning'
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
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</>
	);
};

export default Rockpool;
