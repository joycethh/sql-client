import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@mui/icons-material/";
import "./search.scss";
import { useQuery } from "@tanstack/react-query";
import PostExcerpt from "../postExcerpt/PostExcerpt";
import SearchResults from "./SearchResults";
import { API } from "../../axios";
const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  //search query for posts
  // const {
  //   isLoading,
  //   error,

  //   data: posts,
  // } = useQuery(
  //   ["searchPosts", query],
  //   async () => {
  //     const { data } = await API.get(
  //       `/posts/search?query=${encodeURIComponent(query)}`
  //     );
  //     console.log("searchPosts-Data", data);
  //     return data;
  //   },
  //   { enabled: query.trim() !== "" }
  // );

  //search query for users
  // const {
  //   isLoading: isLoadingUsers,
  //   error: errorUsers,
  //   data: users,
  // } = useQuery(
  //   ["searchUsers", query],
  //   async () => {
  //     const { data } = await API.get(
  //       `/search/users?q=${encodeURIComponent(query)}`
  //     );
  //     console.log("searchPosts-Data", data);
  //     return data;
  //   },
  //   { enabled: query.trim() !== "" }
  // );

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };
  return (
    <>
      <div className="search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
          />

          <SearchOutlined type="submit" />
        </form>
      </div>
      {/* <div className="result">
        {error ? (
          <div className="error">{error}</div>
        ) : isLoading ? (
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
      </div> */}
    </>
  );
};

export default Search;
