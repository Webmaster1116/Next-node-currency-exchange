import Axios from 'axios';

const postOperation = async (
	token,
	profileDetails,
	bankDetails,
	amountToPay,
	amountReceive,
	currencyTo,
	currencyFrom,
	agent,
	commissionValue,
	commissionType,
	transactionNumber,
	agentBank,
	savings,
	exchange,
	destinationBank,
	userTransactionPhoto
) => {
	const transaction = {
		amountToPay,
		amountReceive,
		currencyTo,
		currencyFrom,
		savings,
		exchange,
		status: 'Pago pendiente',
	};
	const body = {
		profileDetails,
		bankDetails,
		transaction,
		agent,
		agentBank,
		commissionValue,
		commissionType,
		transactionNumber,
		savings,
		exchange,
		destinationBank,
		userTransactionPhoto,
	};

	var bodyFormData = new FormData();

	bodyFormData.append('profileDetails', JSON.stringify(profileDetails));
	bodyFormData.append('bankDetails', JSON.stringify(bankDetails));
	bodyFormData.append('transaction', JSON.stringify(transaction));
	bodyFormData.append('agent', JSON.stringify(agent));
	bodyFormData.append('agentBank', JSON.stringify(agentBank));
	bodyFormData.append('commissionValue', JSON.stringify(commissionValue));
	bodyFormData.append('commissionType', JSON.stringify(commissionType));
	bodyFormData.append('transactionNumber', JSON.stringify(transactionNumber));
	bodyFormData.append('destinationBank', JSON.stringify(destinationBank));
	bodyFormData.append('savings', JSON.stringify(savings));
	bodyFormData.append('exchange', JSON.stringify(exchange));
	bodyFormData.append('file', userTransactionPhoto);
	// console.log(bodyFormData, 'bod');
	const header = {
		headers: {
			'Content-Type': 'multipart/form-data, boundary=${form._boundary}',
			'x-auth-token': token,
		},
	};
	const res = await Axios.post(
		'https://api.moni.pe/api/operations/',
		bodyFormData,
		header
	);
	// console.log(res);
	return res;
};

export default postOperation;
