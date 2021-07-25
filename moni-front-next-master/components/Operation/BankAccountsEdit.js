import React, { useState, useContext } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import UserContext from '../../context/UserContext';
import banksList from '../../Data/BankList';

const BankAccountsEdit = props => {
	const { state } = useContext(UserContext);

	const [bankList, setBankList] = useState(banksList);
	const [bankName, setBankName] = useState(props.data.bankName || bankList[0]);
	const [accountNumber, setAccountNumber] = useState(
		props.data.accountNumber || ''
	);
	const [accountTypeOption, setAccountTypeOption] = useState([
		'Ahorros',
		'Corriente',
	]);
	const [accountType, SetAccountType] = useState(accountTypeOption[0]);
	const [currencyType, setCurrencyType] = useState(['Dollars', 'Soles']);
	const [nickname, setNickname] = useState('');
	const [currency, setCurrency] = useState(currencyType[0]);

	const handleSubmit = async e => {
		e.preventDefault();

		const body = {
			bankName,
			accountNumber,
			type: accountType,
			nickname: nickname,
			currency: currency,
		};
		// console.log('body', body);

		const header = {
			headers: {
				'x-auth-token': Cookies.get('token'),
			},
		};

		// console.log(body);

		if (props.request === 'add') {
			const res = await Axios.post(
				'https://api.moni.pe/api/accounts',
				body,
				header
			);
			// console.log('res of add:-', res);
		} else if (props.request === 'edit') {
			const res = await Axios.put(
				'https://api.moni.pe/api/accounts/' + props.data._id,
				body,
				header
			);
			// console.log('res of edit:-', res);
		}

		props.handleShowEdit(props.state);
	};
	if (currency !== 'Bitcoin') {
		return (
			<div className='form-container w-100'>
				<h2 className='mb-5'>Detalles de cuenta bancaria</h2>

				<div className='row justify-content-center'>
					<div className='col-md-4'>
						<div className='form-group'>
							<label>Número de cuenta</label>
							<input
								type='text'
								className='form-control'
								name='accountNumber'
								placeholder='Número de cuenta'
								id='accountNumber'
								value={accountNumber}
								onChange={e => {
									setAccountNumber(e.target.value);
								}}
							/>
						</div>
					</div>

					<div className='col-md-2'>
						<div className='form-group'>
							<label>Tipo de cuenta</label>
							<select
								className='form-control'
								name='accountType'
								id='firstName'
								value={accountType}
								onChange={e => {
									SetAccountType(e.target.value);
								}}
							>
								{accountTypeOption.map((type, index) => {
									return (
										<option key={index} value={type}>
											{type}
										</option>
									);
								})}
							</select>
						</div>
					</div>
				</div>
				<div className='row justify-content-center'>
					<div className='col-md-2'>
						<div className='form-group'>
							<label>Nombre del banco</label>
							<select
								className='form-control'
								name='accountType'
								id='firstName'
								value={bankName}
								onChange={e => {
									setBankName(e.target.value);
								}}
							>
								{bankList.map((type, index) => {
									return (
										<option key={index} value={type}>
											{type}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<div className='' />
					<div className='col-md-2'>
						<div className='form-group'>
							<label>Dueño de cuenta</label>
							<input
								type='text'
								className='form-control'
								name='nickname'
								placeholder='Dueño de cuenta'
								id='nickname'
								value={nickname}
								onChange={e => {
									setNickname(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className='col-md-2'>
						<div className='form-group'>
							<label>Tipo de moneda</label>
							<select
								className='form-control'
								name='currencyType'
								id='currency Type'
								value={currency}
								onChange={e => {
									setCurrency(e.target.value);
								}}
							>
								{currencyType.map((type, index) => {
									// console.log(type);
									return (
										<option key={index} value={type}>
											{type}
										</option>
									);
								})}
							</select>
						</div>
					</div>
				</div>
				<div className='mt-5'>
					<button
						className='btn text-white'
						onClick={() => {
							props.handleShowEdit(props.state);
						}}
					>
						Espalda
					</button>
					<button className='btn outline-btn ml-4' onClick={handleSubmit}>
						Salvar
					</button>
				</div>
			</div>
		);
	} else {
		return (
			<div className='form-container w-100'>
				<h2 className='mb-5'>Detalles de cuenta bancaria</h2>

				<div className='row'>
					<div className='col-md-4'>
						<div className='form-group'>
							<label>Bitcoin Number</label>
							<input
								type='text'
								className='form-control'
								name='accountNumber'
								placeholder='Bitcoin Number'
								id='accountNumber'
								value={accountNumber}
								onChange={e => {
									setAccountNumber(e.target.value);
								}}
							/>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-2'>
						<div className='form-group'>
							<label>Tipo de moneda</label>
							<select
								className='form-control'
								name='currencyType'
								id='currency Type'
								value={currency}
								onChange={e => {
									setCurrency(e.target.value);
								}}
							>
								{currencyType.map((type, index) => {
									// console.log(type);
									return (
										<option key={index} value={type}>
											{type}
										</option>
									);
								})}
							</select>
						</div>
					</div>
				</div>
				<div className='mt-5'>
					<button
						className='btn text-white'
						onClick={() => {
							props.handleShowEdit(props.state);
						}}
					>
						Espalda
					</button>
					<button className='btn btn-dark' onClick={handleSubmit}>
						Salvar
					</button>
				</div>
			</div>
		);
	}
};

export default BankAccountsEdit;
