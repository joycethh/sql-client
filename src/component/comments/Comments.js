import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { API } from "../../axios";
import { useAuthContext } from "../../context/authContext";
import "./comments.scss";
import moment from "moment";

const Comments = ({ postId }) => {
  const { currentUser } = useAuthContext();
  const [desc, setDesc] = useState("");
  // Queries
  const { isLoading, error, data } = useQuery(["comments"], async () => {
    // const { data } = await API.get("/comments?postId=" + postId);
    const { data } = await API.get(`/comments?postId=${postId}`);
    return data;
  });

  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation(
    (newComment) => {
      return API.post(`/comments?postId=${postId}`, newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
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
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
