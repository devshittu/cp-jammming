import React from "react";
import "./Playlist.css";
import { TrackList } from "../TrackList/TrackList";

export const Playlist = (props) => {
  return (
    <div className="Playlist">
      <input value="New Playlist" />
      {/* <!-- Add a TrackList component --> */}
      <TrackList
        tracks={props.playlistTracks}
        isRemoval={true}
        onRemove={props.onRemove}
      />
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  );
};
