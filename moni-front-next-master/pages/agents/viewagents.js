import React, { useState, useContext, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Axios from 'axios';
import AdminContext from '../../context/AdminContext';
import Layout from '../../components/Admin/Layout';
import Router, { withRouter } from 'next/router';
import AlertContext from '../../context/alert/alertContext';
import getAgents from '../../components/genericFunctions/getAvailAgent';
import Link from 'next/link';
import Head from 'next/head';
import Cookies from 'js-cookie';
import Navbar from '../../components/Admin/topNavbar';
import ViewBankPopup from '../../components/Admin/viewBankPopup';
import moment from 'moment';
import getAgentAccounts from '../../components/genericFunctions/getAgentAccounts';
import ViewAgentPopup from '../../components/Agents/viewAgentPopup';
import EditAgentPopup from '../../components/Agents/editAgentPopup';

const agentRegister = props => {
	const [state, setState] = useState([]);
	//   const { state, addToken, changeAuthenticated } = useContext(AdminContext);
	const alertContext = useContext(AlertContext);
	const { setAlert, alerts } = alertContext;
	const [awaitData, setAwaitData] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [viewBankModal, setViewBankModal] = useState(false);
	const [popupBankData, setPopupBankData] = useState('');
	const [selectedAgentId, setSelectedAgentId] = useState('');
	const [viewAgentPopup, setViewAgentPopup] = useState(false);
	const [editAgentPopup, setEditAgentPopup] = useState(false);
	const [selectedAgent, setSelectedAgent] = useState('');
	const token = Cookies.get('adminToken');

	const init = async () => {
		const coo = Cookies.get('adminToken');

		if (coo !== undefined) {
			const data = await getAgents(token);
			setState(data);
			// console.log(data, 'agents');
		} else {
			window.location.href = '/admin_login';
			setAlert('Admin Login First', 'danger');
		}
	};

	useEffect(() => {
		init();
	}, []);

	const handleEnable = async (e, id, prevStatus) => {
		const newStatus = !prevStatus ? 'enable' : 'disable';
		e.preventDefault();
		// console.log('enable called');
		const header = {
			headers: {
				'x-auth-token': token,
			},
		};
		const res = await Axios.get(
			'https://api.moni.pe/api/agent/' + newStatus + '/' + id,
			header
		);
		// console.log(res);
		await init();
	};

	return (
		<>
			<Layout>
				<Navbar />

				<section className='page-section min-section pt-30 mt-40'>
					{editAgentPopup ? (
						<EditAgentPopup
							setEditAgentPopup={setEditAgentPopup}
							agent={selectedAgent}
							token
							id={selectedAgentId}
						/>
					) : (
						''
					)}
					<div className='container min-section'>
						<div className='row mt-10 mb-30'>
							{/* <div className="col-sm-8 mt-0 mt-xs-0 mb-xs-20">
              Mostrado registros <span className="bold">1-10</span> de 49
            </div> */}
						</div>
						<div className='row'>
							<div className='col-md-12'>
								<Table responsive='sm' className='table table-striped'>
									<tbody>
										<tr>
											<th className='hidden-xs'></th>
											<th>Nombre </th>
											<th>E-mail</th>
											<th>Soles de comisión</th>
											<th>Dólares de comisión</th>
											<th>
												Número de <br /> operaciones
											</th>
											<th>Estado</th>
											<th>Acción</th>
										</tr>
										{state.map((agent, index) => {
											return (
												<React.Fragment key={index}>
													{viewBankModal ? (
														<ViewBankPopup
															setAvailBalanceOn={setViewBankModal}
															data={agent}
															token={token}
															id={selectedAgentId}
														/>
													) : (
														''
													)}
													{viewAgentPopup ? (
														<ViewAgentPopup
															setViewAgentPopup={setViewAgentPopup}
															agent={selectedAgent}
															token
															id={selectedAgentId}
														/>
													) : (
														''
													)}

													<tr>
														<td className='hidden-xs'>
															<input
																className='form-check-input'
																type='checkbox'
																checked={agent.enable}
																onChange={e =>
																	handleEnable(e, agent._id, agent.enable)
																}
															/>
														</td>
														<td>
															<button
																onClick={async e => {
																	e.preventDefault();
																	// const res = await getAgentAccounts(
																	//   token,
																	//   agent._id
																	// );
																	// setPopupBankData(res);
																	setSelectedAgentId(agent._id);
																	setViewBankModal(!viewBankModal);
																}}
																className='btn orange'
															>
																{agent.name || ''}{' '}
															</button>
														</td>
														<td>{agent.email || ''} </td>

														<td>
															{parseFloat(agent.commissionDollars).toFixed(4) ||
																'0'}{' '}
															{' $'}{' '}
														</td>
														<td>
															{parseFloat(agent.commissionSoles).toFixed(4) ||
																'0'}
															{' S./'}
														</td>

														<td>{agent.length || ''} </td>
														<td>
															{agent.online ? 'En línea' : 'Desconectado'}
														</td>
														<td>
															<table>
																<tr>
																	<td className='pr'>
																		<button
																			className='btn'
																			onClick={() => {
																				setSelectedAgent(agent);
																				setViewAgentPopup(!viewAgentPopup);
																				setEditAgentPopup(false);
																			}}
																		>
																			<i className='fa fa-lg  fa-eye'></i>
																		</button>
																	</td>
																	<td className='pr'>
																		<button
																			className='btn'
																			onClick={() => {
																				setSelectedAgent(agent);
																				setEditAgentPopup(!editAgentPopup);
																				setViewAgentPopup(false);
																			}}
																		>
																			<i className='fa fa-lg  fa-edit'></i>
																		</button>
																	</td>
																	{/* <td>
                                    <button className="btn" onClick={() => {}}>
                                      <i className="fa fa-lg fa-trash-o"></i>
                                    </button>
                                  </td> */}
																</tr>
															</table>
														</td>
													</tr>
												</React.Fragment>
											);
										})}
									</tbody>
								</Table>
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
					`}</style>
				</section>
			</Layout>
		</>
	);
};

export default agentRegister;
