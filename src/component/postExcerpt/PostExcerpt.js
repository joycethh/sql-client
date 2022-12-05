import React from "react";
import "./postExcerpt.scss";
import {
  MoreHoriz,
  ShareOutlined,
  TextsmsOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";

const PostExcerpt = ({ post }) => {
  return (
    <div className="postExcerpt">
      <div className="container">
        <div className="author">
          <div className="authorInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <span className="authorName">{post.name}</span>
              <span className="date">time</span>
            </div>
          </div>
          <MoreHoriz />
        </div>

        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>

        <div className="reactions">
          <div className="item">
            <ThumbUpOutlined />
          </div>
          <div className="item">
            <TextsmsOutlined />
          </div>
          <div className="item">
            <ShareOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostExcerpt;
