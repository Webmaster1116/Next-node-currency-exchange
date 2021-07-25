import Axios from 'axios';

const verifyMail = async body => {
	const res = await Axios.post('https://api.moni.pe/api/verify/resend', body);
};

export default verifyMail;
