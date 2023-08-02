import React from 'react'
import "./Track.css";

export const Track = (props) => {
  return (
    <div className="Track">
  <div className="Track-information">
    <h3>{props.name}</h3>
    <p>{props.artist} | {props.album}</p>
  </div>
  <button className="Track-action">
    {/* <!-- + or - will go here -->  */}
    {props.name}</button>
</div>
  )
}
