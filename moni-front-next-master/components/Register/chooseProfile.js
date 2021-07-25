import React, { useContext, useState, useEffect } from 'react';

const ChooseProfile = props => {
	const handleSubmit = (e, prof) => {
		e.preventDefault();
		// console.log("sbmit called", prof);
		props.setProfile(prof);
		props.setIsAccountSelect(true);
	};
	useEffect(() => {
		window.onpopstate = function (event) {
			window.location.href = '/';
		};
	}, []);
	return (
		<>
			<section className='page-section pt-20 pb-0' id='page'>
				<div className='home-content container'>
					<div className='home-text'>
						<div className='container align-center'>
							<div className='row'>
								<div className='col-lg-6 col-lg-push-3 col-sm-12'>
									<form className='form white'>
										<img src='images/logo-moni.png' alt='Moni' width='150px' />
										<h1 className='section-title pt-80 pt-xs-40 mb-40 mb-sm-40'>
											¿Con qué perfil deseas operar?
										</h1>

										<div className='relative'>
											<div className='benefits-grid mb-40 mb-xs-20'>
												<button
													className='btn-icon'
													onClick={e => {
														handleSubmit(e, 'Personal');
													}}
												>
													<div className='benefit-item'>
														<div className='benefit-icon mb-20'>
															<img
																src='images/icon-personal.svg'
																alt='Moni'
																width='150px'
															/>
														</div>
														{/* <h3 className="benefit-title">Personal</h3> */}
														<div className='benefits-descr'>
															<div className='intro-label'>
																<h3>
																	<span className='label label-danger bg-red'>
																		Personal
																	</span>
																</h3>
															</div>
														</div>
													</div>
												</button>

												<button
													className='btn-icon'
													onClick={e => {
														handleSubmit(e, 'Empresa');
													}}
												>
													<div className='benefit-item'>
														<div className='benefit-icon mb-20'>
															<img
																src='images/icon-empresa.svg'
																alt='Moni'
																width='150px'
															/>
														</div>
														{/* <h3 className="benefit-title bg-red">Empresa</h3> */}
														<div className='benefits-descr'>
															<div className='intro-label'>
																<h3>
																	<span className='label label-danger bg-red'>
																		Empresa
																	</span>
																</h3>
															</div>
														</div>
													</div>
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				<style jsx>{`
					.btn-icon {
						background: transparent;
					}
				`}</style>
			</section>
		</>
	);
};

export default ChooseProfile;
