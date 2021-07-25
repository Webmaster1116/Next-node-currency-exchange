import React, { useState, useEffect } from 'react';
import BankList from '../../Data/BankList';
import Axios from 'axios';
import getAgentAccounts from '../genericFunctions/getAgentAccounts';

const changeBankAvail = async (token, id, avail) => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	// console.log(id);
	let status = avail ? 'false' : 'true';
	// console.log();
	const res = await Axios.get(
		'https://api.moni.pe/api/agentaccounts/balance/' + status + '/' + id,
		header
	);
	// console.log(res.data);
};

const ViewBankPopup = props => {
	const [margintop, setMargintop] = useState(`${window.scrollY + 30}px`);

	const [banks, setBanks] = useState([]);
	const [solBanks, setSolBanks] = useState([]);
	const [dolBanks, setDolBanks] = useState([]);

	const listenScrollEvent = e => {
		// console.log(window.scrollY);
		if (window.scrollY > 50) {
			setMargintop(`${window.scrollY + 50}px`);
		} else {
			setMargintop(`${window.scrollY + 50}px`);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', listenScrollEvent);
		init();
	}, []);

	const init = async () => {
		// console.log(props.id);
		const res = await getAgentAccounts(props.token, props.id);

		let finalBank = [];
		const propBank = res;
		let finalBankSol = [];
		let finalBankDol = [];

		await BankList.map(bank => {
			let found = false;
			for (let i = 0; i < propBank.length; i++) {
				if (
					bank.name === propBank[i].bankName &&
					propBank[i].currency === 'Soles'
				) {
					// console.log("bank name", bank);
					finalBankSol.push({
						name: propBank[i].bankName,
						value: propBank[i].balance,
						type: propBank[i].currency,
						id: propBank[i]._id,
					});
					found = true;
				}
			}

			if (found === false) {
				finalBankSol.push({
					name: bank.name,
					value: false,
					type: false,
				});
			}
		});

		await BankList.map(bank => {
			let found = false;
			for (let i = 0; i < propBank.length; i++) {
				if (
					bank.name === propBank[i].bankName &&
					propBank[i].currency == 'Dollars'
				) {
					// console.log("bank name", bank);
					finalBankDol.push({
						name: propBank[i].bankName,
						value: propBank[i].balance,
						type: propBank[i].currency,
						id: propBank[i]._id,
					});
					found = true;
				}
			}

			if (found === false) {
				finalBankDol.push({
					name: bank.name,
					value: false,
					type: false,
				});
			}
		});

		setBanks(finalBank);
		setDolBanks(finalBankDol);
		setSolBanks(finalBankSol);
	};

	const handleChange = async (e, id, value) => {
		e.preventDefault();
		// console.log(id);
		await changeBankAvail(props.token, id, value);
		await init();
	};

	return (
		<div className='div-custom shadow-custom round container'>
			<div>
				<div>
					<button
						className='btn btn-custom'
						onClick={() => props.setAvailBalanceOn(false)}
					>
						<i
							style={{ position: 'absolute', right: '5%' }}
							className='fa fa-times'
						></i>
					</button>
				</div>
				<h3 className='text-center bold'>Cuentas Bancarias</h3>
			</div>
			<div className='row flex'>
				<div className='col-1' />
				<div
					className='col-5'
					style={{ paddingLeft: '40px', float: 'left', width: '50%' }}
				>
					<h3 className='bold'>Soles</h3>
					{solBanks.map((bank, index) => {
						return (
							<React.Fragment key={index}>
								<div>
									<input
										type='checkbox'
										disabled={bank.type === 'Soles' ? false : true}
										checked={bank.value && bank.type === 'Soles'}
										onChange={e => handleChange(e, bank.id, bank.value)}
									/>{' '}
									<span className={bank.type === 'Soles' ? 'bold' : ''}>
										{bank.name}
									</span>
								</div>
							</React.Fragment>
						);
					})}
				</div>
				<div
					className='col-5'
					style={{ paddingLeft: '40px', float: 'right', width: '50%' }}
				>
					<h3 className='bold'>Dolares</h3>
					{dolBanks.map((bank, index) => {
						return (
							<React.Fragment key={index}>
								<div>
									<input
										type='checkbox'
										disabled={bank.type === 'Dollars' ? false : true}
										checked={bank.value && bank.type === 'Dollars'}
										onChange={e => handleChange(e, bank.id, bank.value)}
									/>{' '}
									<span className={bank.type === 'Dollars' ? 'bold' : ''}>
										{bank.name}{' '}
									</span>
								</div>
							</React.Fragment>
						);
					})}
				</div>
			</div>

			<div className='text-center'>
				<button
					className='mt-2 btn btn-mod btn-border-w btn-medium btn-circle bold'
					onClick={() => props.setAvailBalanceOn(false)}
				>
					Cancelar
				</button>
				{/* <Button variant="primary">Save changes</Button> */}
			</div>
			<style jsx>{`
				.div-custom {
					max-width: 800px;
					position: absolute;
					top: ${margintop};
					z-index: 9999;
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
				.btn-custom {
					background: transparent;
				}
			`}</style>
		</div>
	);
};

export default ViewBankPopup;
