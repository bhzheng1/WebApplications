import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";

// useEffect 副作用
//all useEffects run after the component renders for the first time
//useEffect把回调函数参数注册进component的生命周期中,并根据第二个参数决定是否再次运行
//useEffect可用于call api

function Example() {
    const [value, setValue] = useState("");
    const [count, setCount] = useState(0);
    const lastValue = useRef("");
    console.log(`first: main funciton run at ${Date.now().toString()}`);

    useEffect(() => {
        document.title = `you clicked ${count} times.`;
        console.log(`use effect0 re-run after component renders`);
    });

    useEffect(() => {
        console.log(`use effect1 only run once at ${Date.now().toString()}`);
    }, []);

    useEffect(() => {
        // re-run after the value changed and related component rendered
        lastValue.current = value;
        console.log(`use effect2 re-run at ${Date.now().toString()}`);
    }, [value]);

    //second: render component
    return (
        <>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <span>current value: {value}</span>
            <hr />
            <span>
                last value: {lastValue.current}, rendered at:{" "}
                {Date.now().toString()}
            </span>
            <hr />
            <p>you clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>click me</button>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Example />);
