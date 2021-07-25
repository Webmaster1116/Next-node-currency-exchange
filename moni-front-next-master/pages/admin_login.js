import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import AdminContext from '../context/AdminContext';
import Layout from '../components/Layout';
import Router, { withRouter } from 'next/router';
import AlertContext from '../context/alert/alertContext';
import Link from 'next/link';
import AgentContext from '../context/AgentContext';
// import cookies from "next-cookies";
import Head from 'next/head';
import Loader from '../components/Loader';
import Cookies from 'js-cookie';
import {
	NotificationContainer,
	NotificationManager,
} from 'react-notifications';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const adminLogin = props => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const context = useContext(AdminContext);
	const { state, addToken, changeAuthenticated } = useContext(AdminContext);
	const alertContext = useContext(AlertContext);
	const { setAlert, alerts } = alertContext;
	const [awaitData, setAwaitData] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [type, setType] = useState('Admin');
	const init = () => {
		const tok = Cookies.get('adminToken');
		if (tok !== undefined) {
			window.location.href = '/admin/admin_dashboard';
		}
	};
	useEffect(() => {
		init();
	}, []);
	const handleSubmit = async e => {
		e.preventDefault();
		let url = 'https://api.moni.pe/api/admin/auth';
		const body = { email, password };
		if (type === 'Agent') {
			url = 'https://api.moni.pe/api/agent/auth';
		}
		setAwaitData(true);
		try {
			if (body.email === '' || body.password === '') {
				setAwaitData(false);
				setAlert('Por favor llena todos los espacios', 'danger');
			} else {
				const res = await Axios.post(url, body);
				if (res.data !== undefined) {
					await addToken(res.data.token);
					if (type === 'Agent') {
						Cookies.set('agentToken', res.data.token);
						Cookies.remove('adminToken');
					} else {
						Cookies.set('adminToken', res.data.token);
						Cookies.remove('agentToken');
					}

					changeAuthenticated();
					// await addName(res.data.name);
					window.location.href = '/admin/admin_dashboard';
				} else {
					setAlert('Por favor llena todos los espacios', 'danger');
					setAwaitData(false);
				}
			}
		} catch (error) {
			console.log(error);
			setAlert('Credenciales no válidas', 'danger');
			setAwaitData(false);
		}
	};

	const togglePassword = e => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};

	if (awaitData === true) {
		return (
			<div className='loading w-100 h-100'>
				<div className='loader'>
					<Loader />
				</div>
				<style>{`
          .loading {
            overflow: hidden
            margin: 0px;
            padding: 0px;
            height: 100vh;
            background: #071127;
          }
        `}</style>
			</div>
		);
	}

	return (
		<>
			<Layout>
				<div className='page' id='top'>
					<section className='page-section pt-20 pb-0' id='page'>
						<div className='home-content container'>
							<div className='home-text'>
								<div className='container align-center'>
									<div className='row'>
										<div className='col-sm-5 col-sm-push-3'>
											<form className='form white'>
												<img
													src='images/logo-moni.png'
													alt='Moni'
													width='150px'
												/>
												<h1 className='section-title pt-80 pt-xs-40 mb-40 mb-sm-40'>
													Inicie sesión como administrador
												</h1>
												<input
													type='text'
													name='usuario'
													id='usuario'
													className='input-sm bold'
													placeholder='Usuario'
													pattern='.{3,100}'
													value={email}
													onChange={e => {
														setEmail(e.target.value);
													}}
												/>
												<i className='fa fa-user fa-2x campoform'></i>
												<input
													name='password'
													id='password'
													className='input-sm bold'
													placeholder='Contraseña'
													pattern='.{3,100}'
													type={showPassword ? 'text' : 'password'}
													value={password}
													onChange={e => {
														setPassword(e.target.value);
													}}
												/>

												<i
													className='fa fa-eye fa-2x campoform'
													onClick={togglePassword}
												/>
												<select
													onChange={e => {
														setType(e.target.value);
													}}
													className='input-sm mb-20'
													disabled=''
												>
													<option className='opt-custom' selected>
														Admin
													</option>
													<option className='opt-custom'>Agent</option>
												</select>
												<button
													className='btn btn-mod btn-color btn-border-w btn-large btn-circle mb-20'
													onClick={handleSubmit}
												>
													Iniciar sesión
												</button>

												<p className='mt-20'>
													Inicie sesión como usuario
													<br />
													<a href='/login' className='orange'>
														user login
													</a>
												</p>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
						<style jsx>{`
							.btn-icon {
								background: transparent;
								color: white;
							}
							.opt-custom {
								color: white !important;
								background: black !important;
							}

							.opt-custom:hover {
								background: orange !important;
								color: white !important;
							}

							select option:hover {
								background: orange !important;
								color: white !important;
							}
						`}</style>
					</section>
				</div>
			</Layout>
		</>
	);
};

export default adminLogin;
