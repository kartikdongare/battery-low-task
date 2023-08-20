/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [inputData, setInputData] = useState();
  return (
    <UserContext.Provider value={{ inputData, setInputData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useData = () => {
  return useContext(UserContext);
};
