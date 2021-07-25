import React, { useState, useContext } from 'react';
import Axios from 'axios';
import country_list from '../../Data/Country_List';
import AgentContext from '../../context/AgentContext';
import Cookies from 'js-cookie';

const AgentEdit = props => {
	// console.log(Cookies.get('agentToken'));

	// console.log(props.accountType);

	const [firstName, setFirstName] = useState(props.data.firstName || '');
	const [lastName, setLastName] = useState(props.data.lastName || '');
	const [motherName, setMotherName] = useState(props.data.motherLastName || '');
	const [birthDate, setBirthDate] = useState(props.data.birthDate || '');
	const [email, setEmail] = useState(props.data.email || '');
	const [phone, setPhone] = useState(props.data.phone || '');
	const [secondName, setSecondName] = useState(props.data.secondName || '');
	const [accountType, setAccountType] = useState(props.data.accountType || '');
	const [ruc, setRuc] = useState(props.data.ruc || '');
	const [address, setAddress] = useState(props.data.address || '');
	const [companyName, setCompanyName] = useState(props.data.companyName || '');

	const [nationality, setNationality] = useState(
		props.data.nationality || country_list[0]
	);
	const [dni, setDni] = useState(props.data.dni || '');
	const [doctype, setDoctype] = useState(props.data.doctype || 'DNI');
	const [docsList, setDocsList] = useState(['DNI', 'CE', 'Passport']);

	const { state, addToken, addName } = useContext(AgentContext);

	const handleSubmit = async e => {
		e.preventDefault();

		const id = props.id;

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
				'x-auth-token': Cookies.get('agentToken'),
			},
		};

		// console.log(body, id);
		const res = await Axios.put(
			'https://api.moni.pe/api/agentprofile/' + id,
			body,
			header
		);
		// console.log('res:-', res);
		props.handleShowEdit(props.state);
	};

	return (
		<section
			className='page-section pt-90 parallax-2'
			data-background='images/bkg-neutro.jpg'
		>
			<form className='form-normal'>
				<div className='container align-left'>
					<div className='col-md-5 col-xs-12 padding0'>
						{props.accountType === 'Personal' ? (
							''
						) : (
							<>
								<h5 className='black bold mb-10  mt-20'>
									<span className='orange'>*</span> Nombre de empresa
								</h5>
								<input
									type='text'
									onChange={e => {
										setCompanyName(e.target.value);
									}}
									class='input-sm'
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
							class='input-sm'
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
							class='input-sm'
							placeholder='Apellido Paterno'
							pattern='.{3,100}'
							value={lastName}
						/>

						<>
							<h5 className='black bold mb-10  mt-20'>Dirección</h5>
							<input
								type='text'
								class='input-sm'
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
							class='input-sm'
							onChange={e => {
								setEmail(e.target.value);
							}}
							placeholder='correo@usuario.com'
							pattern='.{3,100}'
							disabled={true}
							value={email}
						/>

						<h5 className='black bold mb-10  mt-20'>
							<input type='checkbox' id='inlineCheckbox1' value='option1' /> ¿Es
							usted una Persona Expuesta Políticamente (P.E.P.)?
						</h5>
					</div>
					<div className='col-md-2 col-xs-12 padding0'></div>
					<div className='col-md-5 col-xs-12 padding0'>
						<h5 className='black bold mb-10'>
							<span className='orange'>*</span> Nº de documento
						</h5>
						<input
							type='text'
							onChange={e => {
								setDni(e.target.value);
							}}
							class='input-sm'
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
							class='input-sm'
							placeholder='Telefono'
							pattern='.{3,100}'
							value={phone}
						/>

						<h5 className='black bold mb-10 mt-20'>
							<span className='orange'>*</span> Tipo de Perfil{' '}
						</h5>
						<input
							type='text'
							class='input-sm'
							placeholder='Tipo de Perfil'
							pattern='.{3,100}'
							value={accountType}
							disabled
						/>
						{props.accountType === ' Personal' ? (
							''
						) : (
							<>
								<h5 className='black bold mb-10 mt-20'>R.U.C</h5>
								<input
									type='text'
									onChange={e => {
										setRuc(e.target.value);
									}}
									class='input-sm'
									placeholder='ruc'
									pattern='.{3,100}'
									value={ruc}
								/>
							</>
						)}
					</div>
					<div className='col-md-12 col-xs-12 padding0'>
						<hr className='gray' />
						<div className='col-md-5 col-xs-12 padding0'>
							<button
								className='btn btn-mod btn-border-w btn-circle btn-alerta'
								onClick={() => {
									props.handleShowEdit(props.state);
								}}
							>
								<i className='fa fa-angle-left'></i>
								Regresar
							</button>
						</div>
						<div className='col-md-2 col-xs-12 padding0'></div>
						<div className='col-md-5 col-xs-12 padding0'>
							<a
								className='btn btn-mod btn-color btn-large btn-circle'
								onClick={handleSubmit}
							>
								Guardar
							</a>
						</div>
					</div>
				</div>
			</form>
		</section>
	);
};

export default AgentEdit;
