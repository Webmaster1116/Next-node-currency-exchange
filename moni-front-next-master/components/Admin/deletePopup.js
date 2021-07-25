import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const DeletePopup = props => {
	const [margintop, setMargintop] = useState(`${window.scrollY + 30}px`);

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

	return (
		<div className='div-custom shadow-cust container'>
			<div>
				<button
					className='btn btn-custom'
					onClick={e => {
						props.setDeleteModal(false);
					}}
				>
					<i
						style={{ position: 'absolute', right: '5%' }}
						className='fa fa-times'
					></i>
				</button>
			</div>
			<div className='text-center'>
				<h3 className='bold'>¿Eliminar operacion?</h3>
			</div>

			<div className='mt-2 text-center'>
				<button
					className='btn btn-mod  btn-border-w btn-medium btn-circle bold'
					onClick={async () => {
						await deleteOperation(props.token, props.data._id);
						await props.handleRefresh();
						props.setDeleteModal(false);
					}}
				>
					Confirm
				</button>
			</div>
			<style jsx>{`
				.div-custom {
					max-width: 600px;
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
				.shadow-cust {
					box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.12) !important;
					border-radius: 25px !important;
					// -webkit-box-shadow: 1px 1px 11px 1px rgba(0, 0, 0, 0.42) !important;
					// -moz-box-shadow: 1px 1px 11px 1px rgba(0, 0, 0, 0.42) !important;
					// box-shadow: 1px 1px 11px 1px rgba(0, 0, 0, 0.42) !important;
				}
				.btn-custom,
				.btn-custom:active {
					background: transparent;
					border: none !important;
					outline: none !important;
				}
				* {
					outline: none;
				}
			`}</style>
		</div>
	);
};

const deleteOperation = async (token, id) => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};

	const res = await Axios.delete(
		'https://api.moni.pe/api/operations/' + id,
		header
	).catch(err => console.log(err));
	return res.data;
};

export default DeletePopup;
