import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Interations from "../interations/Interation";
import "./postExcerpt.scss";
import { MoreHoriz } from "@mui/icons-material";
import { useAuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../axios";

const PostExcerpt = ({ post }) => {
  const { currentUser } = useAuthContext();
  const [openComments, setOpenComments] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (postId) => {
      return API.delete(`/posts/${post.id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };
  return (
    <div className="postExcerpt">
      <div className="container">
        <div className="author">
          <div className="authorInfo">
            {/* <img src={`/upload/${post.profilePic}`} /> */}
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="authorName">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          {currentUser.id === post.userId && (
            <MoreHoriz onClick={() => setOpenMenu(!openMenu)} />
          )}
          {openMenu && post.userId === currentUser.id && (
            <button onClick={handleDelete}> Delete </button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={`/upload/${post?.image}`} alt="" />
        </div>
        <Interations
          postId={post.id}
          currentUser={currentUser}
          open={openComments}
          handleOpen={() => setOpenComments(!openComments)}
        />
      </div>
    </div>
  );
};

export default PostExcerpt;
