import React, { useState } from 'react';
import Axios from 'axios';

const AdminContext = React.createContext();

export const Provider = props => {
	const [state, setState] = useState({
		token: '',
		isAuthenticated: false,
	});

	const addToken = token => {
		// console.log("admin login called..");
		const newState = state;
		newState.token = token;
		setState(newState);
	};

	const changeAuthenticated = () => {
		const newState = state;
		newState.isAuthenticated = true;
		setState(newState);
	};

	return (
		<AdminContext.Provider value={{ state, addToken, changeAuthenticated }}>
			{props.children}
		</AdminContext.Provider>
	);
};
export const Consumer = AdminContext.Consumer;

export default AdminContext;
