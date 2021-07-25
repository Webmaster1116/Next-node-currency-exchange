import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Account from './Account';
import Axios from 'axios';
import AlertContext from '../../context/alert/alertContext';
import BankList from '../../Data/BankList';

const getAccounts = async token => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	const res = await Axios.get('https://api.moni.pe/api/accounts/', header);
	return res.data;
};

const addAccount = async (token, body) => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	// console.log(body);
	const res = await Axios.post(
		'https://api.moni.pe/api/accounts',
		body,
		header
	).catch(err => console.log(err));

	return res;
};

const BankAccounts = props => {
	const alertContext = useContext(AlertContext);
	const { setAlert, alerts } = alertContext;
	const [banks, setBanks] = useState('');
	const [addBank, setAddBank] = useState(false);

	const [accountNumber, setAccountNumber] = useState('');
	const [nickname, setNickname] = useState('');
	const [bankName, setBankName] = useState(BankList[0]);
	const [accountTypeOption, setAccountTypeOption] = useState([
		'Ahorros',
		'Corriente',
	]);
	const [type, setType] = useState(accountTypeOption[0]);
	const [currencyType, setCurrencyType] = useState('Soles');
	const [bankUser, setBankUser] = useState('');

	const token = Cookies.get('token');

	const init = async () => {
		try {
			const res = await getAccounts(token);
			// console.log('res', res);
			setBanks(res);
		} catch (error) {
			// setAlert("Por favor inicie sesión para continuar", "danger");
			// Router.push("/login");
		}
	};

	useEffect(() => {
		init();
	}, []);

	const handleBankAdd = async e => {
		e.preventDefault();

		// console.log('asasas', bankName.name, bankName.short);
		const body = {
			bankName: bankName.name,
			bankShort: bankName.short,
			accountNumber,
			type,
			nickname,
			currency: currencyType,
			bankUser,
		};

		// console.log(body);
		const res = await addAccount(token, body);
		window.location.reload();
	};

	if (banks === '') {
		return (
			<div className='page-loader'>
				<div className='loader'>Cargando...</div>
			</div>
		);
	}

	return (
		<>
			<section className='page-section pt-90 pb-20'>
				<form className='form-normal'>
					<div className='container align-left'>
						<div className='col-md-4 col-xs-12 mt-30 padding0'>
							<dl className='toggle'>
								<>
									<dt>
										<button
											className='btn btn-mod btn-border-w btn-circle btn-alerta'
											onClick={e => {
												e.preventDefault();
												setAddBank(!addBank);
											}}
										>
											<i className='fa fa-plus fa-2x'></i> Añadir nueva cuenta
										</button>
									</dt>
									<dd
										style={addBank ? { display: 'block' } : { display: 'none' }}
										className='mb-30'
									>
										<div className='container padding0'>
											<div className='col-md-4 col-xs-12 padding0'>
												<h5 className='black bold mb-10'>Tipo de cuenta</h5>
												<select
													className='input-sm'
													onChange={e => setType(e.target.value)}
												>
													{accountTypeOption.map((option, index) => {
														// console.log(option);
														return (
															<React.Fragment key={index}>
																<option value={option}>{option}</option>
															</React.Fragment>
														);
													})}
												</select>
												<h5 className='black bold mb-10 mt-20'>Moneda</h5>
												<select
													className='input-sm'
													onChange={e => {
														setCurrencyType(e.target.value);
													}}
												>
													<option value={'Soles'}>Soles(S/.)</option>
													<option value={'Dollars'}>Dollars($)</option>
												</select>
												<h5 className='black bold mb-10  mt-20'>
													Nombre para recordar mi cuenta
												</h5>
												<input
													type='text'
													className='input-sm'
													placeholder='BBVA Soles'
													pattern='.{3,100}'
													value={nickname}
													onChange={e => {
														setNickname(e.target.value);
													}}
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
												>
													{BankList.map((country, index) => {
														return (
															<option
																key={index}
																value={JSON.stringify(country)}
															>
																{country.name}
															</option>
														);
													})}{' '}
												</select>
												<h5 className='black bold mb-10  mt-20'>
													Número de cuenta
												</h5>
												<input
													type='text'
													className='input-sm'
													placeholder='001101520200382495'
													pattern='.{3,100}'
													value={accountNumber}
													onChange={e => {
														setAccountNumber(e.target.value);
													}}
												/>
												<h5 className='black bold mb-10  mt-20'>
													Nombre de la cuenta bancaria
												</h5>
												<input
													type='text'
													className='input-sm'
													placeholder='Nombre'
													value={bankUser}
													onChange={e => {
														setBankUser(e.target.value);
													}}
												/>
												<div className='col-md-6 col-xs-12 mt-30 padding0' />
												<div className='col-md-6 col-xs-12 mt-30 padding0'>
													<a
														className='btn btn-mod btn-color btn-large btn-circle'
														onClick={handleBankAdd}
													>
														<i className='fa fa-plus fa-2x'></i> Añadir
													</a>
												</div>
											</div>
										</div>
									</dd>
								</>
							</dl>
						</div>
						<div className='col-sm-12 mb-xs-40 padding0 mt-30'>
							<dl className='toggle'>
								{banks.map((bank, index) => {
									return <Account data={bank} />;
								})}
							</dl>
						</div>
					</div>
				</form>
			</section>
			<style jsx>{`
				section {
					background: white;
					background-image: url('images/bkg-neutro.jpg');
					background-attachment: fixed;
					background-repeat: no-repeat;
					background-size: cover;
					min-height: 100vh;
				}
				.btn-a {
					background: transparent;
					color: #333;
					font-size: 22px;
					font-weight: 600;
					border: none;
				}
			`}</style>
			{/* </div> */}
		</>
	);
};

export default BankAccounts;
