import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PostExcerpt from "../postExcerpt/PostExcerpt";
import { API } from "../../axios";
import "./search.scss";
const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  console.log("query", query);
  const {
    isLoading,
    error,
    data: posts,
  } = useQuery(
    ["searchPosts", query],
    async () => {
      const { data } = await API.get(
        `/posts/search?query=${encodeURIComponent(query)}`
      );
      console.log("searchPosts-Data", data);
      return data;
    },
    { enabled: query.trim() !== "" }
  );
  return (
    <div className="results-container">
      {error ? (
        <div className="error">{error}</div>
      ) : isLoading ? (
        <div className="loading">Loading</div>
      ) : (
        <>
          {/* <div className="users-result">
              {users?.map((user) => (
                <div className="user">
                  <img src={user.profilePic} alt="" />
                  <span>{user.name}</span>
                </div>
              ))}
            </div> */}
          <div className="posts-result">
            {posts?.map((post) => (
              <PostExcerpt post={post} key={post.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;
