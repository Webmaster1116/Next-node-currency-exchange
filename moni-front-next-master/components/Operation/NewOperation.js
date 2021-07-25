import React, { useState, useEffect, useContext } from 'react';
import Convertor from '../Convertor/Convertor';
import Cookies from 'js-cookie';
import ProfileView from './ProfileView2';
import AlertContext from '../../context/alert/alertContext';
import getAvailAgent from '../genericFunctions/getAvailAgent';
import getBankDetails from '../genericFunctions/getBankDetails';
import getAgentData from '../genericFunctions/getAgentData';
import getAgentAccounts from '../genericFunctions/getAgentAccounts';
import { useRouter } from 'next/router';
import postOperation from '../genericFunctions/postOperation';
import getProfile from '../genericFunctions/getProfile';
import sendMail from '../genericFunctions/sendMail';
import BankList from '../../Data/BankList';
import Alert from '../Alerts';
import Axios from 'axios';
import BankPopup from './BankPopup';

const getCompra = async () => {
	const res = await Axios.get(
		'https://api.moni.pe/api/exchange/calculate?originCurrency=USD&destinationCurrency=PEN&amount=1'
	);
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

const NewOperation = props => {
	const Router = useRouter();
	const {
		originAmount,
		destinationAmount,
		originCurrency,
		destinationCurrency,
		alert,
		currencyType,
	} = Router.query;
	const [data13, setData] = useState({
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
	const init5 = async () => {
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
		init5();
		// console.log(data13, 'body');
	}, []);
	const [showTransactionField, setShowTransactionField] = useState(false);
	const alertContext = useContext(AlertContext);
	const { setAlert, alerts } = alertContext;
	const [exchangeRate, setExchangeRate] = useState(data13.soles); // data13.bpi.USD.rate_float
	const [fromCurrency, setFromCurrency] = useState(originCurrency || 'Soles');
	const [toCurrency, setToCurrency] = useState(
		destinationCurrency || 'Dollars'
	);
	const [amount, setAmount] = useState(originAmount || 1);
	const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
	const [banks, setBanks] = useState([]);
	const [selectedBank, setSelectedBank] = useState('');
	const [receiveBank, setReceiveBank] = useState('');
	const [isBankSelected, setIsBankSelected] = useState(false);
	const [token, setToken] = useState(Cookies.get('token'));
	const [step, setStep] = useState('1');
	const [noBanks, setNoBanks] = useState(false);
	const [stepTitle, setStepTitle] = useState('Iniciar una nueva operación');
	const stepData = [
		'Iniciar una nueva operación',
		'Confirmar detalles del perfil',
		'Confirme los detalles de su transacción',
	];
	const [isagentAvail, setIsAgentAvail] = useState(false);
	const [agent, setAgent] = useState('');
	const [agentProfile, setAgentProfile] = useState('');
	const [agentBanks, setAgentBanks] = useState('');
	const [loading, setLoading] = useState(false);
	const [commissionType, setCommissionType] = useState('Soles');
	const [commissionValue, setCommissionValue] = useState(0);
	const [operationNumber, setOperationNumber] = useState('');
	const [agentLoader, setAgentLoader] = useState(false);
	const [showBankList, setShowBankList] = useState(false);
	const [showBankList2, setShowBankList2] = useState(false);
	const [agentBank, setAgentBank] = useState('');
	const [userUpload, setUserUpload] = useState('');
	const [selectField, setSelectField] = useState(false);
	const [checkSelect, setCheckSelect] = useState(false);
	const [fileName, setFileName] = useState('Ningún archivo cargado');
	const [bankPopup, setBankPopup] = useState(false);
	const [currencyCheck, setCurrencyCheck] = useState(false);

	// function removeDuplicates(originalArray, prop) {
	//   var newArray = [];
	//   var lookupObject = {};

	//   for (var i in originalArray) {
	//     lookupObject[originalArray[i][prop]] = originalArray[i];
	//   }

	//   for (i in lookupObject) {
	//     newArray.push(lookupObject[i]);
	//   }
	//   return newArray;
	// }
	const init = async () => {
		try {
			let bank = await getBankDetails(token);

			if (bank.length === 0) {
				setNoBanks(true);
				window.location.href = '/bank';
			}
			// bank = removeDuplicates(bank, "bankName");
			// console.log(bank, 'BBB');
			setBanks(bank);
			if (receiveBank !== '' && receiveBank.currency !== toCurrency) {
				// console.log(toCurrency, receiveBank.currency);
				window.location.href = '/operation?alert=2&currencyType=' + toCurrency;
			}
			if (selectedBank === undefined || selectedBank === '') {
				setSelectedBank(BankList[0]);
			}
			//   setReceiveBank(bank[0]);
			const getAgentList = await getAvailAgent(token);
			const getAgent = getAgentList.filter(
				agent1 => agent1.online === true && agent1.enable === true
			);
			// console.log('agents', getAgent);
			if (getAgent.length !== 0) {
				// console.log('no of available', getAgent.length);
				for (let index = 0; index < getAgent.length; index++) {
					setAgent(getAgent[index]);
					// console.log(index, 'index');
					const agentPro = await getAgentData(token, getAgent[index]._id);
					// console.log(agentPro);
					setAgentProfile(agentPro);
					const agentAcc = await getAgentAccounts(token, getAgent[index]._id);
					// console.log(agentAcc);
					const acc1 = agentAcc.filter(
						acc =>
							acc.bankName === selectedBank.name &&
							acc.currency === fromCurrency &&
							acc.balance
					);

					// console.log(selectedBank.short, 'sel');
					// console.log(acc1);
					if (acc1.length !== 0) {
						setAgentBanks(acc1);
						setAgentBank(acc1[0]);
						// console.log(acc1, 'agent avail');
						setIsAgentAvail(true);
						break;
					}
				}
			} else {
				setIsAgentAvail(false);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (alert == 3) {
			setAlert('Algo salió mal. La operacion no pudo ser completada', 'danger');
		}
		if (alert == 2) {
			setAlert(
				'Agregue una cuenta bancaria de ' +
					currencyType +
					' o seleccione un banco de ' +
					currencyType,
				'danger'
			);
		}
		init();
	}, []);
	useEffect(() => {
		if (fromCurrency == 'Dollars' && toCurrency == 'Soles') {
			setExchangeRate(data13.soles);
		}
		if (fromCurrency == 'Dollars' && toCurrency == 'Bitcoin') {
			setExchangeRate(1 / data13.bpi.USD.rate_float);
		}
		if (fromCurrency == 'Dollars' && toCurrency == 'Dollars') {
			setExchangeRate(1);
		}
		if (fromCurrency == 'Soles' && toCurrency == 'Soles') {
			setExchangeRate(1);
		}
		if (fromCurrency == 'Soles' && toCurrency == 'Bitcoin') {
			setExchangeRate((1 / data13.bpi.USD.rate_float) * (1 / data13.soles));
		}
		if (fromCurrency == 'Soles' && toCurrency == 'Dollars') {
			setExchangeRate(1 / data13.usd);
		}
		if (fromCurrency == 'Bitcoin' && toCurrency == 'Soles') {
			setExchangeRate(data13.soles * data13.bpi.USD.rate_float);
		}
		if (fromCurrency == 'Bitcoin' && toCurrency == 'Bitcoin') {
			setExchangeRate(1);
		}
		if (fromCurrency == 'Bitcoin' && toCurrency == 'Dollars') {
			setExchangeRate(data13.bpi.USD.rate_float);
		}
	}, [fromCurrency, toCurrency]);

	let toAmount, fromAmount;
	if (amountInFromCurrency) {
		fromAmount = amount;
		toAmount = Math.floor(amount * exchangeRate * 100) / 100;
	} else {
		toAmount = amount;
		fromAmount = Math.floor((amount / exchangeRate) * 100) / 100;
	}

	function handleFromAmountChange(e) {
		// const re = /^[0-9\b]+$/;
		const re = /^[+-]?([0-9]+(\.\d{0,2})?|[.][0-9]+)$/;
		if (e.target.value === '' || re.test(e.target.value)) {
			setAmount(e.target.value);
			setCommissionValue(e.target.value * 0.0006);
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

	const handleStep = async e => {
		e.preventDefault();
		if (e.target.name === '2') {
			// console.log('second step called');
			setAgentLoader(true);
		}
		setStep(e.target.name);
		setStepTitle(stepData[e.target.name - 1]);
		await init();
		setAgentLoader(false);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		// if (fileName === "El tamaño del archivo excede") {
		// } else {

		setLoading(true);
		const profile = await getProfile(token);
		let savings =
			fromCurrency === 'Dollars'
				? parseFloat(data13.savingsCompra * fromAmount).toFixed(2)
				: parseFloat(data13.savingsVenta * fromAmount).toFixed(2);
		let exchange =
			fromCurrency === 'Dollars'
				? parseFloat(data13.soles).toFixed(2)
				: parseFloat(data13.usd).toFixed(2);
		try {
			const res = await postOperation(
				token,
				profile,
				receiveBank,
				fromAmount,
				toAmount,
				fromCurrency,
				toCurrency,
				agent,
				commissionValue,
				commissionType,
				operationNumber,
				agentBank,
				savings,
				exchange,
				selectedBank.name,
				userUpload
			);

			if (res.data) {
				const transaction = {
					fromAmount,
					toAmount,
					fromCurrency,
					toCurrency,
				};
				const id = res.data._id;
				const { agentEmail } = res.data;
				// console.log('pro', token, profile, selectedBank, transaction);

				await sendMail(token, profile.email, 'new', {
					id,
					profileDetails: profile,
					bankDetails: { selectedBank, receiveBank },
					transaction: { fromAmount, toAmount, fromCurrency, toCurrency },
					agent,
					agentBank: agentBanks[0],
					agentEmail,
				});
				// console.log(savings, exchange, 'e');
				// console.log(res.data, 'res');

				window.location.href = '/history';
			} else window.location.href = '/operation?alert=3';
		} catch (error) {
			// console.log(error);
			window.location.href = '/operation?alert=3';
		}
	};

	if (loading === true) {
		return (
			<div className='page-loader'>
				<div className='loader'>Cargando...</div>
			</div>
		);
	}

	return (
		<>
			<div className='page' id='top'>
				<section className='page-section bg-gray pb-10  pt-70'>
					<div className='relative container align-left'>
						<div className='row'>
							<div className='col-md-8'>
								<h3 className='paso mt-30 mb-20'>
									Paso {step}/3: <strong>{stepTitle}</strong>
								</h3>
							</div>
						</div>
					</div>
				</section>
				<section className='page-section pt-10 min-section'>
					<form className='form-normal'>
						<div className='container align-left'>
							<div className='col-md-9 col-xs-12 padding0'>
								<div
									className='tab-content tpl-minimal-tabs-cont align-left section-text'
									style={{ height: 'auto' }}
								>
									{bankPopup ? (
										<BankPopup
											setBankPopup={setBankPopup}
											bankCurrency={receiveBank.currency}
											toCurrency={toCurrency}
											fromCurrency={fromCurrency}
										/>
									) : (
										''
									)}
									<div className='tab-pane fade active in' id='mini-one'>
										<div className='col-md-6 col-xs-12 padding0'>
											<h5 className='black bold mb-10'>
												¿Desde qué banco nos envías tu dinero?
											</h5>
											<>
												<div>
													<button
														className='input-sm btn btn-border-w btn-input'
														onClick={e => {
															e.preventDefault();
															// console.log(e.target.value);
															setShowBankList(!showBankList);
														}}
													>
														{selectedBank.name}
														<i
															style={{
																position: 'absolute',
																right: '10%',
																paddingTop: '2px',
															}}
															className='fa fa-chevron-down orange'
														></i>
													</button>
													{showBankList ? (
														<div className='li-cust'>
															{BankList.map((bank, index) => {
																return (
																	<React.Fragment key={index}>
																		<li
																			style={{ zIndex: '1000' }}
																			className='opt-custom'
																			onClick={e => {
																				e.preventDefault();
																				setSelectedBank(bank);
																				setShowBankList(!showBankList);
																			}}
																		>
																			{bank.name || ' '}
																		</li>
																	</React.Fragment>
																);
															})}
														</div>
													) : (
														''
													)}
												</div>
											</>
										</div>
										<div className='col-md-6 col-xs-12 padding0'>
											<h5 className='black bold mb-10'>
												¿En qué cuenta deseas recibir tu dinero?
											</h5>
											<>
												<div>
													<button
														className='input-sm btn btn-border-w btn-input'
														onClick={e => {
															e.preventDefault();
															// console.log(e.target.value);
															setShowBankList2(!showBankList2);
														}}
													>
														{receiveBank.nickname
															? receiveBank.nickname
															: 'ningún banco seleccionado'}

														<i
															style={{
																position: 'absolute',
																right: '10%',
																paddingTop: '2px',
															}}
															className='fa fa-chevron-down orange'
														></i>
													</button>
													{showBankList2 ? (
														<div className='li-cust'>
															{banks.map((bank, index) => {
																return (
																	<React.Fragment key={index}>
																		<li
																			style={{ zIndex: '1000' }}
																			className='opt-custom'
																			onClick={e => {
																				e.preventDefault();
																				bank.currency === toCurrency
																					? setCurrencyCheck(true)
																					: setCurrencyCheck(false);

																				setReceiveBank(bank);
																				setShowBankList2(!showBankList2);
																			}}
																		>
																			{bank.nickname || ' '}
																		</li>
																	</React.Fragment>
																);
															})}
														</div>
													) : (
														''
													)}
												</div>
											</>
										</div>
										<div className='col-md-12 col-xs-12 padding0 mt-10'>
											<hr className='gray' />
										</div>
										<div className='col-md-12 col-xs-12 padding0'>
											<h6 className='black mt-0'>
												Compra: <span className='bold'>{data13.soles}</span> -
												Venta: <span className='bold'>{data13.usd}</span>
											</h6>
											<div className='col-md-9 col-xs-7 bg-white cambio-form-normal'>
												<h6 className='align-left mb-0 mt-0 uppercase'>
													Envías
												</h6>
												<input
													type='number'
													name='name'
													id='name'
													value={fromAmount}
													className='input-md form-control-cambio bold'
													placeholder='0'
													maxLength='100'
													step='.01'
													onChange={handleFromAmountChange}
												/>
											</div>
											<div className='col-md-2 col-xs-3 cambio-moneda-normal white bold align-left'>
												{fromCurrency === 'Soles' ? 'Soles' : 'Dólares'}
											</div>
											<div className='col-md-1 col-xs-2 cambio-btn-normal align-right'>
												<button
													className='btn btn-icon'
													onClick={e => {
														e.preventDefault();
														if (fromCurrency === 'Soles') {
															setFromCurrency('Dollars');
															setCommissionType('Dollars');
														} else {
															setFromCurrency('Soles');
															setCommissionType('Soles');
														}
														if (toCurrency === 'Soles') {
															setToCurrency('Dollars');
														} else {
															setToCurrency('Soles');
														}
														toCurrency !== receiveBank.currency
															? setCurrencyCheck(true)
															: setCurrencyCheck(false);
													}}
												>
													<i className='fa fa-refresh fa-2x white'></i>
												</button>
											</div>
										</div>
										<div className='col-sm-12 col-xs-12 padding0 mt-20'>
											<div className='col-md-9 col-xs-7 bg-white cambio-form-normal'>
												<h6 className='align-left mb-0 mt-0 uppercase'>
													Recibes
												</h6>
												<input
													type='number'
													name='name'
													id='name'
													value={toAmount}
													className='input-md form-control-cambio bold'
													placeholder='0'
													maxLength='100'
													step='.01'
													onChange={handleToAmountChange}
												/>
											</div>
											<div className='col-md-2 col-xs-3 cambio-moneda-normal white bold align-left'>
												{toCurrency === 'Soles' ? 'Soles' : 'Dólares'}
											</div>
											<div className='col-md-1 col-xs-2 cambio-btn-normal align-right'>
												<button
													className='btn btn-icon'
													onClick={e => {
														e.preventDefault();

														if (toCurrency === 'Soles') {
															setToCurrency('Dollars');
														} else {
															setToCurrency('Soles');
														}
														if (fromCurrency === 'Soles') {
															setFromCurrency('Dollars');
															setCommissionType('Dollars');
														} else {
															setFromCurrency('Soles');
															setCommissionType('Soles');
														}
														toCurrency !== receiveBank.currency
															? setCurrencyCheck(true)
															: setCurrencyCheck(false);
													}}
												>
													<i className='fa fa-refresh fa-2x white'></i>
												</button>
											</div>
										</div>
										<div className='col-md-6 col-xs-6 align-left padding0 mb-0'>
											<h6 className='black mt-10 mb-0'>
												Ahorro estimado:{' '}
												<span className='bold'>
													{fromCurrency === 'Soles' ? ' $ ' : ' S/. '}
													{fromCurrency === 'Soles'
														? parseFloat(
																(data13.savingsVenta * fromAmount) /
																	data13.soles
														  ).toFixed(3)
														: parseFloat(
																data13.savingsCompra * fromAmount
														  ).toFixed(3)}
												</span>
											</h6>
										</div>
										<div className='col-md-6 col-xs-6 align-right padding0 mb-0'>
											<h6 className='black mt-10 mb-0'>
												Tipo de cambio usado:{' '}
												<span className='bold'>
													{fromCurrency === 'Dollars'
														? data13.soles.toFixed(2)
														: data13.usd.toFixed(2)}
												</span>
											</h6>
										</div>
										<div className='col-md-6 col-xs-12 padding0 mt-xs-20 mb-xs-20'></div>
										<div className='col-md-6 col-xs-12 padding0 mt-xs-20 mb-xs-20'>
											<a
												className='btn btn-mod btn-color btn-large btn-circle'
												// href=""
												href={currencyCheck ? '#mini-two' : ''}
												data-toggle='tab'
												name='2'
												aria-expanded='false'
												style={
													!noBanks && receiveBank !== ''
														? { display: 'block' }
														: { display: 'none' }
												}
												onClick={e => {
													// console.log('receive..', receiveBank);
													if (currencyCheck) {
														// console.log(receiveBank.currency, toCurrency);
														handleStep(e);
													} else {
														setBankPopup(true);
														setCurrencyCheck(false);
													}
												}}
											>
												Iniciar operación
											</a>
											<h4
												style={
													noBanks ? { display: 'block' } : { display: 'none' }
												}
											>
												No tienes una cuenta en DIVISA para este banco. Agregue
												uno y luego continúe
											</h4>
										</div>
									</div>

									<div className='tab-pane fade' id='mini-two'>
										<div className='col-md-12 padding0'>
											{/* <ProfileView /> */}
											<div className='row'>
												<div className='col-md-4'>
													<h4 className=''>Detalles de operation</h4>
													<h4 className='bold mb-0'> Banco origen:</h4>
													<h4>{selectedBank.short || ' '} </h4>
													<h4 className='bold mb-0'> Banco destino:</h4>
													<h4>{receiveBank.bankShort || ' '} </h4>
													<h4 className='bold mb-0'> Monto a enviar:</h4>
													<h4>
														{fromCurrency === 'Dollars' ? '$ ' : 'S./ '}{' '}
														{parseFloat(fromAmount).toFixed(2).toLocaleString()}
													</h4>
													<h4 className='bold mb-0'> Monto a Recibir: </h4>
													<h4>
														{toCurrency === 'Dollars' ? '$ ' : 'S./ '}{' '}
														{parseFloat(toAmount).toFixed(2).toLocaleString()}
													</h4>
													<h4 className='bold mb-0'> Tipo de cambio:</h4>{' '}
													<h4></h4>
													<h4>
														{fromCurrency === 'Dollars'
															? data13.soles
															: data13.usd}{' '}
													</h4>
												</div>

												<div className='col-md-8'>
													<h4>
														<p className='text-center'>
															Transfierce
															<span className='bold'>
																{' '}
																{fromCurrency === 'Dollars'
																	? '$ '
																	: 'S./ '}{' '}
																{parseFloat(fromAmount)
																	.toFixed(2)
																	.toLocaleString()}{' '}
																DESDE TU BANCA POR INTERNET
															</span>{' '}
															a la cuenta indicada a continuación
														</p>
													</h4>
													{agentLoader ? (
														// <div className="page-loader">
														<div
															style={{ marginTop: '20%' }}
															className='loader'
														>
															Cargando...
														</div>
													) : (
														// </div>
														<>
															{isagentAvail ? (
																<>
																	<div className='row'>
																		<div className='col-md-6'>
																			<h4 className='orange bold'>
																				{/* <i
                                  className="fa fa-university custom-icon"
                                  aria-hidden="true"
                                ></i> */}
																				Banco
																			</h4>

																			{agentBanks[0].bankName || ' '}
																		</div>
																		<div className='col-md-6'>
																			<h4 className='orange bold'>
																				{/* <i
                                  className="fa fa-money custom-icon"
                                  aria-hidden="true"
                                ></i> */}
																				Tipo de cuenta
																			</h4>
																			{agentBanks[0].type +
																				' ' +
																				agentBanks[0].currency}
																		</div>
																		<div className='col-md-6'>
																			<h4 className='orange bold'>
																				{/* <i
                                  className="fa fa-hashtag custom-icon"
                                  aria-hidden="true"
                                ></i> */}
																				Número de cuenta
																			</h4>
																			{agentBanks[0].accountNumber || ' '}
																		</div>
																		<div className='col-md-6'>
																			<h4 className='orange bold'>
																				{/* <i
                                  className="fa fa-map-marker custom-icon"
                                  aria-hidden="true"
                                ></i> */}
																				Titular de la cuenta
																			</h4>
																			{agentBanks[0].bankUser || ' '}
																		</div>
																	</div>
																	<div
																		className='row'
																		style={{ marginTop: '5em' }}
																	>
																		<div className='col-md-6 col-xs-12 padding0 mt-xs-20 mb-xs-20 mt-30'>
																			<button
																				style={{
																					padding: '15px',
																					width: '100%',
																				}}
																				className='btn btn-mod btn-border-w btn-large btn-circle'
																				// id="submit_btn"
																				onClick={e => {
																					e.preventDefault();
																					window.location.reload();
																				}}
																			>
																				Cancelar Operación
																			</button>
																		</div>
																		<div className='col-md-6 col-xs-12 padding0 mt-xs-20 mb-xs-20 mt-30'>
																			<a
																				className='btn btn-mod btn-color btn-large btn-circle'
																				href='#mini-three'
																				data-toggle='tab'
																				name='3'
																				aria-expanded='false'
																				style={
																					isagentAvail
																						? {
																								display: 'block',
																								padding: '15px',
																								width: '100%',
																						  }
																						: { display: 'none' }
																				}
																				onClick={handleStep}
																			>
																				Siguiente
																			</a>
																		</div>
																	</div>
																</>
															) : (
																'Ningún agente disponible en este momento. Intenta nuevamente más tarde'
															)}
														</>
													)}
												</div>
											</div>
										</div>
									</div>
									<div
										className='tab-pane fade'
										id='mini-three'
										// style=""
									>
										{checkSelect ? (
											<h5 className='h-5 alert center text-center orange bold col-md-12'>
												*Seleccione un modo de verificación y complételo
											</h5>
										) : (
											<h5 className=' col-md-12'></h5>
										)}
										<div className='col-md-12 padding0'>
											<div className='final'>
												<>
													{isagentAvail ? (
														<>
															<div className='row'>
																<div className='col-md-4'>
																	<h4 className='mb-0'>
																		Detalles de operation
																	</h4>
																	<h4 className='bold mb-0'> Banco origen:</h4>
																	<h4>{selectedBank.short || ' '}</h4>
																	<h4 className='bold mb-0'>Banco destino:</h4>
																	<h4>{receiveBank.bankShort || ' '} </h4>
																	<h4 className='bold mb-0'>
																		{' '}
																		Monto a enviar:
																	</h4>
																	<h4>
																		{fromCurrency === 'Dollars' ? '$ ' : 'S./ '}{' '}
																		{parseFloat(fromAmount)
																			.toFixed(2)
																			.toLocaleString()}
																	</h4>
																	<h4 className='bold mb-0'>
																		{' '}
																		Monto a Recibir: 5
																	</h4>
																	<h4>
																		{toCurrency === 'Dollars' ? '$ ' : 'S./ '}{' '}
																		{parseFloat(toAmount)
																			.toFixed(2)
																			.toLocaleString()}
																	</h4>
																	<h4 className='bold mb-0'>
																		{' '}
																		Tipo de cambio:
																	</h4>{' '}
																	<h4></h4>
																	<h4>
																		{fromCurrency === 'Dollars'
																			? data13.soles
																			: data13.usd}
																		{/* {exchangeRate} */}
																	</h4>
																</div>
																<div className='col-md-8'>
																	<h4>
																		<span>
																			Luego de culminar la transferencia a la
																			cuenta de neustro agente,
																		</span>
																		<span>
																			necesitamos
																			<span className='bold'>
																				{' '}
																				verificar con el banco{' '}
																			</span>
																			para poder enviarte
																		</span>
																		{/* <p className="head-text-custom text-center"> */}{' '}
																		los
																		<span className='bold'>
																			{toCurrency === 'Dollars'
																				? ' $ '
																				: ' S/. '}
																			{parseFloat(toAmount)
																				.toFixed(2)
																				.toLocaleString()}
																		</span>{' '}
																		a tu cuenta
																		{/* </p> */}
																	</h4>
																	<h4
																		className='mt-30 bold'
																		style={{ marginTop: '80px' }}
																	>
																		<span>
																			Seleccione un método de verificación:
																		</span>
																	</h4>
																	<h4
																		className='mt-30'
																		style={{ marginTop: '40px' }}
																	>
																		<span>
																			<input
																				type='radio'
																				style={{ marginRight: '10px' }}
																				name='group1'
																				onClick={() => {
																					setSelectField('transactionNumber');
																					setUserUpload('');
																				}}
																			/>
																			Escribe el número de operacíon de tu
																			transferencia bancaria:
																			<input
																				style={{
																					marginLeft: '30px',
																					minWidth: '300px',
																				}}
																				className='custom-input w-100'
																				placeholder='Numero de operacíon XXXX'
																				value={operationNumber}
																				onChange={e => {
																					setOperationNumber(e.target.value);
																					setCheckSelect(false);
																				}}
																			/>
																		</span>
																		<br />
																		<span className='mt-30'>
																			<input
																				type='radio'
																				style={{ marginRight: '10px' }}
																				name='group1'
																				onClick={() => {
																					setOperationNumber('');
																					setSelectField('image');
																				}}
																			/>
																			Envianos una captura de pantalla:
																		</span>
																		{/* <div className="col-md-3"></div> */}
																		<div
																			className='col-md-12 col-xs-12 padding0 mt-xs-20 mb-xs-20 mt-10 ml-30'
																			style={{ marginLeft: '40px' }}
																		>
																			<div className='upload-btn-wrapper ml-30'>
																				<button className='btn btn-mod btn-border-w btn-medium btn-circle ml-30'>
																					Subir archivo
																				</button>
																				<input
																					className=''
																					type='file'
																					name='file'
																					accept='image/*'
																					placeholder='file upload'
																					onChange={async e => {
																						e.preventDefault();
																						setCheckSelect(false);
																						await setUserUpload(
																							event.target.files[0]
																						);
																						console.log(
																							'size:-',
																							event.target.files[0].size
																						);
																						event.target.files[0].size < 1000000
																							? setFileName('Archivo subido')
																							: setFileName(
																									'El tamaño del archivo excede'
																							  );
																						// console.log('File', userUpload);
																					}}
																				/>
																				<span>
																					<h5 className='orange bold mb-10'>
																						<span>{fileName}</span>
																					</h5>
																				</span>
																			</div>
																		</div>
																	</h4>
																</div>

																<div className='text-center'>
																	{/* <div className="col-md-4" /> */}
																	<div className='col-md-4 col-xs-12 padding0 mt-xs-20 mb-xs-20 mt-30'>
																		<button
																			style={{
																				padding: '15px',
																				width: '100%',
																			}}
																			className='btn btn-mod btn-border-w btn-large btn-circle'
																			onClick={e => {
																				e.preventDefault();
																				window.location.reload();
																			}}
																		>
																			Cancelar Operación
																		</button>
																	</div>
																	<div className='col-md-4 col-xs-12 padding0 mt-xs-20 mb-xs-20 mt-30'>
																		<button
																			style={{
																				padding: '15px',
																				width: '100%',
																			}}
																			className='btn btn-mod btn-color btn-large btn-circle'
																			onClick={e => {
																				e.preventDefault();
																				if (
																					selectField === 'image' &&
																					userUpload !== ''
																				) {
																					setLoading(true);
																					handleSubmit(e);
																				} else if (
																					selectField === 'transactionNumber' &&
																					operationNumber !== '' &&
																					operationNumber.length >= 6
																				) {
																					setLoading(true);
																					handleSubmit(e);
																				} else {
																					setCheckSelect(true);
																				}
																			}}
																		>
																			Iniciar Operación
																		</button>
																	</div>
																</div>
															</div>
														</>
													) : (
														<h4>
															El agente no está disponible ahora por favor
															intente nuevamente después de un tiempo
														</h4>
													)}
												</>
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-12'>{/* <hr className="gray" /> */}</div>
								{/* <div className="col-md-6 col-xs-12 padding0 mt-xs-20 mb-xs-20">
                  <button
                    className="btn btn-mod btn-color btn-large btn-circle"
                    id="submit_btn"
                  >
                    Iniciar operación
                  </button>
                </div> */}
							</div>
							<div className='col-md-3 col-xs-12 mb-xs-30'>
								<h5 className='orange bold mb-10'>
									<i className='fa fa-clock-o fa-2x orange'></i> Tiempo estimado
									de espera
								</h5>
								<h6 className='black mb-10'>
									<span className='bold'>- BCP e Interbank:</span> 20 Minutos
								</h6>
								<h6 className='morado bold mb-10'>
									(* Montos mayores USD $20,000 pueden demorar hasta 1 hora)
								</h6>
								<h6 className='black mb-20'>
									<span className='bold'>- Interbancario:</span> 24 horas día
									útil
								</h6>
								<h5 className='orange bold mb-10'>
									<i className='fa  fa-comments-o fa-2x orange'></i> Horario de
									atención
								</h5>
								<h6 className='black mb-10'>
									Lunes a Viernes de 9:00 am a 7:00 pm
									<br />
									Sábados de 11:00 am a 2:00 pm
								</h6>
							</div>
						</div>
					</form>
				</section>
				<style jsx>{`
					input[type='number']::-webkit-inner-spin-button,
					input[type='number']::-webkit-outer-spin-button {
						-webkit-appearance: none;
						-moz-appearance: none;
						appearance: none;
						margin: 0;
					}
					.custom-input {
						border: none;
						border-bottom: solid;
						border-size: 1px;
						border-width: 1px;
						margin-top: 20px;
						margin-bottom: 20px;
					}
					.custom-icon {
						color: white;
						background: black;
						padding: 5px;
						border-radius: 10px;
					}
					.section {
						background: white;
					}
					.min-section {
						min-height: 83vh;
						background: white;
						background-image: url('images/bkg-neutro.jpg');
						background-attachment: fixed;
						background-repeat: no-repeat;
						background-size: cover;
					}
					.btn-icon,
					.btn-icon:hover {
						background: transparent !important;
					}

					.final {
						display: block;
						position: relative;
						color: #777;
						text-decoration: none;
						padding: 14px 20px;
						// border-bottom: 1px solid #e5e5e5;
						-webkit-transition: all 0.27s cubic-bezier(0, 0, 0.58, 1);
						-moz-transition: all 0.27s cubic-bezier(0, 0, 0.58, 1);
						-o-transition: all 0.27s cubic-bezier(0, 0, 0.58, 1);
						-ms-transition: all 0.27s cubic-bezier(0, 0, 0.58, 1);
						transition: all 0.27s cubic-bezier(0, 0, 0.58, 1);
						color: #333;
						font-size: 22px;
						font-weight: 600;
					}

					.custom-mt {
						margin-top: 20px !important;
					}

					.opt-custom {
						color: black !important;
						list-decoration: none;
						// background: white !important;
						list-style-type: none;
						padding: 5px;
						padding-left: 25px;
						padding-right: 13px;
					}

					.opt-custom:hover {
						background: orange !important;
						color: white !important;
						padding-top: 2px;
					}

					.li-cust {
						position: absolute;
						z-index: 1000;
						border-color: orange;
						border-style: solid;
						border-radius: 15px;
						border-top-left-radius: 10px;
						border-top-right-radius: 10px;
						padding-top: 7px;
						padding-bottom: 7px;
						background: white;
						border-width: 2px;
						min-width: 100px;
						// margin-left: 45px;
						width: 100%;
						// height: 50px;
						// padding-left: 25px;
						// padding-right: 13px;
						cursor: pointer;
					}

					.btn-input {
						width: 100%;
						height: 50px;
						padding-left: 25px;
						padding-right: 13px;
						font-size: 15px;
						border-radius: 45px;
						color: #333;
						border: 2px solid #e55729;
						border-top-color: rgb(229, 87, 41);
						border-right-color: rgb(229, 87, 41);
						border-bottom-color: rgb(229, 87, 41);
						border-left-color: rgb(229, 87, 41);
						border-top-color: rgb(229, 87, 41);
						border-right-color: rgb(229, 87, 41);
						border-bottom-color: rgb(229, 87, 41);
						border-left-color: rgb(229, 87, 41);
						text-transform: none;
						background: transparent;
						text-align: start;
						outline: none !important;
					}

					select option:hover {
						background: orange !important;
						color: white !important;
					}

					.upload-btn-wrapper {
						position: relative;
						overflow: hidden;
						display: inline-block;
					}

					.upload-btn-wrapper input[type='file'] {
						font-size: 100px;
						position: absolute;
						left: 0;
						top: 0;
						opacity: 0;
					}

					.head-text-custom {
						// width: 100%;
						text-align: center;
						dislay: inline;
						margin: 0px;
						padding: 0px;
						float: right;
						width: 70%;
						text-align: start;
					}

					.alert {
						margin: 0;
						padding: 10px;
					}

					input[type='number']::-webkit-inner-spin-button,
					input[type='number']::-webkit-outer-spin-button {
						-webkit-appearance: none;
						-moz-appearance: none;
						appearance: none;
						margin: 0;
					}

					@media only screen and (max-width: 480px) {
						.cambio-moneda-normal {
							height: 78px;
						}
						.cambio-btn-normal {
							height: 78px;
						}
					}
				`}</style>
			</div>
		</>
	);
};

export default NewOperation;
