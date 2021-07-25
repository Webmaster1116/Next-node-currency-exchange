import React, { useState } from 'react';
import Axios from 'axios';

const AgentContext = React.createContext();

export const Provider = props => {
	const [state, setState] = useState({
		token: '',
		userName: '',
		isLogin: false,
		id: '',
	});

	const addToken = token => {
		const newState = state;
		newState.token = token;
		setState(newState);
	};

	const addName = userName => {
		const newState = state;
		newState.userName = userName;
		newState.isLogin = true;
		setState(newState);
		// console.log(state);
	};

	const isUserAuth = async token => {
		const header = {
			headers: {
				'x-auth-token': token,
			},
		};

		const res = Axios.get('https://api.moni.pe/api/auth', header);
		// console.log('res:-', res);
	};

	return (
		<AgentContext.Provider value={{ state, addToken, isUserAuth, addName }}>
			{props.children}
		</AgentContext.Provider>
	);
};
export const Consumer = AgentContext.Consumer;

export default AgentContext;
