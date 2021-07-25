import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../../context/AdminContext';
import { confirmAlert } from 'react-confirm-alert';
import TopNavbar from './topNavbar';
import Cookies from 'js-cookie';
import AlertContext from '../../context/alert/alertContext';
import sendMail from '../genericFunctions/sendMail';
import getProfile from '../genericFunctions/getProfile';
import ViewPopup from './viewPopup';
import EditPopup from './editPopup';
import ExchangeModal from './exchangeRatePopup';
import DeletePopup from './deletePopup';
import moment from 'moment';

const getData = async token => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	const data = await Axios.get('https://api.moni.pe/api/agent/auth', header);
	return data.data;
};

const getUserCount = async token => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	const data = await Axios.get('https://api.moni.pe/api/users/count', header);
	return data.data;
};

const agentStatusChange = async (token, id, status) => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	const stat = status ? 'online' : 'offline';
	const url = 'https://api.moni.pe/api/agent/' + stat + '/' + id;
	const data = await Axios.get(url, header);
	return data.data;
};

const dashboard = props => {
	const context = useContext(UserContext);
	const [state, setState] = useState([]);
	const alertContext = useContext(AlertContext);
	const { setAlert, alerts } = alertContext;
	const [details, setDetails] = useState('');
	const token = Cookies.get('adminToken');
	const token2 = Cookies.get('agentToken');
	const [viewModal, setViewModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [exchangeModal, setExchangeModal] = useState(false);
	const [selected, setSelected] = useState('');
	const [userCount, setUserCount] = useState(100);
	const [transactionCount, setTransactionCount] = useState(100);
	const [agentColor, setAgentColor] = useState('red');
	const [agentStatus, setAgentStatus] = useState(false);
	const [agentId, setAgentId] = useState('');
	const [agentBtnName, setAgentBtnName] = useState('desconectado');
	const [width, setWidth] = useState(0);
	const [agentEnable, setAgentEnable] = useState('');
	const [admin, setAdmin] = useState(false);
	const [topbar, setTopBar] = useState({ display: 'none', marginTop: '30px' });
	const [comissionDollars, setComissionDollars] = useState(0);
	const [comissionSoles, setComissionSoles] = useState(0);
	const [totalComm, setTotalComm] = useState(0);
	const [totalCommSoles, setTotalCommSoles] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const init = async () => {
		if (token !== undefined || token2 !== undefined) {
			if (token2 === undefined) {
				try {
					setLoading(true);
					const data = await get_all_transactions(
						Cookies.get('adminToken'),
						page,
						limit
					);
					const users = await getUserCount(Cookies.get('adminToken'));

					setUserCount(users);
					setAdmin(true);
					setState(data);
					const comm = await get_admin_commission(Cookies.get('adminToken'));
					setTransactionCount(data.length);
					setTotalComm(comm.dollar);
					setTotalCommSoles(comm.soles);
					setLoading(false);
				} catch (error) {
					console.log(error);
					setAlert('Algo salió mal', 'danger');
					// const res = Cookies.remove("adminToken");
					// const res2 = Cookies.remove("agentToken");
					// window.location.href = "/admin_login";
				}
			} else {
				try {
					setLoading(true);
					const users = await getUserCount(Cookies.get('agentToken'));

					setUserCount(users);
					const agentData = await getData(Cookies.get('agentToken'));
					const agentid = agentData._id;
					const data = await get_agent_transactions(
						Cookies.get('agentToken'),
						agentData._id,
						page,
						limit
					);

					const comm = await get_agent_commission(
						Cookies.get('agentToken'),
						agentData._id
					);
					setAgentId(agentData._id);
					setAgentStatus(agentData.online);
					setAgentEnable(agentData.enable);
					setComissionDollars(agentData.commissionDollars);
					setComissionSoles(agentData.commissionSoles);
					setAgentColor(agentData.online ? 'green' : 'red');
					setAgentBtnName(agentData.online ? 'en línea' : 'Desconectado');

					setState(data);
					let d1 = data;

					setTransactionCount(d1.length);
					setTotalComm(comm.dollar);
					setTotalCommSoles(comm.soles);
					setLoading(false);
				} catch (error) {
					console.log(error);
					setAlert('Algo salió mal', 'danger');
					const res = Cookies.remove('adminToken');
					const res2 = Cookies.remove('agentToken');
					window.location.href = '/admin_login';
				}
			}
		} else {
			window.location.href = '/admin_login';
		}
	};

	useEffect(() => {
		init();
	}, [page]);

	useEffect(() => {
		setWidth(window.innerWidth);
		if (window.innerWidth > 480) {
			setTopBar({ display: 'inherit' });
		} else {
			setTopBar({ display: 'none', marginTop: '30px' });
		}
		window.addEventListener('resize', handleResize);
		init();
		window.addEventListener('beforeunload', ev => {
			ev.preventDefault();
			return '¿Estás seguro de que quieres cerrar?';
		});
	}, []);

	const handleRefresh = () => {
		init();
	};

	const setAgent = async () => {
		const res = await agentStatusChange(
			Cookies.get('agentToken'),
			agentId,
			!agentStatus
		);
		setAgentStatus(res.online);
		setAgentColor(res.online ? 'green' : 'red');
		setAgentBtnName(res.online ? 'en línea' : 'Desconectado');
	};

	const handleResize = () => {
		setWidth(window.innerWidth);
		if (window.innerWidth > 480) {
			setTopBar({ display: 'inherit' });
		} else {
			setTopBar({ display: 'none', marginTop: '30px' });
		}
	};

	if (loading === true) {
		return <div className='loader'>Cargando...</div>;
	}

	return (
		<>
			<section
				id='topnav-admin'
				className='page-section bg-gray pb-20 pt-70 topnav-page'
				style={topbar}
			>
				<div className='relative container align-left topbar'>
					<div className='row'>
						<div className='container'>
							<ul className='nav nav-tabs tpl-tabs animate'>
								<li className=''>
									<div className='alt-service-item black mt-30  align-left'>
										<div className='alt-service-icon'>
											<i className='fa  fa-users fa-2x'></i>
										</div>
										<div className='count-number orange'>{userCount}</div>
										<div className='count-descr'>
											<h3 className='bold mt-0 mb-0'>usuarios</h3>
										</div>
									</div>
								</li>
								<li className=''>
									<div className='alt-service-item black mt-30  align-left'>
										<div className='alt-service-icon'>
											<i className='fa  fa-exchange fa-2x'></i>
										</div>
										<div className='count-number orange'>
											{parseFloat(totalCommSoles).toFixed(2)}
										</div>
										<div className='count-descr'>
											<h3 className='bold mt-0 mb-0'>cambiados S./</h3>
										</div>
									</div>
								</li>
								<li className='active'>
									<div className='alt-service-item black mt-30  align-left'>
										<div className='alt-service-icon'>
											<i className='fa  fa-dollar fa-2x'></i>
										</div>
										<div className='count-number orange'>
											{parseFloat(totalComm).toFixed(2)}
										</div>
										<div className='count-descr'>
											<h3 className='bold mt-0 mb-0'>cambiados $</h3>
										</div>
									</div>
								</li>
								{/* <li className="active mt-30">
                  <input
                    type="text"
                    name="usuario"
                    id="usuario"
                    className="input-sm bold"
                    placeholder="Buscar"
                    pattern=".{3,100}"
                  />
                  <i className="fa fa-search fa-2x campoform orange"></i>
                </li> */}
								{agentId ? (
									<li className=''>
										<div className='alt-service-item black mt-30  align-left'>
											<button
												onClick={setAgent}
												className='btn btn-mod btn-color btn-border-w btn-medium btn-circle bold'
											>
												{agentBtnName}{' '}
												<i
													style={{ color: agentColor }}
													className='fa fa-circle'
												/>
											</button>
											<br />
											<span className='text-center commission-text mt-2'>
												Por pagar a Moni <br />
												{' $ '}
												{parseFloat(comissionDollars).toFixed(3)}
												{'   '}
												{' S./ '}
												{parseFloat(comissionSoles).toFixed(3)}
											</span>
											<br />
										</div>
									</li>
								) : (
									''
								)}
								{admin ? (
									<li className=''>
										<div className='alt-service-item black mt-30  align-left'>
											<button
												onClick={() => {
													setExchangeModal(!exchangeModal);
													setEditModal(false);
													setViewModal(false);
													setDeleteModal(false);
												}}
												className='btn btn-mod btn-color btn-border-w btn-medium btn-circle bold'
											>
												Tipo de Cambio
											</button>
										</div>
									</li>
								) : (
									''
								)}
							</ul>
						</div>
					</div>
				</div>
			</section>
			{exchangeModal ? (
				<ExchangeModal
					setExchangeModal={setExchangeModal}
					handleRefresh={handleRefresh}
				/>
			) : (
				''
			)}
			{viewModal ? (
				<ViewPopup
					setViewModal={setViewModal}
					data={selected}
					token={token || token2}
					handleRefresh={handleRefresh}
				/>
			) : (
				''
			)}
			{editModal ? (
				<EditPopup
					setEditModal={setEditModal}
					data={selected}
					token={token || token2}
					handleRefresh={handleRefresh}
				/>
			) : (
				''
			)}
			{deleteModal ? (
				<DeletePopup
					setDeleteModal={setDeleteModal}
					data={selected}
					token={token || token2}
					handleRefresh={handleRefresh}
				/>
			) : (
				''
			)}
			<section className='page-section min-section pt-20'>
				<div className='container min-section'>
					{/* <div className="row mt-10 mb-30">
            <div className="col-sm-8 mt-0 mt-xs-0 mb-xs-20">
              Mostrado registros <span className="bold">1-10</span> de 49
            </div>
          </div> */}
					<div className='row'>
						<div className='col-md-12'>
							<table className='table table-striped'>
								<tbody>
									<tr>
										<th className='hidden-xs'></th>
										<th>Operación</th>
										<th>Agente</th>
										<th>Fecha</th>
										<th>Cantidad</th>
										<th>Resultado</th>
										<th>Estado</th>
										<th>Acción</th>
									</tr>
									{state.map((operation, index) => {
										let statusClass = '';
										let iconClass = '';
										if (operation.transaction.status === 'Pago pendiente') {
											statusClass = 'pendiente';
											iconClass = 'fa fa-lg  fa-exclamation-triangle';
										} else if (
											operation.transaction.status === 'Pago realizado'
										) {
											statusClass = 'cnviar comprobante';
											iconClass = 'fa fa-lg fa-mail-forward';
										} else if (operation.transaction.status === 'Finalizado') {
											statusClass = 'finalizado';
											iconClass = 'fa fa-lg fa-check-circle';
										}
										return (
											<>
												<tr>
													<td>
														<td className='orange'>
															{operation.profileDetails.firstName}{' '}
															{operation.profileDetails.lastName}
														</td>
													</td>
													<td className='hidden-xs'>
														{operation.transaction.currencyFrom === 'Soles'
															? 'S./ '
															: '$ '}{' '}
														{'=>'}{' '}
														{operation.transaction.currencyTo === 'Soles'
															? 'S./ '
															: '$ '}
													</td>
													<td>
														{operation.agentName || ''} <br />
													</td>
													<td>
														{moment(operation.date).format('DD/MM/YYYY hh:mm')}
													</td>
													<td>
														{operation.transaction.currencyTo === 'Soles'
															? 'S./ '
															: '$ '}
														{parseFloat(
															operation.transaction.amountToPay
														).toLocaleString(undefined, {
															minimumFractionDigits: 2,
															maximumFractionDigits: 2,
														})}
													</td>
													<td>
														{operation.transaction.currencyFrom === 'Soles'
															? 'S./ '
															: '$ '}
														{parseFloat(
															operation.transaction.amountReceive
														).toLocaleString(undefined, {
															minimumFractionDigits: 2,
															maximumFractionDigits: 2,
														})}
													</td>
													<td>
														<div className={statusClass}>
															<i className={iconClass} />{' '}
															{operation.transaction.status}
														</div>
													</td>
													<td>
														<table>
															<tr>
																<td className='pr'>
																	<button
																		className='btn'
																		onClick={() => {
																			setSelected(operation);
																			setViewModal(!viewModal);
																			setEditModal(false);
																			setDeleteModal(false);
																		}}
																	>
																		<i className='fa fa-lg  fa-eye'></i>
																	</button>
																</td>
																<td className='pr'>
																	{admin || agentEnable ? (
																		<>
																			<button
																				className='btn'
																				onClick={() => {
																					setSelected(operation);
																					setEditModal(!editModal);
																					setViewModal(false);
																					setDeleteModal(false);
																				}}
																			>
																				<i className='fa fa-lg  fa-edit'></i>
																			</button>
																		</>
																	) : (
																		''
																	)}
																</td>
																<td>
																	<button
																		className='btn'
																		onClick={() => {
																			setSelected(operation);
																			setDeleteModal(!deleteModal);
																			setViewModal(false);
																			setEditModal(false);
																		}}
																	>
																		<i className='fa fa-lg fa-trash-o'></i>
																	</button>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</>
										);
									})}
								</tbody>
							</table>
							<div className='pagination'>
								<a
									href=''
									onClick={e => {
										e.preventDefault();
										page > 1 ? setPage(page - 1) : setPage(page);
									}}
								>
									<i className='fa fa-angle-left'></i>
								</a>
								<a
									href=''
									onClick={e => {
										e.preventDefault();
										setPage(page);
									}}
									className='active'
								>
									{page}
								</a>
								<a
									href=''
									onClick={e => {
										e.preventDefault();
										setPage(page + 1);
									}}
								>
									{page + 1}
								</a>
								<a
									href=''
									onClick={e => {
										e.preventDefault();
										setPage(page + 2);
									}}
								>
									{page + 2}
								</a>
								<a className='no-active'>...</a>
								<a
									href=''
									onClick={e => {
										e.preventDefault();
										setPage(page + 1);
									}}
								>
									<i className='fa fa-angle-right'></i>
								</a>
							</div>
						</div>

						{/* will  add pagination later..... */}
						{/* <div className="pagination">
              <a href="">
                <i className="fa fa-angle-left"></i>
              </a>
              <a href="" className="active">
                1
              </a>
              <a href="">2</a>
              <a href="">3</a>
              <a className="no-active">...</a>
              <a href="">9</a>
              <a href="">
                <i className="fa fa-angle-right"></i>
              </a>
            </div> */}
					</div>
				</div>
				<style jsx>{`
					.min-section {
						// min-height: 83vh;
						background: white;
						background-image: url('../images/bkg-neutro.jpg') !important;
						background-attachment: fixed;
						background-repeat: no-repeat;
						background-size: cover;
					}
					.btn {
						background: white;
						margin: 0px;
						padding: 0px;
					}
					.min-section {
						max-height: 900vh;
						min-height: 80vh;
						overflow: auto;
						white-space: nowrap;
					}
					.page-section {
						max-height: 100vh;
					}
					h6 {
						margin-bottom: 0.2em !important;
					}
					@media screen and (max-width: 600px) {
						.topbar {
							display: none !important;
						}
						.topnav-page {
							display: none !important;
						}
						#topnav-admin {
							display: none !important;
						}
						.min-section {
							margin-top: 40px;
						}
					}
					.commission-text {
						padding: 0px;
						margin: 0px;
					}
				`}</style>
			</section>
		</>
	);
};

export default dashboard;

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
	return res.data;
};

