import Axios from 'axios';

const PutExchange = async (id, compra, venta) => {
	const resProfile = await Axios.put('https://api.moni.pe/api/exchange/' + id, {
		compra,
		venta,
	});

	return resProfile;
};

export default PutExchange;
