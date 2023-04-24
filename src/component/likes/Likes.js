import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ThumbUpOutlined, ThumbUpAlt } from "@mui/icons-material";
import { API } from "../../axios";

const Likes = ({ postId, currentUser }) => {
  //like queries request
  const { isLoading, data } = useQuery(["likes", postId], async () => {
    const response = await API.get("/likes?postId=" + postId);
    return response.data;
  });

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (liked) => {
      if (liked) return API.delete(`/likes?postId=${postId}`);
      return API.post(`/likes?postId=${postId}`);
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

  return (
    <>
      <div className="item-likes">
        {isLoading ? (
          "Loading"
        ) : data?.includes(currentUser.id) ? (
          <ThumbUpAlt sx={{ color: "#5271ff" }} onClick={handleLike} />
        ) : (
          <ThumbUpOutlined onClick={handleLike} />
        )}
        {data?.length} likes
      </div>
    </>
  );
};

export default Likes;
