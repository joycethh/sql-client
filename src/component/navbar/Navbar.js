import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BedtimeOutlined,
  LightModeOutlined,
  SearchOutlined,
  PersonOutlineOutlined,
  LogoutOutlined,
  // AddCircleOutlineOutlined,
} from "@mui/icons-material/";

import "./navbar.scss";
import { useDarkModeContext } from "../../context/darkModeContext";
import { useAuthContext } from "../../context/authContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggle } = useDarkModeContext();
  const { currentUser, logout } = useAuthContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Funget2</span>
        </Link>

        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlined />
        </div>
      </div>
      <div className="dropdown-container">
        <div className="right">
          {/* <AddCircleOutlineOutlined /> */}
          {currentUser ? (
            <div className="user" onClick={toggleMenu}>
              <img src={currentUser?.profilePic} alt="" />
              <span>{currentUser?.name}</span>
            </div>
          ) : (
            <PersonOutlineOutlined />
          )}
        </div>

        {isMenuOpen && (
          <div className="dropdown-menu">
            <div className="menu-item" onClick={() => logout()}>
              <LogoutOutlined /> Logout
            </div>
            <div className="menu-item" onClick={toggle}>
              {isDarkMode ? <LightModeOutlined /> : <BedtimeOutlined />} Light
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
