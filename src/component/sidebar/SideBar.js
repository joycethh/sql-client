import { useContext } from "react";

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
            <span>{currentUser.name}</span>
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
