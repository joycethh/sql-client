import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return authContext;
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); //check if there is a user in the local storage
    if (user) {
      setCurrentUser(user);
      localStorage.removeItem("user"); //remove
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (input) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        input,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      setCurrentUser(response.data);
    } catch (error) {
      setError(error.response.data);
    }
  };

  const register = async (input) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        input,
        {
          withCredentials: true,
        }
      );

      setCurrentUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      setError(error.response.data);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, error, login, register, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
