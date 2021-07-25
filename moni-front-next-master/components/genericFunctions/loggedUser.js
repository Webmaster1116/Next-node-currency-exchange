import Axios from 'axios';

const loggedUser = async token => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};

	const res = await Axios.get('https://api.moni.pe/api/auth', header);
	// console.log(res, 'logged in data');
	return res.data._id;
};

export default loggedUser;
