import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import "./sidebar.scss";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="container">
        <div className="menu">
          <div className="item" style={{ display: "flex" }}>
            <PersonOutlineOutlinedIcon />
            <span>user's name</span>
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
