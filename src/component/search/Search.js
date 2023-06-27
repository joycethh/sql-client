import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@mui/icons-material/";
import "./search.scss";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

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
    </>
  );
};

export default Search;
