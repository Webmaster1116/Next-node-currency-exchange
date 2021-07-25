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
import { Route } from 'react-router-dom';
import { route } from 'next/dist/next-server/server/router';

export const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const context = useContext(Logincontext);
	const { state, addToken, addName } = useContext(UserContext);
	const alertContext = useContext(AlertContext);
	const { setAlert, alerts } = alertContext;
	const [awaitData, setAwaitData] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	// useEffect(() => {
	//   NotificationManager.info("Please login to continue", "Hola");
	// }, []);

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

				Router.push('/operation');

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
				Router.push('/resend');
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

	return (
		<>
			<div className='register-container'>
				<NotificationContainer />
				<h1>Iniciar sesión</h1>
				<form className=''>
					<div className='form-row'>
						<div className='input-group col-md-12 col-sm-12'>
							<input
								className='form-control'
								type='email'
								placeholder='Correo electrónico'
								value={username}
								onChange={e => {
									setUsername(e.target.value);
								}}
							/>
						</div>
						<div className='input-group col-md-12 col-sm-12 mt-4'>
							<input
								className='form-control form-icon'
								type={showPassword ? 'text' : 'password'}
								placeholder='Contraseña'
								value={password}
								onChange={e => {
									setPassword(e.target.value);
								}}
							/>
							<button
								className='btn btn-icon input-group-addon'
								onClick={togglePassword}
							>
								{showPassword ? <FaEye /> : <FaEyeSlash />}
							</button>
						</div>
						<label>
							<button
								className='mt-3 btn forget'
								onClick={e => {
									e.preventDefault();
									Router.push('/forgetpassword');
								}}
							>
								Forget password
							</button>
						</label>
					</div>
					<button
						type='submit'
						className='login-btn btn btn-primary mt-4'
						onClick={handleLogin}
					>
						Iniciar sesión
					</button>
					<Link href='/admin_login'>
						<button type='submit' className='login-btn btn btn-secondary'>
							Administrador
						</button>
					</Link>
				</form>
				<style>{`
          html {
            height: 100%;
            background-color: rgba(7, 17, 39, 1);
          }
          .register-container {
            text-align: center;
            margin: 100px auto;
            width: 400px;
            height: 450px;
            align-items: center;
            background-color: rgba(13, 27, 65, 0.9);
            // background: #071127;
            border-radius: 10px;
            padding: 50px;
            position: fixed;
            padding: 50px;
            left: 50%;
            top: 20%;
            transform: translate(-50%, -20%);
          }
          .form-group {
            padding: 5px !important ;
          }
          form {
            padding: 30px;
          }
          
          .login-btn {
            margin: 10px;
          }
          
          .loader {
            textt-align: center
          }
        
          .form-container {
            background: #071127;
          }
          .btn {
            color: white;
          }
          .btn-icon , .btn-icon:hover {
            color: black;
            position: relative;
            background: white;
            border: none;
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;
          }
          .form-icon {
            border-right: none;
          }

          .forget , .forget:hover {
            color: white;
            text-align: left;
            font-size: 0.75em;
          }
        `}</style>
			</div>
		</>
	);
};

export default Login;
