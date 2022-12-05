import { useContext } from "react";
import { Link } from "react-router-dom";
import "./login.scss";
import { AuthContext } from "../../context/authContext";
const Login = () => {
  const { currentUser, login } = useContext(AuthContext);
  const handleLogin = () => {
    login(currentUser);
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
          <form>
            <input type="text" placeHolder="Username" />
            <input type="password" placeHolder="Password" />
            <button onclick={handleLogin}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
