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
          <div className="item" style={{ display: "flex" }}>
            <img src={currentUser.profilePic} alt="" />

            <span>
              <Link
                to={`/profile/${currentUser.id}`}
                style={{ textDecoration: "none" }}
              >
                {currentUser.name}
              </Link>
            </span>
          </div>

          <div className="item">
            <ArticleOutlinedIcon />
            <span>Newsfeed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
