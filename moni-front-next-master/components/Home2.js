import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Axios from 'axios';
import Convertor from './Convertor/Converter2';

const getCompra = async () => {
	const res = await Axios.get(
		'https://api.moni.pe/api/exchange/calculate?originCurrency=USD&destinationCurrency=PEN&amount=1'
	);
	// console.log(res, "compra");
	return res.data;
};

const getVenta = async () => {
	const res = await Axios.get(
		'https://api.moni.pe/api/exchange/calculate?originCurrency=PEN&destinationCurrency=USD&amount=1'
	);
	return res.data;
};

const getBpi = async () => {
	const res = await Axios.get(
		'https://api.coindesk.com/v1/bpi/currentprice.json'
	);
	return res.data;
};

const Home2 = props => {
	const [data, setData] = useState(undefined);
	const init = async () => {
		const data4 = await getCompra();
		const data2 = await getVenta();
		const data3 = await getBpi();
		// console.log(data4, data2, data3);
		const body2 = {
			soles: data4.rate,
			usd: data2.rate,
			savingsCompra: data4.ahorros,
			savingsVenta: data2.ahorros,
			bpi: data3.bpi,
		};
		setData(body2);
	};
	useEffect(() => {
		init();
		// console.log(data, 'body');
	}, []);

	return (
		<section className='home-section parallax-2' id='home'>
			<div className='js-height-full'>
				<div className='home-content container'>
					<div className='home-text'>
						<div className='container relative'>
							<div className='row'>
								<div className='col-lg-7 col-md-6 col-sm-6 col-xs-12 mb-40 mb-xs-0 wow fadeInLeft'>
									<div className='row'>
										<div className='col-lg-8 col-md-12'>
											<div className='text align-left mt-xs-40'>
												<h1 className='white mb-10'>
													El mejor{' '}
													<span className='orange bold'>tipo de cambio</span>{' '}
													para cambiar{' '}
													<span className='orange bold'>dólares</span> y{' '}
													<span className='orange bold'>soles</span> online en
													Lima, Perú
												</h1>
											</div>
										</div>
									</div>
									<div className='row display'>
										<div className='row col-md-12 align-left'>
											<div className='col-lg-5 col-md-8'>
												<div className='row'>
													<div className='col-md-12 align-left'>
														<div className='alt-service-wrap'>
															<div className='alt-service-item'>
																<div className='alt-service-icon icon1'> </div>
																Lorem ipsum
																<span className='bold'>dolor sit amet</span>,
																itae gravida
															</div>
														</div>

														<div className='alt-service-wrap'>
															<div className='alt-service-item'>
																<div className='alt-service-icon icon2'> </div>
																Vivamus neque orci
																<span className='bold'>ultricies blandit</span>
															</div>
														</div>

														<div className='alt-service-wrap'>
															<div className='alt-service-item'>
																<div className='alt-service-icon icon3'> </div>
																Vitae gravida nibh
																<span className='bold'>lorem ipsum dolor</span>
																sit amet
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className='col-lg-7 col-md-4 flecha-moni'>
												<img src='images/flecha-moni.png' />
											</div>
										</div>
									</div>
								</div>
								<Convertor data={props.data} body={data} />
							</div>
						</div>
					</div>
				</div>

				<div className='local-scroll'>
					<a href='#about' className='scroll-down'>
						<i className='fa fa-angle-down scroll-down-icon orange fa-2x'></i>
					</a>
				</div>
			</div>
		</section>
	);
};

export default Home2;
