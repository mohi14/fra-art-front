import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function TopCreators() {
  const [creators, setCreators] = useState([]);
  const fetchTopCreators = () => {
    let query = `/api/admin-dashboard-creators`;
    axios.get(query)
      .then(res => {
        setCreators(res.data.creators);
      }).catch(err => {
        setCreators([]);
      })
  }
  useEffect(() => {
    fetchTopCreators()
  }, []);
  return (
		<>
			{creators.length && (
				<div className='card'>
					<div className='card-header'>
						<h4 className='card-title'>Top Creators</h4>
					</div>
					<div className='card-body bs-0 p-0 top-creators-content  bg-transparent'>
						<div className='row'>
							{creators.map((item, i) => (
								<div className='col-xl-6' key={`admin-dashboard-creator-${i}`}>
									<div className='d-flex justify-content-between creator-widget  align-items-center'>
										<div className='d-flex align-items-center'>
											<div className='top-creators-user-img me-3'>
												<img src={item.creator.profilePic} alt='' width='60' />
											</div>
											<div className='top-creators-info'>
												<h5 className='mb-0'>{item.creator.name}</h5>
												<p className='mb-2'>{item.length} Items</p>
											</div>
										</div>
										<div className='text-end'>
											<Link
												to={`/profile/${item._id}`}
												className='btn btn-outline-primary'>
												View Creator
											</Link>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
export default TopCreators;
