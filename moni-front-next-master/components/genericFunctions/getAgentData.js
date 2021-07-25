import Axios from 'axios';

const getAgent = async (token, id) => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	const resAgent = await Axios.get(
		'https://api.moni.pe/api/agentprofile/' + id,
		header
	);
	return resAgent.data[0];
};

export default getAgent;
