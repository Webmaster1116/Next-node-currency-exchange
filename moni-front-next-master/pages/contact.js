import React from 'react';
import { Container } from 'next/app';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar-dark';
import Footer from '../components/Footer2';

export const contact = () => {
	console.log(
		'Made with ♥ by Roshan Mishra and Dev Arora Github : https://github.com/rinem https://github.com/dr0id007'
	);
	return (
		<>
			<Layout>
				<div class='page-loader'>
					<div class='loader'>Cargando...</div>
				</div>
				<Navbar />

				<div className='bg-custom'>
					<section class='page-section pt-xs-50' id='contact'>
						<div class='container relative'>
							<h1 class='section-title pt-xs-40 mb-40 mb-sm-40'>
								Contacta con nosotros
							</h1>
							<div class='container bg-hr mb-40'>
								<hr class='orange mt-0 mb-0' />
							</div>
							<div class='row mb-40 mb-xs-40'>
								<div class='col-md-12'>
									<div class='row'>
										<div class='col-sm-6 col-lg-4 pt-20 pb-20 pb-xs-0'>
											<div class='contact-item'>
												<div class='ci-icon'>
													<i class='fa fa-phone'></i>
												</div>
												<div class='ci-title'>
													<h5 class='bold mt-0 mb-0'>Teléfono</h5>
												</div>
												<div class='ci-text'>+61 3 8376 6284</div>
											</div>
										</div>

										<div class='col-sm-6 col-lg-4 pt-20 pb-20 pb-xs-0'>
											<div class='contact-item'>
												<div class='ci-icon'>
													<i class='fa fa-map-marker'></i>
												</div>
												<div class='ci-title'>
													<h5 class='bold mt-0 mb-0'>Dirección</h5>
												</div>
												<div class='ci-text'>
													C/ República de Chile 38
													<br />
													15073 Lima (Perú)
												</div>
											</div>
										</div>

										<div class='col-sm-6 col-lg-4 pt-20 pb-20 pb-xs-0'>
											<div class='contact-item'>
												<div class='ci-icon'>
													<i class='fa fa-envelope'></i>
												</div>
												<div class='ci-title'>
													<h5 class='bold mt-0 mb-0'>Email</h5>
												</div>
												<div class='ci-text'>
													<a href='mailto:contacto@movi.pe'>contacto@movi.pe</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<hr class='gray pb-50 pb-xs-20' />

							<div class='row'>
								<div class='col-md-12'>
									<form class='form-normal'>
										<div class='clearfix'>
											<div class='cf-left-col'>
												<div class='form-group'>
													<input
														type='text'
														name=''
														id=''
														class='input-sm'
														style={{ height: '80px' }}
														placeholder='*Nombre'
														pattern='.{3,100}'
														required=''
													/>
												</div>

												<div class='form-group'>
													<input
														type='text'
														name=''
														id=''
														class='input-sm'
														style={{ height: '80px' }}
														placeholder='*Email'
														pattern='.{3,100}'
														required=''
													/>
												</div>
											</div>
											<div class='cf-right-col'>
												<div class='form-group'>
													<textarea
														name='message'
														id='message'
														class='input-sm'
														style={{ height: '175px' }}
														placeholder='Message'
													></textarea>
												</div>
											</div>
										</div>
										<div class='clearfix'>
											<div class='cf-left-col'>
												<div class='form-tip pt-20'>
													<i class='fa fa-info-circle'></i> Los campos marcados
													con * son obligatorios
												</div>
											</div>
											<div class='cf-right-col'>
												<div class='align-right pt-10'>
													<button
														class='btn btn-mod btn-color btn-large btn-circle'
														id='submit_btn'
													>
														Enviar mensaje
													</button>
												</div>
											</div>
										</div>
										<div id='result'></div>
									</form>
								</div>
							</div>
						</div>
					</section>
					<style jsx>{`
            
            body,
            div,
            section {
              background: transparent;
            }
            .bg-custom {
              background-image: url("images/bkg-neutro.jpg");
              background-attachment: fixed;
              background-repeat: no-repeat;
              background-size: cover;
            }
            
            .main-nav.transparent {
              background: black !important;
            }
            .main-nav dark transparent stick-fixed {
              background: black !important;
            }
            .main-nav.transparent {
              background: black !important;
            }
            textarea.input-sm { 
              border-radius: 35px !important; 
              padding 30px !important;
              
            } 
          `}</style>
					<Footer />
				</div>
			</Layout>
		</>
	);
};

export default contact;
