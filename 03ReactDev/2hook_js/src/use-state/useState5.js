import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom/client";

//Accessing the DOM is expensive, so we want to do this as little as possible.
// If you don’t need the whole node like in the previous hook, you better save only part of it on a state:
function useStateRef(processNode) {
    const [nodePart, setNodePart] = useState(null);
    const setRef = useCallback(
        (newNode) => {
            setNodePart(processNode(newNode));
        },
        [processNode]
    );
    return [nodePart, setRef];
}

const App = (props) => {
    const [value, setValue] = useState(50);

    const [clientHeight, setRef] = useStateRef(
        (node) => node?.offsetHeight || 0
    );

    const handleClick = useCallback(() => {
        setValue((prevValue) => prevValue + 1);
    }, [setValue]);

    useEffect(() => {
        console.log(`the new clientHeight is: ${clientHeight}`);
    }, [clientHeight]);

    return (
        <>
            <button onClick={handleClick}>click to change value</button>
            <div ref={setRef} style={{ height: value }}>
                see the console {value}
            </div>
            <div>the current height is: {clientHeight}</div>
        </>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
