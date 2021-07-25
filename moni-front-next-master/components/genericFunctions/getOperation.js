import Axios from 'axios';

const getOperation = async (token, id) => {
	const body = {};
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};

	// console.log(body);
	const res = await Axios.get(
		'https://api.moni.pe/api/operations/' + id,
		header
	);
	return res.data;
};

export default getOperation;
