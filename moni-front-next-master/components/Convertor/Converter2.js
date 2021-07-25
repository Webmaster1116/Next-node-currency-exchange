import React, { useState, useEffect } from 'react';
import { FcRefresh } from 'react-icons/fc';
import { Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import Axios from 'axios';

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

// import "../../Style/Convertor.css";
// import "../../Style/Button.css";

const Convertor = props => {
	let toAmount, fromAmount;
	const [data, setData] = useState({
		soles: 3.5,
		usd: 3.495,
		savingsCompra: 0.008,
		savingsVenta: 0.0045,
		bpi: {
			USD: {
				rate_float: 9000,
			},
		},
	});
	const [loader, setLoader] = useState(true);
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
		fromAmount = 1;
		toAmount = data4.rate;
	};
	useEffect(() => {
		init();
		// console.log(data, 'body');
	}, []);
	// if (loader === true) {
	//   return (
	//     <div className="page-loader">
	//       <div className="loader">Cargando...</div>
	//     </div>
	//   );
	// }

	// console.log(data, 'dat');

	const [exchangeRate, setExchangeRate] = useState(data.soles); // data.bpi.USD.rate_float
	const [fromCurrency, setFromCurrency] = useState('Soles');
	const [toCurrency, setToCurrency] = useState('Dollars');

	const [amount, setAmount] = useState(1500);
	const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

	useEffect(() => {
		if (fromCurrency == 'Dollars' && toCurrency == 'Soles') {
			setExchangeRate(data.soles);
		}
		if (fromCurrency == 'Dollars' && toCurrency == 'Bitcoin') {
			setExchangeRate(1 / data.bpi.USD.rate_float);
		}
		if (fromCurrency == 'Dollars' && toCurrency == 'Dollars') {
			setExchangeRate(1);
		}
		if (fromCurrency == 'Soles' && toCurrency == 'Soles') {
			setExchangeRate(1);
		}
		if (fromCurrency == 'Soles' && toCurrency == 'Bitcoin') {
			setExchangeRate((1 / data.bpi.USD.rate_float) * (1 / data.soles));
		}
		if (fromCurrency == 'Soles' && toCurrency == 'Dollars') {
			setExchangeRate(1 / data.usd);
		}
		if (fromCurrency == 'Bitcoin' && toCurrency == 'Soles') {
			setExchangeRate(data.soles * data.bpi.USD.rate_float);
		}
		if (fromCurrency == 'Bitcoin' && toCurrency == 'Bitcoin') {
			setExchangeRate(1);
		}
		if (fromCurrency == 'Bitcoin' && toCurrency == 'Dollars') {
			setExchangeRate(data.bpi.USD.rate_float);
		}
		if (amountInFromCurrency) {
			fromAmount = Math.floor(amount * 100) / 100;
			toAmount = Math.floor(amount * exchangeRate * 100) / 100;
		} else {
			toAmount = Math.floor(amount * 100) / 100;
			fromAmount = Math.floor((amount / exchangeRate) * 100) / 100;
		}
	}, [fromCurrency, toCurrency]);

	if (amountInFromCurrency) {
		fromAmount = Math.floor(amount * 100) / 100;
		toAmount = Math.floor(amount * exchangeRate * 100) / 100;
	} else {
		toAmount = Math.floor(amount * 100) / 100;
		fromAmount = Math.floor((amount / exchangeRate) * 100) / 100;
	}

	function handleFromAmountChange(e) {
		// const re = /^[0-9\b]+$/;
		const re = /^[+-]?([0-9]+(\.\d{0,2})?|[.][0-9]+)$/;
		if (e.target.value === '' || re.test(e.target.value)) {
			setAmount(e.target.value);
			setAmountInFromCurrency(true);
		}
	}

	function handleToAmountChange(e) {
		// const re = /^[0-9\b]+$/;
		const re = /^[+-]?([0-9]+(\.\d{0,2})?|[.][0-9]+)$/;
		if (e.target.value === '' || re.test(e.target.value)) {
			setAmount(e.target.value);
			setAmountInFromCurrency(false);
		}
	}

	const handleRedirect = e => {
		e.preventDefault();
		window.location.href =
			'/operation?originAmount=' +
			fromAmount +
			'&destinationAmount=' +
			toAmount +
			'&originCurrency=' +
			fromCurrency +
			'&destinationCurrency=' +
			toCurrency;
	};

	return (
		<div
			className='col-lg-5 col-md-6 col-sm-6 col-xs-12 mb-40 wow fadeInRight'
			data-wow-delay='0.5s'
		>
			<div className='text'>
				<h5 className='white bold uppercase mb-0 mt-xs-20'>
					Tipo de Cambio del dólar hoy en Perú
				</h5>
				<h6 className='white'>
					Compra: <span className='bold'>{data.soles}</span> - Venta:{' '}
					<span className='bold'>{data.usd}</span>
				</h6>
				<div className='row'>
					<div className='col-md-12 col-xs-12'>
						<div className='col-md-7 col-xs-7 bg-white cambio-form'>
							<h5 className='align-left mb-0 mt-0 bold uppercase'>Envías</h5>
							<input
								type='number'
								name='name'
								id='name'
								value={fromAmount}
								className='input-md form-control-cambio bold'
								placeholder='0'
								step='.01'
								maxLength='100'
								onChange={handleFromAmountChange}
							/>
						</div>
						<div className='col-md-3 col-xs-3 cambio-moneda white bold align-left'>
							{fromCurrency === 'Soles' ? 'Soles' : 'Dólares'}
						</div>
						<div
							onClick={e => {
								e.preventDefault();
								if (fromCurrency === 'Soles') {
									setFromCurrency('Dollars');
								} else {
									setFromCurrency('Soles');
								}
								if (toCurrency === 'Soles') {
									setToCurrency('Dollars');
								} else {
									setToCurrency('Soles');
								}
							}}
							className='col-md-2 col-xs-2 cambio-btn'
						>
							<i className='fa fa-refresh fa-2x orange'></i>
						</div>
					</div>
				</div>
				<div className='row mt-20'>
					<div className='col-sm-12 col-xs-12'>
						<div className='col-md-7 col-xs-7 bg-white cambio-form'>
							<h5 className='align-left mb-0 mt-0 bold uppercase'>Recibes</h5>
							<input
								type='number'
								name='name'
								id='name'
								className='input-md form-control-cambio bold'
								value={toAmount}
								placeholder='0'
								step='.01'
								maxLength='100'
								onChange={handleToAmountChange}
							/>
						</div>
						<div className='col-md-3 col-xs-3 cambio-moneda white bold align-left'>
							{toCurrency === 'Dollars' ? 'Dólares' : 'Soles'}
						</div>
						<div
							onClick={e => {
								e.preventDefault();
								if (toCurrency === 'Soles') {
									setToCurrency('Dollars');
								} else {
									setToCurrency('Soles');
								}
								if (fromCurrency === 'Soles') {
									setFromCurrency('Dollars');
								} else {
									setFromCurrency('Soles');
								}
							}}
							className='col-md-2 col-xs-2 cambio-btn'
						>
							<i className='fa fa-refresh fa-2x orange'></i>
						</div>
					</div>
				</div>
				<h6 className='white mt-20'>
					Ahorro Estimado: {fromCurrency === 'Soles' ? ' $ ' : ' S/. '}
					{fromCurrency === 'Soles'
						? parseFloat((data.savingsVenta * fromAmount) / data.soles).toFixed(
								2
						  )
						: parseFloat(data.savingsCompra * fromAmount).toFixed(2)}
				</h6>

				<a
					className='btn btn-mod btn-color btn-large btn-circle'
					onClick={handleRedirect}
				>
					Iniciar operación
				</a>

				<style jsx>
					{`
						input[type='number']::-webkit-inner-spin-button,
						input[type='number']::-webkit-outer-spin-button {
							-webkit-appearance: none;
							-moz-appearance: none;
							appearance: none;
							margin: 0;
						}
						@media only screen and (max-width: 480px) {
							.cambio-moneda {
								height: 68px;
							}
							.cambio-btn {
								height: 68px;
							}
						}
					`}
				</style>
			</div>
		</div>
	);
};

export default Convertor;
