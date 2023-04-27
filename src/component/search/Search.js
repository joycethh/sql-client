import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@mui/icons-material/";
import { useQuery } from "@tanstack/react-query";
import PostExcerpt from "../postExcerpt/PostExcerpt";
import { API } from "../../axios";
const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  //search query for posts
  const {
    isLoading,
    error,
    data: posts,
  } = useQuery(["searchPosts", query], async () => {
    const { data } = await API.get(
      `/search/posts?q=${encodeURIComponent(query)}`
    );
    console.log("searchPosts-Data", data);
    return data;
  });

  //search query for users
  const {
    isLoading: isLoadingUsers,
    error: errorUsers,
    data: users,
  } = useQuery(["searchUsers", query], async () => {
    const { data } = await API.get(
      `/search/users?q=${encodeURIComponent(query)}`
    );
    console.log("searchPosts-Data", data);
    return data;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };
  return (
    <>
      <div className="search">
        <input
          type="text"
          value={query}
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchOutlined onClick={handleSearch} />
      </div>
      <div className="result">
        {error || errorUsers ? (
          <div className="error">{error || errorUsers}</div>
        ) : isLoading || isLoadingUsers ? (
          <div className="loading">Loading</div>
        ) : (
          <>
            <div className="users-result">
              {users?.map((user) => (
                <div className="user">
                  <img src={user.profilePic} alt="" />
                  <span>{user.name}</span>
                </div>
              ))}
            </div>
            <div className="posts-result">
              {posts?.map((post) => (
                <PostExcerpt post={post} key={post.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Search;
