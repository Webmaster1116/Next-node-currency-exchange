import React, { useState, useEffect } from 'react';
import Layout from '../../components/Admin/Layout';
import { useRouter } from 'next/router';
import Navbar from '../../components/Transaction/Navbar';
import getOperation from '../../components/genericFunctions/getOperation';
import Cookies from 'js-cookie';

const transactiondetails = props => {
	const Router = useRouter();
	// console.log(Router.query);
	const [isLoading, setIsLoading] = useState(true);
	const [id, setId] = useState(Router.query.id);
	const [transaction, setTransaction] = useState('');

	const init = async () => {
		// console.log("id", id);
		const data = await getOperation(Cookies.get('token'), id);
		setTransaction(data);
		// console.log(data);
		setIsLoading(false);
	};

	useEffect(() => {
		init();
	}, []);

	if (isLoading === true) {
		<div className='page-loader'>
			<div className='loader'>Cargando...</div>
		</div>;
	}

	return (
		<>
			<Layout>
				<section className='min-section'>
					<Navbar />
					<div className='top'>
						<h4 className='center align-center orange'>
							Operación creada con éxito. Compruebe amablemente su correo
							electrónico para obtener más detalles sobre dónde transferir la
							cantidad necesaria.
						</h4>
						<h5 className='center align-center orange'>
							Operación id: {transaction._id}
						</h5>
					</div>
					<div className='text-center'>
						<button
							className='mt-2 btn btn-mod btn-border-w btn-medium btn-circle bold'
							onClick={() => {
								window.location.href = '/';
							}}
						>
							Moni
						</button>
						{/* <Button variant="primary">Save changes</Button> */}
					</div>
				</section>
				<style jsx>{`
					div,
					section {
						background: white;
					}
					.min-section {
						min-height: 100vh;
						background: white;
						background-image: url('images/bkg-neutro.jpg');
						background-attachment: fixed;
						background-repeat: no-repeat;
						background-size: cover;
					}
					.top {
						padding-top: 100px;
					}
				`}</style>
			</Layout>
		</>
	);
};

export default transactiondetails;
