import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../../context/UserContext';
import { FaExchangeAlt } from 'react-icons/fa';
import AlertContext from '../../context/alert/alertContext';
import Cookies from 'js-cookie';
import sendMail from '../genericFunctions/sendMail';
import getProfile from '../genericFunctions/getProfile';

const Transaction = props => {
	const [amountToPay, setAmountToPay] = useState(100);
	const [amountReceive, setAmountReceive] = useState(
		props.data.soles * amountToPay
	);
	const [exchangeRate, setExchangeRate] = useState(props.data.soles);
	const [currencyType, setCurrencyType] = useState(['Dollars', 'Soles']);
	const [currencyTo, setCurrencyTo] = useState(currencyType[0]);
	const [currencyFrom, setCurrencyFrom] = useState(currencyType[1]);
	const [bankDetails, setBankDetails] = useState('');
	const [profileDetails, setProfileDetails] = useState('');
	const { state, addToken, addName } = useContext(UserContext);
	const [submitted, setSubmitted] = useState(false);
	const [serviceRegister, setServiceRegister] = useState('');
	const alertContext = useContext(AlertContext);
	const { setAlert, alerts } = alertContext;

	const token = Cookies.get('token');

	// console.log(props, 'data');
	// console.log(token);

	useEffect(() => {
		const init = async () => {
			const profile = await getProfile(token);
			setProfileDetails(profile);
			setBankDetails(props.bankDetails);
			// await serviceWorker();
		};
		init();
	}, []);

	useEffect(() => {
		if (currencyTo == 'Dollars' && currencyFrom == 'Soles') {
			setExchangeRate(props.data.soles);
			setAmountReceive(amountToPay * exchangeRate);
		}
		if (currencyTo == 'Dollars' && currencyFrom == 'Bitcoin') {
			setExchangeRate(1 / props.data.bpi.USD.rate_float);
			setAmountReceive(amountToPay * exchangeRate);
		}
		if (currencyTo == 'Dollars' && currencyFrom == 'Dollars') {
			setExchangeRate(1);
			setAmountReceive(amountToPay * exchangeRate);
		}
		if (currencyTo == 'Soles' && currencyFrom == 'Soles') {
			setExchangeRate(1);
			setAmountReceive(amountToPay * exchangeRate);
		}
		if (currencyTo == 'Soles' && currencyFrom == 'Bitcoin') {
			setExchangeRate(
				(1 / props.data.bpi.USD.rate_float) * (1 / props.data.soles)
			);
			setAmountReceive(amountToPay * exchangeRate);
		}
		if (currencyTo == 'Soles' && currencyFrom == 'Dollars') {
			setExchangeRate(1 / props.data.soles);
			setAmountReceive(amountToPay * exchangeRate);
		}
		if (currencyTo == 'Bitcoin' && currencyFrom == 'Soles') {
			setExchangeRate(props.data.soles * props.data.bpi.USD.rate_float);
			setAmountReceive(amountToPay * exchangeRate);
		}
		if (currencyTo == 'Bitcoin' && currencyFrom == 'Bitcoin') {
			setExchangeRate(1);
			setAmountReceive(amountToPay * exchangeRate);
		}
		if (currencyTo == 'Bitcoin' && currencyFrom == 'Dollars') {
			setExchangeRate(props.data.bpi.USD.rate_float);
			setAmountReceive(amountToPay * exchangeRate);
		}
	}, [currencyFrom, currencyTo]);

	const handleSubmit = async () => {
		if (!profileDetails) {
			setAlert('Completa tu perfil', 'danger');
		} else if (!bankDetails) {
			setAlert('Complete los detalles de su cuenta bancaria', 'danger');
		} else {
			try {
				const res = await postTransaction(
					token,
					profileDetails,
					bankDetails,
					amountToPay,
					amountReceive,
					currencyTo,
					currencyFrom
				);
				// console.log('email:-', profileDetails.email);
				await sendMail(token, profileDetails.email, 'new', {
					profileDetails,
					bankDetails,
					transaction: { amountToPay, amountReceive, currencyTo, currencyFrom },
				});
				setSubmitted(true);
				setAlert('Operación iniciada', 'success');
			} catch (error) {
				setAlert('Algo salió mal', 'danger');
			}
		}
	};

	if (bankDetails === '' || profileDetails === '') {
		return <div>cargando...</div>;
	}

	return (
		<>
			{!submitted ? (
				<>
					<div className='row justify-content-center'>
						<div className='col-3'>
							<label>Ingrese la cantidad aquí</label>
							<input
								placeholder='Monto a pagar'
								className='form-control'
								value={amountToPay}
								onChange={e => {
									setAmountToPay(e.target.value);
									setAmountReceive(e.target.value * exchangeRate);
								}}
							/>
						</div>
						<div className='col-3'>
							<label>Cantidad que recibirás</label>
							<input
								placeholder='Cantidad que recibirás'
								className='form-control'
								value={amountToPay * exchangeRate}
								disabled
							/>
						</div>
					</div>
					<div className='row justify-content-center mb-5 mt-4'>
						<div className='col-2'>
							<label>Tipo de moneda</label>
							<select
								placeholder='currencyTo'
								className='form-control'
								value={currencyTo}
								onChange={e => {
									setCurrencyTo(e.target.value);
								}}
							>
								{currencyType.map((type, index) => {
									// console.log(type);
									return (
										<option key={index} value={type}>
											{type}
										</option>
									);
								})}
							</select>
						</div>
						<div className='icon'>
							<FaExchangeAlt />
						</div>
						<div className='col-2'>
							<label>Tipo de moneda</label>
							<select
								placeholder='currencyTo'
								className='form-control'
								value={currencyFrom}
								onChange={e => {
									setCurrencyFrom(e.target.value);
								}}
							>
								{currencyType.map((type, index) => {
									// console.log(type);
									return (
										<option key={index} value={type}>
											{type}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<button className='btn blue-btn' onClick={handleSubmit}>
						Guardar
					</button>
				</>
			) : (
				<div>
					<h3>Operación iniciada</h3>
					<h4>Revise su correo electrónico para más detalles</h4>
				</div>
			)}
			<style jsx>
				{`
					.icon {
						color: white;
						font-size: 2em;
					}
				`}
			</style>
		</>
	);
};

export default Transaction;

const postTransaction = async (
	token,
	profileDetails,
	bankDetails,
	amountToPay,
	amountReceive,
	currencyTo,
	currencyFrom
) => {
	const transaction = {
		amountToPay,
		amountReceive,
		currencyTo,
		currencyFrom,
		status: 'Pendiente',
	};
	const body = {
		profileDetails,
		bankDetails,
		transaction,
	};

	// console.log('body: --', body);

	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	const res = await Axios.post(
		'https://api.moni.pe/api/operations/',
		body,
		header
	);
	// console.log(res);
	return res;
};

const serviceWorker = async () => {
	if ('serviceWorker' in navigator) {
		const registerServiceWorker = async () => {
			if ('serviceWorker' in navigator) {
				const service = window.addEventListener('load', async () => {
					// console.log('inside for loop');
					const register = navigator.serviceWorker
						.register('/sw.js')
						.then(async reg => {
							const permission = await window.Notification.requestPermission();
							if (permission !== 'granted') {
								console.log('Permission not granted for Notification');
							}
							reg.showNotification('Transaction completed successfully');
						});
					// console.log('register', register);

					return register;
				});
			}
		};
		await registerServiceWorker();
	}
};
