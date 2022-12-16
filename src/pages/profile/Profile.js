import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
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

import { API } from "../../axios";

import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  //make get user query
  const { isLoading, error, data } = useQuery(["users"], async () => {
    const { data } = await API.get(`/users/find/${userId}`);
    return data;
  });
  console.log("userData", data);
  const handleFollow = () => {};

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="profile">
      {isLoading ? (
        "Loading"
      ) : (
        <>
          {" "}
          <div className="images">
            <img src={data?.coverPic} alt="" className="cover" />
            <img src={data?.profilePic} alt="" className="profilePicture" />
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
                <span>{data?.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceOutlined />
                    <span>{data?.city}</span>
                  </div>
                  <div className="item">
                    <Language />
                    <span>{data?.website}</span>
                  </div>
                </div>
                {userId === currentUser.id ? (
                  <button>Update</button>
                ) : (
                  <button onClick={handleFollow}>Follow</button>
                )}
              </div>

              <div className="right">
                <EmailOutlined />
                <MoreHoriz />
              </div>
            </div>

            <PostLists />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
