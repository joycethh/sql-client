import React from "react";
import { useQuery } from "@tanstack/react-query";
import PostExcerpt from "../postExcerpt/PostExcerpt";
import "./postLists.scss";
import { API } from "../../axios";
//TEMPORARY

const PostLists = ({ userId }) => {
  // Queries
  const { isLoading, error, data } = useQuery(["posts"], async () => {
    const { data } = await API.get(`/posts?userId=${userId}`);

    return data;
  });

  console.log("posts-data", data);

  return (
    <div className="postLists">
      {error
        ? "An error has occurred"
        : isLoading
        ? "Loading"
        : data.map((post) => <PostExcerpt post={post} key={post.id} />)}
    </div>
  );
};

export default PostLists;
