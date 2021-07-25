import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
// import "../Style/Navbar.css";
import LoginContext from '../context/LoginContext';
import UserContext from '../context/UserContext';
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

const Navbar = ({ router }) => {
	const context = useContext(LoginContext);
	const { state } = useContext(UserContext);
	const [islogin, setIsLogin] = useState(false);
	const [bg, setBg] = useState('rgba(7, 17, 39, 1)');
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

	const listenScrollEvent = e => {
		if (window.scrollY > 50) {
			setBg('rgba(7, 17, 39, 1)');
		} else {
			setBg('rgba(7, 17, 39, 1)');
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', listenScrollEvent);
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
		<header id='header' className='fixed-top'>
			<style jsx>{`
				#header {
					background: ${bg};
					// background-image: radial-gradient(circle, #007fb4, #0060a7, #001d7b);
				}
			`}</style>
			<div className='container'>
				<div className='logo float-left'>
					<Link href='/'>
						<a>
							<img
								src={require('../Data/img/Logo_text.png')}
								alt=''
								className=''
							/>
						</a>
					</Link>
				</div>
				<nav className='nav-menu float-right d-none d-lg-block'>
					<ul>
						<li>
							<Link href='/'>
								<a className='nav-link'>Nosotros</a>
							</Link>
						</li>
						<li className='nav-item'>
							<Link href='/contact'>
								<a>Contacto</a>
							</Link>
						</li>

						<li className='nav-item'>
							<Link href='/operation'>
								<a className='nav-link'>Operación</a>
							</Link>
						</li>
						{/* {login ? (
              <li className="nav-item ml-5">
                <Link href="/operation">
                  <a className="font-light nav-link btn outline-btn ">{name}</a>
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href={"/login"}>
                    Iniciar sesión
                  </a>
                </li>
                <li className="nav-item ml-5">
                  <Link href="/register">
                    <a className="nav-item btn outline-btn">Regístrate</a>
                  </Link>
                </li>
              </>
            )} */}

						{islogin ? (
							<>
								<li className='nav-item'>
									<button onClick={handleLogout} className='btn btn-logout'>
										<a className='nav-link text-uppercase'>Cerrar Sesión</a>
									</button>
								</li>
								<li className='nav-item ml-5'>
									<Link href='/operation'>
										<a className='font-light nav-link btn outline-btn '>
											{name}
										</a>
									</Link>
								</li>
							</>
						) : (
							<>
								<li className='nav-item'>
									<a className='nav-link' href={'/login'}>
										Iniciar sesión
									</a>
								</li>
								<li className='nav-item ml-5'>
									<Link href='/register'>
										<a className='nav-item btn outline-btn'>Regístrate</a>
									</Link>
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
			<style jsx>{`
				.btn-logout {
					font-size: 16px;
					margin: 0%;
					padding: 0%;
				}
			`}</style>
		</header>
	);
};

export default withRouter(Navbar);
