import Axios from 'axios';

const GetProfile = async token => {
	const header = {
		headers: {
			'x-auth-token': token,
		},
	};

	const resProfile = await Axios.get(
		'https://api.moni.pe/api/profiles/',
		header
	);

	return resProfile.data[0];
};

export default GetProfile;
