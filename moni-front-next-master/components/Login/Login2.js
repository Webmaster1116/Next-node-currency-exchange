import React, { useContext, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Logincontext from '../../context/LoginContext';
import UserContext from '../../context/UserContext';
import AlertContext from '../../context/alert/alertContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import Router, { withRouter } from 'next/router';
import Axios from 'axios';
import Link from 'next/link';
// import cookies from "next-cookies";
import Loader from '../Loader';
import Cookies from 'js-cookie';
import {
	NotificationContainer,
	NotificationManager,
} from 'react-notifications';

export const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const context = useContext(Logincontext);
	const { state, addToken, addName } = useContext(UserContext);
	const alertContext = useContext(AlertContext);
	const { setAlert, alerts } = alertContext;
	const [awaitData, setAwaitData] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	// useEffect(() => {
	//   NotificationManager.info("Please login to continue", "Hola");
	// }, []);
	const init = () => {
		const tok = Cookies.get('token');
		if (tok !== undefined) {
			window.location.href = '/operation';
		}
	};

	useEffect(() => {
		window.onpopstate = function (event) {
			window.location.href = '/';
		};
		init();
		setLoading(false);
	}, []);

	const handleLogin = async e => {
		e.preventDefault();
		const body = { email: username, password: password };

		setAwaitData(true);
		try {
			if (body.email === '' || body.password === '') {
				setAlert('Por favor llena todos los espacios', 'danger');
				setAwaitData(false);
			} else {
				const res = await Axios.post('https://api.moni.pe/api/auth', body);
				// console.log(res, 'resss');
				await addToken(res.data.token);
				Cookies.set('token', res.data.token);

				window.location.href = '/';

				const header = {
					headers: {
						'x-auth-token': state.token,
					},
				};
				const data = await Axios.get('https://api.moni.pe/api/auth', header);
				await addName(data.data.name);
			}
		} catch (error) {
			if (error.response.data.msg === 'Your account has not been verified.') {
				window.location.href = '/resend';
			}
			setAlert(error.response.data.msg, 'danger');
			setAwaitData(false);
		}
	};

	const togglePassword = e => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};

	if (awaitData === true) {
		return (
			<div className='form-container w-100 h-100'>
				<div className='loader'>
					<Loader />
				</div>
				<style>{`
        .form-container {
          height: 100vh !important;
          // background: #071127;
          }
        `}</style>
			</div>
		);
	}

	if (loading === true) {
		return (
			<div className='page-loader'>
				<div className='loader'>Cargando...</div>
			</div>
		);
	}

	return (
		<>
			<section className='page-section pt-20 pb-0' id='page'>
				<div className='home-content container'>
					<div className='home-text'>
						<div className='container align-center'>
							<div className='row'>
								<div className='col-sm-5 col-sm-push-3'>
									<form className='form white'>
										<img src='images/logo-moni.png' alt='Moni' width='150px' />
										<h1 className='section-title pt-80 pt-xs-40 mb-40 mb-sm-40'>
											Ingresa a tu cuenta
										</h1>
										<input
											type='text'
											name='usuario'
											id='usuario'
											className='input-sm bold'
											placeholder='Usuario'
											pattern='.{3,100}'
											value={username}
											onChange={e => {
												setUsername(e.target.value);
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
											onClick={handleLogin}
										>
											Iniciar sesión
										</button>
										<a href='/forgetpassword'>¿Olvidaste tu contraseña?</a>
										<p className='mt-20'>
											¿No tienes una cuenta para operar?
											<br />
											Crea una cuenta{' '}
											<a href='/register' className='orange'>
												aquí
											</a>
										</p>
										<p className='mt-20'>
											Inicie sesión como administrador
											<br />
											<a href='/admin_login' className='orange'>
												admin login
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
		</>
	);
};

export default Login;
