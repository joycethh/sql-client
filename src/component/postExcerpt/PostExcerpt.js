import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Comments from "../comments/Comments";
import "./postExcerpt.scss";
import {
  MoreHoriz,
  ShareOutlined,
  TextsmsOutlined,
  ThumbUpOutlined,
  ThumbUpAlt,
} from "@mui/icons-material";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../../axios";

const PostExcerpt = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  const [openComments, setOpenComments] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  //like queries request
  const { isLoading, data } = useQuery(["likes", post.id], async () => {
    const response = await API.get("/likes?postId=" + post.id);
    return response.data;
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return API.delete(`/likes?postId=${post.id}`);
      return API.post(`/likes?postId=${post.id}`);
    },

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );
  const handleLike = () => {
    mutation.mutate(data?.includes(currentUser.id));
  };

  //delete mutation
  const deleteMutation = useMutation(
    (postId) => {
      return API.delete(`/posts/${post.id}`);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
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
            <img src={`/upload/${post.profilePic}` || post.profilePic} alt="" />
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
          <MoreHoriz onClick={() => setOpenMenu(!openMenu)} />
          {openMenu && post.userId === currentUser.id && (
            <button onClick={handleDelete}> Delete </button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={`/upload/${post?.image}`} alt="" />
        </div>
        <div className="interations">
          <div className="item">
            {isLoading ? (
              "Loading"
            ) : data?.includes(currentUser.id) ? (
              <ThumbUpAlt sx={{ color: "#5271ff" }} onClick={handleLike} />
            ) : (
              <ThumbUpOutlined onClick={handleLike} />
            )}
            {data?.length} likes
          </div>
          <div className="item" onClick={() => setOpenComments(!openComments)}>
            <TextsmsOutlined />
          </div>
          <div className="item">
            <ShareOutlined />
            Share
          </div>
        </div>
        {openComments && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default PostExcerpt;
