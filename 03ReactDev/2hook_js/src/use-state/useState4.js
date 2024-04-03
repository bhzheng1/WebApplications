// useState to reflect the ref change in child component dynamically
// Since useState is a function that is consistent between renders, it can also be used as a ref.
// In this case, the whole node will be saved in its own state.
// As a state, when it changes, it would trigger a re-render and the state can be safely used in the render’s results and as a useEffect dependency:

import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom/client";

const App = (props) => {
    const [node, setNode] = useState(null);

    const setRefCallback = useCallback(
        (newNode) => {
            setNode(newNode);
        },
        [setNode]
    );

    const [value, setValue] = useState(50);

    const handleClick = useCallback(() => {
        setValue((prevValue) => prevValue + 1);
    }, [setValue]);

    useEffect(() => {
        if (!node) {
            console.log("unmounted!");
            return;
        }

        console.log("mounted");

        const fn = (e) => console.log(e);

        // add a mouse event listener to the node after it mounted
        node.addEventListener("mousedown", fn);
        return () => node.removeEventListener("mousedown", fn);
    }, [node]);

    return (
        <>
            <button onClick={handleClick}>click to change value</button>
            <div ref={setRefCallback} style={{ height: value }}>
                see the console {value}
            </div>
            <div>
                why node.offsetHeight is the previous one? {node?.offsetHeight}
            </div>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
