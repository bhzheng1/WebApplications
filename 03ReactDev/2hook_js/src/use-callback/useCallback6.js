import React, { useCallback, useState, useRef, forwardRef } from "react";
import ReactDOM from "react-dom/client";
// useRef and useCallback
// CAN NOT FORWARD REF!!!!!
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

const MyButton = forwardRef((props, ref) => {
    const [value, setValue] = useState(0);
    const handleClick = useCallback(() => {
        setValue((prevValue) => prevValue + 1);
    }, []);
    return (
        <>
            <button onClick={handleClick}>inner Button</button>
            <input
                type="text"
                ref={ref}
                value={value}
                onChange={(e) => setValue(parseInt(e.target.value))}
            />
        </>
    );
});

const App = (props) => {
    const [refValue, setRefValue] = useState(0);

    const setRef = useRefWithCallback(
        (node) => setRefValue(node?.value || 0),
        (node) => console.log("unmount")
    );

    return (
        <>
            <MyButton ref={setRef} />
            <div>ref value: {refValue}</div>
        </>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
