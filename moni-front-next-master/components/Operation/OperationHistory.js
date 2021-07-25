import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../../context/UserContext';
import Loader from '../Loader';
import Cookies from 'js-cookie';
import getProfile from '../genericFunctions/getProfile';
import getAllTransactions from '../genericFunctions/getAllTransactions';
import sendMail from '../genericFunctions/sendMail';
import loggedUser from '../genericFunctions/loggedUser';

import { confirmAlert } from 'react-confirm-alert';
import {
	NotificationContainer,
	NotificationManager,
} from 'react-notifications';

const OperationHistory = props => {
	const context = useContext(UserContext);
	const token = Cookies.get('token');
	const [state, setState] = useState('');
	const [profileDetails, setProfileDetails] = useState('');

	const init = async () => {
		const id = await loggedUser(token);
		const user = {
			user: {
				id: id,
			},
		};
		// console.log(user, 'xxxxxx');
		// const data = await getAllTransactions(token, user);

		const profile = await getProfile(token);

		// console.log(data);
		// setState(data);
	};

	useEffect(() => {
		init();
	}, []);

	const handleSubmit = (
		id,
		amountReceive,
		amountToPay,
		currencyTo,
		currencyFrom,
		status,
		operation
	) => {
		confirmAlert({
			title: 'Confirmar para enviar',
			message: '¿Estás seguro de que quieres hacer esto?',
			buttons: [
				{
					label: 'Si',
					onClick: async () => {
						await changeStatus(
							token,
							id,
							amountReceive,
							amountToPay,
							currencyTo,
							currencyFrom,
							status
						);
						await sendMail(
							token,
							operation.profileDetails.email,
							'verify',
							operation
						);
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

	if (state === '') {
		return (
			<div className='form-container w-100'>
				<Loader />
			</div>
		);
	}

	return (
		<React.Fragment>
			<NotificationContainer />
			<div className='container main mt-5'>
				<div className='row head'>
					<div className='col-1' />
					<div className='col-2'>Nombre del banco</div>
					<div className='col-2'>Número de cuenta</div>
					<div className='col-2'>Cuenta a pagar</div>
					<div className='col-2'>Cantidad que recibirás</div>
					<div className='col-2'>Estado</div>
				</div>
				<hr className='hr' />

				{/* <div className="scrollbar" id="style-3">
          <div className="force-overflow"> */}
				{state.map((operation, index) => {
					// console.log(operation);
					return (
						<React.Fragment key={index}>
							<div className='row'>
								<div className='col-1'>{index + 1}</div>
								<div className='col-2'>{operation.bankDetails.bankName}</div>
								<div className='col-2'>
									{operation.bankDetails.accountNumber}
								</div>
								<div className='col-1'>{operation.transaction.amountToPay}</div>
								<div className='col-1'>{operation.transaction.currencyTo}</div>
								<div style={{ overflow: 'hidden' }} className='col-1'>
									{operation.transaction.amountReceive}
								</div>
								<div className='col-1'>
									{operation.transaction.currencyFrom}
								</div>

								{operation.transaction.status === 'Pago pendiente' ? (
									<React.Fragment>
										<div className='col-1'>{operation.transaction.status}</div>
										<button
											className='btn btn-dark'
											onClick={() =>
												handleSubmit(
													operation._id,
													operation.transaction.amountReceive,
													operation.transaction.amountToPay,
													operation.transaction.currencyTo,
													operation.transaction.currencyFrom,
													'Cantidad recibida',
													operation
												)
											}
										>
											verificar pago
										</button>
									</React.Fragment>
								) : (
									<div className='col-2'>{operation.transaction.status}</div>
								)}
							</div>
							<hr />
						</React.Fragment>
					);
				})}
			</div>
			{/* </div> */}
			<style jsx>{`
				div {
					color: white;
					font-size: 15px;
				}
				.head div {
					font-size: 18px;
				}
				hr {
					background: white;
				}
				.main {
					margin: 0 auto;
					padding-top: 80px;
					width: 100%;
					height: 120vh;
					color: white;
					// overflow-y: scroll;
				}

				.scrollbar {
					margin-left: 30px;
					float: left;
					height: 300px;
					max-height: 600px;
					width: 65px;
					background: #f5f5f5;
					overflow-y: scroll;
					margin-bottom: 25px;
				}
				#style-3::-webkit-scrollbar-track {
					-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
					background-color: #f5f5f5;
				}

				#style-3::-webkit-scrollbar {
					width: 6px;
					background-color: #f5f5f5;
				}

				#style-3::-webkit-scrollbar-thumb {
					background-color: #000000;
					border-width: 1px;
				}
			`}</style>
			{/* </div> */}
		</React.Fragment>
	);
};

export default OperationHistory;

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
