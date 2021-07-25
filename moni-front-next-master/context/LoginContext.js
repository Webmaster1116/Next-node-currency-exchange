import React, { useState } from "react";

const UserContext = React.createContext({
  showLogin: false,
});

export const Provider = (props) => {
  const [state, setState] = useState({ showLogin: false });

  const toggleLogin = () => {
    const { showLogin } = state;
    setState({ showLogin: !showLogin });
  };

  return (
    <UserContext.Provider value={{ state, toggleLogin }}>
      {props.children}
    </UserContext.Provider>
  );
};
export const Consumer = UserContext.Consumer;

export default UserContext;
