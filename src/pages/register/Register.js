import { useState } from "react";
import { Link } from "react-router-dom";

import "./register.scss";
import axios from "axios";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    repeatedPassword: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        input
      );
      console.log("register response", response);
    } catch (error) {
      setErr(error.response.data);
    }
  };
  return (
    <div className="register">
      <div className="card">
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
            />
            {err && (
              <div className="error">
                <p>{err}</p>
              </div>
            )}
            <button onClick={handleSubmit}>Submit</button>
          </form>
        </div>
        <div className="left">
          <h1>Hello there!</h1>
          <p>There are tons of new feeds are waiting for you.</p>
          <span>Already have an acccount? </span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
