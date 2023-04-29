import React from "react";
import WindowTracer from "./components/WindowTracer";

export default function App(){
    const [show, setShow] = React.useState(true)

    function toggle(){
        setShow(prevShow=>!prevShow)
    }
    return (
        <div className="container">
            <button onClick={toggle}>
                Toggle Window Tracker
            </button>
            {show && <WindowTracer/>}
        </div>
    )
}

