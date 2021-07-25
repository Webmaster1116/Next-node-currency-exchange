import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';

const getAgentProfile = async (token, id) => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	const resProfile = await Axios.get(
		'https://api.moni.pe/api/agentprofile/' + id,
		header
	);
	// console.log(resProfile.data[0]);
	return resProfile.data[0];
};

const EditAgentPopup = props => {
	const [margintop, setMargintop] = useState(`${window.scrollY + 30}px`);
	const [agentProfile, setAgentProfile] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [accountType, setAccountType] = useState('');
	const [ruc, setRuc] = useState('');
	const [address, setAddress] = useState('');
	const [companyName, setCompanyName] = useState('');
	const [dni, setDni] = useState('');
	const [profileId, setProfileId] = useState('');

	const listenScrollEvent = e => {
		if (window.scrollY > 50) {
			setMargintop(`${window.scrollY + 50}px`);
		} else {
			setMargintop(`${window.scrollY + 50}px`);
		}
	};

	const init = async () => {
		const data = await getAgentProfile(
			Cookies.get('adminToken'),
			props.agent._id
		);
		setProfileId(data._id);
		setAccountType(data.accountType);
		setAgentProfile(data);
		setFirstName(data.firstName);
		setLastName(data.lastName);
		setEmail(data.email);
		setPhone(data.phone);
		setRuc(data.ruc);
		setAddress(data.address);
		setCompanyName(data.companyName);
		setDni(data.dni);
	};

	useEffect(() => {
		window.addEventListener('scroll', listenScrollEvent);
		init();
	}, []);

	// console.log(props.agent);

	const handleSubmit = async e => {
		e.preventDefault();
		const id = props.agent._id;

		const body = {
			firstName,
			lastName,
			email,
			phone,
			dni,
			accountType,
			companyName,
			ruc,
			address,
		};
		const header = {
			headers: {
				'x-auth-token': Cookies.get('adminToken'),
			},
		};

		// console.log(body, id, Cookies.get('adminToken'));
		const res = await Axios.put(
			'https://api.moni.pe/api/agentprofile/' + id,
			body,
			header
		);
		// console.log('res:-', res);
		props.setEditAgentPopup(false);
	};

	if (agentProfile === '') {
		return <div className='loader'></div>;
	}

	return (
		<div className='div-custom shadow-custom round container'>
			<button
				className='btn btn-custom'
				onClick={e => {
					props.setEditAgentPopup(false);
				}}
			>
				<i
					style={{ position: 'absolute', right: '5%' }}
					className='fa fa-times'
				></i>
			</button>
			<h2 className='text-center orange mb-20' style={{ marginTop: '0' }}>
				Editar agente
			</h2>

			<form className='form-normal'>
				<div className='container align-left'>
					<div className='col-md-5 col-xs-12 padding0'>
						{accountType === 'Personal' ? (
							''
						) : (
							<>
								<h5 className='black bold mb-10  mt-10'>
									<span className='orange'>*</span> Nombre de empresa
								</h5>
								<input
									type='text'
									onChange={e => {
										setCompanyName(e.target.value);
									}}
									className='input-sm'
									placeholder='nombre de empresa'
									pattern='.{3,100}'
									value={companyName}
								/>
							</>
						)}

						<h5 className='black bold mb-10  mt-20'>
							<span className='orange'>*</span> Primer nombre
						</h5>
						<input
							type='text'
							onChange={e => {
								setFirstName(e.target.value);
							}}
							className='input-sm'
							placeholder='Nombre'
							pattern='.{3,100}'
							value={firstName}
						/>

						<h5 className='black bold mb-10  mt-20'>
							<span className='orange'>*</span> Apellido paterno
						</h5>
						<input
							type='text'
							onChange={e => {
								setLastName(e.target.value);
							}}
							className='input-sm'
							placeholder='Apellido Paterno'
							pattern='.{3,100}'
							value={lastName}
						/>

						<>
							<h5 className='black bold mb-10  mt-20'>Dirección</h5>
							<input
								type='text'
								className='input-sm'
								onChange={e => {
									setAddress(e.target.value);
								}}
								placeholder='Dirección                  '
								disabled=''
								value={address}
							/>
						</>

						<h5 className='black bold mb-10  mt-20'>Email</h5>
						<input
							type='text'
							className='input-sm'
							onChange={e => {
								setEmail(e.target.value);
							}}
							placeholder='correo@usuario.com'
							pattern='.{3,100}'
							disabled={true}
							value={email}
						/>

						{/* <h5 className="black bold mb-10  mt-20">
              <input type="checkbox" id="inlineCheckbox1" value="option1" /> ¿Es
              usted una Persona Expuesta Políticamente (P.E.P.)?
            </h5> */}
					</div>
					<div className='col-md-1 col-xs-12 padding0'></div>
					<div className='col-md-5 col-xs-12 padding0'>
						<h5 className='black bold mb-10'>
							<span className='orange'>*</span> Nº de documento
						</h5>
						<input
							type='text'
							onChange={e => {
								setDni(e.target.value);
							}}
							className='input-sm'
							placeholder='N° de documento'
							pattern='.{3,100}'
							disabled=''
							value={dni}
						/>
						<h5 className='black bold mb-10 mt-20'>
							<span className='orange'>*</span> Número telefónico
						</h5>
						<input
							type='text'
							onChange={e => {
								setPhone(e.target.value);
							}}
							className='input-sm'
							placeholder='Telefono'
							pattern='.{3,100}'
							value={phone}
						/>

						<h5 className='black bold mb-10 mt-20'>
							<span className='orange'>*</span> Tipo de Perfil{' '}
						</h5>
						<input
							type='text'
							className='input-sm'
							placeholder='Tipo de Perfil'
							pattern='.{3,100}'
							value={accountType}
							disabled
						/>
						{accountType === 'Personal' ? (
							''
						) : (
							<>
								<h5 className='black bold mb-10 mt-20'>R.U.C</h5>
								<input
									type='text'
									onChange={e => {
										setRuc(e.target.value);
									}}
									className='input-sm'
									placeholder='ruc'
									pattern='.{3,100}'
									value={ruc}
								/>
							</>
						)}
					</div>
				</div>
				<div className='row mt-20'>
					<div className='col-md-2 col-xs-12 padding0 mt-xs-20 mb-xs-20 mt-30' />
					<div className='col-md-4 col-xs-12 padding0 mt-xs-20 mb-xs-20 mt-30'>
						<button
							style={{
								padding: '15px',
								width: '100%',
							}}
							className='btn btn-mod btn-border-w btn-large btn-circle'
							onClick={e => {
								e.preventDefault();
								props.setEditAgentPopup(false);
							}}
						>
							Cancelar
						</button>
					</div>
					{/* <div className="col-md-1 col-xs-12 padding0 mt-xs-20 mb-xs-20 mt-30" /> */}
					<div className='col-md-4 col-xs-12 padding0 mt-xs-20 mb-xs-20 mt-30'>
						<button
							style={{
								padding: '15px',
								width: '100%',
							}}
							className='btn btn-mod btn-color btn-large btn-circle'
							onClick={e => {
								e.preventDefault();
								handleSubmit(e);
								// props.handleShowEdit(props.state);
							}}
						>
							Editar
						</button>
					</div>
				</div>
			</form>

			<style jsx>{`
				.div-custom {
					//   max-width: 650px;
					position: absolute;
					top: ${margintop};
					z-index: 9999999999 !important;
					left: 20%;
					background: white;
					padding: 3em;
					padding-top: 0.5em;
					margin-left: -150px;
				}
				p {
					margin: 2px;
				}
				.mr-4 {
					margin-right: 5px;
				}
				.pt-0 {
					padding-top: 6px !important;
					padding-bottom: 5px !important;
				}
				.mt-2 {
					margin-top: 3em;
				}
				.shadow-custom {
					box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.12) !important;
					border-radius: 25px !important;
				}
				.input-cust {
					border: none;
					border-bottom: solid;
					border-width: 1px;
				}
				.btn-custom {
					background: transparent;
				}
				.btn-img {
					background: transparent;
					margin: 0px;
					padding: 0px;
				}
				span {
					margin: 2px;
				}

				p,
				span {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			`}</style>
		</div>
	);
};

export default EditAgentPopup;
