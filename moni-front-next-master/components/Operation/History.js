import React, { useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import getProfile from '../genericFunctions/getProfile';
import getAllTransactions from '../genericFunctions/getAllTransactions';
import loggedUser from '../genericFunctions/loggedUser';
import sendMail from '../genericFunctions/sendMail';
import Axios from 'axios';
import moment from 'moment';
import Hist from './HIstoryComp';

const History = props => {
	const token = Cookies.get('token');
	const [state, setState] = useState(false);
	const [profileDetails, setProfileDetails] = useState('');
	const [displayClass, setDisplay] = useState(false);
	const [listClass, setListClass] = useState([]);
	const [debug, setDebug] = useState([]);
	const [loading, setLoading] = useState(false);
	const [savingsDollars, setSavingsDollars] = useState(0);
	const [savingsSoles, setSavingsSoles] = useState(0);

	const dollarsName = 'Dólares';

	const init = async () => {
		setLoading(false);
		if (token === undefined) {
			window.location.href = '/login';
		}
		const id = await loggedUser(token);
		const user = {
			user: {
				id: id,
			},
		};
		// console.log(user, 'xxxxxx');
		const data = await getAllTransactions(token, user);
		let t = 0,
			t2 = 0;
		for (let i = 0; i < data.length; i++) {
			// console.log(data[i]);
			if (
				data[i].transaction.currencyTo === 'Dollars' &&
				data[i].transaction.status === 'Finalizado'
			)
				t +=
					parseFloat(data[i].transaction.savings) *
					parseFloat(data[i].transaction.exchange);
			else if (
				data[i].transaction.currencyTo === 'Soles' &&
				data[i].transaction.status === 'Finalizado'
			)
				t2 += parseFloat(data[i].transaction.savings);
		}
		// console.log(t, ' t');
		setSavingsDollars(t);
		setSavingsSoles(t2);
		const profile = await getProfile(token);
		// console.log(profile);
		// console.log(data);
		// console.log(debug);
		setState(data);
		setLoading(true);
	};
	// init();
	useEffect(() => {
		init();
	}, []);

	if (loading === false) {
		return (
			<div className='min-section'>
				<div className='loader'>Cargando...</div>
				<style jsx>
					{`
						.min-section {
							background: white;
							background-image: url('images/bkg-neutro.jpg');
							background-attachment: fixed;
							background-repeat: no-repeat;
							background-size: cover;
							min-height: 100vh;
						}
					`}
				</style>
			</div>
		);
	}

	return (
		<>
			{/* <div className="page" id="top"> */}
			<section className='page-section bg-gray pb-10 pt-70'>
				<div className='relative container align-left'>
					<div className='row'>
						<div className='container'>
							<ul className='nav nav-tabs tpl-tabs animate'>
								<li className='active'>
									<a href='#one' data-toggle='tab' aria-expanded='true'>
										<div className='alt-features-icon'>
											<i className='fa fa-clock-o'></i>{' '}
										</div>
										Pago pendiente
									</a>
								</li>
								<li>
									<a href='#two' data-toggle='tab' aria-expanded='false'>
										<div className='alt-features-icon'>
											<i className='fa fa-share'></i>
										</div>
										Pago realizado
									</a>
								</li>
								<li>
									<a href='#three' data-toggle='tab' aria-expanded='false'>
										<div className='alt-features-icon'>
											<i className='fa fa-check-circle'></i>
										</div>
										Finalizado
									</a>
								</li>
								<li>
									<div className='alt-service-item black mt-30'>
										S/
										<div className='count-number orange'>
											{parseFloat(savingsSoles + savingsDollars).toFixed(2)}
											{'  '}
										</div>
										<div className='count-descr'>
											<h3 className='bold mt-0 mb-0'>Ahorro acumulado</h3>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
			<section className='page-section pt-0 pb-20 min-section'>
				<form className='form-normal'>
					<div className='container align-left'>
						<div className='col-sm-12 padding0'>
							<div className='tab-content tpl-tabs-cont section-text'>
								<div className='tab-pane fade active in' id='one'>
									<div className='relative mb-xs-40'>
										<dl className='toggle'>
											{state
												.filter(
													op => op.transaction.status === 'Pago pendiente'
												)
												.map((operation, index) => {
													// console.log(operation);
													return <Hist data={operation} />;
												})}
										</dl>
									</div>
								</div>
								<div className='tab-pane fade' id='two'>
									<div className='relative mb-xs-40'>
										<dl className='toggle'>
											{state
												.filter(
													op => op.transaction.status === 'Pago realizado'
												)
												.map((operation, index) => {
													// console.log(operation);
													return <Hist data={operation} />;
												})}
										</dl>
									</div>
								</div>
								<div className='tab-pane fade' id='three'>
									<div className='relative mb-xs-40'>
										<dl className='toggle'>
											{state
												.filter(op => op.transaction.status === 'Finalizado')
												.map((operation, index) => {
													// console.log(operation);
													return <Hist data={operation} />;
												})}
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</section>

			<style jsx>
				{`
					.min-section {
						background: white;
						background-image: url('images/bkg-neutro.jpg');
						background-attachment: fixed;
						background-repeat: no-repeat;
						background-size: cover;
						min-height: 80vh;
					}
					.btn-a {
						background: transparent;
						color: #333;
						font-size: 22px;
						font-weight: 600;
						border: none;
					}
				`}
			</style>
			{/* </div> */}
		</>
	);
};

export default History;

const changeStatus = async (
	token,
	id,
	amountReceive,
	amountToPay,
	currencyTo,
	currencyFrom,
	status
) => {
	const body = {
		transaction: {
			amountReceive,
			amountToPay,
			currencyTo,
			currencyFrom,
			status,
		},
	};
	// console.log(body, 'bodu');
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	const res = await Axios.put(
		'https://api.moni.pe/api/operations/' + id,
		body,
		header
	);
	// console.log(res.data, 'EDited data');
	return res.data;
};
