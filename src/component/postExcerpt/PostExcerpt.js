import React, { useContext, useState } from "react";
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

  //queries request
  const { isLoading, error, data } = useQuery(["likes", post.id], async () => {
    const response = await API.get("/likes?postId=" + post.id);
    console.log("response.data", response.data);
    return response.data;
  });
  console.log("like data", data);

  return (
    <div className="postExcerpt">
      <div className="container">
        <div className="author">
          <div className="authorInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <span className="authorName">{post.name}</span>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHoriz />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./upload/" + post.image} alt="" />
        </div>
        <div className="interations">
          <div className="item">
            {/* {liked ? (
              <ThumbUpAlt sx={{ color: "#5271ff" }} />
            ) : (
              <ThumbUpOutlined />
            )} */}
            {/* {data.length} likes */}
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
