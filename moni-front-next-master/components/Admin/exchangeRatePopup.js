import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import putExchange from '../genericFunctions/putExchange';
import Cookies from 'js-cookie';

const getExchangeRates = async () => {
	const header = {
		headers: {
			'x-auth-token': Cookies.get('adminToken'),
		},
	};
	const res = await Axios.get('https://api.moni.pe/api/exchange', header);
	return res.data;
};

const EchangeRatePopup = props => {
	const [current, setCurrent] = useState('');
	const [margintop, setMargintop] = useState(`${window.scrollY + 30}px`);
	const [values, setValues] = useState('');
	const [id, setId] = useState('');
	const [compra, setCompra] = useState('');
	const [venta, setVenta] = useState('');
	const [acomoCheck, setAcomoCheck] = useState(false);
	const [manualCheck, setManualCheck] = useState(false);
	const [cambixCheck, setCambixCheck] = useState(false);
	const [paraleloCheck, setParaleloCheck] = useState(false);
	const [bcpCheck, setBcpCheck] = useState(false);
	const [sunatCheck, setSunatCheck] = useState(false);
	const [actualCheck, setActualCheck] = useState(true);

	const listenScrollEvent = e => {
		if (window.scrollY > 50) {
			setMargintop(`${window.scrollY + 50}px`);
		} else {
			setMargintop(`${window.scrollY + 50}px`);
		}
	};

	const init = async () => {
		const data = await getExchangeRates();
		setValues(data);
		setId(data._id);
	};

	useEffect(() => {
		window.addEventListener('scroll', listenScrollEvent);
		init();
	}, []);

	useEffect(() => {
		console.log(compra, venta, 'val');
	}, [compra, venta]);

	const handleChange = async e => {
		e.preventDefault();

		props.setExchangeModal(false);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		const res = await putExchange(id, compra, venta);
		window.location.reload();
	};

	const handleCheckBox = (e, name, value) => {
		e.preventDefault();
	};

	if (values === '') {
		return <div className='div-custom shadow-custom round container'></div>;
	}

	return (
		<div className='div-custom shadow-custom round container'>
			<div>
				<button
					className='btn btn-custom'
					onClick={e => {
						props.setExchangeModal(false);
					}}
				>
					<i
						style={{ position: 'absolute', right: '5%' }}
						className='fa fa-times'
					></i>
				</button>
			</div>
			<h3>Tipo de Cambio</h3>
			<div className='row mt-3'>
				<div className='col-md-1' />
				<div className='col-md-1'>
					<div className='text-center'>
						<div style={{ textAlign: 'start' }}>
							<h4>-</h4>
							<h4>
								<input
									type='checkbox'
									checked={actualCheck}
									onChange={() => {
										setActualCheck(true);
										setAcomoCheck(false);
										setBcpCheck(false);
										setCambixCheck(false);
										setParaleloCheck(false);
										setSunatCheck(false);
										setManualCheck(false);
										setCompra(values.current.compra);
										setVenta(values.current.venta);
									}}
								/>
							</h4>
							<h4>
								<input
									type='checkbox'
									checked={acomoCheck}
									onChange={() => {
										setAcomoCheck(true);
										setActualCheck(false);
										setBcpCheck(false);
										setCambixCheck(false);
										setParaleloCheck(false);
										setSunatCheck(false);
										setManualCheck(false);
										setCompra(values.acomo.compra);
										setVenta(values.acomo.venta);
									}}
								/>
							</h4>
							<h4>
								<input
									type='checkbox'
									checked={bcpCheck}
									onChange={() => {
										setAcomoCheck(false);
										setActualCheck(false);
										setBcpCheck(true);
										setCambixCheck(false);
										setParaleloCheck(false);
										setSunatCheck(false);
										setManualCheck(false);
										setCompra(values.bcp.compra);
										setVenta(values.bcp.venta);
									}}
								/>
							</h4>
							<h4>
								<input
									type='checkbox'
									checked={cambixCheck}
									onChange={() => {
										setAcomoCheck(false);
										setBcpCheck(false);
										setActualCheck(false);
										setCambixCheck(true);
										setParaleloCheck(false);
										setSunatCheck(false);
										setManualCheck(false);
										setCompra(values.cambix.compra);
										setVenta(values.cambix.venta);
									}}
								/>
							</h4>
							<h4>
								<input
									type='checkbox'
									checked={paraleloCheck}
									onChange={() => {
										setAcomoCheck(false);
										setBcpCheck(false);
										setCambixCheck(false);
										setActualCheck(false);
										setParaleloCheck(true);
										setSunatCheck(false);
										setManualCheck(false);
										setCompra(values.paralelo.compra);
										setVenta(values.paralelo.venta);
									}}
								/>
							</h4>
							<h4>
								<input
									type='checkbox'
									checked={sunatCheck}
									onChange={() => {
										setAcomoCheck(false);
										setBcpCheck(false);
										setCambixCheck(false);
										setActualCheck(false);
										setParaleloCheck(false);
										setSunatCheck(true);
										setManualCheck(false);
										setCompra(values.sunat.compra);
										setVenta(values.sunat.venta);
									}}
								/>
							</h4>
							<h4>
								<input
									type='checkbox'
									checked={manualCheck}
									onChange={() => {
										setAcomoCheck(false);
										setBcpCheck(false);
										setActualCheck(false);
										setCambixCheck(false);
										setParaleloCheck(false);
										setSunatCheck(false);
										setManualCheck(true);
										setCompra(values.current.compra);
										setVenta(values.current.venta);
									}}
								/>
							</h4>
						</div>
					</div>
				</div>
				<div className='col-md-3'>
					<div className='text-center'>
						<div style={{ textAlign: 'start' }}>
							<strong>
								<h4 className='titl'>Banco</h4>
							</strong>
							<h4>​Actual</h4>
							<h4>​Acomo</h4>
							<h4>BCP</h4>
							<h4>Cambix</h4>
							{/* <h4>​DollarHouse​</h4> */}
							<h4>Paralelo</h4>
							<h4>Sunat</h4>
							<h4>Manual</h4>
						</div>
					</div>
				</div>
				<div className='col-md-1 text-center'>
					<h4>:</h4>
					<h4>:</h4>
					<h4>:</h4>
					<h4>:</h4>
					<h4>:</h4>
					<h4>:</h4>
					<h4>:</h4>
					<h4>:</h4>
				</div>
				<div className='col-md-3'>
					<div className='text-center'>
						<div style={{ textAlign: 'start' }}>
							<strong>
								<h4 className='titl'>Compra</h4>
							</strong>
							<h4>{values.current.compra}</h4>
							<h4>{values.acomo.compra}</h4>
							<h4>{values.bcp.compra}</h4>
							<h4>{values.cambix.compra}</h4>

							{/* <h4>{values.dollarHouse.compra}</h4> */}
							<h4>{values.paralelo.compra}</h4>
							<h4>{values.sunat.compra}</h4>

							<input
								className='input-cust'
								type='number'
								onChange={e => {
									setCompra(e.target.value);
									setAcomoCheck(false);
									setBcpCheck(false);
									setCambixCheck(false);
									setParaleloCheck(false);
									setSunatCheck(false);
									setManualCheck(true);
								}}
							/>
						</div>
					</div>
				</div>
				<div className='col-md-3'>
					<div className='text-center'>
						<div style={{ textAlign: 'start' }}>
							<strong>
								<h4 className='titl'>Venta</h4>
							</strong>
							{/* <h4>{values.current.venta}</h4> */}
							<h4>{values.current.venta}</h4>
							<h4>{values.acomo.venta}</h4>
							<h4>{values.bcp.venta}</h4>
							<h4>{values.cambix.venta}</h4>

							{/* <h4>{values.dollarHouse.venta}</h4> */}
							<h4>{values.paralelo.venta}</h4>
							<h4>{values.sunat.venta}</h4>

							<input
								className='input-cust'
								type='number'
								onChange={e => {
									setVenta(e.target.value);
									setAcomoCheck(false);
									setBcpCheck(false);
									setCambixCheck(false);
									setParaleloCheck(false);
									setSunatCheck(false);
									setManualCheck(true);
								}}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className=' vetical-center text-center'>
				<button
					className='mt-2 btn btn-mod btn-border-w btn-medium btn-circle bold text-center'
					onClick={handleSubmit}
				>
					Actualizar
				</button>
				{/* <Button variant="primary">Save changes</Button> */}
			</div>
			<style jsx>{`
				.div-custom {
					z-index: 99999999999 !important;
					min-height: 60vh;
					min-width: 40vw;
					max-height: 850px;
					max-width: 500px;
					border-radius: 25px;
					position: absolute;
					margin-left: auto;
					margin-right: auto;
					top: ${margintop};
					left: 0;
					right: 0;
					text-align: center;
					border: 1px solid black;
					background: white;
					padding: 1em;
				}
				p {
					margin: 2px;
				}
				.mr-4 {
					margin-right: 5px;
				}
				.pt-0 {
					padding-top: 6px !important;
					padding-bottom: 5px !important;
				}
				.mt-2 {
					margin-top: 3em;
				}
				.shadow-custom {
					box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.12) !important;
					border-radius: 25px !important;
				}
				.input-cust {
					border: none;
					border-bottom: solid;
					border-width: 1px;
					width: 70px;
				}
				.btn-custom {
					background: transparent;
				}
				.titl {
					font-weight: 800;
				}

				.vertical-center {
					margin: 0;
					position: absolute;
					top: 50%;
					-ms-transform: translateY(-50%);
					transform: translateY(-50%);
				}
			`}</style>
		</div>
	);
};

export default EchangeRatePopup;
