import Axios from 'axios';

const PostNewsletter = async email => {
	const resProfile = await Axios.post('https://api.moni.pe/api/newsletter', {
		email,
	});

	return resProfile;
};

export default PostNewsletter;
