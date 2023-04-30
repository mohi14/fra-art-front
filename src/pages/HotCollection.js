import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ParamsContext } from "../context/ParamsProvider";
import { FaEthereum } from "react-icons/fa";
import CollectionNav from "./CollectionNav";
import ques from "../assets/images/ques.png";
import { AuthStateContext } from "../context/authContext";
import { useTranslation } from "react-i18next";
import Pagination from "../utils/Pagination";
import Form from "react-bootstrap/Form";
import "./new.css";
const HotCollection = () => {
	const { t } = useTranslation();
	const [page, setPage] = useState(1);
	const [amount, setAmount] = useState(50);
	const { setUserId } = useContext(AuthStateContext);

	const [dataSort, setDataSort] = useState("5m");

	const [floorCollection, setFloorCollection] = useState([]);
	const [hotCollections, setHotCollections] = useState([]);
	const [allHotCollections, setAllHotCollections] = useState([]);
	const [load, setLoad] = useState(6);
	const [show, setShow] = useState(true);

	const handleChange = (event) => {
		const searchValue = event.target.value;

		// allHotCollections.filter((item) => console.log(item));

		const searchedData = allHotCollections.filter((item) => {
			const searchTerm = searchValue.toLocaleLowerCase();
			const collectionName =
				item.collection?.collectionName?.toLocaleLowerCase();
			return searchTerm && collectionName.startsWith(searchTerm);
		});

		if (searchValue.length > 0) {
			setHotCollections(searchedData);
		} else {
			setHotCollections(allHotCollections);
		}

		console.log(searchedData);
	};

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {accept: '*/*', 'x-api-key': 'c8c99b47-ac0e-5677-915a-1f0571480193'}
		  };
		fetch(`https://api-goerli.reservoir.tools/collections/v5?sortBy=floorAskPrice`,options)
			.then((res) => res.json())
			.then((data) => setFloorCollection(data.collections));
	}, []);

	useEffect(() => {
		fetch(
			`https://api.nftgo.io/api/v1/analytics/top-mints?timeRange=${dataSort}&suspiciousFilter=false`
		)
			.then((res) => res.json())
			.then((data) => {
				setHotCollections(data.data);
				setAllHotCollections(data.data);
			});
	}, [dataSort]);

	const handleLoadMore = () => {
		setLoad(load + 6);
	};
	useEffect(() => {
		if (load >= floorCollection.length) {
			setShow(false);
		} else {
			setShow(true);
		}
	}, [load]);

	console.log("hotts", hotCollections);
	const lastIndex = page * amount;
	const firstIndex = lastIndex - amount;
	const currentLinks = hotCollections.slice(firstIndex, lastIndex);

	return (
		<div>
			<div className='container custom__container my-5 '>
				<p
					style={{ fontSize: "24px", fontWeight: "500" }}
					className='text-start page-heading'>
					{t("hotMints")}
				</p>
				<p
					style={{ fontSize: "12px", fontWeight: "400", color: "#666666" }}
					className='text-start '>
					{t("hotMintPageSubHeading")}
				</p>
				<CollectionNav></CollectionNav>
				{/* data sorting navbar start */}
				<div className='d-flex justify-content-between'>
					<div>
						<input
							style={{ width: "300px", borderRadius: "50px" }}
							class='search form-control me-2 ps-5'
							type='search'
							placeholder={t("search")}
							aria-label='Search'
							onChange={handleChange}
						/>
					</div>
					<div className='select_box_container'>
						<Form.Select aria-label='Default select'>
							<option value='1' onClick={() => setDataSort("5m")}>
								5 {t("min")}
							</option>
							<option value='2' onClick={() => setDataSort("10m")}>
								10 {t("min")}
							</option>
							<option value='3' onClick={() => setDataSort("30m")}>
								30 {t("min")}
							</option>
							<option value='3' onClick={() => setDataSort("1h")}>
								1 {t("hr")}
							</option>
							<option value='3' onClick={() => setDataSort("6h")}>
								6 {t("hr")}
							</option>
							<option value='3' onClick={() => setDataSort("12h")}>
								12 {t("hr")}
							</option>
							<option value='3' onClick={() => setDataSort("24h")}>
								24 {t("hr")}
							</option>
						</Form.Select>
					</div>
				</div>
				{/* data sorting navbar end */}
				<div className='my-2'>
					<div className='table_section2'>
						<table className='table caption-top shadow rounded'>
							<thead style={{ fontSize: "14px", fontWeight: "700" }}>
								<tr style={{ color: "#111119" }}>
									<th scope='col'>#</th>
									<th scope='col'>{t("collection")}</th>
									<th className='text-end' scope='col'>
										{t("mints")}({dataSort})
									</th>
									<th className='text-end' scope='col'>
										{t("notableMinters")}
									</th>
									<th className='text-end' scope='col'>
										{" "}
										{t("uniqueMinters")}
									</th>
									<th className='text-end' scope='col'>
										{t("mintPrice")}
									</th>
									<th className='text-end' scope='col'>
										{t("totalMints")}
									</th>
									<th className='text-end' scope='col'>
										{t("sales")}({dataSort})
									</th>
								</tr>
							</thead>
							<tbody>
								{currentLinks.map((collection, index) => (
									// <tr key={index} className="pointer hover-background">
									//   <th scope="row">{index + 1}</th>
									//   <td
									//   //  onClick={() => setUserId(collection?.primaryContract)}
									//   >
									//     <Link to={`/trending/${collection?.primaryContract}`}>
									//       <img
									//         width={50}
									//         height={50}
									//         className="rounded-circle  me-4"
									//         src={collection.image}
									//         alt=""
									//       />
									//       {collection.name}
									//     </Link>{" "}
									//   </td>
									//   <td>
									//     {" "}
									//     {(collection.volume["allTime"] / 1000).toFixed(2)} k <br />{" "}
									//     <span className="text-success">
									//       {" "}
									//       {(collection.volume["30day"] / 100).toFixed(2)} %
									//     </span>
									//   </td>
									//   <td>
									//     {/* <FaEthereum /> */}
									//     {collection.floorSale["1day"] &&
									//       collection.floorSale["1day"].toFixed(2)}
									//   </td>
									//   <td>{collection.tokenCount}</td>
									// </tr>

									<tr key={index} className='pointer hover-background'>
										<th style={{ fontSize: "14px" }} scope='row'>
											{firstIndex === 0 ? index + 1 : index + 51}
										</th>
										<td
											//  onClick={() => setUserId(collection?.primaryContract)}
											style={{ width: "305px" }}>
											<Link
												to={`/trending/${collection.collection?.contractAddress}`}>
												{collection.collection?.logo ? (
													<img
														width={40}
														height={40}
														className='rounded-circle  me-4'
														src={collection.collection?.logo}
														alt=''
													/>
												) : (
													<img
														width={40}
														height={40}
														className='rounded-circle  me-4'
														src={ques}
														alt=''
													/>
												)}

												<span
													style={{ fontSize: "14px" }}
													className='text-black '>
													{collection.collection?.collectionName}
												</span>
											</Link>{" "}
										</td>
										<td className='text-end'>
											<div style={{ fontSize: "14px" }}>{collection.mints}</div>
											<div
												style={{ fontSize: "12px" }}
												className={
													collection.mintsChange * 100 < 0
														? "text-danger "
														: "text-success "
												}>
												{(collection.mintsChange * 100).toFixed(2)}%
											</div>
										</td>
										<td className='text-end'>
											<div style={{ fontSize: "14px" }}>
												{collection.notableMinterNum}
											</div>
										</td>
										<td className='text-end'>
											<div style={{ fontSize: "14px" }}>
												{collection.uniqueMinterNum}
											</div>
											<div style={{ fontSize: "12px" }} className=''>
												(
												{(
													(collection.uniqueMinterNum / collection.totalMints) *
													100
												).toFixed(2)}
												%)
											</div>
										</td>
										<td className='text-end'>
											<div style={{ fontSize: "14px" }}>
												<FaEthereum />{" "}
												{collection.latestMintPriceInETH.toFixed(4)}
											</div>
											<div style={{ fontSize: "12px" }}>
												<span className='me-2 bg-light px-2 rounded-pill'>
													floor
												</span>
												<span>
													<FaEthereum />
													{collection.floorPriceInETH
														? collection.floorPriceInETH
														: 0}
												</span>
											</div>
										</td>
										<td className='text-end'>
											<div style={{ fontSize: "14px" }}>
												{collection.totalMints}
											</div>
										</td>
										<td className='text-end'>
											<div style={{ fontSize: "14px" }}>{collection.sales}</div>
											<div style={{ fontSize: "12px" }}>
												{collection.salesChange
													? (collection.salesChange * 100).toFixed(2)
													: 0}
												%
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<Pagination
						page={page}
						setPage={setPage}
						members={hotCollections.length}
						amount={amount}
					/>
				</div>
			</div>
		</div>
	);
};

export default HotCollection;
