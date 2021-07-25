import React, { useContext } from 'react';
import AlertContext from '../context/alert/alertContext';

const Alerts = () => {
	const alertContext = useContext(AlertContext);
	// console.log(alertContext.alerts);
	return (
		alertContext.alerts.length > 0 && (
			<div
				key={alertContext.alerts[0].id}
				className={`mt-4 alert alert-${alertContext.alerts[0].type}`}
			>
				<i className='fa fa-info-circle' />{' '}
				<strong>Alerta: {alertContext.alerts[0].msg}</strong>
				<style jsx>{`
					div {
						width: 100%;
						height: 75px;
						z-index: 999999;
						position: absolute;
						margin-left: auto;
						margin-right: auto;
						top: 0;
						left: 0;
						right: 0;
						text-align: center;
						background-color: #e55729;
						border: 1px solid black;
						// background: linear-gradient(180deg, rgba(230, 165, 60, 1) 47%, rgba(230, 165, 60, 1) 0%, rgba(229, 80, 39, 1) 100%);
						color: #fff;
						font-size: 16px;
					}
				`}</style>
			</div>
		)
	);
};

export default Alerts;
