import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Example() {
    const [value, setValue] = useState("");
    const [effectValue, setEffectValue] = useState(0);
    //data won't be updated when effect value updated
    const [data, setData] = useState(effectValue);
    const otherData = effectValue;

    useEffect(() => {
        //effectValue will be updated when value is changed.
        setEffectValue(effectValue + 1);
    }, [value]);
    return (
        <>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <br />
            <p>{effectValue}</p>
            <p>{otherData}</p>
            <p>{data}</p>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <Example />
        <hr />
    </>
);
