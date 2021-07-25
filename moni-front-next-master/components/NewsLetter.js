import React, { useState } from 'react';
import postNewsletter from '../components/genericFunctions/postNewsletter';

const NewsLetter = () => {
	const [email, setEmail] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();
		// console.log(email);
		const res = await postNewsletter(email);
		// console.log(res.data);
		window.location.reload();
	};
	return (
		<section className='newsletter'>
			<div className='container relative'>
				<div className='form align-center' id='mailchimp'>
					<div className='row'>
						<div className='container'>
							<h1 className='section-title pt-80 pt-xs-40 mb-40 mb-sm-40'>
								Subscríbete a nuestra newsletter
							</h1>
							<div className='container bg-hr'>
								<hr className='orange mt-0 mb-0' />
							</div>
							<h5 className='mb-40 mt-60 mt-xs-40'>
								<span className='bold'>
									No pierdas la oportunidad, suscríbete y recibe todo acerca del
									tipo de cambio.
								</span>
								<br />
								No te pierdas una buena oportunidad de compra-venta de dólares y
								soles online, estés donde estés.
								<br />
								Entérate de todas las novedades del tipo de cambio en el Perú.
							</h5>
							<div id='subscribe-result'></div>
							<form className='form contact-form'>
								<div className='row'>
									<div className='col-sm-6 col-md-7 mb-10'>
										<input
											type='text'
											name='subscribete'
											id='subscribete'
											className='input-news form-control-news'
											placeholder='Introduce tu e-mail'
											pattern='.{5,100}'
											onChange={e => {
												setEmail(e.target.value);
											}}
											required
										/>
									</div>
									<div className='col-sm-6 col-md-5 mb-10 mt-xs-20 subscribete'>
										<button
											onClick={handleSubmit}
											className='btn btn-mod btn-color btn-border-w btn-large btn-circle'
										>
											Subscríbete
										</button>
									</div>
								</div>
								<div className='form-tip align-left'>
									<i className='fa fa-info-circle'></i> Este campo es
									obligatorio
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NewsLetter;
