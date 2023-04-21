import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { loading, error, login } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(input);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <div className="title">
            <h1>Login</h1>
            <Link to="/register"> Register</Link>
          </div>
          <form onSubmit={handleLogin}>
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
            {loading && (
              <div className="loading">
                <p>Loading</p>
              </div>
            )}
            {error && (
              <div className="error">
                <p>{error}</p>
              </div>
            )}
            <button onClick={handleLogin}>Submit</button>
          </form>
        </div>

        <div className="right">
          <h1>Welcome back!</h1>
          <p>There are tons of new feeds are waiting for you.</p>
          <span>New here?</span>
          <Link to="/register">
            <button> Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
