import React, { useState, useContext, useEffect } from 'react';
import Dashboard from '../../components/Admin/dashboard2';
import SideNavbar from '../../components/Admin/sideNavbar';

import AdminContext from '../../context/AdminContext';
import Fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';
import Router from 'next/router';
import Loader from '../../components/Loader';
import Layout from '../../components/Admin/Layout';
import Navbar from '../../components/Admin/topNavbar';

const admin_dashboard = () => {
	const { state, addToken } = useContext(AdminContext);
	const [isLogin, setIsLogin] = useState('');

	useEffect(() => {
		const init = async () => {
			const coo = Cookies.get('adminToken');
			addToken(coo);
			if (coo != '') {
				// console.log("all set");
				setIsLogin(true);
			} else {
				window.location.href = '/admin_login';
			}
		};

		init();
	});

	// if (isLogin === "") {
	//   return (
	//     // <div className="operation-view w-100 h-100">
	//     <Loader />
	//     // </div>
	//   );
	// }

	return (
		<Layout>
			<Navbar />
			<Dashboard />
		</Layout>
	);
};

export default admin_dashboard;
