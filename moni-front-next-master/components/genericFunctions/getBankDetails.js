import Axios from 'axios';

const getBankDetails = async token => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};

	const res = await Axios.get('https://api.moni.pe/api/accounts/', header);

	return res.data;
};

export default getBankDetails;
