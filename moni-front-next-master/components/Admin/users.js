import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Axios from 'axios';
import moment from 'moment';
import ViewUserPopup from './viewUserPopup';

const getUsers = async (token, page, limit) => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	const res = await Axios.get(
		'https://api.moni.pe/api/profiles/all' +
			'?page=' +
			page +
			'&limit=' +
			limit,
		header
	);
	return res.data;
};

const Users = props => {
	const [state, setState] = useState([]);
	const [userPopup, setUserPopup] = useState(false);
	const [user, setUser] = useState('');
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const init = async () => {
		// console.log(Cookies.get("adminToken"));
		setLoading(true);
		const data = await getUsers(Cookies.get('adminToken'), page, limit);
		setState(data);
		// console.log(data);
		setLoading(false);
	};

	useEffect(() => {
		init();
	}, []);

	useEffect(() => {
		init();
	}, [page]);

	return (
		<div>
			<section className='page-section min-section pt-30 mt-40'>
				<div className='container min-section'>
					<div className='row mt-10 mb-30'></div>
					<div className='row'>
						<div className='col-md-12'>
							{userPopup ? (
								<ViewUserPopup setViewUserPopup={setUserPopup} user={user} />
							) : (
								''
							)}
							{loading ? (
								<div className='loader'>Cargando...</div>
							) : (
								<Table responsive='sm' className='table table-striped'>
									<tbody>
										<tr>
											<th className='hidden-xs'></th>
											<th>Nombre de usuario</th>
											<th>Email</th>
											<th>Contacto</th>
											<th>Fecha de nacimiento</th>
											<th className='hidden-xs' />
										</tr>

										{state.map((user, index) => {
											return (
												<React.Fragment>
													<tr>
														<td className='hidden-xs' />
														<td>
															<button
																className='btn orange'
																onClick={e => {
																	setUser(user);
																	setUserPopup(!userPopup);
																}}
															>
																{user.firstName} {user.lastName}
															</button>
														</td>
														<td>{user.email}</td>
														<td>{user.phone}</td>
														<td>
															{moment(user.date).format('DD/MM/YYYY hh:mm')}
														</td>
														<td className='hidden-xs'></td>
													</tr>
												</React.Fragment>
											);
										})}
									</tbody>
								</Table>
							)}
						</div>
					</div>
					<div className='pagination'>
						<a
							href=''
							onClick={e => {
								e.preventDefault();
								page > 1 ? setPage(page - 1) : setPage(page);
							}}
						>
							<i className='fa fa-angle-left'></i>
						</a>
						<a
							href=''
							onClick={e => {
								e.preventDefault();
								setPage(page);
							}}
							className='active'
						>
							{page}
						</a>
						<a
							href=''
							onClick={e => {
								e.preventDefault();
								setPage(page + 1);
							}}
						>
							{page + 1}
						</a>
						<a
							href=''
							onClick={e => {
								e.preventDefault();
								setPage(page + 2);
							}}
						>
							{page + 2}
						</a>
						<a className='no-active'>...</a>
						<a
							href=''
							onClick={e => {
								e.preventDefault();
								setPage(page + 1);
							}}
						>
							<i className='fa fa-angle-right'></i>
						</a>
					</div>
				</div>
				<style jsx>{`
					.min-section {
						// min-height: 83vh;
						background: white;
						background-image: url('../images/bkg-neutro.jpg') !important;
						background-attachment: fixed;
						background-repeat: no-repeat;
						background-size: cover;
					}
					.btn {
						background: white;
						margin: 0px;
						padding: 0px;
					}
					.min-section {
						max-height: 900vh;
						min-height: 80vh;
						overflow: auto;
						white-space: nowrap;
					}
					.page-section {
						max-height: 100vh;
					}
					.btn {
						background: transparent;
						margin: 0px;
						padding: 0px;
					}
				`}</style>
			</section>
		</div>
	);
};

export default Users;
