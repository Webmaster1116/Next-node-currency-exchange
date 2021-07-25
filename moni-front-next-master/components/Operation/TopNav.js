import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Axios from 'axios';
import Cookies from 'js-cookie';
import Router, { withRouter } from 'next/router';

const getData = async token => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	const data = await Axios.get('https://api.moni.pe/api/auth', header);

	return data.data;
};

const TopNav = ({ props }) => {
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
		window.location.href = '/login';
	};

	// const [active, setActive] = useState(0);
	// const [sty, setSty] = useState(["active", "", "", ""]);
	// const [current, setCurrent] = useState(0);

	// const handleChange = (next) => {
	//   const prev = active;
	//   setActive(next);
	//   const style = sty;
	//   style[prev] = "";
	//   style[next] = "active";
	//   setSty(style);
	// };

	return (
		<>
			<nav className='main-nav dark stick-fixed'>
				<div className='container relative clearfix'>
					<div className='nav-logo-wrap local-scroll'>
						<Link href=''>
							<a
								onClick={() => {
									window.location.href = '/';
								}}
								className='logo'
							>
								<img src='images/logo-moni.png' alt='' />
							</a>
						</Link>
					</div>
					<div className='mobile-nav'>
						<a href='' className='fm-button'>
							<span></span>Menu
						</a>

						<div className='fm-wrapper' id='fullscreen-menu'>
							<div className='fm-wrapper-sub'>
								<div className='fm-wrapper-sub-sub'>
									<ul className='fm-menu-links scroll-nav local-scroll'>
										<li>
											<Link href=''>
												<a
													onClick={() => {
														window.location.href = '/profile';
													}}
												>
													Datos de perfil
												</a>
											</Link>
										</li>
										<li>
											<Link href=''>
												<a
													onClick={() => {
														window.location.href = '/bank';
													}}
												>
													Cuentas bancarias
												</a>
											</Link>
										</li>
										<li>
											<Link href=''>
												<a
													onClick={() => {
														window.location.href = '/history';
													}}
												>
													Historial de operaciones
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
													<span className='btn btn-mod btn-color btn-border-w btn-medium btn-circle bold'>
														Iniciar operación
													</span>
												</a>
											</Link>
										</li>
										<li>
											<a href=''>Elegir perfil</a>
										</li>
										<li>
											<Link href=''>
												<a
													onClick={() => {
														window.location.href = '/faq';
													}}
												>
													Ayuda
												</a>
											</Link>
										</li>
										<li>
											<a href='' onClick={handleLogout}>
												Cerrar sesión
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					<div className='inner-nav desktop-nav'>
						<ul className='clearlist scroll-nav local-scroll'>
							<li>
								<Link href=''>
									<a
										onClick={() => {
											window.location.href = '/bank';
										}}
									>
										Cuentas bancarias
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
										<span className='btn btn-mod btn-color btn-border-w btn-medium btn-circle bold'>
											Iniciar operación
										</span>
									</a>
								</Link>
							</li>
							<li>
								<a href='#' className='mn-has-sub'>
									<i className='fa fa-user fa-2x'></i> {name}{' '}
									<i className='fa fa-angle-down fa-2x'></i>
								</a>
								<ul className='mn-sub' style={{ display: 'none' }}>
									{/* <li>
                    <a href="">
                      <i className="fa fa-users fa-2x"></i> Elegir perfil
                    </a>
                  </li> */}
									<li>
										<Link href=''>
											<a
												onClick={() => {
													window.location.href = '/history';
												}}
											>
												<soan> Historial de operaciones</soan>
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
												Perfil
											</a>
										</Link>
									</li>

									{/* <li>
                    <Link href="">
                      <a
                        onClick={() => {
                          window.location.href = "/faq";
                        }}
                      >
                        <i className="fa fa-question-circle fa-2x" /> Ayuda
                      </a>
                    </Link>
                  </li> */}
									<li>
										<a>
											<button onClick={handleLogout} className='btn'>
												<i className='fa fa-sign-out fa-2x'></i> Cerrar sesión
											</button>
										</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
				<style jsx>
					{`
						.btn {
							background: transparent;
							margin: 0%;
							padding: 0%;
						}
						.btn:hover {
							color: white;
						}
					`}
				</style>
			</nav>
		</>
	);
};

export default TopNav;
