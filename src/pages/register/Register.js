import "./register.scss";

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeHolder="Username" />
            <input type="email" placeHolder="Email" />
            <input type="password" placeHolder="Password" />
            <input type="password" placeHolder="Repeat Password" />
            <button>Submit</button>
          </form>
        </div>
        <div className="left">
          <h1>Hello there!</h1>
          <p>There are tons of new feeds are waiting for you.</p>
          <span>Already have an acccount? </span>
          <button>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
