import "./login.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Welcome back!</h1>
          <p>There are tons of new feeds are waiting for you.</p>
          <span>New here?</span>
          <button> Register</button>
        </div>

        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeHolder="Username" />
            <input type="password" placeHolder="Password" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
