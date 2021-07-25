import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import AgentEdit from './AgentEdit';
import AgentContext from '../../context/AgentContext';
import Cookies from 'js-cookie';
import AlertContext from '../../context/alert/alertContext';
import getAgentId from '../genericFunctions/getAgentId';
import getAgentData from '../genericFunctions/getAgentData';

const AgentView = () => {
	const [agentId, setAgentId] = useState('');
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
	const [ruc, setRuc] = useState('');
	const [address, setAddress] = useState('');
	const [companyName, setCompanyName] = useState('');
	const [showEdit, setShowEdit] = useState(false);
	const { state, addToken, addName } = useContext(AgentContext);
	const alertContext = useContext(AlertContext);
	const { setAlert, alerts } = alertContext;

	const token = Cookies.get('agentToken');
	const [loading, setLoading] = useState(false);

	const init = async () => {
		try {
			setLoading(true);
			const resProfileId = await getAgentId(token);
			const resProfile = await getAgentData(token, resProfileId);
			// console.log(resProfile._id);

			setAccountType(resProfile.accountType);
			// console.log(resProfile.accountType);
			setFirstName(resProfile.firstName);
			setAgentId(resProfile._id);
			setLastName(resProfile.lastName);
			setMotherName(resProfile.motherLastName);
			setBirthDate(resProfile.birthDate);
			setEmail(resProfile.email);
			setPhone(resProfile.phone);
			setSecondName(resProfile.secondName);
			setNationality(resProfile.nationality);
			setDni(resProfile.dni);
			setDoctype(resProfile.doctype);
			setRuc(resProfile.ruc);
			setCompanyName(resProfile.companyName);
			setAddress(resProfile.address);
			setLoading(false);
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
			<AgentEdit
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
					ruc,
					companyName,
					address,
				}}
				accountType={accountType}
				id={agentId}
			/>
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
			<section
				className='page-section min-section pt-90 parallax-2'
				data-background='images/bkg-neutro.jpg'
			>
				<form className='form-normal'>
					<div className='container align-left'>
						<h2 className='orange'>Detalles del perfil</h2>

						<div className='col-md-5 col-xs-12 padding0'>
							{accountType === 'Personal' ? (
								''
							) : (
								<>
									<h5 className='black bold mb-10 mt-20'>Nombre de empresa</h5>
									<h4 className='black mb-10 mt-20'>{companyName}</h4>
								</>
							)}

							<h5 className='black bold mb-10  mt-20'>Primer nombre</h5>
							<h4 className='black mb-10 mt-20'>{firstName}</h4>

							<h5 className='black bold mb-10  mt-20'>Apellido paterno</h5>
							<h4 className='black mb-10 mt-20'>{lastName}</h4>

							<>
								<h5 className='black bold mb-10 mt-20'>Dirección</h5>
								<h4 className='black mb-10 mt-20'>{address}</h4>
							</>

							<h5 className='black bold mb-10  mt-20'>Email</h5>
							<h4 className='black mb-10 mt-20'>{email}</h4>

							{/* <h5 className="black bold mb-10  mt-20">
                <input type="checkbox" id="inlineCheckbox1" value="option1" />{" "}
                ¿Es usted una Persona Expuesta Políticamente (P.E.P.)?
              </h5> */}
						</div>
						<div className='col-md-2 col-xs-12 padding0'></div>
						<div className='col-md-5 col-xs-12 padding0'>
							<h5 className='black bold mb-10'>Nº de documento</h5>
							<h4 className='black mb-10 mt-20'>{dni}</h4>
							<h5 className='black bold mb-10 mt-20'>Número telefónico</h5>
							<h4 className='black mb-10 mt-20'>{phone}</h4>
							<h5 className='black bold mb-10 mt-20'>Tipo de Perfil </h5>
							<h4 className='black mb-10 mt-20'>{accountType}</h4>

							{accountType === 'Personal' ? (
								''
							) : (
								<>
									<h5 className='black bold mb-10 mt-20'>R.U.C</h5>
									<h4 className='black mb-10 mt-20'>{ruc}</h4>
								</>
							)}
						</div>
						<div className='col-md-12 col-xs-12 padding0'>
							{/* <hr className="gray" /> */}
							{/* <div className="col-md-5 col-xs-12 padding0">
                    <button className="btn btn-mod btn-border-w btn-circle btn-alerta"><i className="fa fa-angle-left"></i>
                      Regresar</button>
                </div> */}
							{/* <div className="col-md-2 col-xs-12 padding0"></div>
              <div className="col-md-5 col-xs-12 padding0">
                <a
                  className="btn btn-mod btn-color btn-large btn-circle"
                  onClick={handleEdit}
                >
                  Editar
                </a>
              </div> */}
						</div>
					</div>
				</form>
			</section>
			<style jsx>{`
				.min-section {
					// min-height: 83vh;
					background: white;
					background-image: url('../images/bkg-neutro.jpg') !important;
					background-attachment: fixed;
					background-repeat: no-repeat;
					background-size: cover;
				}
				.btn {
					background: white;
					margin: 0px;
					padding: 0px;
				}
				.min-section {
					max-height: 900vh;
					min-height: 80vh;
					overflow: auto;
					white-space: nowrap;
				}
				.page-section {
					max-height: 100vh;
				}
			`}</style>
		</>
	);
};

export default AgentView;