const get_all_transactions = async (token, page, limit) => {
	const body = {};
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};

	const res = await Axios.get(
		'https://api.moni.pe/api/operations' + '?page=' + page + '&limit=' + limit,
		header
	);
	return res.data;
};

const get_agent_transactions = async (token, id, page, limit) => {
	const body = {};
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};

	const res = await Axios.get(
		'https://api.moni.pe/api/operations/agent/' +
			id +
			'?page=' +
			page +
			'&limit=' +
			limit,
		header
	);
	return res.data;
};

const get_admin_commission = async token => {
	const body = {};
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};

	const res = await Axios.get(
		'https://api.moni.pe/api/operations/commission/admin',
		header
	);
	return res.data;
};

const get_agent_commission = async (token, id) => {
	const body = {};
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};

	const res = await Axios.get(
		'https://api.moni.pe/api/operations/commission/agent/' + id,
		header
	);
	return res.data;
};

const notification = () => {
	const publicVapidKey =
		'BBzxUnsSFfJls1TkK3_3EPsOrN3iI05ZjUvB8fc03Vezvh2Bo39c3oV-sT0_x-bYCEgPAMgvbeLqrDgHTxYsCAA';

	// Check for service worker
	if ('serviceWorker' in navigator) {
		send().catch(err => console.error(err));
	}

	// Register SW, Register Push, Send Push
	async function send() {
		// Register Service Worker
		const register = await navigator.serviceWorker.register('/sw.js', {
			scope: '/',
		});

		// Register Push
		const subscription = await register.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
		});

		// Send Push Notification
		await fetch('http://localhost:5000/api/notifications/subscribe', {
			method: 'POST',
			body: JSON.stringify(subscription),
			headers: {
				'content-type': 'application/json',
			},
		});
	}

	function urlBase64ToUint8Array(base64String) {
		const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
		const base64 = (base64String + padding)
			.replace(/\-/g, '+')
			.replace(/_/g, '/');

		const rawData = window.atob(base64);
		const outputArray = new Uint8Array(rawData.length);

		for (let i = 0; i < rawData.length; ++i) {
			outputArray[i] = rawData.charCodeAt(i);
		}
		return outputArray;
	}
};
