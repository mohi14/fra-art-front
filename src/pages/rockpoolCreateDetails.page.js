import { useState } from "react";
import InputRange from "react-input-range";
import { notFoundImg, openseaIcon, questionCircle } from "../utils/images.util";

const RockpoolCreateDetails = () => {
  const [pvtPoolChecked, setPvtPoolChecked] = useState(false);
  const [curatorsFee, setCuratorsFee] = useState(0);

  return (
		<section className='bg-item-detail d-table w-100'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-6 text-center'>
						<div className='sticky-bar'>
							<img
								src={notFoundImg}
								className='img-fluid rounded-md shadow'
								alt=''
							/>
							<button className='btn btn-pills btn-soft-primary mt-4'>
								<img src={openseaIcon} style={{ paddingRight: 8 }} alt='' />
								This NFT is being sold on OpenSea
							</button>
						</div>
					</div>

					<div className='col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0'>
						<div className='p-4 bg-white rounded-md shadow-sm pb-5'>
							<div className='title-heading'>
								<h4 className='h3 fw-bold mb-0'>Create pool</h4>
							</div>
							<div className='mb-3'>
								<label className='form-label'>
									Fraction Name{" "}
									<img
										src={questionCircle}
										className='img-fluid rounded-md shadow'
										alt=''
										data-tip='The name of the NFT Fractions after the purchase is complete.'
									/>
								</label>
								<input
									name='fractionName'
									id='fractionName'
									type='text'
									className='form-control'
								/>
							</div>
							<div className='row mb-3'>
								<div className='col-md-6'>
									<label className='form-label'>
										Fraction Symbol{" "}
										<img
											src={questionCircle}
											className='img-fluid rounded-md shadow'
											alt=''
											data-tip='The symbol of your fractions with 3 to 5 letters.'
										/>
									</label>
									<input
										name='fractionSymbol'
										id='fractionSymbol'
										type='text'
										className='form-control'
									/>
								</div>
								<div className='col-md-6'>
									<label className='form-label'>
										Price Multiplier{" "}
										<img
											src={questionCircle}
											className='img-fluid rounded-md shadow'
											alt=''
											data-tip='Once the NFT is purchased, it is fractionalized using the Auction method and relisted in our marketplace at a higher Reserve Price. You should choose the multiplier below as a parameter to be applied to the current NFT price to set the Reserve Price after the fractionalization.'
										/>
									</label>
									<input
										name='priceMultiplier'
										id='priceMultiplier'
										type='text'
										className='form-control'
									/>
								</div>
							</div>
							<div className='mb-3'>
								<label className='form-label'>
									Description{" "}
									<img
										src={questionCircle}
										className='img-fluid rounded-md shadow'
										alt=''
										data-tip='Do you wanna tell your friends or community something about this NFT?'
									/>
								</label>
								<textarea
									name='desc'
									id='desc'
									rows='3'
									className='form-control'
								/>
							</div>
							<div className='hstack'>
								<input
									className='form-check-input mt-0'
									type='checkbox'
									value={pvtPoolChecked}
									onChange={(e) => setPvtPoolChecked(e.target.checked)}
									id='pvtPool'
								/>
								<label
									className='form-check-label text-muted ms-2'
									htmlFor='pvtPool'>
									Private Pool (not listed on the Marketplace)
								</label>
							</div>
							{pvtPoolChecked && (
								<div className='mb-4 mt-3'>
									<label className='form-label'>Curator's Fees</label>
									<InputRange
										maxValue={20}
										minValue={0}
										formatLabel={(v) => `${v}%`}
										value={curatorsFee}
										onChange={(v) => setCuratorsFee(v)}
									/>
								</div>
							)}
							<button className='btn btn-primary rounded-md w-100 mt-3'>
								Create Rockpool
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default RockpoolCreateDetails;
