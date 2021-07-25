import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import BankAccountsEdit from './BankAccountsEdit';
import UserContext from '../../context/UserContext';
import Loader from '../Loader';
import Cookies from 'js-cookie';
import AlertContext from '../../context/alert/alertContext';
import Router, { withRouter } from 'next/router';

const BankAccountsView = () => {
	const [bankName, setBankName] = useState('');
	const [currencyType, setCurrencyType] = useState('');
	const [accountType, SetAccountType] = useState('');
	const [accountNumber, setAccountNumber] = useState('');
	const [nickname, setNickname] = useState('');
	const { state, addToken, addName } = useContext(UserContext);
	const [banks, setBanks] = useState('');
	const [showEdit, setShowEdit] = useState(false);
	const alertContext = useContext(AlertContext);
	const { setAlert, alerts } = alertContext;
	const [data, setData] = useState('');

	const [editRequest, setEditRequest] = useState('');

	const init = async () => {
		try {
			const header = {
				headers: {
					'x-auth-token': Cookies.get('token'),
				},
			};

			const res = await Axios.get('https://api.moni.pe/api/accounts/', header);
			setBanks(res.data);
		} catch (error) {
			setAlert('Por favor inicie sesión para continuar', 'danger');
			Router.push('/login');
		}
	};

	useEffect(() => {
		init();
	}, []);

	const handleEdit = (data, request) => {
		// console.log('da', data._id);
		setData(data);
		setEditRequest(request);
		// console.log(editRequest);
		setShowEdit(!showEdit);
		init();
	};

	if (showEdit === true) {
		{
			return (
				<BankAccountsEdit
					data={data}
					handleShowEdit={handleEdit}
					state={showEdit}
					request={editRequest}
				/>
			);
		}
	}

	if (banks === '') {
		return (
			<div className='form-container w-100'>
				<h2>
					<Loader />
				</h2>
			</div>
		);
	}

	return (
		<div className='form-container w-100'>
			<h2 className='mb-5'>Detalles de cuenta bancaria</h2>

			{banks.map((data, index) => {
				return (
					<React.Fragment key={index}>
						<div className='row mt-4'>
							<div className='col-md-2 '>
								<div className='form-group'>
									<label>Número de cuenta</label>
									<p className='ml-3'>{data.accountNumber}</p>
								</div>
							</div>

							<div className='col-md-2 '>
								<div className='form-group'>
									<label>Tipo de cuenta</label>
									<p className='ml-3'>{data.type}</p>
								</div>
							</div>
							<div className='col-md-2 '>
								<div className='form-group'>
									<label>Nombre del banco</label>
									<p className='ml-3'>{data.bankName}</p>
								</div>
							</div>

							<div className='col-md-2 '>
								<div className='form-group'>
									<label>Dueño de cuenta</label>
									<p className='ml-3'> {data.nickname || ''}</p>
								</div>
							</div>

							<div className='col-md-2 '>
								<div className='form-group'>
									<label>Tipo de moneda</label>
									<p className='ml-3'> {data.currency}</p>
								</div>
							</div>

							<div className='col-md-2 '>
								<div className='form-group'>
									<button
										className='mt-4 mb-0 btn blue-btn'
										onClick={() => handleEdit(data, 'edit')}
									>
										Editar
									</button>
								</div>
							</div>
						</div>
					</React.Fragment>
				);
			})}
			<button
				className='btn outline-btn mt-5 btn-long'
				onClick={() => handleEdit('', 'add')}
			>
				Agregar cuenta bancaria
			</button>
		</div>
	);
};

export default BankAccountsView;
