import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

const forgetpassword = () => {
	const [email, setEmail] = useState('');
	const [sendMail, setSendMail] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();
		const body = {
			email,
		};

		// console.log('reset called');
		const res = await axios.post(
			// "http://localhost:5000/api/forget/forgetpassword",
			'https://api.moni.pe/api/forget/forgetpassword',
			body
		);
		// console.log('res:-', res);
		setSendMail(true);
	};

	return (
		<>
			<Head>
				<title>Moni</title>
				<link rel='shortcut icon' href='images/favicon.png' />
				<link rel='apple-touch-icon' href='images/apple-touch-icon.png' />
				<link
					rel='apple-touch-icon'
					sizes='72x72'
					href='images/apple-touch-icon-72x72.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='114x114'
					href='images/apple-touch-icon-114x114.png'
				/>
			</Head>
			<link rel='stylesheet' href='css/bootstrap.min.css' />
			<link rel='stylesheet' href='css/style.css' />
			<link rel='stylesheet' href='css/style-responsive.css' />
			<link rel='stylesheet' href='css/animate.min.css' />
			<link rel='stylesheet' href='css/vertical-rhythm.min.css' />
			<link rel='stylesheet' href='css/magnific-popup.css' />
			<div className='page-loader'>
				<div className='loader'>Cargando...</div>
			</div>

			<div className='page' id='top'>
				<section className='page-section pt-20 pb-0'>
					<div className='home-content container'>
						<div className='home-text'>
							<div className='container align-center'>
								<div className='row'>
									<div className='col-sm-5 col-sm-push-3'>
										<form className='form white'>
											<img
												src='images/logo-moni.png'
												alt='Moni'
												width='150px'
											/>
											<h1 className='section-title pt-80 pt-xs-40 mb-40 mb-sm-40'>
												Recuperar contraseña
											</h1>
											<input
												type='text'
												name='email'
												id='email'
												className='input-sm bold'
												placeholder='Correo electrónico'
												value={email}
												onChange={e => setEmail(e.target.value)}
												pattern='.{3,100}'
											/>
											<i className='fa fa-envelope fa-2x campoform'></i>
											<button
												className='btn btn-mod btn-color btn-border-w btn-large btn-circle mb-20'
												onClick={handleSubmit}
											>
												Enviar
											</button>
											<p className='mt-20'>
												¿Ya recuerdas tu contraseña?
												<br />
												<Link href='/login'>Inicia sesión</Link>
											</p>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>

			<script type='text/javascript' src='js/jquery-1.11.2.min.js'></script>
			<script type='text/javascript' src='js/jquery.easing.1.3.js'></script>
			<script type='text/javascript' src='js/bootstrap.min.js'></script>
			<script type='text/javascript' src='js/SmoothScroll.js'></script>
			<script type='text/javascript' src='js/jquery.scrollTo.min.js'></script>
			<script
				type='text/javascript'
				src='js/jquery.localScroll.min.js'
			></script>
			<script type='text/javascript' src='js/jquery.viewport.mini.js'></script>
			<script type='text/javascript' src='js/jquery.countTo.js'></script>
			<script type='text/javascript' src='js/jquery.appear.js'></script>
			<script type='text/javascript' src='js/jquery.sticky.js'></script>
			<script type='text/javascript' src='js/jquery.parallax-1.1.3.js'></script>
			<script type='text/javascript' src='js/jquery.fitvids.js'></script>
			<script type='text/javascript' src='js/owl.carousel.min.js'></script>
			<script type='text/javascript' src='js/isotope.pkgd.min.js'></script>
			<script type='text/javascript' src='js/imagesloaded.pkgd.min.js'></script>
			<script
				type='text/javascript'
				src='js/jquery.magnific-popup.min.js'
			></script>
			{/* <script type="text/javascript" src="js/wow.min.js"></script> */}
			<script type='text/javascript' src='js/masonry.pkgd.min.js'></script>
			<script type='text/javascript' src='js/all.js'></script>
			<script type='text/javascript' src='js/main.js'></script>
		</>
	);
};

export default forgetpassword;

// if (sendMail === true) {
//   return (
//     <>
//       <Head>
//         <title>Moni</title>
//         <link rel="shortcut icon" href="images/favicon.png" />
//         <link rel="apple-touch-icon" href="images/apple-touch-icon.png" />
//         <link
//           rel="apple-touch-icon"
//           sizes="72x72"
//           href="images/apple-touch-icon-72x72.png"
//         />
//         <link
//           rel="apple-touch-icon"
//           sizes="114x114"
//           href="images/apple-touch-icon-114x114.png"
//         />
//       </Head>
//       <Layout>
//         <div className="loading w-100 h-100">
//           <div className="loader">Check mail for further process.</div>
//           <style>{`
//       .loading {
//         overflow: hidden
//         margin: 0px;
//         padding: 300px;
//         height: 100%;
//         background: #071127;
//         color: white;
//         text-align: center;
//       }
//     `}</style>
//         </div>
//       </Layout>
//     </>
//   );
// }

// return (
//   <Layout>
//     <div className="register-container">
//       <form>
//         <div className="form-group">
//           <input
//             className="input-control"
//             placeholder="enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <button className="btn" onClick={handleSubmit}>
//           Reset Password
//         </button>
//       </form>
//     </div>
//     <style jsx>
//       {`
//         html {
//           height: 100%;
//           background-color: rgba(7, 17, 39, 1);
//         }
//         .register-container {
//           text-align: center;
//           margin: 100px auto;
//           width: 400px;
//           height: 450px;
//           align-items: center;
//           background-color: rgba(13, 27, 65, 0.9);
//           // background: #071127;
//           border-radius: 10px;
//           padding: 50px;
//           position: fixed;
//           padding: 50px;
//           left: 50%;
//           top: 20%;
//           transform: translate(-50%, -20%);
//           color: white;
//         }
//         .btn:hover {
//           color: white;
//         }
//       `}
//     </style>
//   </Layout>
// );
