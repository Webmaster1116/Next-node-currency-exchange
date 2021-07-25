import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import ProfileEdit from './ProfileEdit';
import UserContext from '../../context/UserContext';
import Cookies from 'js-cookie';
import AlertContext from '../../context/alert/alertContext';
import getProfile from '../genericFunctions/getProfile';

const ProfileView = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [motherName, setMotherName] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [secondName, setSecondName] = useState('');
	const [nationality, setNationality] = useState('');
	const [doctype, setDoctype] = useState('');
	const [dni, setDni] = useState('');
	const [accountType, setAccountType] = useState('');
	const [showEdit, setShowEdit] = useState(false);
	const { state, addToken, addName } = useContext(UserContext);
	const alertContext = useContext(AlertContext);
	const { setAlert, alerts } = alertContext;

	const token = Cookies.get('token');

	const init = async () => {
		try {
			const resProfile = await getProfile(token);

			const id = resProfile._id;

			setFirstName(resProfile.firstName);
			setLastName(resProfile.lastName);
			setMotherName(resProfile.motherLastName);
			setBirthDate(resProfile.birthDate);
			setEmail(resProfile.email);
			setPhone(resProfile.phone);
			setSecondName(resProfile.secondName);
			setNationality(resProfile.nationality);
			setDni(resProfile.dni);
			setDoctype(resProfile.doctype);
			setAccountType(resProfile.accountType);

			// console.log("id:-", id);
		} catch (error) {
			setAlert('Por favor complete su perfil', 'danger');
		}
	};

	useEffect(() => {
		init();
	}, []);

	const handleEdit = async () => {
		setShowEdit(!showEdit);
		await init();
	};

	if (showEdit === true) {
		return (
			<ProfileEdit
				handleShowEdit={handleEdit}
				state={showEdit}
				data={{
					firstName,
					secondName,
					lastName,
					motherName,
					birthDate,
					email,
					phone,
					nationality,
					dni,
					doctype,
					accountType,
				}}
			/>
		);
	}

	return (
		<section className='parallax-2' data-background='images/bkg-neutro.jpg'>
			<form className='form-normal'>
				<div className='container align-left'>
					<div className='col-md-5 col-xs-12 padding0'>
						<h5 className='black bold mb-10'>
							<span className='orange'>*</span> Tipo de documento
						</h5>
						<h4 className='black mb-10 mt-20'>{doctype}</h4>

						<h5 className='black bold mb-10 mt-20'>
							<span className='orange'>*</span> Nacionalidad
						</h5>
						<h4 className='black mb-10 mt-20'>{nationality}</h4>

						<h5 className='black bold mb-10  mt-20'>
							<span className='orange'>*</span> Primer nombre
						</h5>
						<h4 className='black mb-10 mt-20'>{firstName}</h4>

						<h5 className='black bold mb-10  mt-20'>
							<span className='orange'>*</span> Apellido paterno
						</h5>
						<h4 className='black mb-10 mt-20'>{lastName}</h4>

						<h5 className='black bold mb-10  mt-20'>
							<span className='orange'>*</span> Fecha de nacimiento
						</h5>
						<h4 className='black mb-10 mt-20'>{birthDate}</h4>

						<h5 className='black bold mb-10  mt-20'>Email</h5>
						<h4 className='black mb-10 mt-20'>{email}</h4>

						<h5 className='black bold mb-10  mt-20'>
							<input type='checkbox' id='inlineCheckbox1' value='option1' />{' '}
							¿Estás segura de que los detalles son correctos?
						</h5>
					</div>
					{/* <div className="col-md-2 col-xs-12 padding0"></div> */}
					<div className='col-md-5 col-xs-12 padding0'>
						<h5 className='black bold mb-10'>
							<span className='orange'>*</span> Nº de documento
						</h5>
						<h4 className='black mb-10 mt-20'>{dni}</h4>
						<h5 className='black bold mb-10 mt-20'>
							<span className='orange'>*</span> Número telefónico
						</h5>
						<h4 className='black mb-10 mt-20'>{phone}</h4>
						<h5 className='black bold mb-10 mt-20'>
							<span className='orange'>*</span> Tipo de Perfil{' '}
						</h5>
						<h4 className='black mb-10 mt-20'>{accountType}</h4>

						<h5 className='black bold mb-10 mt-20'>Segundo nombre</h5>
						<h4 className='black mb-10 mt-20'>{secondName}</h4>

						<h5 className='black bold mb-10 mt-20'>Apellido materno</h5>
						<h4 className='black mb-10 mt-20'>{motherName}</h4>
					</div>
					<div className='col-md-12 col-xs-12 padding0'>
						<hr className='gray' />
						{/* <div className="col-md-5 col-xs-12 padding0">
                    <button className="btn btn-mod btn-border-w btn-circle btn-alerta"><i className="fa fa-angle-left"></i>
                      Regresar</button>
                </div> */}
					</div>
				</div>
			</form>
		</section>
	);
};

export default ProfileView;
