import { Link } from "react-router-dom";
import {
  HomeOutlined,
  BedtimeOutlined,
  LightModeOutlined,
  SearchOutlined,
  PersonOutlineOutlined,
  NotificationsOutlined,
  EmailOutlined,
  AddCircleOutlineOutlined,
} from "@mui/icons-material/";

import "./navbar.scss";
import { useDarkModeContext } from "../../context/darkModeContext";
import { useAuthContext } from "../../context/authContext";

const Navbar = () => {
  const { isDarkMode, toggle } = useDarkModeContext();
  const { currentUser } = useAuthContext();
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
        <Link to="/create" style={{ textDecoration: "none" }}>
          <AddCircleOutlineOutlined />
        </Link>
        <div className="user">
          <img src={currentUser?.profilePic} alt="" />
          <span>{currentUser?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
