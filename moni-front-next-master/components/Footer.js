import React from 'react';

export const Footer = () => {
	return (
		<footer className='page-footer font-small mdb-color lighten-3 pt-1'>
			<div
				dangerouslySetInnerHTML={{
					__html:
						'<!-- Made with ♥ by Roshan Mishra and Dev Arora Github : https://github.com/rinem https://github.com/dr0id007 -->',
				}}
			/>

			<div className='container text-center text-md-left'>
				<div className='row'>
					<div className='col-md-4 col-lg-3 mr-auto my-md-4 my-0 mt-2 mb-1'>
						<a
							onClick={() => {
								window.location.href = '/';
							}}
						>
							<img
								src={require('../Data/img/Logo_text.png')}
								alt=''
								className='img-fluid'
							/>
						</a>
						<p>
							El mejor tipo de cambio para cambiar dólares y soles online en
							Lima, Perú
						</p>
					</div>

					{/* <hr className="clearfix w-100 d-md-none"></hr> */}

					<hr className='clearfix w-100 d-md-none'></hr>

					<div className='col-md-6 col-lg-3 mx-auto my-md-4 my-1 mt-1 mb-1'>
						<h5 className='font-weight-bold text-uppercase mb-2'>Contact</h5>

						<ul className='list-unstyled'>
							<li>
								<p>
									<i className='fa fa-home mr-1'></i> New York, NY 10012
								</p>
							</li>
							<li>
								<p>
									<i className='fa fa-envelope mr-1'></i> info@example.com
								</p>
							</li>
							<li>
								<p>
									<i className='fa fa-phone mr-1'></i> + 01 234 567 88
								</p>
							</li>
						</ul>
					</div>

					<hr className='clearfix w-100 d-md-none'></hr>

					<div className='col-md-2 col-lg-2 text-center mx-auto my-4'>
						<h5 className='font-weight-bold text-uppercase mb-4'>Follow Us</h5>

						<a type='button' className='btn-floating btn-fb'>
							<i className='fa fa-facebook'></i>
						</a>

						<a type='button' className='btn-floating btn-tw'>
							<i className='fa fa-twitter'></i>
						</a>

						<a type='button' className='btn-floating btn-gplus'>
							<i className='fa fa-whatsapp'></i>
						</a>

						<a type='button' className='btn-floating btn-dribbble'>
							<i className='fa fa-instagram'></i>
						</a>
					</div>
				</div>
				<style jsx>
					{`
						p,
						li,
						div a {
							margin: 0%;
						}
					`}
				</style>
			</div>

			<div className='footer-copyright text-center py-1 pb-3'>
				© 2020 Copyright:
				<a href='#'> Moni.pe</a>
			</div>
		</footer>
	);
};

export default Footer;
