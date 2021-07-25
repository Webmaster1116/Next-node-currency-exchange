import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import Axios from 'axios';
import Cookies from 'js-cookie';

const getData = async token => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	const data = await Axios.get('https://api.moni.pe/api/auth', header);

	return data.data;
};

const Navbar2 = ({ router }) => {
	const [islogin, setIsLogin] = useState(false);
	const [name, setName] = useState('');

	const init = async () => {
		const coo = Cookies.get('token');
		// console.log('coo', coo);

		if (coo != undefined) {
			try {
				const data = await getData(coo);
				// console.log('name', data.name);
				setName(data.name);
				setIsLogin(true);
			} catch (error) {
				setIsLogin(false);
			}
		}
	};

	useEffect(() => {
		init();
	}, []);

	const handleLogout = () => {
		const res = Cookies.remove('token');
		// console.log('logout', res);
		if (router.pathname === '/' || router.pathname === '/index') {
			window.location.reload();
		} else {
			Router.push('/');
		}
	};

	return (
		<nav className='main-nav dark stick-fixed'>
			<div className='container relative clearfix'>
				<div className='nav-logo-wrap local-scroll'>
					<Link href=''>
						<a
							className='logo'
							onClick={() => {
								window.location.href = '/';
							}}
						>
							<img src='images/logo-moni.png' alt='logo' />
						</a>
					</Link>
				</div>
				<div className='mobile-nav'>
					<a href='#' className='fm-button'>
						<span></span>Menu
					</a>

					<div className='fm-wrapper' id='fullscreen-menu'>
						<div className='fm-wrapper-sub'>
							<div className='fm-wrapper-sub-sub'>
								<ul className='fm-menu-links scroll-nav local-scroll'>
									<li className='active'>
										<Link href=''>
											<a
												onClick={() => {
													window.location.href = '/nostros';
												}}
											>
												Nosotros
											</a>
										</Link>
									</li>
									<li>
										<Link href=''>
											<a
												onClick={() => {
													window.location.href = '/operation';
												}}
											>
												Operación
											</a>
										</Link>
									</li>
									<li>
										<Link href='/contact'>
											<a
												onClick={() => {
													window.location.href = '/contact';
												}}
											>
												Contact
											</a>
										</Link>
									</li>
									<li>
										<Link href='/login'>
											<a>Iniciar sesión</a>
										</Link>
									</li>
									<li>
										<Link href='/register'>
											<a>Regístrate</a>
										</Link>
									</li>
								</ul>

								<div className='fm-social-links'>
									<a href='#' title='Facebook' target='_blank'>
										<i className='fa fa-facebook'></i>
									</a>
									<a href='#' title='Twitter' target='_blank'>
										<i className='fa fa-twitter'></i>
									</a>
									<a href='#' title='Linkedin' target='_blank'>
										<i className='fa fa-linkedin'></i>
									</a>
									<a href='#' title='Instagram+' target='_blank'>
										<i className='fa fa-instagram'></i>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='inner-nav desktop-nav'>
					<ul className='clearlist scroll-nav local-scroll'>
						<li className='active'>
							<Link href='/nostros'>
								<a
									onClick={() => {
										window.location.href = '/nostros';
									}}
								>
									Nostros
								</a>
							</Link>
						</li>
						<li>
							<Link href=''>
								<a
									onClick={() => {
										window.location.href = '/operation';
									}}
								>
									Operación
								</a>
							</Link>
						</li>
						<li>
							<Link href=''>
								<a
									onClick={() => {
										window.location.href = '/contact';
									}}
								>
									Contacto
								</a>
							</Link>
						</li>

						{islogin ? (
							<>
								<li>
									<Link href='/login'>
										<a>
											<button onClick={handleLogout} className='btn'>
												<span className='btn btn-mod btn-border-w btn-circle bold btn-sesion'>
													Cerrar Sesión
												</span>
											</button>
										</a>
									</Link>
								</li>
								<li>
									<Link href=''>
										<a
											onClick={() => {
												window.location.href = '/profile';
											}}
										>
											<span className='btn btn-mod btn-color btn-border-w btn-medium btn-circle bold'>
												{name}
											</span>
										</a>
									</Link>
								</li>
							</>
						) : (
							<>
								<li>
									<Link href='/login'>
										<a>
											<span className='btn btn-mod btn-border-w btn-circle bold btn-sesion'>
												Iniciar sesión
											</span>
										</a>
									</Link>
								</li>
								<li>
									<Link href='/register'>
										<a>
											<span className='btn btn-mod btn-color btn-border-w btn-medium btn-circle bold'>
												Regístrate
											</span>
										</a>
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
			<style jsx>
				{`
					.btn {
						background: transparent;
					}
				`}
			</style>
		</nav>
	);
};

export default withRouter(Navbar2);
