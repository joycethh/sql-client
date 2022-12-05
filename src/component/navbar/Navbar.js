import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  BedtimeOutlined,
  LightModeOutlined,
  SearchOutlined,
  PersonOutlineOutlined,
  NotificationsOutlined,
  EmailOutlined,
} from "@mui/icons-material/";

import "./navbar.scss";
import { DarkModeContext } from "../../context/darkModeContext";

const Navbar = () => {
  const { isDarkMode, toggle } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Funget2</span>
        </Link>
        <HomeOutlined />
        {isDarkMode ? (
          <LightModeOutlined onClick={toggle} />
        ) : (
          <BedtimeOutlined onClick={toggle} />
        )}
        <div className="search">
          <SearchOutlined />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlineOutlined />
        <EmailOutlined />
        <NotificationsOutlined />
        <div className="user">
          <img
            src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png"
            alt="user"
          />
          <span>user's name</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
