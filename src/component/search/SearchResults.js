import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PostExcerpt from "../postExcerpt/PostExcerpt";
import { API } from "../../axios";
import Profile from "../../pages/profile/Profile";
import "./search.scss";
const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  console.log("query", query);

  //search query for posts
  const {
    isLoading,
    error,
    data: posts,
  } = useQuery(
    ["searchPosts", query],
    async () => {
      const { data } = await API.get(
        `/posts/search/posts?query=${encodeURIComponent(query)}`
      );
      console.log("searchPost-Data", data);
      return data;
    },
    {
      enabled: query.trim() !== "",
      onError: (error) => {
        console.error("searchPosts Error ---", error);
      },
    }
  );

  //search query for users
  const {
    isLoading: isLoadingUsers,
    error: errorUsers,
    data: users,
  } = useQuery(
    ["searchUsers", query],
    async () => {
      const { data } = await API.get(
        `users/search/users?query=${encodeURIComponent(query)}`
      );
      console.log("searchUser-Data", data);
      return data;
    },
    { enabled: query.trim() !== "" }
  );
  return (
    <div className="results-container">
      {error ? (
        <div className="error">{error || errorUsers}</div>
      ) : isLoading || isLoadingUsers ? (
        <div className="loading">Loading</div>
      ) : (
        <>
          <div className="users-result">
            <span>Users that contains"{query}"</span>
            {users?.map((user) => (
              <div className="user">
                <img src={user.profilePic} alt="" />
                <Link to={`/profile/${user.id}`}>{user.name}</Link>
              </div>
            ))}
          </div>
          <div className="posts-result">
            <span>Posts that contains"{query}"</span>
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
