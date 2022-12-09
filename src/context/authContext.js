import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  // JSON.parse(localStorage.getItem("user")) || null

  const login = async (input) => {
    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      input,
      {
        withCredentials: true,
      }
    );
    console.log("login reponse", response);

    setCurrentUser(response.data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
