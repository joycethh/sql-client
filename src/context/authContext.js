import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(); // JSON.parse(localStorage.getItem("user")) || null

  const login = async (input) => {
    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      input,
      {
        withCredentials: true,
      }
    );
    console.log("Login response:", response.data);

    setCurrentUser(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
  };

  const register = async (input) => {
    const response = await axios.post(
      "http://localhost:8000/api/auth/register",
      input,
      {
        withCredentials: true,
      }
    );

    setCurrentUser(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(currentUser));
  // }, [currentUser]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("currentUser from localStorage: ", user);
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // useEffect(() => {
  //   if (currentUser) {
  //     localStorage.setItem("user", JSON.stringify(currentUser));
  //   } else {
  //     localStorage.removeItem("user");
  //   }
  // }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
