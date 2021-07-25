import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const ViewPopup = props => {
	const [margintop, setMargintop] = useState(`${window.scrollY + 30}px`);
	const [agentTransactionNumber, setAgentTransactionNumber] = useState('');
	const [showImg, setShowImg] = useState(false);
	const [imgSrc, setImgSrc] = useState('');
	const [loader, setLoader] = useState(false);

	let status = false;
	if (props.data.transaction.status === 'Pago pendiente') {
		status = 'Pago realizado';
	}
	// console.log('data', props.data.transaction.amountToPay.toLocaleString());

	const listenScrollEvent = e => {
		if (window.scrollY > 50) {
			setMargintop(`${window.scrollY + 50}px`);
		} else {
			setMargintop(`${window.scrollY + 50}px`);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', listenScrollEvent);
	}, []);

	const handleChange = async e => {
		e.preventDefault();
		if (status !== false) {
			await changeStatus(
				props.token,
				props.data._id,
				props.data.transaction,
				status,
				agentTransactionNumber
			);
			await props.handleRefresh();
		}
		props.setViewModal(false);
	};

	const handleViewImage = async e => {
		setShowImg(true);
	};

	return (
		<div className='div-custom shadow-custom round container'>
			{showImg ? (
				<>
					<button
						className='btn btn-custom'
						onClick={e => {
							setShowImg(false);
						}}
					>
						<i
							style={{ position: 'absolute', right: '5%', top: '5%' }}
							className='fa fa-times'
						></i>
					</button>

					<img
						src={'https://api.moni.pe/api/operations/photo/' + props.data._id}
					/>
				</>
			) : (
				<>
					<div>
						<button
							className='btn btn-custom'
							onClick={e => {
								props.setViewModal(false);
							}}
						>
							<i
								style={{ position: 'absolute', right: '5%' }}
								className='fa fa-times'
							></i>
						</button>
					</div>
					<h3 className='text-center'>
						<span className='orange'>
							Estado de la transaccion: {props.data.transaction.status}
						</span>
						<br />
						<span className=''>
							{props.data.transaction.currencyFrom === 'Dollars'
								? 'USD'
								: props.data.transaction.currencyFrom}
							{'-'}
							{props.data.transaction.currencyTo === 'Dollars'
								? 'USD'
								: props.data.transaction.currencyTo}
						</span>
					</h3>
					<div className='row'>
						<div className='col-md-1' />
						<div className='col-md-5'>
							<div className='text-center'>
								<div style={{ textAlign: 'start' }}>
									<p>El dinero lo recibes en</p>
									<p>Numero de cuenta bancaria</p>
									<p>Monto</p>

									{props.data.transactionNumber.length > 6 ? (
										<p>Numero de Operacion</p>
									) : (
										<p>Screenshoot</p>
									)}
								</div>
							</div>
						</div>
						<div className='col-md-1 text-center'>
							<p>:</p>
							<p>:</p>
							<p>:</p>
							<p>:</p>
						</div>
						<div className='col-md-5'>
							<div className='text-center'>
								<div style={{ textAlign: 'start' }}>
									<span>{props.data.agentBank.bankName || '-'}</span>
									<p>{props.data.agentBank.accountNumber || '-'}</p>
									<p>
										{parseFloat(
											props.data.transaction.amountToPay
										).toLocaleString(undefined, {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										}) || '-'}
									</p>
									{/* <p>{props.data.transactionNumber || "-"}</p> */}
									{props.data.transactionNumber.length >= 6 ? (
										<p>{props.data.transactionNumber || '-'}</p>
									) : (
										<p>
											<button
												onClick={e => handleViewImage(e)}
												className='btn btn-img'
											>
												Ver imagen
											</button>
										</p>
									)}
									{/* <p>
                    <button
                      onClick={(e) => handleViewImage(e)}
                      className="btn btn-img"
                    >
                      Ver imagen
                    </button>
                  </p> */}
								</div>
							</div>
						</div>
					</div>

					<h4 className='text-center bold'>
						<span>Despues de verificar que el cliente a despositado</span>
						<br />
						<span>en tu cuenta debes enviar el dinero al cliente</span>
					</h4>

					<div className='row'>
						<div className='col-md-1' />
						<div className='col-md-5'>
							<div className='text-center'>
								<div style={{ textAlign: 'start' }}>
									<p>El dinero lo recibes en</p>
									<p>Numero de cuenta bancaria</p>
									<p>Monto</p>
									{/* <p>Numero de Operacion</p> */}
								</div>
							</div>
						</div>
						<div
							className='col-md-1 text-center'
							style={{ marginLeft: '0px', marginRight: '0px' }}
						>
							<p>:</p>
							<p>:</p>
							<p>:</p>
							{/* <p>:</p> */}
						</div>
						<div className='col-md-5'>
							<div className='text-center'>
								<div style={{ textAlign: 'start' }}>
									<span>{props.data.bankDetails.bankName || '-'}</span>

									<p>{props.data.bankDetails.accountNumber || '-'}</p>
									<p>
										{props.data.transaction.amountReceive.toLocaleString(
											undefined,
											{
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											}
										) || '-'}
									</p>
									{/* <p>
                <input
                  className="input-cust"
                  placeholder="XXXX"
                  value={agentTransactionNumber}
                  onChange={(e) => setAgentTransactionNumber(e.target.value)}
                />
              </p> */}
								</div>
							</div>
						</div>
					</div>

					<div className='text-center'>
						<button
							className='mt-2 btn btn-mod btn-border-w btn-medium btn-circle bold'
							onClick={e => handleChange(e)}
						>
							Confirmar detalles
						</button>
						{/* <Button variant="primary">Save changes</Button> */}
					</div>
				</>
			)}

			<style jsx>{`
				.div-custom {
					max-width: 650px;
					position: absolute;
					top: ${margintop};
					z-index: 9999999999 !important;
					left: 40%;
					background: white;
					padding: 3em;
					margin-left: -150px;
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
				}
				.btn-custom {
					background: transparent;
				}
				.btn-img {
					background: transparent;
					margin: 0px;
					padding: 0px;
				}
				span {
					margin: 2px;
				}

				p,
				span {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			`}</style>
		</div>
	);
};

const changeStatus = async (
	token,
	id,
	transaction,
	status,
	agentTransactionNumber
) => {
	const body = {
		transaction: { ...transaction, status, agentTransactionNumber },
	};

	// console.log('change....', body, id);
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
	// console.log(res);
	return res.data;
};

export default ViewPopup;
