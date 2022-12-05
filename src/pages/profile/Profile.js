import React from "react";
import {
  FacebookTwoTone,
  LinkedIn,
  Twitter,
  Language,
  EmailOutlined,
  PlaceOutlined,
  MoreHoriz,
} from "@mui/icons-material/";
import "./profile.scss";
// import { AuthContext } from "../../context/authContext";

const Profile = () => {
  return (
    <div className="profile">
      <div className="images">
        <img src="" alt="" className="cover" />
        <img src="" alt="" className="profilePicture" />
      </div>
      <div className="profileContainer">
        <div className="userInfo">
          <div className="left">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookTwoTone />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter />
            </a>
          </div>

          <div className="center">
            <span>user's name</span>
            <div className="icons">
              <div className="item">
                <PlaceOutlined />
                <span>USA</span>
              </div>
              <div className="item">
                <Language />
                <span>Chinese</span>
              </div>
              <button>Follow</button>
            </div>
          </div>

          <div className="right">
            <EmailOutlined />
            <MoreHoriz />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
