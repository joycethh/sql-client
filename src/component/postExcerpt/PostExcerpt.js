import React, { useState } from "react";
import moment from "moment";
import Comments from "../comments/Comments";
import "./postExcerpt.scss";
import {
  MoreHoriz,
  ShareOutlined,
  TextsmsOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";

const PostExcerpt = ({ post }) => {
  const [openComments, setOpenComments] = useState(false);

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
            <ThumbUpOutlined />
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
