import React, { useState, useContext, useEffect } from 'react';
import TopNav from '../components/Operation/TopNav';
import NewOperation from '../components/Operation/NewOperation';
import ProfileView from '../components/Operation/ProfileView';
import BankAccount from '../components/Operation/BankAccountsView';
import OperationHistory from '../components/Operation/OperationHistory';
import Layout from '../components/Layout';
import UserContext from '../context/UserContext';
import Fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';
import Router from 'next/router';
import Navbar from '../components/Navbar2';
import Loader from '../components/Loader';
import Head from 'next/head';

const operation = props => {
	const { state, isUserAuth } = useContext(UserContext);

	const [isLogin, setIsLogin] = useState('');

	useEffect(() => {
		const init = async () => {
			const coo = Cookies.get('token');
			// console.log('coo', coo);

			if (coo != undefined) {
				// console.log('all set');
				setIsLogin(true);
			} else {
				Router.push('/login');
			}
		};

		init();
	}, []);

	const [view, setView] = useState([
		<NewOperation data={props} />,
		<ProfileView />,
		<BankAccount />,
		<OperationHistory />,
	]);
	const [tab, setTab] = useState(0);

	const handleClick = no => {
		setTab(no);
		// console.log(no);
		// console.log(state[tab]);
	};

	// if (isLogin === "") {
	//   return (
	//     // <div className="operation-view w-100 h-100">
	//     <Loader />
	//     // </div>
	//   );
	// }

	return (
		<>
			<Layout>
				<div className='appear-animate'>
					<div className='appear-animate'>
						<TopNav handleClick={handleClick} state={view[tab]} />
						<NewOperation data={props} />
						{/* <ProfileView /> */}
					</div>

					<style jsx>{`
						div,
						section {
							background: white;
						}
					`}</style>
				</div>
			</Layout>
		</>
	);
};

operation.getInitialProps = async function () {
	const res = await Fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
	const res2 = await Fetch(
		'https://api.moni.pe/api/exchange/calculate?originCurrency=USD&destinationCurrency=PEN&amount=1'
	);
	const res3 = await Fetch(
		'https://api.moni.pe/api/exchange/calculate?originCurrency=PEN&destinationCurrency=USD&amount=1'
	);
	// const res2 = { USD_PEN: "3.133" };
	//testing
	const data = await res.json();
	// const data2 = await res2.json();
	const data2 = await res2.json();
	const data3 = await res3.json();
	return {
		soles: data2.rate,
		usd: data3.rate,
		savingsCompra: data2.ahorros,
		savingsVenta: data3.ahorros,
		bpi: data.bpi,
	};
};

export default operation;
