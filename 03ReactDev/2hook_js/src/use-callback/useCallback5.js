import React, { useCallback, useState, useRef } from "react";
import ReactDOM from "react-dom/client";

// useRef and useCallback
function useRefWithCallback(onMount, onUnmount) {
    const nodeRef = useRef(null);

    const setRef = useCallback(
        (node) => {
            if (nodeRef.current) {
                onUnmount(nodeRef.current);
            }

            nodeRef.current = node;

            if (nodeRef.current) {
                onMount(nodeRef.current);
            }
        },
        [onMount, onUnmount]
    );

    return setRef;
}

const App = (props) => {
    const [value, setValue] = useState(0);
    const [refValue, setRefValue] = useState(0);

    const setRef = useRefWithCallback(
        (node) => setRefValue(node?.value || 0),
        (node) => console.log("unmount")
    );

    const handleClick = useCallback(() => {
        setValue((prevValue) => prevValue + 1);
    }, []);
    return (
        <>
            <button onClick={handleClick}>Outer Button</button>
            <input
                type="text"
                ref={setRef}
                value={value}
                onChange={(e) => setValue(parseInt(e.target.value))}
            />
            <div>ref value: {refValue}</div>
        </>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
