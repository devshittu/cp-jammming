import React from "react";
import "./Playlist.css";
import { TrackList } from "../TrackList/TrackList";

export const Playlist = (props) => {
  const handleNameChange = (event) => {
    props.onNameChange(event.target.value);
  };

  return (
    <div className="Playlist">
      <input value={props.playlistName} onChange={handleNameChange} />
      {/* <!-- Add a TrackList component --> */}
      <TrackList
        tracks={props.playlistTracks}
        isRemoval={true}
        onRemove={props.onRemove}
      />
      <button className="Playlist-save" onClick={props.onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};
