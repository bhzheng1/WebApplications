import React from "react";
export default function Star(props){
    let startIcon = props.isFavorite ? "star-filled.png" : "star-empty.png"
    return (
        <img
        src={`../images/${startIcon}`}
        className="card--favorite"
        onClick={props.handleClick}
    />
    )
}