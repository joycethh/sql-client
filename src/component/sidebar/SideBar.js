import { useContext } from "react";
import { Link } from "react-router-dom";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import "./sidebar.scss";
import { AuthContext } from "../../context/authContext";

const SideBar = () => {
  const { currentUser } = useContext(AuthContext);
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

          <div className="item">
            <ArticleOutlinedIcon />
            <Link to="/newsfeed">Newsfeed</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
