import React, { useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Axios from 'axios';
import country_list from '../../Data/Country_List';
import AlertContext from '../../context/alert/alertContext';
import Router, { useRouter } from 'next/router';

const CompanyReg = props => {
	const router = useRouter();
	const context = useContext(AlertContext);
	const [loading, setLoading] = useState(false);
	const [docsList] = useState(['DNI', 'CE', 'Passport']);
	// console.log(props);
	useEffect(() => {
		window.onpopstate = function (event) {
			window.location.href = '/';
		};
	}, []);
	const handleRegister = async e => {
		e.preventDefault();
		setLoading(true);

		// console.log(props);
		const {
			firstName,
			secondName,
			lastName,
			password,
			birthDate,
			email,
			phone,
			nationality,
			motherLastName,
			doctype,
			dni,
			accountType,
		} = props.values;

		const body = { name: firstName, email: email, password: password };

		// console.log(body, 'body');
		try {
			const res = await Axios.post('https://api.moni.pe/api/users', body);
			// console.log('res of /api/users', res);
			const token = res.data.token;
			const header = {
				headers: {
					'x-auth-token': token,
				},
			};
			// console.log(res.headers);
			const body2 = {
				firstName,
				secondName,
				lastName,
				birthDate,
				email,
				phone,
				nationality,
				doctype,
				dni,
				accountType,
				motherLastName,
			};
			// console.log('body2', body2);
			try {
				const res1 = await Axios.post(
					'https://api.moni.pe/api/profiles',
					body2,
					header
				);
				// console.log('res of profiles', res1);
			} catch (error) {
				context.setAlert('Detalles de perfil no válidos', 'danger');
			}

			Cookies.set('token', res.data.token);
			document.cookie = `type=${'user'};token=${res.data.token};path=/`;
			document.cookie = `token=${res.data.token};path=/`;
			// console.log('pushing state..');
			window.location.href = '/';
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
		<section className='page-section pt-20 pb-0'>
			<div className='home-content container'>
				<div className='home-text'>
					<div className='container align-center'>
						<div className='row'>
							<div className='col-sm-12 col'>
								<form className='form white'>
									<img src='images/logo-moni.png' alt='Moni' width='150px' />
									<h1 className='section-title pt-80 pt-xs-40 mb-40 mb-sm-40'>
										Registro de usuario
									</h1>
									<div className='col-md-4 mb-40 mb-xs-20'>
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
									{/* <div className="col-md-4  mb-40  mb-xs-20">
                    <input
                      type="text"
                      name="secondName"
                      id="apellido1"
                      className="input-sm bold"
                      placeholder="Segundo nombre"
                      pattern=".{3,100}"
                      value={props.values.secondName}
                      onChange={props.handleChange("secondName")}
                    />
                  </div> */}
									<div className='col-md-4 mb-40  mb-xs-20'>
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
									<div className='col-md-5 mb-20  mb-xs-0'>
										<input
											type='password'
											name='password'
											id='contrasena'
											className='input-sm bold'
											placeholder='* Contraseña'
											pattern='.{3,100}'
											value={props.values.password}
											onChange={props.handleChange('password')}
										/>
										<i className='fa fa-eye fa-2x campoform'></i>
									</div>
									<div className='col-md-3 mb-20'>
										<select
											className='input-sm form'
											onChange={props.handleChange('doctype')}
											value={props.values.doctype}
										>
											<option defaultValue>Tipo de documento</option>
											{docsList.map((type, index) => {
												return (
													<option key={index} value={type}>
														{type}
													</option>
												);
											})}
										</select>
									</div>
									<div className='col-md-4 mb-20  mb-xs-20'>
										<input
											type='text'
											name='documento'
											id='documento'
											className='input-sm bold'
											placeholder='Nº de documento'
											pattern='.{3,100}'
											value={props.values.dni}
											onChange={props.handleChange('dni')}
										/>
									</div>
									<div className='col-md-8 mb-20'>
										<select
											className='input-sm form'
											defaultValue={props.values.nationality}
											onChange={props.handleChange('nationality')}
										>
											<option defaultValue>Nacionalidad</option>
											{country_list.map((country, index) => {
												return (
													<option key={index} value={country}>
														{country}
													</option>
												);
											})}
										</select>
									</div>
									<div className='col-md-4 mb-20'>
										<input
											type='text'
											name='company'
											id='company'
											className='input-sm bold'
											placeholder='Nombre De Empresa'
											pattern='.{3,100}'
											value={props.values.phone}
											onChange={props.handleChange('company')}
										/>
									</div>
									<div className='col-md-4 mb-20 mb-xs-0'>
										<input
											type='tel'
											name='ruc'
											id='ruc'
											className='input-sm bold'
											placeholder='RUC'
											pattern='.{3,100}'
											value={props.values.phone}
											onChange={props.handleChange('ruc')}
										/>
									</div>
									<div className='col-md-3 mb-20  mb-xs-0'>
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
									<div className='col-md-5 mb-20  mb-xs-0'>
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
									<div className='col-md-12 mb-20'>
										<button
											className='btn btn-mod btn-color btn-border-w btn-large btn-circle mb-20'
											onClick={handleRegister}
										>
											e Registrarme
										</button>
									</div>
									<div className='col-md-12 mb-20'>
										<a href='#'>¿Olvidaste tu contraseña?</a>
										<p className='mt-20'>
											<input
												type='checkbox'
												id='inlineCheckbox1'
												value='check'
											/>{' '}
											Al registrarte, aceptas nuestros{' '}
											<a href='#'>Términos y Condiciones</a> y{' '}
											<a href='#'>Políticas de usos de Datos</a>.
										</p>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CompanyReg;
