import React from 'react'
import './SearchResults.css'
import {TrackList} from "../TrackList/TrackList";

export const SearchResults = (props) => {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      {/* <!-- Add a TrackList component --> */}
      <TrackList tracks={props.searchResults} onAdd={props.onAdd} isRemoval={false} />
    </div>
  );
}
