import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "./Slide.css";

import { Autoplay, Pagination } from "swiper";
import { Link } from "react-router-dom";

export default function BannerSlider({ volumeCollection }) {
  console.log("datassssss", volumeCollection);
  return (
		<div className='slider__wide'>
			<Swiper
				modules={[Pagination, Autoplay]}
				spaceBetween={30}
				pagination={{ clickable: true }}
				autoplay={{
					delay: 2000,
					disableOnInteraction: false,
					reverseDirection: true,
				}}
				loop={true}
				onSlideChange={() => console.log("slide change")}
				onSwiper={(swiper) => console.log(swiper)}
				breakpoints={{
					380: {
						width: 380,
						slidesPerView: 1,
					},

					640: {
						width: 640,
						slidesPerView: 2,
					},
					928: {
						width: 928,
						slidesPerView: 3,
					},
				}}
				className='mySwiper'>
				<div className='sliders'>
					{volumeCollection.slice(0, 5).map((item) => (
						<SwiperSlide>
							<Link to={`/trending/${item?.primaryContract}`}>
								<div className='parent'>
									<img className='slider_image w-100' src={item.image} alt='' />
									<div className='child'>
										<p className='mb-0'>{item.name}</p>
										<p className='description'>
											{item.description.slice(0, 120)}
										</p>
									</div>
								</div>
							</Link>
						</SwiperSlide>
					))}
				</div>
			</Swiper>
		</div>
	);
}
