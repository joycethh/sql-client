import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { API } from "../../axios";
import { useAuthContext } from "../../context/authContext";
import "./comments.scss";
import moment from "moment";
import { TextsmsOutlined } from "@mui/icons-material";

const Comments = ({ postId, handleOpen, open }) => {
  const { currentUser } = useAuthContext();
  const [desc, setDesc] = useState("");
  const { isLoading, error, data } = useQuery(
    ["comments", postId],
    async () => {
      const { data } = await API.get(`/comments?postId=${postId}`);
      console.log("comment Data", data);
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

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div className="item-comments" onClick={handleOpen}>
        <TextsmsOutlined /> {data.length} comments
      </div>
      <div className="comments-container">
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
    </>
  );
};

export default Comments;
