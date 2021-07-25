import React, { useState, useEffect } from 'react';

const BankPopup = props => {
	const [margintop, setMargintop] = useState(`${window.scrollY + 30}px`);

	// console.log(props);

	const listenScrollEvent = e => {
		if (window.scrollY > 50) {
			setMargintop(`${window.scrollY + 50}px`);
		} else {
			setMargintop(`${window.scrollY + 50}px`);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', listenScrollEvent);
	}, []);

	// console.log(props);

	const handleChange = async e => {
		e.preventDefault();
		props.setBankPopup(false);
	};

	return (
		<div className='div-custom shadow-custom round container'>
			<>
				<div>
					<button
						className='btn btn-custom'
						onClick={e => {
							props.setBankPopup(false);
						}}
					>
						<i
							style={{ position: 'absolute', right: '5%' }}
							className='fa fa-times'
						></i>
					</button>
				</div>
				<h3 className='text-center'>
					Deberiás seleccionar tu cuenta bancaria en {props.bankCurrency}
				</h3>

				<div className='text-center mt-30'>
					<p>
						El tipo de moneda de la cuenta seleccionada para recibir para no
						coincide con la operación calculada (
						{props.fromCurrency === 'Soles' ? 'S/' : '$'}
						{' -> '}
						{props.toCurrency === 'Soles' ? 'S/' : '$'}).
					</p>
					<button
						className='mt-30 btn btn-mod btn-border-w btn-medium btn-circle bold'
						onClick={e => handleChange(e)}
					>
						Continuar
					</button>
				</div>
			</>
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
					//   box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.12) !important;
					box-shadow: 3px 3px 20px 3px rgba(0, 0, 0, 0.12) !important;
					border-radius: 25px !important;
					border-width: 10px !important;
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

				// p,
				// span {
				//   overflow: hidden;
				//   text-overflow: ellipsis;
				//   white-space: nowrap;
				// }
			`}</style>
		</div>
	);
};

export default BankPopup;
