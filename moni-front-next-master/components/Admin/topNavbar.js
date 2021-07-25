import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import Register from '../../pages/agent_register';
import ViewBankPopup from './viewBankPopup';

import Axios from 'axios';
import Cookies from 'js-cookie';

const getData = async (token, url) => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	const data = await Axios.get(url, header);

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

const Navbar2 = ({ router }) => {
	const [login, setLogin] = useState('None');
	const [name, setName] = useState('');
	const [agentId, setAgentId] = useState('');
	const [registerOn, setRegisterOn] = useState(false);
	const [availBalanceOn, setAvailBalanceOn] = useState(false);

	const init = async () => {
		const token = Cookies.get('adminToken');
		const token2 = Cookies.get('agentToken');

		if (token !== undefined || token2 !== undefined) {
			if (token2 === undefined) {
				try {
					let url = 'https://api.moni.pe/api/admin/auth';
					const data = await getData(coo, url);
					setName('Admin');
					setLogin('Admin');
				} catch (error) {
					setLogin('None');
				}
			} else {
				try {
					let url = 'https://api.moni.pe/api/agent/auth';
					const data = await getData(token2, url);
					setName(data.name);
					const agentid = data._id;
					setAgentId(agentid);
					setLogin('Agent');
				} catch (error) {
					setLogin('None');
				}
			}
		}
	};

	useEffect(() => {
		init();
	}, []);

	const handleLogout = async e => {
		e.preventDefault();
		if (Cookies.get('agentToken') !== undefined) {
			const res5 = await agentStatusChange(
				Cookies.get('agentToken'),
				agentId,
				false
			);
		}

		const res = Cookies.remove('adminToken');
		const res1 = Cookies.remove('agentToken');
		if (router.pathname === '/' || router.pathname === '/index') {
			window.location.reload();
		} else {
			window.location.href = '/';
		}
	};

	return (
		<>
			{registerOn ? <Register setRegisterOn={setRegisterOn} /> : ''}
			{availBalanceOn ? (
				<ViewBankPopup
					setAvailBalanceOn={setAvailBalanceOn}
					token={Cookies.get('agentToken')}
					id={agentId}
				/>
			) : (
				''
			)}

			<nav className='main-nav dark stick-fixed'>
				<div className='container relative clearfix'>
					<div className='nav-logo-wrap local-scroll'>
						<Link href=''>
							<a
								className='logo'
								onClick={() => {
									window.location.href = '/';
								}}
							>
								<img src='../images/logo-moni.png' alt='logo' />
							</a>
						</Link>
					</div>
					<div className='mobile-nav'>
						<a href='#' className='fm-button'>
							<span></span>Menu
						</a>

						<div className='fm-wrapper' id='fullscreen-menu'>
							<div className='fm-wrapper-sub'>
								<div className='fm-wrapper-sub-sub'>
									<ul className='fm-menu-links scroll-nav local-scroll'>
										<li
											style={
												login === 'Agent'
													? { display: 'block' }
													: { display: 'none' }
											}
										>
											<Link href=''>
												<a
													onClick={() => {
														setAvailBalanceOn(true);
													}}
												>
													Disponibilidad de dinero
												</a>
											</Link>
										</li>

										<li
											style={
												login === 'Agent'
													? { display: 'none' }
													: { display: 'block' }
											}
										>
											<Link href=''>
												<a
													onClick={() => {
														window.location.href = '/agents';
													}}
												>
													Agentes disponibles
												</a>
											</Link>
										</li>
										<li
											style={
												login === 'Agent'
													? { display: 'none' }
													: { display: 'block' }
											}
										>
											<Link href=''>
												<a
													onClick={() => {
														setRegisterOn(true);
													}}
												>
													Agregar Agente
												</a>
											</Link>
										</li>
										<li>
											<Link href=''>
												<a
													onClick={() => {
														window.location.href = '/admin/admin_dashboard';
													}}
												>
													{login === 'Agent'
														? 'Panel de agentes'
														: 'PANEL DE ADMINISTRACIÓN'}
												</a>
											</Link>
										</li>
										<li>
											<a href='#' className='mn-has-sub'>
												{name || ''}
											</a>
										</li>
										<li>
											{login === 'Agent' ? (
												''
											) : (
												<a
													onClick={() => {
														window.location.href = '/admin/users';
													}}
												>
													<i className='fa fa-file-invoice fa-2x'> </i>
													Usuarios
												</a>
											)}
										</li>
										<li>
											<a
												onClick={() => {
													login === 'Agent'
														? (window.location.href = '/agents/invoice')
														: (window.location.href = '/admin/invoice');
												}}
											>
												<i className='fa fa-file-invoice fa-2x'> </i>
												Facturas
											</a>
										</li>
										<li>
											<a onClick={handleLogout} href=''>
												Cerrar sesión
											</a>
										</li>
									</ul>

									<div className='fm-social-links'>
										<a href='#' title='Facebook' target='_blank'>
											<i className='fa fa-facebook'></i>
										</a>
										<a href='#' title='Twitter' target='_blank'>
											<i className='fa fa-twitter'></i>
										</a>
										<a href='#' title='Linkedin' target='_blank'>
											<i className='fa fa-linkedin'></i>
										</a>
										<a href='#' title='Instagram+' target='_blank'>
											<i className='fa fa-instagram'></i>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='inner-nav desktop-nav'>
						<ul className='clearlist scroll-nav local-scroll'>
							<li
								style={
									login === 'Agent' ? { display: 'block' } : { display: 'none' }
								}
							>
								<Link href=''>
									<a
										onClick={() => {
											setAvailBalanceOn(true);
										}}
									>
										Disponibilidad de dinero
									</a>
								</Link>
							</li>

							<li>
								<Link href=''>
									<a
										onClick={() => {
											{
												login === 'Agent'
													? (window.location.href = '/agents/profile')
													: (window.location.href = '/agents/viewagents');
											}
										}}
									>
										{login === 'Agent'
											? 'datos de perfil'
											: 'Agentes disponibles'}
									</a>
								</Link>
							</li>
							<li>
								<Link href=''>
									<a
										onClick={() => {
											{
												login === 'Agent'
													? (window.location.href = '/agents/bank')
													: setRegisterOn(true);
											}
										}}
									>
										{login === 'Agent' ? 'cuentas bancarias' : 'Agregar Agente'}
									</a>
								</Link>
							</li>
							<li className='active'>
								<Link href=''>
									<a
										onClick={() => {
											window.location.href = '/admin/admin_dashboard';
										}}
									>
										{login === 'Agent'
											? 'Panel de agentes'
											: 'PANEL DE ADMINISTRACIÓN'}
									</a>
								</Link>
							</li>
							<li>
								<a href='#' className='mn-has-sub'>
									<i className='fa fa-user fa-2x'></i> {name}
									<i className='fa fa-angle-down fa-2x'></i>
								</a>
								<ul className='mn-sub' style={{ display: 'none' }}>
									<li>
										{login === 'Agent' ? (
											''
										) : (
											<a
												onClick={() => {
													window.location.href = '/admin/users';
												}}
											>
												<i className='fa fa-file-invoice fa-2x'> </i>
												Usuarios
											</a>
										)}
									</li>
									<li>
										<a
											onClick={() => {
												login === 'Agent'
													? (window.location.href = '/agents/invoice')
													: (window.location.href = '/admin/invoice');
											}}
										>
											<i className='fa fa-file-invoice fa-2x'> </i>
											Facturas
										</a>
									</li>
									<li>
										<a onClick={handleLogout} href=''>
											<i className='fa fa-sign-out fa-2x'></i> Cerrar sesión
										</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
				<style jsx>
					{`
						.btn {
							background: transparent;
						}
					`}
				</style>
			</nav>
		</>
	);
};

export default withRouter(Navbar2);
