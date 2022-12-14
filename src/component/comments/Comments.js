import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../axios";
import { AuthContext } from "../../context/authContext";
import "./comments.scss";
import moment from "moment";

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  // Queries
  const { isLoading, error, data } = useQuery(["comments"], async () => {
    // const { data } = await API.get("/comments?postId=" + postId);
    const { data } = await API.get(`/comments?postId=${postId}`);
    return data;
  });

  console.log("comment-data", data);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  const handleSubmit = () => {
    //TODO
  };
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment" />
        <button onClick={handleSubmit}>send</button>
      </div>
      {data.map((comment) => (
        <div className="comment" key={comment.id}>
          <img src={comment.profilePic} alt="" />
          <div className="content">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
