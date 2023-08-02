import React from 'react'
import "./TrackList.css";

export const TrackList = (props) => {
  return (
    <div className="TrackList">
      {/* <!-- You will add a map method that renders a set of Track components  --> */}
      {JSON.stringify(props)}
    </div>
  );
}
