import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../../context/AdminContext';
import { confirmAlert } from 'react-confirm-alert';
import { FaShareSquare } from 'react-icons/fa';
import TopNavbar from './topNavbar';
import Router from 'next/router';
import Cookies from 'js-cookie';
import AlertContext from '../../context/alert/alertContext';
import sendMail from '../genericFunctions/sendMail';
import getProfile from '../genericFunctions/getProfile';

import {
	NotificationContainer,
	NotificationManager,
} from 'react-notifications';

const dashboard = props => {
	const context = useContext(UserContext);
	const [state, setState] = useState('');
	const alertContext = useContext(AlertContext);
	const { setAlert, alerts } = alertContext;
	const [details, setDetails] = useState('');
	const token = Cookies.get('adminToken');

	const init = async () => {
		if (token != undefined) {
			try {
				const data = await get_all_transactions(Cookies.get('adminToken'));
				setState(data);
			} catch (error) {
				console.log(error);
				setAlert('Algo salió mal', 'danger');
				Router.push('/admin_login');
			}
		} else {
			Router.push('/admin_login');
		}
	};

	useEffect(() => {
		init();
	}, []);

	const handleSubmit = (id, operation, status) => {
		confirmAlert({
			title: 'Confirmar para enviar',
			message: '¿Estás seguro de que quieres hacer esto?',
			buttons: [
				{
					label: 'Si',
					onClick: async () => {
						await changeStatus(
							Cookies.get('adminToken'),
							id,
							operation.transaction.amountReceive,
							operation.transaction.amountToPay,
							operation.transaction.currencyTo,
							operation.transaction.currencyFrom,
							status
						);
						const profile = await getProfile(token);
						setDetails(profile);
						await sendMail(token, operation.profileDetails.email, 'success', {
							profileDetails: operation.profileDetails,
							bankDetails: operation.bankDetails,
							transaction: operation.transaction,
							status,
						});
						NotificationManager.info('Estado cambiado', 'Title here');
						init();
					},
				},
				{
					label: 'No',
					onClick: () => console.log('Haga clic en no'),
				},
			],
		});
	};

	const handleRefresh = () => {
		init();
	};

	if (state === '') {
		return <div>loading...</div>;
	}

	return (
		<>
			<TopNavbar handleRefresh={handleRefresh} />
			<div className='container w-100 mt-5'>
				<NotificationContainer />
				<div className='row ml-1 mb-5 mt-5 pt-5'>
					<div className='col-3'>
						<h4>Detalles del banco</h4>
					</div>
					<div className='col-3'>
						<h4>Detalles del perfil</h4>
					</div>
					<div className='col-4'>
						<h4>Detalles de operación</h4>
					</div>
					<div className='col-2'>
						<h4>Estado de la operación</h4>
					</div>
				</div>
				<hr />
				<h1>Candidad Recibida</h1>
				{state
					.filter(op => op.transaction.status === 'Cantidad recibida')
					.map((operation, index) => {
						return (
							<React.Fragment key={index}>
								<div className='row'>
									<div className='col-3'>
										<div className='row'>
											<div className='col-12'>
												<strong>Número de cuenta:</strong>
												{operation.bankDetails.accountNumber}
											</div>
											<div className='col-12'>
												<strong>Nombre del banco:</strong>
												{operation.bankDetails.bankName}
											</div>
											<div className='col-12'>
												<strong>Dueño de cuenta:</strong>
												{operation.bankDetails.nickname || ''}
											</div>
										</div>
									</div>
									<div className='col-4'>
										<div className='row'>
											<div className='col-12'>
												<strong>Nombre: </strong>
												{operation.profileDetails.firstName}
											</div>
											<div className='col-12'>
												<strong>E-mail:</strong>{' '}
												{operation.profileDetails.email}
											</div>
										</div>
									</div>

									<div className='col-3'>
										<div className='row'>
											<div className='col-12'>
												<strong>Monto a pagar:</strong>
												{operation.transaction.amountToPay}
												{operation.transaction.currencyTo}
											</div>
											<div className='col-12'>
												<strong>Cantidad recibida:</strong>
												{operation.transaction.amountReceive}
												{operation.transaction.currencyFrom}
											</div>
										</div>
									</div>
									<div className='col-1'>
										<strong>{operation.transaction.status}</strong>
									</div>
									<div className='col-1'>
										<button
											className='btn btn-dark'
											onClick={() =>
												handleSubmit(
													operation._id,
													operation,
													// operation.profileDetails.email,
													// operation.transaction.amountReceive,
													// operation.transaction.amountToPay,
													// operation.transaction.currencyTo,
													// operation.transaction.currencyFrom,
													'Completo'
												)
											}
										>
											Cambiar Estado
										</button>
									</div>
								</div>
								<hr />
							</React.Fragment>
						);
					})}
				<h1>Pago Pendiente</h1>
				{state
					.filter(op => op.transaction.status === 'Pago pendiente')
					.map((operation, index) => {
						return (
							<React.Fragment key={index}>
								<div className='row'>
									<div className='col-3'>
										<div className='row'>
											<div className='col-12'>
												<strong>Número de cuenta:</strong>
												{operation.bankDetails.accountNumber}
											</div>
											<div className='col-12'>
												<strong>Nombre del banco:</strong>
												{operation.bankDetails.bankName}
											</div>
											<div className='col-12'>
												<strong>Dueño de cuenta:</strong>
												{operation.bankDetails.nickname || ''}
											</div>
										</div>
									</div>
									<div className='col-4'>
										<div className='row'>
											<div className='col-12'>
												<strong>Nombre: </strong>
												{operation.profileDetails.firstName}
											</div>
											<div className='col-12'>
												<strong>E-mail:</strong>{' '}
												{operation.profileDetails.email}
											</div>
										</div>
									</div>

									<div className='col-3'>
										<div className='row'>
											<div className='col-12'>
												<strong>Monto a pagar:</strong>
												{operation.transaction.amountToPay}
												{operation.transaction.currencyTo}
											</div>
											<div className='col-12'>
												<strong>Cantidad recibida:</strong>
												{operation.transaction.amountReceive}
												{operation.transaction.currencyFrom}
											</div>
										</div>
									</div>
									<div className='col-1'>
										<strong>{operation.transaction.status}</strong>
									</div>
									<div className='col-1'>
										<button
											className='btn btn-dark'
											onClick={() =>
												handleSubmit(
													operation._id,
													operation,
													// operation.profileDetails.email,
													// operation.transaction.amountReceive,
													// operation.transaction.amountToPay,
													// operation.transaction.currencyTo,
													// operation.transaction.currencyFrom,
													'Completo'
												)
											}
										>
											Cambiar Estado
										</button>
									</div>
								</div>
								<hr />
							</React.Fragment>
						);
					})}
				<h1>Completo</h1>
				{state
					.filter(op => op.transaction.status === 'Completo')
					.map((operation, index) => {
						return (
							<React.Fragment key={index}>
								<div className='row'>
									<div className='col-3'>
										<div className='row'>
											<div className='col-12'>
												<strong>Número de cuenta:</strong>
												{operation.bankDetails.accountNumber}
											</div>
											<div className='col-12'>
												<strong>Nombre del banco:</strong>
												{operation.bankDetails.bankName}
											</div>
											<div className='col-12'>
												<strong>Dueño de cuenta:</strong>
												{operation.bankDetails.nickname || ''}
											</div>
										</div>
									</div>
									<div className='col-4'>
										<div className='row'>
											<div className='col-12'>
												<strong>Nombre: </strong>
												{operation.profileDetails.firstName}
											</div>
											<div className='col-12'>
												<strong>E-mail:</strong>{' '}
												{operation.profileDetails.email}
											</div>
										</div>
									</div>

									<div className='col-3'>
										<div className='row'>
											<div className='col-12'>
												<strong>Monto a pagar:</strong>
												{operation.transaction.amountToPay}
												{operation.transaction.currencyTo}
											</div>
											<div className='col-12'>
												<strong>Cantidad recibida:</strong>
												{operation.transaction.amountReceive}
												{operation.transaction.currencyFrom}
											</div>
										</div>
									</div>
									<div className='col-1'>
										<strong>{operation.transaction.status}</strong>
									</div>
									<div className='col-1'>
										<button
											className='btn btn-dark'
											onClick={() =>
												handleSubmit(
													operation._id,
													operation,
													// operation.profileDetails.email,
													// operation.transaction.amountReceive,
													// operation.transaction.amountToPay,
													// operation.transaction.currencyTo,
													// operation.transaction.currencyFrom,
													'Completo'
												)
											}
										>
											Cambiar Estado
										</button>
									</div>
								</div>
								<hr />
							</React.Fragment>
						);
					})}
				<style jsx>{`
					.point {
						cursor: context-menu;
					}
					.btn:hover {
						transition: 0.3s;
					}
				`}</style>
			</div>
		</>
	);
};

