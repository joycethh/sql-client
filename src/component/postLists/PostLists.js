import React from "react";
import { useQuery } from "@tanstack/react-query";
import PostExcerpt from "../postExcerpt/PostExcerpt";
import "./postLists.scss";
import { API } from "../../axios";
//TEMPORARY

const PostLists = () => {
  // Queries
  const { isLoading, error, data } = useQuery(["posts"], async () => {
    const { data } = await API.get("/posts");
    return data;
  });

  console.log("data", data);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="postLists">
      {data.map((post) => (
        <PostExcerpt post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostLists;
