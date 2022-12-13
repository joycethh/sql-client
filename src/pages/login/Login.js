import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const { login } = useContext(AuthContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(input);
      navigate("/");
    } catch (error) {
      console.log(error);
      setErr(error.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Welcome back!</h1>
          <p>There are tons of new feeds are waiting for you.</p>
          <span>New here?</span>
          <Link to="/register">
            <button> Register</button>
          </Link>
        </div>

        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            {err && (
              <div className="error">
                <p>{err}</p>
              </div>
            )}
            <button onClick={handleLogin}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
