import Axios from 'axios';

const getAgentId = async token => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	const resAgent = await Axios.get(
		'https://api.moni.pe/api/agent/auth',
		header
	);
	return resAgent.data._id;
};

export default getAgentId;
