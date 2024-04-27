import React, { createContext, useContext, useState } from "react";

const TokenContext = createContext();
const AccessTokenContext = ({ children }) => {
  const accessTokenFromLocalStorage = localStorage.getItem("accessToken")
    ? JSON.parse(localStorage.getItem("accessToken"))
    : "";
  const [accessToken, setAccessToken] = useState(accessTokenFromLocalStorage);
  return (
    <>
      <TokenContext.Provider value={{ accessToken, setAccessToken }}>
        {children}
      </TokenContext.Provider>
    </>
  );
};

export const useAccessToken = () => useContext(TokenContext);
export default AccessTokenContext;
