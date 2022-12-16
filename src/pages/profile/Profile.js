import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
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
import PostLists from "../../component/postLists/PostLists";
import { AuthContext } from "../../context/authContext";
import { API } from "../../axios";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["users"], async () => {
    const { data } = await API.get("/users");
    return data;
  });

  console.log("user-data", data);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="profile">
      <div className="images">
        <img src={currentUser.coverPic} alt="" className="cover" />
        <img src={currentUser.profilePic} alt="" className="profilePicture" />
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
            <span>{currentUser.name}</span>
            <div className="info">
              <div className="item">
                <PlaceOutlined />
                <span>{currentUser.city}</span>
              </div>
              <div className="item">
                <Language />
                <span>{currentUser.website}</span>
              </div>
            </div>
            <button>Follow</button>
          </div>

          <div className="right">
            <EmailOutlined />
            <MoreHoriz />
          </div>
        </div>

        <PostLists />
      </div>
    </div>
  );
};

export default Profile;
