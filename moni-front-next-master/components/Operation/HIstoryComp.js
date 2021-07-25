import React, { useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import getProfile from '../genericFunctions/getProfile';
import getAllTransactions from '../genericFunctions/getAllTransactions';
import loggedUser from '../genericFunctions/loggedUser';
import sendMail from '../genericFunctions/sendMail';
import Axios from 'axios';
import moment from 'moment';

const History = props => {
	// console.log(props.data, ":::");

	const [displayClass, setDisplay] = useState(false);

	return (
		<>
			<dt>
				<a
					className=''
					onClick={e => {
						e.preventDefault();
						setDisplay(!displayClass);
					}}
				>
					{parseFloat(props.data.transaction.amountToPay)
						.toFixed(2)
						.toLocaleString()}{' '}
					{props.data.transaction.currencyTo === 'Dollars'
						? 'Dólares'
						: 'Soles'}{' '}
					<i className='fa  fa-angle-double-right'></i>{' '}
					{parseFloat(props.data.transaction.amountReceive)
						.toFixed(2)
						.toLocaleString()}{' '}
					{props.data.transaction.currencyFrom === 'Dollars'
						? 'Dólares'
						: 'Soles'}
				</a>
			</dt>
			<dd
				style={displayClass ? { display: 'block' } : { display: 'none' }}
				className='mb-30'
			>
				<div className='container'>
					<div className='col-md-3 col-xs-12 padding0'>
						<h5 className='mb-10'>
							<span className='bold'>Fecha:</span>{' '}
							{moment(props.data.date).format('DD/MM/YYYY hh:mm')}
						</h5>
						<h5 className='mb-10'>
							<span className='bold'>Tipo de cambio:</span>{' '}
							{parseFloat(props.data.transaction.exchange).toFixed(2)}{' '}
						</h5>
						<h5 className='mb-10'>
							<span className='bold'>Número de Operación:</span>{' '}
							{props.data._id.substr(props.data._id.length - 6)}
						</h5>
					</div>
					<div className='col-md-1 col-xs-12 padding0'>
						<i className='fa fa-long-arrow-right fa-3x'></i>
					</div>
					<div className='col-md-3 col-xs-12 padding0'>
						<h5 className='mb-10'>
							<span className='bold'>Tú envías:</span>{' '}
							{parseFloat(props.data.transaction.amountToPay)
								.toFixed(2)
								.toLocaleString()}{' '}
							{props.data.transaction.currencyTo === 'Dollars'
								? 'Dólares'
								: 'Soles'}
						</h5>
						<h5 className='mb-10'>
							<span className='bold'>Banco:</span> {props.data.destinationBank}
						</h5>
					</div>
					<div className='col-md-1 col-xs-12 padding0'>
						<i className='fa fa-long-arrow-right fa-3x'></i>
					</div>
					<div className='col-md-4 col-xs-12 padding0'>
						<h5 className='mb-10'>
							<span className='bold'>Tú recibes:</span>{' '}
							{parseFloat(props.data.transaction.amountReceive)
								.toFixed(2)
								.toLocaleString()}{' '}
							{props.data.transaction.currencyFrom === 'Dollars'
								? 'Dólares'
								: 'Soles'}
						</h5>
						<h5 className='mb-10'>
							<span className='bold'>Banco:</span>{' '}
							{props.data.bankDetails.bankName}
						</h5>
						<h5 className='mb-10'>
							<span className='bold'>Cuenta:</span>{' '}
							{props.data.bankDetails.accountNumber}
						</h5>
					</div>
				</div>
			</dd>
			<style jsx>{`
				.min-section {
					background: white;
					background-image: url('images/bkg-neutro.jpg');
					background-attachment: fixed;
					background-repeat: no-repeat;
					background-size: cover;
					min-height: 80vh;
				}
				.btn-a {
					background: transparent;
					color: #333;
					font-size: 22px;
					font-weight: 600;
					border: none;
				}
			`}</style>
		</>
	);
};

export default History;
