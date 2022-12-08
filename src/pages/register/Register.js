import { Link } from "react-router-dom";

import "./register.scss";

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Repeat Password" />
            <button>Submit</button>
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
