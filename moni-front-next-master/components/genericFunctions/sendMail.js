import Axios from 'axios';

const sendMail = async (token, email, endpoint, operation) => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};

	const {
		profileDetails,
		bankDetails,
		transaction,
		id,
		agent,
		agentBank,
		agentEmail,
	} = operation;

	const date = new Date().toLocaleString();

	const body = {
		email: email,
		profileDetails,
		bankDetails,
		transaction,
		date,
		id,
		agent,
		agentBank,
		agentEmail,
	};

	const res = await Axios.post(
		'https://api.moni.pe/api/mail/' + endpoint,
		// "http://localhost:5000/api/mail/" + endpoint,
		body,
		header
	);
	// console.log(res);
	return res;
};

export default sendMail;
