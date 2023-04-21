import { Link } from "react-router-dom";
// import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import "./sidebar.scss";
import { useAuthContext } from "../../context/authContext";

const SideBar = () => {
  const { currentUser, logout } = useAuthContext();
  return (
    <div className="sidebar">
      <div className="container">
        <div className="menu">
          <div className="item">
            <img src={currentUser?.profilePic} alt="" />
            <Link
              to={`/profile/${currentUser?.id}`}
              style={{ textDecoration: "none" }}
            >
              {currentUser?.name}
            </Link>
          </div>

          {/* <div className="item">
            <ArticleOutlinedIcon />
            <Link to="/newsfeed">Newsfeed</Link>
          </div> */}

          <div className="item">
            <LogoutOutlinedIcon />
            <button onClick={() => logout()}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
