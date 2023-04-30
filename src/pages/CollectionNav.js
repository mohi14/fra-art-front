import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthStateContext } from "../context/authContext";
import { ParamsContext } from "../context/ParamsProvider";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";

import "./trending.new.css";
const CollectionNav = () => {
	
	const { t } = useTranslation();
	//   const [active, setActive] = useState("");
	const { active, setActive } = useContext(AuthStateContext);
	return (
		<>
			<div className='btn-sections'>
				<div className='btn-section'>
					<Link
						to='/trending'
						className='single-btn-area'
						onClick={() => setActive("trending")}>
						<button
							className={`single-btn ${
								active === "trending" && "activeTabBtn"
							}`}>
							{t("trending")}
						</button>
					</Link>

					<Link
						to='/hot'
						className='single-btn-area'
						onClick={() => setActive("hot")}>
						<button
							className={`single-btn ${active === "hot" && "activeTabBtn"}`}>
							{t("hotMints")}
						</button>
					</Link>
					<Link
						to='/newly'
						className='single-btn-area'
						onClick={() => setActive("newly")}>
						<button
							className={`single-btn ${active === "newly" && "activeTabBtn"}`}>
							{t("newCollectionsPageHeading")}
						</button>
					</Link>
					<Link
						to='/top'
						className='single-btn-area'
						onClick={() => setActive("top")}>
						<button
							className={`single-btn ${active === "top" && "activeTabBtn"}`}>
							{t("topCollection")}
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default CollectionNav;
