import { Link } from "react-router-dom";
import {
  HomeOutlined,
  BedtimeOutlined,
  LightModeOutlined,
  SearchOutlined,
  PersonOutlineOutlined,
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
          <input type="text" placeholder="Search..." />
          <SearchOutlined />
        </div>
      </div>
      <div className="right">
        {/* <AddCircleOutlineOutlined /> */}
        {currentUser ? (
          <div className="user">
            <img src={currentUser?.profilePic} alt="" />
            <span>{currentUser?.name}</span>
          </div>
        ) : (
          <PersonOutlineOutlined />
        )}
      </div>
    </div>
  );
};

export default Navbar;
