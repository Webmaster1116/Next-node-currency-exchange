import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import AdminContext from '../context/AdminContext';
import Layout from '../components/Admin/Layout';
import Router, { withRouter } from 'next/router';
import AlertContext from '../context/alert/alertContext';
import Link from 'next/link';
import Head from 'next/head';
import Cookies from 'js-cookie';
import { FaUnderline } from 'react-icons/fa';

const agentRegister = props => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { state, addToken, changeAuthenticated } = useContext(AdminContext);
	const alertContext = useContext(AlertContext);
	const { setAlert, alerts } = alertContext;
	const [awaitData, setAwaitData] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const token = Cookies.get('adminToken');
	useEffect(() => {
		const init = async () => {
			const coo = Cookies.get('adminToken');

			if (coo !== undefined) {
				console.log('*');
			} else {
				window.location.href = '/admin_login';
				setAlert('Admin Login First', 'danger');
			}
		};

		init();
	});

	const handleSubmit = async e => {
		e.preventDefault();

		const header = {
			headers: {
				'x-auth-token': token,
			},
		};
		const body = { name, email, password };
		setAwaitData(true);
		try {
			if (body.name === '' || body.email === '' || body.password === '') {
				setAwaitData(false);
				setAlert('Por favor llena todos los espacios', 'danger');
			} else {
				const res = await Axios.post(
					'https://api.moni.pe/api/agent/new',

					body,
					header
				);
				if (res.data !== undefined) {
					await addToken(res.data);
					Cookies.set('agentToken', res.data.token);
					changeAuthenticated();
					window.location.href = '/admin/admin_dashboard';
				} else {
					setAlert('Por favor llena todos los espacios', 'danger');
					setAwaitData(false);
				}
			}
		} catch (error) {
			setAlert('Credenciales no válidas', 'danger');
			setAwaitData(false);
		}
	};

	const togglePassword = e => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};

	// if (awaitData === true) {
	//   return (
	//     <div className="loading w-100 h-100">
	//       <div className="loader">
	//         <Loader />
	//       </div>
	//       <style>{`
	//         .loading {
	//           overflow: hidden
	//           margin: 0px;
	//           padding: 0px;
	//           height: 100vh;
	//           background: #071127;
	//         }
	//       `}</style>
	//     </div>
	//   );
	// }

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
													Agregar agente
												</h1>
												<input
													type='text'
													name='usuario'
													id='usuario'
													className='input-sm bold'
													placeholder='Nombre'
													pattern='.{3,100}'
													value={name}
													onChange={e => {
														setName(e.target.value);
													}}
												/>
												<i className='fa fa-user fa-2x campoform'></i>
												<input
													type='text'
													name='usuario'
													id='usuario'
													className='input-sm bold'
													placeholder='E-mail'
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

												<button
													className='btn btn-mod btn-color btn-border-w btn-large btn-circle mb-20'
													onClick={handleSubmit}
												>
													Iniciar sesión
												</button>

												<p className='mt-20'>
													Inicie sesión como usuario
													<br />
													<a href='/admin_login' className='orange'>
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
						`}</style>
					</section>
				</div>
			</Layout>
		</>
	);
};

export default agentRegister;
