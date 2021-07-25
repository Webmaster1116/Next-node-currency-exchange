import React, { useState } from 'react';
import Cookies from 'js-cookie';
import getUser from './genericFunctions/loggedUser';

const createAlertApiCall = async (
	token,
	belowDollarPrice,
	aboveDollarPrice
) => {
	const user = await getUser(token);

	const body = { belowDollarPrice, aboveDollarPrice, user };

	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	const res = await Axios.post(
		"api route , don't know right now...",
		header,
		body
	);

	return res.data;
};

const CreateAlert = props => {
	const [aboveDollarPrice, setAboveDollarPrice] = useState('');
	const [belowDollarPrice, setBelowDollarPrice] = useState('');

	const handleSubmit = e => {
		e.preventDefault();

		if (Cookies.get('token') === undefined) {
			// console.log("login to continue");
		}

		if (aboveDollarPrice === '' || belowDollarPrice === '') {
			console.log('cannot set zero or -ve value');
		}
		// console.log("create alert called", aboveDollarPrice, belowDollarPrice);
	};

	return (
		<section className='bg-morado'>
			<div className='small-section mt-0 pt-50 pt-xs-30 pb-70 pb-xs-50'>
				<div className='container'>
					<div className='row'>
						<div className='container'>
							<form className='form contact-form'>
								<div className='row'>
									<div className='col-sm-4 col-md-4 mb-10'>
										<h6 className='white mt-20'>
											Alertar cuando la Compra del dólar
											<span className='bold'>esté por encima de</span>
										</h6>
										<input
											id='dolarencima'
											className='input-md form-control-cambio bold'
											placeholder='0'
											pattern='.{3,100}'
											type='number'
											name='name'
											step='.01'
											maxLength='100'
											value={aboveDollarPrice}
											onChange={e => setAboveDollarPrice(e.target.value)}
										/>
									</div>
									<div className='col-sm-4 col-md-4 mb-10'>
										<h6 className='white mt-20'>
											Alertar cuando la Compra del dólar
											<span className='bold'>esté por debajo de</span>
										</h6>
										<input
											type='text'
											name='email'
											id='dolardebajo'
											className='input-md form-control-cambio bold'
											placeholder='0'
											pattern='.{5,100}'
											type='number'
											name='name'
											step='.01'
											maxLength='100'
											value={belowDollarPrice}
											onChange={e => setBelowDollarPrice(e.target.value)}
										/>
									</div>
									<div className='col-sm-4 col-md-4 mb-10 crear-alerta'>
										<button
											className='btn btn-mod btn-border-w btn-circle btn-alerta'
											onClick={handleSubmit}
										>
											Crear alerta
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CreateAlert;
