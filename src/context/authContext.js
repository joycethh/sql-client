import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
// export const useAuthContext = () => useContext(AuthContext);
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
    JSON.parse(localStorage.getItem("user"))
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("currentUser/user from localStorage: ", user);
    if (user) {
      setCurrentUser(user);
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
      console.log("Login response data:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setCurrentUser(response.data);
    } catch (error) {
      console.error(error);
    }
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
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   console.log("currentUser from localStorage: ", user);
  //   if (user) {
  //     setCurrentUser(user);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (currentUser) {
  //     localStorage.setItem("user", JSON.stringify(currentUser));
  //   } else {
  //     localStorage.removeItem("user");
  //   }
  // }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, login, register, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
