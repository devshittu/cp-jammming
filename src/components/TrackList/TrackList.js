import React from 'react'
import "./TrackList.css";
import {Track} from "../Track/Track";

export const TrackList = (props) => {
  return (
    <div className="TrackList">
      {/* <!-- You will add a map method that renders a set of Track components  --> */}
      {/* {JSON.stringify(props)} */}
      {props.tracks.map((track) => (
        <Track key={track.id} track={track} onAdd={props.onAdd} />
      ))}
    </div>
  );
}
