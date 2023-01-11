import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (input) => {
    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      input,
      {
        withCredentials: true,
      }
    );

    setCurrentUser(response.data);
  };

  const register = async (input) => {
    const response = await axios.post(
      "http://localhost:8000/api/auth/register",
      input,
      {
        withCredentials: true,
      }
    );
    console.log("register response", response);

    setCurrentUser(response.data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  // console.log("currentuser in authcontext", currentUser);

  return (
    <AuthContext.Provider value={{ currentUser, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
