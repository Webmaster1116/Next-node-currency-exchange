import Axios from 'axios';

const getAllTransactions = async (token, user) => {
	const body = {};
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};

	const res = await Axios.post(
		'https://api.moni.pe/api/operations/user',

		user,
		header
	);
	return res.data;
};

export default getAllTransactions;
