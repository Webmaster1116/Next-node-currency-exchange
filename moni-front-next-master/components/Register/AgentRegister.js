import React, { useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Axios from 'axios';
import country_list from '../../Data/Country_List';
import AlertContext from '../../context/alert/alertContext';
import Router, { useRouter } from 'next/router';
// import Cookies from "js-cookie";

const Reg = props => {
	const router = useRouter();
	const context = useContext(AlertContext);
	const [loading, setLoading] = useState(false);
	const [docsList] = useState(['DNI', 'CE', 'Passport']);

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

	const handleRegister = async e => {
		e.preventDefault();
		setLoading(true);

		// console.log(props);
		const {
			name,
			firstName,
			lastName,
			password,
			email,
			phone,
			dni,
			accountType,
			address,
			companyName,
			ruc,
		} = props.values;

		const body = { name: name, email: email, password: password };
		// const { state, addToken, addName } = useContext(UserContext);
		// console.log(body, 'body');
		try {
			const header = {
				headers: {
					'x-auth-token': Cookies.get('adminToken'),
				},
			};
			const res = await Axios.post(
				'https://api.moni.pe/api/agent/new',
				body,
				header
			);
			//   console.log("res of /api/users", res);
			const token = res.data.token;
			const header1 = {
				headers: {
					'x-auth-token': token,
				},
			};
			// console.log(res.headers);
			const body2 = {
				firstName,
				lastName,
				email,
				phone,
				dni,
				accountType,
				address,
				companyName,
				ruc,
			};
			// console.log('body2', body2);
			try {
				const res1 = await Axios.post(
					'https://api.moni.pe/api/agentprofile',
					body2,
					header1
				);
				// console.log('res of profiles', res1);
			} catch (error) {
				context.setAlert('Detalles de perfil no válidos', 'danger');
			}

			//   Cookies.set("agentToken", res.data.token);
			//   document.cookie = `type=${"user"};token=${res.data.token};path=/`;
			//   document.cookie = `token=${res.data.token};path=/`;
			// console.log('pushing state..');
			window.location.href = '/admin/admin_dashboard';
			setLoading(false);
		} catch (error) {
			setLoading(false);
			context.setAlert('Correo electrónico ya tomado', 'danger');
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
		<section className='page-section pt-10 pb-0 cust-div'>
			<div className='home-content container'>
				<button
					className='btn btn-custom'
					onClick={e => {
						e.preventDefault();
						props.setRegisterOn(false);
					}}
				>
					<i
						style={{
							position: 'absolute',
							right: '5%',
							top: '5%',
							padding: '2px',
						}}
						className='fa fa-times'
					></i>
				</button>
				<div className='home-text'>
					<div className='container align-center'>
						<div className='row justify-content-md-center'>
							<div className='col-sm-12 col'>
								<form className='form'>
									{/* <img src="images/logo-moni.png" alt="Moni" width="150px" /> */}
									<h1 className='section-title pt-10 pt-xs-10 mb-30 mb-sm-30'>
										Registro de agente
									</h1>
									<div className='row justify-content-md-center'>
										<div className='col-md-3 mb-20 mb-xs-20'>
											<input
												type='text'
												name='firstName'
												id='usuario'
												className='input-sm bold'
												placeholder='* Primer nomnbre'
												pattern='.{3,100}'
												value={props.values.firstName}
												onChange={props.handleChange('firstName')}
											/>
										</div>

										<div className='col-md-3 mb-20  mb-xs-20'>
											<input
												type='text'
												name='lastName'
												id='apellido2'
												className='input-sm bold'
												placeholder='* Apellido paterno'
												pattern='.{3,100}'
												value={props.values.lastName}
												onChange={props.handleChange('lastName')}
											/>
										</div>
										<div className='col-md-3  mb-20  mb-xs-20'>
											<input
												type='text'
												name='secondName'
												id='apellido1'
												className='input-sm bold'
												placeholder='Usuario'
												pattern='.{3,100}'
												value={props.values.name}
												onChange={props.handleChange('name')}
											/>
										</div>
										<div className='col-md-3 mb-20  mb-xs-20'>
											<input
												type='password'
												name='password'
												id='contrasena'
												className='input-sm bold'
												placeholder='Contraseña'
												pattern='.{3,100}'
												value={props.values.password}
												onChange={props.handleChange('password')}
											/>
											<i className='fa fa-eye fa-2x campoform'></i>
										</div>
										<div className='col-md-4 mb-20 mb-xs-0'>
											<input
												type='email'
												name='email'
												id='email'
												className='input-sm bold'
												placeholder='Email'
												pattern='.{3,100}'
												value={props.values.email}
												onChange={props.handleChange('email')}
											/>
											<i className='fa fa-envelope fa-2x campoform'></i>
										</div>
										<div className='col-md-4 mb-20  mb-xs-0'>
											<input
												type='text'
												name='documento'
												id='documento'
												className='input-sm bold'
												placeholder='DNI'
												pattern='.{3,100}'
												value={props.values.dni}
												onChange={props.handleChange('dni')}
											/>
										</div>

										<div className='col-md-4 mb-20'>
											<select
												className='input-sm form'
												defaultValue={props.values.accountType}
												onChange={props.handleChange('accountType')}
											>
												<option defaultValue value='Personal'>
													Personal
												</option>
												<option value='Empresa'>Empresa</option>
											</select>
										</div>
										<div className='col-md-12'></div>
										{props.values.accountType === 'Empresa' ? (
											<div className='col-md-6 mb-20 mb-xs-0'>
												<input
													type='text'
													name='nacimiento'
													id='nacimiento'
													className='input-sm bold'
													placeholder='Nombre de empresa'
													pattern='.{3,100}'
													value={props.values.companyName}
													onChange={props.handleChange('companyName')}
												/>
											</div>
										) : (
											''
										)}
										{props.values.accountType === 'Empresa' ? (
											<div className='col-md-6 mb-20 mb-xs-0'>
												<input
													type='text'
													name='nacimiento'
													id='nacimiento'
													className='input-sm bold'
													placeholder='RUC'
													pattern='.{3,100}'
													value={props.values.ruc}
													onChange={props.handleChange('ruc')}
												/>
											</div>
										) : (
											''
										)}
										<div className='col-md-8 mb-20 mb-xs-0'>
											<input
												type='text'
												name='nacimiento'
												id='nacimiento'
												className='input-sm bold'
												placeholder='Direccion'
												pattern='.{3,100}'
												value={props.values.address}
												onChange={props.handleChange('address')}
											/>
										</div>
										<div className='col-md-4 mb-20  mb-xs-0'>
											<input
												type='tel'
												name='tetefono'
												id='tetefono'
												className='input-sm bold'
												placeholder='Número telefónico'
												pattern='.{3,100}'
												value={props.values.phone}
												onChange={props.handleChange('phone')}
											/>
											<i className='fa fa-phone fa-2x campoform'></i>
										</div>

										<div className='col-md-6 mb-20'>
											<button
												className='btn btn-mod btn-color btn-border-w btn-large btn-circle mb-20'
												onClick={() => props.setRegisterOn(false)}
											>
												Cerca
											</button>
										</div>
										<div className='col-md-6 mb-20'>
											<button
												className='btn btn-mod btn-color btn-border-w btn-large btn-circle mb-20'
												onClick={handleRegister}
											>
												e Registrarme
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<style jsx>{`
				.page-section {
					// min-height: 90vh;
					min-width: 80vw;
					max-height: 1400px;
					// background-color: rgba(84, 40, 39, 0.9);
					backround-color: white;
					// margin: 25px auto;
					max-width: 1000px;
					border-radius: 25px;
					z-index: 999999;
					position: absolute;
					margin-left: auto;
					margin-right: auto;
					top: 90px;
					left: 0;
					right: 0;
					text-align: center;
				}
				.cust-div {
					background-color: white;
					color: black;
					box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.12) !important;
					border-radius: 25px !important;
				}

				.btn-custom {
					background: transparent;
				}

				@media screen and (min-width: 480px) {
					.page-section {
					}
				}
			`}</style>
		</section>
	);
};

export default Reg;
