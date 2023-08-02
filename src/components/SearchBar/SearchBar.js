import React, { useState } from "react";
import './SearchBar.css'

export const SearchBar = (props) => {
  const [term, setTerm] = useState("");

  // Step 3: Create the search method
  const search = () => {
    props.onSearch(term);
  };

  // Step 5: Create the handleTermChange method
  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };
  return (
    <div className="SearchBar">
      <input
        placeholder="Enter A Song, Album, or Artist"
        onChange={handleTermChange}
      />
      <button className="SearchButton" onClick={search}>
        SEARCH
      </button>
    </div>
  );
};
