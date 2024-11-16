/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    (async () => {
      if (!getToken()) {
        if (isLoading) setIsLoading(false);
        return;
      }
      const validToken = await verifyToken();
      if (validToken === "ERROR")
        return console.error("Error al verificar el token");

      if (validToken) {
        setIsLogged(true);
      } else {
        removeToken();
      }

      setIsLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  async function verifyToken() {
    try {
      const request = await fetch(
        // import.meta.env.VITE_API_URL + 
        "http://localhost:8000/token/Verificar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const { status: tokenIsValid, data: tokenUserData } =
        await request.json();

      if (tokenIsValid) {
        setUserData(tokenUserData);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error al verificar el token: ", error);
      return "ERROR";
    }
  }

  function getToken() {
    return localStorage.getItem("auth_token");
  }

  function removeToken() {
    if (localStorage.getItem("auth_token")) {
      localStorage.removeItem("auth_token");
    }
  }

  function addToken(token) {
    token.startsWith("Bearer ")
      ? localStorage.setItem("auth_token", token)
      : localStorage.setItem("auth_token", `Bearer ${token}`);
  }

  function login(token) {
    addToken(token);
    setIsLogged(true);
  }

  function logout() {
    removeToken();
    setIsLogged(false);
    setUserData(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        isLoading,
        login,
        logout,
        getToken,
        addToken,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default () => {
  return useContext(AuthContext);
};
