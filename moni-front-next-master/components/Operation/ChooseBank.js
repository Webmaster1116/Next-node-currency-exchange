import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import Transaction from './Transaction';
import UserContext from '../../context/UserContext';
import Loader from '../Loader';
import AlertContext from '../../context/alert/alertContext';
import Cookies from 'js-cookie';

const ChooseBank = props => {
	const [banks, setBanks] = useState('');
	const [selectedBank, setSelectedBank] = useState('');
	const [isBankSelected, setIsBankSelected] = useState(false);
	const { state, addToken, addName } = useContext(UserContext);
	const alertContext = useContext(AlertContext);
	const { setAlert, alerts } = alertContext;

	useEffect(() => {
		const init = async () => {
			try {
				const bank = await getBankDetails(Cookies.get('token'));
				setBanks(bank);
			} catch (error) {
				setAlert('Algo salió mal', 'danger');
			}
		};
		init();
	}, []);

	if (isBankSelected === true) {
		return <Transaction bankDetails={selectedBank} data={props.data} />;
	}

	if (banks === '') {
		return (
			<div>
				<Loader />
			</div>
		);
	}

	const handleClick = bank => {
		// console.log(bank);
		setSelectedBank(bank);
		setIsBankSelected(true);
	};

	return (
		<div className='contaienr mt-5'>
			<h4 className='mb-5 pb-5'>Elige una cuenta bancaria</h4>
			{banks.map((bank, index) => {
				return (
					<React.Fragment key={index}>
						<button
							className='btn  bank-select pl-4 pr-2 pt-2 pb-2'
							onClick={() => handleClick(bank)}
						>
							<div className='row justify-content-center h-100'>
								<div className='col-3 text-left'>{bank.bankName}</div>
								<div className='col-3 text-left'>{bank.accountNumber}</div>
								<div className='col-3 text-left'>{bank.type}</div>
								<div className='col-2 text-left'>{bank.currency}</div>
							</div>
						</button>
						<hr />
					</React.Fragment>
				);
			})}
			<style jsx>{`
				.bank-select {
					width: 50%;
					color: white;
					background-color: transparent;
					transition: 0.3s;
				}
				.bank-select:hover {
					// background-color: #343a40;
					background-color: #33a1de;
					// background-color: #77cfeb;
					border-color: white;
				}
			`}</style>
		</div>
	);
};

export default ChooseBank;

const getBankDetails = async token => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};

	const res = await Axios.get('https://api.moni.pe/api/accounts/', header);

	return res.data;
};
