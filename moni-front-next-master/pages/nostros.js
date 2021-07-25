import React from 'react';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar-dark';
import Footer from '../components/Footer2';

const nostros = props => {
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
				<section
					class='page-section pt-xs-50 pb-100 min-section'
					id='about'
					style={{
						background: 'white',
						backgroundRepeat: 'repeat',
						backgroundImage: `url("images/bkg-neutro.jpg")`,
						backgroundAttachment: 'fixed',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						minMeight: '80vh',
					}}
				>
					<div class='container relative'>
						<div class='section-text mb-20 mb-sm-20'>
							<div class='row'>
								<h1 class='section-title pt-xs-40 mb-40 mb-sm-40'>
									Sobre nosotros
								</h1>
								<div class='container bg-hr mb-40'>
									<hr class='orange mt-0 mb-0' />
								</div>
								<div class='col-md-4'>
									<blockquote>
										<p class='orange'>
											Somos MONI, la mejor casa de cambio online de dólares y
											soles en Lima (Perú)
										</p>
										<footer>Prueba nuestro servicio</footer>
									</blockquote>
								</div>
								<div class='col-md-4 col-sm-6 mb-sm-50 mb-xs-30'>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
									maximus ligula semper metus pellentesque mattis. Maecenas
									volutpat, diam enim sagittis quam, id porta quam. Sed id dolor
									consectetur fermentum nibh volutpat, accumsan purus.
								</div>
								<div class='col-md-4 col-sm-6 mb-sm-50 mb-xs-30'>
									Etiam sit amet fringilla lacus. Pellentesque suscipit ante at
									ullamcorper pulvinar neque porttitor. Integer lectus. Praesent
									sed nisi eleifend, fermentum orci amet, iaculis libero. Donec
									vel ultricies purus. Nam dictum sem, eu aliquam.
								</div>
							</div>
							<hr class='gray' />
							<div class='col-sm-6 col-md-3 col-lg-3 pb-xs-20 wow fadeInUp'>
								<div class='alt-features-item align-center'>
									<div class='alt-features-icon icon7'> </div>
									<h3 class='orange bold mb-10'>Satisfacción</h3>
									<div class='alt-features-descr'>
										Ofrecemos{' '}
										<span class='bold'>la mejor experiencia de cambio</span> de
										dinero en Latinoamérica
									</div>
								</div>
							</div>
							<div
								class='col-sm-6 col-md-3 col-lg-3 pb-xs-20 wow fadeInUp'
								data-wow-delay='0.1s'
							>
								<div class='alt-features-item align-center'>
									<div class='alt-features-icon icon9'> </div>
									<h3 class='orange bold mb-10'>Seguridad</h3>
									<div class='alt-features-descr'>
										Servicio de transacción con todas las garantías,{' '}
										<span class='bold'>totalmente seguro</span> y confiable 100%
									</div>
								</div>
							</div>
							<div
								class='col-sm-6 col-md-3 col-lg-3 pb-xs-20 wow fadeInUp'
								data-wow-delay='0.2s'
							>
								<div class='alt-features-item align-center'>
									<div class='alt-features-icon icon10'> </div>
									<h3 class='orange bold mb-10'>Rapidez</h3>
									<div class='alt-features-descr'>
										<span class='bold'>Rápido, fácil y cómodo.</span> Nunca el
										poder cambiar tu dinero fue tan sencillo
									</div>
								</div>
							</div>
							<div
								class='col-sm-6 col-md-3 col-lg-3 pb-xs-20 wow fadeInUp'
								data-wow-delay='0.3s'
							>
								<div class='alt-features-item align-center'>
									<div class='alt-features-icon icon8'> </div>
									<h3 class='orange bold mb-10'>Ahorro</h3>
									<div class='alt-features-descr'>
										Disfruta del{' '}
										<span class='bold'>tipo de cambio de dólares y soles</span>{' '}
										más bajo del mercado digital
									</div>
								</div>
							</div>
						</div>

						<div class='col-lg-6 col-lg-offset-3 mt-90'>
							<img src='images/nosotros.svg' alt='nosotros' />
						</div>
					</div>
				</section>
				<Footer />
				<style jsx>
					{`
						.min-section,
						.container,
						.relative {
							background: white;
							background-image: url('images/bkg-neutro.jpg');
							background-attachment: fixed;
							background-repeat: no-repeat;
							background-size: cover;
							min-height: 800vh;
						}
					`}
				</style>
			</Layout>
		</>
	);
};

export default nostros;
