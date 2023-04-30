import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { MetaMask_Fox, iconLogo } from "../utils/images.util";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
		<>
			<footer className='bg-footer'>
				<div className='py-3 py-lg-5'>
					<div className='container'>
						<div className='row justify-content-center text-center'>
							<div className='col-xl-4 col-lg-5 col-md-6 mt-4 mt-sm-0'>
								<h5 className='text-light fw-normal title-dark'>
									{t("fraArtCommunity")}
								</h5>

								<ul className='list-unstyled social-icon foot-social-icon mb-0 mt-4 '>
									<li
										className='list-inline-item lh-1'
										style={{ paddingRight: 3 }}>
										<a href='' className='rounded'>
											<i className='uil uil-facebook-f'></i>
										</a>
									</li>
									<li
										className='list-inline-item lh-1'
										style={{ paddingRight: 3 }}>
										<a href='' className='rounded'>
											<i className='uil uil-instagram'></i>
										</a>
									</li>
									{/* <li
                    className="list-inline-item lh-1"
                    style={{ paddingRight: 3 }}
                  >
                    <a href="" className="rounded">
                      <i className="uil uil-linkedin"></i>
                    </a>
                  </li> */}
									{/* <li
                    className="list-inline-item lh-1"
                    style={{ paddingRight: 3 }}
                  >
                    <a href="" className="rounded">
                      <i className="uil uil-dribbble"></i>
                    </a>
                  </li> */}
									<li
										className='list-inline-item lh-1'
										style={{ paddingRight: 3 }}>
										<a href='' className='rounded'>
											<i className='uil uil-twitter'></i>
										</a>
									</li>
									{/* <li
                    className="list-inline-item lh-1"
                    style={{ paddingRight: 3 }}
                  >
                    <a href="" className="rounded">
                      <i className="uil uil-skype"></i>
                    </a>
                  </li>
                  <li
                    className="list-inline-item lh-1"
                    style={{ paddingRight: 3 }}
                  >
                    <a href="" className="rounded">
                      <i className="uil uil-telegram"></i>
                    </a>
                  </li>
                  <li
                    className="list-inline-item lh-1"
                    style={{ paddingRight: 3 }}
                  >
                    <a href="" className="rounded">
                      <i className="uil uil-slack"></i>
                    </a>
                  </li>
                  <li
                    className="list-inline-item lh-1"
                    style={{ paddingRight: 3 }}
                  >
                    <a href="" className="rounded">
                      <i className="uil uil-tumblr"></i>
                    </a>
                  </li>
                  <li
                    className="list-inline-item lh-1"
                    style={{ paddingRight: 3 }}
                  >
                    <a href="" className="rounded">
                      <i className="uil uil-whatsapp"></i>
                    </a>
                  </li> */}
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div className='container'>
					<div className='row'>
						<div className='col-12'>
							<div className='py-3 py-lg-5 footer-border'>
								<div className='row justify-content-between'>
									<div className='col-lg-4 col-12 mb-0 mb-md-4 pb-0 pb-md-2'>
										<a href='#' className='logo-footer'>
											<img src={iconLogo} alt='' />
										</a>
										<p className='para-desc mb-0 mt-4'>
											{t("buySellAndDiscoverExclusive")}
										</p>
									</div>

									<div className='col-lg-2 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0'>
										<h5 className='footer-head'>Fra-art</h5>
										<ul className='list-unstyled footer-list mt-4'>
											<li>
												<a href='/' className='text-foot'>
													<i className='uil uil-angle-right-b me-1'></i>{" "}
													{t("home")}
												</a>
											</li>
											{/* <li>
                        <Link
                          to="#"
                          className="text-foot"
                          onClick={() => {
                            alert("Coming soon...");
                          }}
                        >
                          <i className="uil uil-angle-right-b me-1"></i>Crowdpad
                        </Link>
                      </li> */}
											<li>
												<Link
													to='#'
													className='text-foot'
													onClick={() => {
														alert("Coming soon...");
													}}>
													<i className='uil uil-angle-right-b me-1'></i>FraPool
												</Link>
											</li>
											<li>
												<Link to='/marketplace' className='text-foot'>
													<i className='uil uil-angle-right-b me-1'></i>
													{t("marketPlace")}
												</Link>
											</li>
											{/* <li>
                        <Link
                          to="#"
                          className="text-foot"
                          onClick={() => {
                            alert("Coming soon...");
                          }}
                        >
                          <i className="uil uil-angle-right-b me-1"></i>
                          Bridge
                        </Link>
                      </li> */}
										</ul>
									</div>

									<div className='col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0'>
										<h5 className='footer-head'>{t("newsletter")}</h5>
										<p className='mt-4'>{t("signUpAndReceive")}</p>
										<form>
											<div className='row'>
												<div className='col-lg-12'>
													<div className='foot-subscribe mb-3'>
														<label className='form-label'>
															{t("writeYourEmail")}{" "}
															<span className='text-danger'>*</span>
														</label>
														<div className='form-icon position-relative'>
															<FiMail className='fea icon-sm icons' />
															<input
																type='email'
																name='email'
																id='emailsubscribe'
																className='form-control ps-5 rounded'
																placeholder='Your email : '
																required
																style={{ height: 46 }}
															/>
														</div>
													</div>
												</div>
												<div className='col-lg-12'>
													<div className='d-grid'>
														<input
															type='submit'
															id='submitsubscribe'
															name='send'
															className='btn btn-soft-primary'
															value={t("subscribe")}
														/>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='footer-py-30 footer-bar'>
					<div className='container text-center'>
						<div className='row align-items-center'>
							<div className='col-sm-6'>
								<div className='text-sm-start'>
									<p className='mb-0'>
										Copyright © {new Date().getFullYear()} Fra-Art
									</p>
								</div>
							</div>

							<div className='col-sm-6 mt-4 mt-sm-0 pt-2 pt-sm-0'>
								<ul className='list-unstyled footer-list text-sm-end mb-0'>
									<li className='list-inline-item mb-0'>
										<a href='/' className='text-foot me-2'>
											{t("privacy")}
										</a>
									</li>
									<li className='list-inline-item mb-0'>
										<a href='/' className='text-foot me-2'>
											{t("terms")}
										</a>
									</li>
									<li className='list-inline-item mb-0'>
										<a href='/' className='text-foot me-2'>
											{t("helpCenter")}
										</a>
									</li>
									<li className='list-inline-item mb-0'>
										<a href='/' className='text-foot'>
											{t("contact")}
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</footer>

			<div
				className='modal fade'
				id='modal-metamask'
				tabIndex='-1'
				aria-hidden='true'>
				<div className='modal-dialog modal-dialog-centered modal-sm'>
					<div className='modal-content justify-content-center border-0 shadow-md rounded-md position-relative'>
						<div className='position-absolute top-0 start-100 translate-middle z-index-1'>
							<button
								type='button'
								className='btn btn-icon btn-pills btn-sm btn-light btn-close opacity-10'
								data-bs-dismiss='modal'
								id='close-modal'>
								<i className='uil uil-times fs-4'></i>
							</button>
						</div>

						<div className='modal-body p-4 text-center'>
							<img
								src={MetaMask_Fox}
								className='avatar avatar-md-md rounded-circle shadow-sm '
								alt=''
							/>

							<div className='content mt-4'>
								<h5 className='text-danger mb-4'>Error!</h5>

								<p className='text-muted'>
									Please Download MetaMask and create your profile and wallet in
									MetaMask. Please click and check the details,
								</p>

								<a
									href='https://metamask.io/'
									className='btn btn-link primary text-primary fw-bold'
									target='_blank'>
									MetaMask
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
