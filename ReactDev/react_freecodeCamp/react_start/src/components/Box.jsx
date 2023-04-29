import React from "react";

export default function (props) {
    const styles = {
        backgroundColor: props.on ? "#222222" : "transparent"
    }

    return <div style={styles} className="box" onClick={(e)=>props.handleClick(props.id)}></div>
}