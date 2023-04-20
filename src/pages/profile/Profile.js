import React, { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

import { useAuthContext } from "../../context/authContext";
import ProfileUpdate from "../../component/profileUpdate/ProfileUpdate";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);

  const { currentUser } = useAuthContext();

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  //make get user query
  const { isLoading, error, data } = useQuery(["users"], async () => {
    const { data } = await API.get(`/users/find/${userId}`);
    return data;
  });

  //make get relation query
  const { data: relationData } = useQuery(["relationships"], async () => {
    const { data } = await API.get(`/relations?followedUserId=${userId}`);

    return data;
  });
  const following = relationData?.includes(currentUser?.id);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (followed) => {
      if (followed) return API.delete(`/relations?followedUserId=${userId}`);
      return API.post(`/relations?followedUserId=${userId}`);
    },

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationships"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(following);
  };

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="profile">
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <div className="images">
            <img src={`/upload/${data?.coverPic}`} alt="" className="cover" />
            <img
              src={`/upload/${data?.profilePic}`}
              alt=""
              className="profilePicture"
            />
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
                  <button onClick={() => setOpenUpdate(true)}>Update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {following ? "Following" : "Follow"}
                  </button>
                )}
              </div>

              <div className="right">
                <EmailOutlined />
                <MoreHoriz />
              </div>
            </div>

            <PostLists userId={userId} />
          </div>
        </>
      )}

      {openUpdate && (
        <ProfileUpdate setOpenUpdate={setOpenUpdate} user={data} />
      )}
    </div>
  );
};

export default Profile;
