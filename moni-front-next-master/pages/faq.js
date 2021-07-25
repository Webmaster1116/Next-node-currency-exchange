import React from 'react';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar-dark';
import Footer from '../components/Footer2';

const faq = props => {
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
					<section className='page-section bg-gray pb-0  pt-70'>
						<div className='relative container align-left'>
							<div className='row'>
								<div className='col-md-8'>
									<h3 className='paso mt-30 mb-20 morado'>
										<i className='fa fa-file fa-2x'></i> Manuales
									</h3>
								</div>
							</div>
						</div>
					</section>
					<section className='page-section pt-20 pb-20'>
						<div className='relative container align-left'>
							<div className='col-sm-12 mb-xs-40 padding0'>
								<dl className='toggle'>
									<dt>
										<a href='#' className=''>
											¿Cómo crear una cuenta?
										</a>
									</dt>
									<dd style={{ display: 'none' }} className='mb-30'>
										Es sencillo crear una cuenta en Moni, primero entra al
										portal y regístrate en la plataforma, llena tus datos
										personales que usarás en esta cuenta. Luego selecciona tu
										ocupación, valida tu identidad con tu DNI, carnet de
										extranjería o pasaporte. Sigue las instrucciones para
										colocar una foto de tu documento y una selfie. Por último
										agrega tu cuenta bancaria.
									</dd>
									<dt>
										<a href='' className=''>
											¿Cómo realizar una operación?
										</a>
									</dt>
									<dd style={{ display: 'none' }} className='mb-30'>
										Una vez registrado inicia tu operación y activa el botón
										para realizar el cambio, si tienes un cupón, coloca el
										número del mismo en la casilla correspondiente y actívalo.
										Transfiere el dinero desde tu banca online a la cuenta de
										Moni que indica la pantalla. Recuerda salir de la pantalla
										ya que no auto-debitamos. Por último ingresa el código de
										operación, no olvides guardar el comprobante de
										transferencia y escribe en la pantalla el número de
										operación. La operación quedará confirmada por correo
										electrónico.
									</dd>
									<dt>
										<a href=''>¿Cómo validar mi identidad?</a>
									</dt>
									<dd style={{ display: 'none' }} className='mb-30'>
										Es necesario verificar tu identidad, ten a la mano tú DNI o
										algún documento de identificación, también puede ser carnet
										de extranjería o pasaporte. Evita que tu DNI este vencido,
										verifica que sea propio y estén tus datos con los que te has
										registrado, además tu documento debe estar en buen estado,
										no roto, y sin manchas. Siguiendo estas instrucciones tu
										documento no será rechazado. Selecciona una foto que tenga
										nitidez desde tu dispositivo, puedes hacer un archivo
										previo, también puedes tomar una foto nueva apretando el
										ícono de la cámara, realiza el mismo proceso al reverso de
										tu documento. Es indispensable que se lean todos los datos.
										Por ultimo toma foto de tu rostro y asegúrate que la cámara
										está centrada y rellena el espacio indicado
									</dd>
								</dl>
							</div>
						</div>
					</section>
					<section className='page-section bg-gray pb-10 pb-0  pt-0'>
						<div className='relative container align-left'>
							<div className='row'>
								<div className='col-md-8'>
									<h3 className='paso mt-30 mb-20'>
										<i className='fa  fa-info-circle fa-2x'></i> Información
										básica
									</h3>
								</div>
							</div>
						</div>
					</section>
					<section className='page-section pt-0 pb-20'>
						<div className='relative container align-left'>
							<div className='col-sm-12 mb-xs-40 padding0 mt-20'>
								<dl className='toggle'>
									<dt>
										<a href='#' className=''>
											4 cosas que debes saber antes de transferir
										</a>
									</dt>
									<dd style={{ display: 'none' }} className='mb-30'>
										<strong>Moni no acepta ni cheques ni efectivo</strong>
										<br />
										La plataforma Moni solo admite transferencias bancarias
										online, esta es la intención, además de digitalizar enviar y
										recibir transferencias en forma segura. Solo se puede enviar
										dinero de una cuenta bancaria a otra. <br />
										<strong>Usa detalles correctos en tu perfil</strong>
										<br /> Usa correctamente la plataforma introduce nombre
										completo, datos completos, no colocar iniciales ni puntos,
										el domicilio debe ser real e igual el número telefónico,
										también debes incluir un email personal que uses
										frecuentemente. <br />
										<strong>Verificar cuenta</strong>
										<br />
										Moni requiere saber quienes realizan transacciones en su
										plataforma, por este motivo de una u otra manera tu
										identidad será conformada en poco tiempo. <br />
										<strong>El envío de tu dinero</strong>
										<br /> La plataforma Moni tiene todos los certificados y
										permisos de seguridad para enviar con tranquilidad tu
										dinero.
									</dd>
									<dt>
										<a href='' className=''>
											¿Cuánto cuesta usar Moni?
										</a>
									</dt>
									<dd style={{ display: 'none' }} className='mb-30'>
										Moni no cobra comisiones por usar el servicio, solo utiliza
										el tipo de cambio que indica el mercado diariamente al
										momento en que se realizas la transferencia. Para estos
										fines puedes consultar la cantidad que deseas transferir
										para hacer la conversión.
									</dd>
									<dt>
										<a href=''>¿Quieres cancelar una transferencia?</a>
									</dt>
									<dd style={{ display: 'none' }} className='mb-30'>
										Si por alguna razón deseas cancelar una transferencia
										escribe a nuestro correo admin@moni.pe para realizar la
										cancelación de la transacción, y reembolsar el monto
										previamente verificado.
									</dd>
									<dt>
										<a href=''>Seguridad</a>
									</dt>
									<dd style={{ display: 'none' }} className='mb-30'>
										Moni, es una plataforma que se rige por la Superintendencia
										de Banca y Seguros (SBS). Nuestra licencia es 2017-00001857
										y fue otorgada en la Resolución N. 00335-2017. De este modo
										tus transacciones quedan aseguradas y garantizadas.
									</dd>
									<dt>
										<a href=''>¿Es segura Moni para cambiar dinero?</a>
									</dt>
									<dd style={{ display: 'none' }} className='mb-30'>
										Moni es una empresa constituida formalmente, con licencia y
										regulada por la SBS, sin embargo las transacciones que
										realices las garantiza el banco desde las cuales estas
										realizando las transferencias.
									</dd>
								</dl>
							</div>
						</div>
					</section>
					<section className='page-section bg-gray pb-10 pb-0  pt-0'>
						<div className='relative container align-left'>
							<div className='row'>
								<div className='col-md-8'>
									<h3 className='paso mt-30 mb-20'>
										<i className='fa fa-legal fa-2x'></i> Legal
									</h3>
								</div>
							</div>
						</div>
					</section>
					<section className='page-section pt-0 pb-20'>
						<div className='relative container align-left'>
							<div className='col-sm-12 mb-xs-40 padding0 mt-20'>
								<dl className='toggle'>
									<dt>
										<a href='#' className=''>
											Términos y condiciones
										</a>
									</dt>
									<dd style={{ display: 'none' }} className='mb-30'>
										Aenean est dolor, lacinia ac turpis ac, suscipit congue
										neque. Sed tincidunt purus metus, non tempus diam efficitur
										in. Donec lacus arcu, commodo eget nisl quis, ornare gravida
										justo. Nam leo libero, ultricies quis lectus eu, suscipit
										ornare velit. Fusce laoreet iaculis feugiat. Morbi luctus
										libero odio, nec placerat arcu interdum luctus. Mauris
										tincidunt nisi tellus, nec eleifend nunc gravida vel.
										Maecenas ex massa, pulvinar a purus vitae, consequat
										imperdiet lacus.
									</dd>
									<dt>
										<a href='' className=''>
											Políticas de privacidad
										</a>
									</dt>
									<dd style={{ display: 'none' }} className='mb-30'>
										Cras id eros ex. Nulla et sapien sollicitudin, facilisis
										sapien vel, accumsan erat. Vestibulum efficitur sapien
										turpis, vitae pulvinar dui lobortis eget. Nunc et auctor ex.
										Etiam eget pretium lorem, nec pellentesque risus. Nunc
										vulputate tristique placerat. Nulla nec pretium mi. Nulla
										quis efficitur lectus, sed imperdiet leo. Vivamus eros
										lorem, consectetur ac quam a, cursus consectetur lacus.
										Pellentesque risus dolor, bibendum et nisi quis, vulputate
										efficitur odio. Etiam fermentum elit in maximus blandit.
										Aenean malesuada faucibus mi, vel porttitor nulla placerat
										id. Nulla facilisi.
									</dd>
								</dl>
							</div>
						</div>
					</section>
					<Footer />
					<style jsx>{`
						body,
						div,
						section {
							background: transparent;
						}
						.bg-custom {
							background-image: url('images/bkg-neutro.jpg');
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
					`}</style>
				</div>
			</Layout>
		</>
	);
};

export default faq;
