import React, { useEffect } from 'react';
import Fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import Prices from '../components/Prices';
import Features from '../components/Features';
import Home from '../components/Home';
import Login from '../components/Login/Login';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import Subscribe from '../components/Subscribe';
import Steps from '../components/Steps';
import Cookies from 'js-cookie';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import Home2 from '../components/Home2';
import Banner2 from '../components/Banner2';
import Function from '../components/Function';
import Data from '../components/Data';
import CreateAlert from '../components/CreateAlert';
import NewsLetter from '../components/NewsLetter';
import Footer2 from '../components/Footer2';
import Navbar2 from '../components/Navbar2';
const isServer = typeof window === 'undefined';
const WOW = !isServer ? require('wowjs') : null;
import Head from 'next/head';

const Index = props => {
	const coo = Cookies.get('token');

	useEffect(() => {
		// wowjs init
		// if (typeof window !== "undefined") {
		//   window.WOW = wowjs;
		// }

		new WOW.WOW().init();
		// const publicVapidKey =
		//   "BBzxUnsSFfJls1TkK3_3EPsOrN3iI05ZjUvB8fc03Vezvh2Bo39c3oV-sT0_x-bYCEgPAMgvbeLqrDgHTxYsCAA";
		// // Check for service worker
		// if ("serviceWorker" in navigator) {
		//   send().catch((err) => console.error(err));
		// }
		// // Register SW, Register Push, Send Push
		// async function send() {
		//   // Register Service Worker
		//   console.log("Registering service worker...");
		//   const register = await navigator.serviceWorker.register("/sw.js", {
		//     scope: "/",
		//   });
		//   console.log("Service Worker Registered...");
		//   // Register Push
		//   console.log("Registering Push...");
		//   const subscription = await register.pushManager.subscribe({
		//     userVisibleOnly: true,
		//     applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
		//   });
		//   console.log("Push Registered...", subscription);
		//   // Send Push Notification
		//   console.log("Sending Push...");
		//   await fetch("http://localhost:5000/api/notifications/subscribe", {
		//     method: "POST",
		//     body: JSON.stringify(subscription),
		//     headers: {
		//       "content-type": "application/json",
		//     },
		//   });
		//   console.log("Push Sent...");
		// }
		// function urlBase64ToUint8Array(base64String) {
		//   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
		//   const base64 = (base64String + padding)
		//     .replace(/\-/g, "+")
		//     .replace(/_/g, "/");
		//   const rawData = window.atob(base64);
		//   const outputArray = new Uint8Array(rawData.length);
		//   for (let i = 0; i < rawData.length; ++i) {
		//     outputArray[i] = rawData.charCodeAt(i);
		//   }
		//   return outputArray;
		// }
	}, []);

	return (
		<>
			{/* <Navbar /> */}
			{/* <Login /> */}
			{/* <Home data={props} /> */}
			<Layout>
				<div className='appear-animate'>
					{/* <div className="page-loader">
            <div className="loader">Cargando...</div>
          </div> */}

					<div className='page' id='top'></div>
					<Home2 data={props} />
					<Navbar2 />
					<Banner2 />
					<Function />
					<Data />
					<CreateAlert />
					<NewsLetter />
					<Footer2 />
				</div>
			</Layout>
		</>
	);
};

Index.getInitialProps = async function () {
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

export default Index;
