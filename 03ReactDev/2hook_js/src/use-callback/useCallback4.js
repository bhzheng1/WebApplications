import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom/client";

// useState and useCallback

function useStateRef(processNode) {
    const [nodePart, setNodePart] = useState(null);
    const setRef = useCallback(
        (newNode) => {
            console.log("changed");
            setNodePart(processNode(newNode));
        },
        [processNode]
    );
    return [nodePart, setRef];
}

const App = (props) => {
    const [value, setValue] = useState(0);
    const [refValue, setRefValue] = useStateRef((node) => node?.value || 0);

    const handleClick = useCallback(() => {
        setValue((prevValue) => prevValue + 1);
    }, []);

    return (
        <>
            <button onClick={handleClick}>Outer Button</button>
            <input
                type="text"
                ref={setRefValue}
                value={value}
                onChange={(e) => setValue(parseInt(e.target.value))}
            />
            <div>ref value: {refValue}</div>
        </>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
