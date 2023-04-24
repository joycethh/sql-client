import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { API } from "../../axios";

import moment from "moment";
import {
  ThumbUpOutlined,
  ThumbUpAlt,
  TextsmsOutlined,
} from "@mui/icons-material";
import "./interation.scss";

const Interations = ({ postId, handleOpen, open, currentUser }) => {
  const [desc, setDesc] = useState("");

  // Comment Queries
  const { isLoading, error, data } = useQuery(
    ["comments", postId],
    async () => {
      const { data } = await API.get(`/comments?postId=${postId}`);
      return data;
    }
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return API.post(`/comments?postId=${postId}`, newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );
  const handleSubmit = async (e) => {
    e.preventDefault();

    mutation.mutate({ desc });
    setDesc("");
  };

  //Like Queries request
  const {
    isLoading: likesLoading,
    error: likesError,
    data: likesData,
  } = useQuery(["likes", postId, currentUser.id], async () => {
    const response = await API.get("/likes?postId=" + postId);
    console.log("likes reponse", response);
    return response.data;
  });
  const likesMutation = useMutation(
    (liked) => {
      if (liked) return API.delete(`/likes?postId=${postId}`);
      return API.post(`/likes?postId=${postId}`);
    },

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes", postId, currentUser.id]); // add two vals
      },
    }
  );
  const handleLike = () => {
    likesMutation.mutate(likesData?.includes(currentUser.id));
  };

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="interation-container">
      <div className="interation-items">
        <div className="item">
          {likesLoading ? (
            <div>Likes Section is Loading</div>
          ) : likesData?.includes(currentUser.id) ? (
            <ThumbUpAlt sx={{ color: "#5271ff" }} onClick={handleLike} />
          ) : (
            <ThumbUpOutlined onClick={handleLike} />
          )}
          {likesData?.length} likes
        </div>
        <div className="item" onClick={handleOpen}>
          {isLoading && <div>Comments Section is Loading</div>}
          <TextsmsOutlined /> {data.length} comments
        </div>
        {error && <div>{error}</div>}
        {likesError && <div>{likesError}</div>}
      </div>

      {open && (
        <div className="comments">
          <div className="write">
            <img src={currentUser.profilePic} alt="" />
            <input
              type="text"
              placeholder="write a comment"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button onClick={handleSubmit}>send</button>
          </div>
          {data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={comment.profilePic} alt="" />
              <div className="content">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Interations;
