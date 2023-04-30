import Layout from "../components/layout/Layout";

function Profile() {
  return (
		<>
			<Layout
				headTitle='Profile'
				pageTitle='Profile'
				pageTitleSub={"Welcome FraArt Profile page"}
				pageClass={"dashboard"}
				parent={"Home"}
				child={"Profile"}>
				<div className='row'>
					<div className='col-xxl-4 col-xl-12'>
						<div className='card welcome-profile'>
							<div className='card-body'>
								<img src='./images/avatar/1.jpg' alt='' />
								<h4>Welcome, Jannatul Maowa!</h4>
								<p>
									Looks like you are not verified yet. Verify yourself to use
									the full potential of Xtrader.
								</p>

								<ul>
									<li>
										<a href='#'>
											<span className='verified'>
												<i className='ri-check-line'></i>
											</span>
											Verify account
										</a>
									</li>
									<li>
										<a href='#'>
											<span className='not-verified'>
												<i className='ri-shield-check-line'></i>
											</span>
											Two-factor authentication (2FA)
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className='col-xxl-8 col-xl-12'>
						<div className='card'>
							<div className='card-header'>
								<h4 className='card-title'>Following</h4>
							</div>
							<div className='card-body bs-0 p-0 top-creators-content  bg-transparent'>
								<div className='row'>
									<div className='col-xl-6 col-lg-6'>
										<div className='d-flex justify-content-between creator-widget active  align-items-center'>
											<div className='d-flex align-items-center'>
												<div className='top-creators-user-img me-3'>
													<img
														src='/images/avatar/1.jpg'
														alt=''
														width='60'
													/>
												</div>
												<div className='top-creators-info'>
													<h5 className='mb-0'>Terry Camacho</h5>
													<p className='mb-2'>60 Items</p>
												</div>
											</div>
											<div className='text-end'>
												<a className='btn btn-secondary'>Unfollow</a>
											</div>
										</div>
									</div>
									<div className='col-xl-6 col-lg-6'>
										<div className='d-flex justify-content-between creator-widget active  align-items-center'>
											<div className='d-flex align-items-center'>
												<div className='top-creators-user-img me-3'>
													<img src='/images/avatar/2.jpg' alt='' width='60' />
												</div>
												<div className='top-creators-info'>
													<h5 className='mb-0'>Terry Camacho</h5>
													<p className='mb-2'>60 Items</p>
												</div>
											</div>
											<div className='text-end'>
												<a className='btn btn-secondary'>Unfollow</a>
											</div>
										</div>
									</div>
									<div className='col-xl-6 col-lg-6'>
										<div className='d-flex justify-content-between creator-widget active  align-items-center'>
											<div className='d-flex align-items-center'>
												<div className='top-creators-user-img me-3'>
													<img
														src='/images/avatar/3.jpg'
														alt=''
														width='60'
													/>
												</div>
												<div className='top-creators-info'>
													<h5 className='mb-0'>Terry Camacho</h5>
													<p className='mb-2'>60 Items</p>
												</div>
											</div>
											<div className='text-end'>
												<a className='btn btn-secondary'>Unfollow</a>
											</div>
										</div>
									</div>
									<div className='col-xl-6 col-lg-6'>
										<div className='d-flex justify-content-between creator-widget active  align-items-center'>
											<div className='d-flex align-items-center'>
												<div className='top-creators-user-img me-3'>
													<img
														src='/images/avatar/4.jpg'
														alt=''
														width='60'
													/>
												</div>
												<div className='top-creators-info'>
													<h5 className='mb-0'>Terry Camacho</h5>
													<p className='mb-2'>60 Items</p>
												</div>
											</div>
											<div className='text-end'>
												<a className='btn btn-secondary'>Unfollow</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='col-12'>
						<div className='card'>
							<div className='card-header'>
								<h4 className='card-title'>My Bought</h4>
							</div>
							<div className='card-body bs-0 p-0 bg-transparent'>
								<div className='row'>
									<div className='col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6'>
										<div className='card items'>
											<div className='card-body'>
												<div className='items-img position-relative'>
													<img
														src='/images/items/1.jpg'
														className='img-fluid rounded mb-3'
														alt=''
													/>
													<img
														src='/images/avatar/1.jpg'
														className='creator'
														width='50'
														alt=''
													/>
												</div>
												<h4 className='card-title'>Liguid Wave</h4>
											</div>
										</div>
									</div>
									<div className='col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6'>
										<div className='card items'>
											<div className='card-body'>
												<div className='items-img position-relative'>
													<img
														src='/images/items/2.jpg'
														className='img-fluid rounded mb-3'
														alt=''
													/>
													<img
														src='/images/avatar/2.jpg'
														className='creator'
														width='50'
														alt=''
													/>
												</div>
												<h4 className='card-title'>Liguid Wave</h4>
											</div>
										</div>
									</div>
									<div className='col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6'>
										<div className='card items'>
											<div className='card-body'>
												<div className='items-img position-relative'>
													<img
														src='/images/items/3.jpg'
														className='img-fluid rounded mb-3'
														alt=''
													/>
													<img
														src='/images/avatar/3.jpg'
														className='creator'
														width='50'
														alt=''
													/>
												</div>
												<h4 className='card-title'>Liguid Wave</h4>
											</div>
										</div>
									</div>
									<div className='col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6'>
										<div className='card items'>
											<div className='card-body'>
												<div className='items-img position-relative'>
													<img
														src='/images/items/4.jpg'
														className='img-fluid rounded mb-3'
														alt=''
													/>
													<img
														src='/images/avatar/4.jpg'
														className='creator'
														width='50'
														alt=''
													/>
												</div>
												<h4 className='card-title'>Liguid Wave</h4>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-12'>
						<div className='card'>
							<div className='card-header'>
								<h4 className='card-title'>My Collection</h4>
							</div>
							<div className='card-body bs-0 p-0 bg-transparent'>
								<div className='row'>
									<div className='col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6'>
										<div className='card items'>
											<div className='card-body'>
												<div className='items-img position-relative'>
													<img
														src='/images/items/5.jpg'
														className='img-fluid rounded mb-3'
														alt=''
													/>
													<img
														src='/images/avatar/5.jpg'
														className='creator'
														width='50'
														alt=''
													/>
												</div>
												<h4 className='card-title'>Liguid Wave</h4>
											</div>
										</div>
									</div>
									<div className='col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6'>
										<div className='card items'>
											<div className='card-body'>
												<div className='items-img position-relative'>
													<img
														src='/images/items/6.jpg'
														className='img-fluid rounded mb-3'
														alt=''
													/>
													<img
														src='/images/avatar/6.jpg'
														className='creator'
														width='50'
														alt=''
													/>
												</div>
												<h4 className='card-title'>Liguid Wave</h4>
											</div>
										</div>
									</div>
									<div className='col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6'>
										<div className='card items'>
											<div className='card-body'>
												<div className='items-img position-relative'>
													<img
														src='/images/items/7.jpg'
														className='img-fluid rounded mb-3'
														alt=''
													/>
													<img
														src='/images/avatar/7.jpg'
														className='creator'
														width='50'
														alt=''
													/>
												</div>
												<h4 className='card-title'>Liguid Wave</h4>
											</div>
										</div>
									</div>
									<div className='col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-6'>
										<div className='card items'>
											<div className='card-body'>
												<div className='items-img position-relative'>
													<img
														src='/images/items/8.jpg'
														className='img-fluid rounded mb-3'
														alt=''
													/>
													<img
														src='/images/avatar/8.jpg'
														className='creator'
														width='50'
														alt=''
													/>
												</div>
												<h4 className='card-title'>Liguid Wave</h4>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
}
export default Profile;
