import Axios from 'axios';

const getAvailAgent = async token => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};

	const res = await Axios.get(
		'https://api.moni.pe/api/agent/',
		header
	).catch(err => console.log('agent err', err));
	return res.data;
};

export default getAvailAgent;