export default dashboard;

const changeStatus = async (
	token,
	id,
	amountReceive,
	amountToPay,
	currencyTo,
	currencyFrom,
	status
) => {
	const body = {
		transaction: {
			amountReceive,
			amountToPay,
			currencyTo,
			currencyFrom,
			status,
		},
	};
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	const res = await Axios.put(
		'https://api.moni.pe/api/operations/' + id,
		body,
		header
	);
	return res.data;
};

const get_all_transactions = async token => {
	const body = {};
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};

	const res = await Axios.get('https://api.moni.pe/api/operations', header);
	return res.data;
};

const notification = () => {
	const publicVapidKey =
		'BBzxUnsSFfJls1TkK3_3EPsOrN3iI05ZjUvB8fc03Vezvh2Bo39c3oV-sT0_x-bYCEgPAMgvbeLqrDgHTxYsCAA';

	// Check for service worker
	if ('serviceWorker' in navigator) {
		send().catch(err => console.error(err));
	}

	// Register SW, Register Push, Send Push
	async function send() {
		const register = await navigator.serviceWorker.register('/sw.js', {
			scope: '/',
		});

		// Register Push
		const subscription = await register.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
		});

		// Send Push Notification
		await fetch('http://localhost:5000/api/notifications/subscribe', {
			method: 'POST',
			body: JSON.stringify(subscription),
			headers: {
				'content-type': 'application/json',
			},
		});
	}

	function urlBase64ToUint8Array(base64String) {
		const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
		const base64 = (base64String + padding)
			.replace(/\-/g, '+')
			.replace(/_/g, '/');

		const rawData = window.atob(base64);
		const outputArray = new Uint8Array(rawData.length);

		for (let i = 0; i < rawData.length; ++i) {
			outputArray[i] = rawData.charCodeAt(i);
		}
		return outputArray;
	}
};
