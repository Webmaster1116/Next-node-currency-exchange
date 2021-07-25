import React, { useState, useContext, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Axios from 'axios';
import Layout from '../../components/Admin/Layout';
import AlertContext from '../../context/alert/alertContext';
import getAgents from '../../components/genericFunctions/getAvailAgent';
import Cookies from 'js-cookie';
import Navbar from '../../components/Admin/topNavbar';
import moment from 'moment';
import getAgentId from '../../components/genericFunctions/getAgentId';

const resetCommission = async (token, id) => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	const resAgent = await Axios.get(
		'https://api.moni.pe/api/agent/resend/' + id,
		header
	);
	return resAgent.data;
};

const getInvoice = async token => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	const resAgent = await Axios.get(
		'https://api.moni.pe/api/agent/invoice/',
		header
	);
	// console.log('dd', resAgent.data);
	return resAgent.data;
};

const agentRegister = props => {
	const [state, setState] = useState([]);
	const alertContext = useContext(AlertContext);
	const { setAlert, alerts } = alertContext;
	const [awaitData, setAwaitData] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [viewBankModal, setViewBankModal] = useState(false);
	const [popupBankData, setPopupBankData] = useState('');
	const [selectedAgentId, setSelectedAgentId] = useState('');
	const [id, setId] = useState('');
	const token = Cookies.get('agentToken');
	var today = new Date();
	var nextweek = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() + 7
	);

	const init = async () => {
		const coo = Cookies.get('agentToken');

		if (coo !== undefined) {
			let data = await getInvoice(token);
			let ag = await getAgentId(coo);
			// console.log('data', ag);
			data = data.filter(d => d.agent === ag);
			setState(data);
			// console.log(data, 'agents');
		} else {
			window.location.href = '/admin_login';
			setAlert('Inicie sesión como agente primero', 'danger');
		}
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<>
			<Layout>
				<Navbar />

				<section className='page-section min-section pt-30 mt-40'>
					<div className='container min-section'>
						<div className='row mt-10 mb-30'></div>
						<div className='row'>
							<div className='col-md-12'>
								<Table responsive='sm' className='table table-striped'>
									<tbody>
										<tr>
											<th className='hidden-xs'></th>
											<th>Agentes</th>
											<th>Desde</th>
											<th>Haste</th>
											<th>USD</th>
											<th>PEN</th>
											<th>Estado</th>
										</tr>
										{state.map((operation, index) => {
											return (
												<React.Fragment key={index}>
													<tr>
														<td className='hidden-xs'></td>
														<td>
															<button
																onClick={async e => {
																	e.preventDefault();
																	// const res = await getAgentAccounts(
																	//   token,
																	//   operation._id
																	// );
																	// setPopupBankData(res);
																	setSelectedAgentId(operation._id);
																	setViewBankModal(!viewBankModal);
																}}
																className='btn orange'
															>
																{operation.name || ''}{' '}
															</button>
														</td>
														<td>
															{moment(operation.startDay).format(
																'DD/MM/YYYY hh:mm'
															)}{' '}
														</td>

														<td>
															{moment(operation.endDay).format(
																'DD/MM/YYYY hh:mm'
															)}{' '}
														</td>

														<td>
															{parseFloat(operation.commissionDollars).toFixed(
																4
															) || '0'}{' '}
															{' $'}{' '}
														</td>
														<td>
															{parseFloat(operation.commissionSoles).toFixed(
																4
															) || '0'}
															{' S./'}
														</td>
														{operation.commissionDollars == 0 &&
														operation.commissionSoles == 0 ? (
															<td>
																<div className='finalizado'>
																	<i className='fa fa-lg  fa-exclamation-triangle' />{' '}
																	{'Pagado'}
																</div>{' '}
															</td>
														) : (
															<td>
																<div className='pendiente'>
																	<i className='fa fa-lg  fa-exclamation-triangle' />{' '}
																	{'No pagado'}
																</div>{' '}
															</td>
														)}
													</tr>
												</React.Fragment>
											);
										})}
									</tbody>
								</Table>
							</div>
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
					`}</style>
				</section>
			</Layout>
		</>
	);
};

export default agentRegister;
