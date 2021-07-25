import Axios from 'axios';

const getAgentAccounts = async (token, id) => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};
	const res = await Axios.get(
		'https://api.moni.pe/api/agentaccounts/' + id,
		header
	);
	return res.data;
};

export default getAgentAccounts;
