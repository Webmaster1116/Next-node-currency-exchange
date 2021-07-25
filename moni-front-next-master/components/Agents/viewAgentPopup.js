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

const ViewAgentPopup = props => {
	const [margintop, setMargintop] = useState(`${window.scrollY + 30}px`);
	const [agentProfile, setAgentProfile] = useState('');
	// console.log(props.agent);

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
		setAgentProfile(data);
	};

	useEffect(() => {
		window.addEventListener('scroll', listenScrollEvent);
		init();
	}, []);

	if (agentProfile === '') {
		return <div className='loader'></div>;
	}

	return (
		<div className='div-custom shadow-custom round container'>
			<button
				className='btn btn-custom'
				onClick={e => {
					props.setViewAgentPopup(false);
				}}
			>
				<i
					style={{ position: 'absolute', right: '5%' }}
					className='fa fa-times'
				></i>
			</button>
			<h2
				className='text-center orange'
				style={{ marginBottom: '1em', marginTop: '0' }}
			>
				Perfil de agente
			</h2>
			<div className='row'>
				<div className='col-md-1' />
				<div className='col-md-5'>
					<div className='text-center'>
						<div style={{ textAlign: 'start' }}>
							<p>Nombre de pila</p>
							<p>Apellido</p>
							<p>Tipo de cuenta</p>
							<p>R.U.C</p>
							<p>Email</p>
							<p>Contacto</p>
							<p>Número del Documento</p>
							<p>Nombre de empresa</p>
							<p>Dirección</p>
							{/* <p>Fecha de nacimiento</p> */}
							<p>Fecha de creación el</p>
						</div>
					</div>
				</div>
				<div
					className='col-md-1 text-center'
					style={{ marginLeft: '0px', marginRight: '0px' }}
				>
					<p>:</p>
					<p>:</p>
					<p>:</p>
					<p>:</p>
					<p>:</p>
					<p>:</p>
					<p>:</p>
					<p>:</p>
					<p>:</p>
					<p>:</p>
				</div>
				<div className='col-md-5'>
					<div className='text-center'>
						<div style={{ textAlign: 'start' }}>
							<p>{agentProfile.firstName || '-'}</p>
							<p>{agentProfile.lastName || '-'}</p>
							<p>{agentProfile.accountType || '-'}</p>
							<p>{agentProfile.ruc || '-'}</p>
							<p>{agentProfile.email || '-'}</p>
							<p>{agentProfile.phone || '-'}</p>
							<p>{agentProfile.dni || '-'}</p>
							<p>{agentProfile.companyName || '-'}</p>
							<p>{agentProfile.address || '-'}</p>
							{/* <p>{agentProfile.birthDate || "-"}</p> */}
							<p>
								{moment(props.agent.date).format('DD/MM/YYYY hh:mm') || '-'}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className='text-center'>
				<button
					className='mt-2 btn btn-mod btn-border-w btn-medium btn-circle bold'
					onClick={e => props.setViewAgentPopup(false)}
				>
					Confirmar
				</button>
			</div>

			<style jsx>{`
				.div-custom {
					max-width: 650px;
					position: absolute;
					top: ${margintop};
					z-index: 9999999999 !important;
					left: 40%;
					background: white;
					padding: 3em;
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
					box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.12) !important;
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

export default ViewAgentPopup;
