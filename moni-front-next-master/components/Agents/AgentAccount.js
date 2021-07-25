import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Axios from 'axios';
import AlertContext from '../../context/alert/alertContext';
import BankList from '../../Data/BankList';

const editAccount = async (token, body, id) => {
	// console.log('tokenads', token);
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	const res = await Axios.put(
		'https://api.moni.pe/api/agentaccounts/' + id,
		body,
		header
	);

	// console.log('res of edit:-', res);
};

const deleteAccount = async (token, id) => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};

	const res = await Axios.delete(
		'https://api.moni.pe/api/agentaccounts/' + id,
		header
	);

	// console.log('res of edit:-', res);
};

const Account = props => {
	// console.log(props.data, ':::');
	// console.log('id', props.id);
	const [bankName, setBankName] = useState(
		{ name: props.data.bankName, short: props.data.bankShort } || BankList[0]
	);
	const [id, setId] = useState(props.id || '');
	const [accountNumber, setAccountNumber] = useState(
		props.data.accountNumber || ''
	);
	const [accountTypeOption, setAccountTypeOption] = useState([
		'Ahorros',
		'Corriente',
	]);
	const [accountType, SetAccountType] = useState(
		props.data.type || accountTypeOption[0]
	);
	const [currencyType, setCurrencyType] = useState(['Dollars', 'Soles']);
	const [nickname, setNickname] = useState(props.data.nickname || '');
	const [currency, setCurrency] = useState(
		props.data.currency || currencyType[0]
	);
	const [bankUser, setBankUser] = useState(props.data.bankUser || '');
	const [displayClass, setDisplay] = useState(false);
	const token = Cookies.get('agentToken');

	const handleBankEdit = async (e, id) => {
		e.preventDefault();

		const body = {
			bankName: bankName.name,
			bankShort: bankName.short,
			accountNumber,
			type: accountType,
			nickname,
			currency: currency,
			bankUser,
		};
		// console.log(body);
		// console.log(id);
		const res = await editAccount(token, body, id);
		window.location.reload();
	};

	const handleBankDelete = async (e, id) => {
		e.preventDefault();
		const res = await deleteAccount(token, id);
		window.location.reload();
	};

	return (
		<>
			<dt>
				<a>
					<button
						className='btn-a'
						onClick={e => {
							e.preventDefault();
							setDisplay(!displayClass);
						}}
					>
						{nickname || '-'}
					</button>
				</a>
			</dt>
			<dd
				style={displayClass ? { display: 'block' } : { display: 'none' }}
				className='mb-30'
			>
				<div className='container padding0'>
					<div className='col-md-4 col-xs-12 padding0'>
						<h5 className='black bold mb-10'>Tipo de cuenta</h5>
						<select
							className='input-sm'
							onChange={e => {
								SetAccountType(e.target.value);
							}}
							disabled=''
						>
							<option selected>{accountType}</option>
							{accountTypeOption.map((country, index) => {
								return (
									<option key={index} value={country}>
										{country}
									</option>
								);
							})}{' '}
						</select>

						<h5 className='black bold mb-10 mt-20'>Moneda</h5>
						<select
							className='input-sm'
							onChange={e => {
								setCurrency(e.target.value);
							}}
							disabled=''
						>
							<option selected>{currency}</option>
							{currencyType.map((country, index) => {
								return (
									<option key={index} value={country}>
										{country}
									</option>
								);
							})}{' '}
						</select>
						<h5 className='black bold mb-10  mt-20'>
							Nombre para recordar mi cuenta
						</h5>
						<input
							type='text'
							onChange={e => {
								setNickname(e.target.value);
							}}
							class='input-sm'
							placeholder='BBVA Soles'
							pattern='.{3,100}'
							disabled=''
							value={nickname}
						/>
					</div>
					<div className='col-md-1 col-xs-12 padding0'></div>
					<div className='col-md-6 col-xs-12 padding0'>
						<h5 className='black bold mb-10  mt-20'>Banco</h5>
						<select
							className='input-sm'
							onChange={e => {
								setBankName(JSON.parse(e.target.value));
							}}
							disabled=''
						>
							<option selected>{bankName.name}</option>
							{BankList.map((country, index) => {
								return (
									<option key={index} value={JSON.stringify(country)}>
										{country.name}
									</option>
								);
							})}{' '}
						</select>
						<h5 className='black bold mb-10  mt-20'>Número de cuenta</h5>
						<input
							type='text'
							onChange={e => {
								setAccountNumber(e.target.value);
							}}
							class='input-sm'
							placeholder='001101520200382495'
							pattern='.{3,100}'
							disabled=''
							value={accountNumber}
						/>
						<h5 className='black bold mb-10  mt-20'>
							Nombre de la cuenta bancaria
						</h5>
						<input
							type='text'
							onChange={e => {
								setBankUser(e.target.value);
							}}
							class='input-sm'
							placeholder='nombre'
							disabled=''
							value={bankUser}
						/>
						<div className='col-md-6 col-xs-12 mt-30 padding0'>
							<button
								className='btn btn-mod btn-border-w btn-circle btn-alerta'
								onClick={e => {
									e.preventDefault();
									handleBankEdit(e, id);
								}}
							>
								<i className='fa fa-edit fa-2x'></i> Editar
							</button>
						</div>
						<div className='col-md-6 col-xs-12 mt-30 padding0'>
							<button
								className='btn btn-mod btn-color btn-large btn-circle'
								onClick={e => handleBankDelete(e, id)}
							>
								<i className='fa  fa-times fa-2x'></i> Eliminar
							</button>
						</div>
					</div>
				</div>
			</dd>
			<style jsx>{`
				section {
					background: white;
					// height: 100vh;
				}
				.btn-a {
					background: transparent;
					color: #333;
					font-size: 22px;
					font-weight: 600;
					border: none;
				}
				input {
					width: 100%;
					height: 50px;
					padding-left: 25px;
					padding-right: 13px;
					font-size: 15px;
					border-radius: 45px;
					color: #333;
					border: 2px solid #e55729;
					border-top-color: rgb(229, 87, 41);
					border-right-color: rgb(229, 87, 41);
					border-bottom-color: rgb(229, 87, 41);
					border-left-color: rgb(229, 87, 41);
					text-transform: none;
					background: transparent;
				}
			`}</style>
		</>
	);
};

export default Account;
