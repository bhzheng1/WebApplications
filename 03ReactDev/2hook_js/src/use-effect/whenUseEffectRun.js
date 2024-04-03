import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";

function WhenUseEffectRun() {
    const [inputValue, setInputValue] = useState("");
    const previousInputValue = useRef("");
    // console.log("Main running!", Date.now().toString())

    useEffect(() => {
        previousInputValue.current = inputValue;
        console.log("useEffect running", Date.now().toString());
    }, [inputValue]);

    return (
        <>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <h2>Current Value: {inputValue}</h2>
            <h2>Previous Value: {previousInputValue.current}</h2>
            <span>{Date.now().toString()}</span>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <WhenUseEffectRun />
    </React.StrictMode>
);
