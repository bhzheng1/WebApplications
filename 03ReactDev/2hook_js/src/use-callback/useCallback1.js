import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

let fn = null;
const num1 = [1, 2, 3];
const num2 = [10, 20, 30];

function TestUseCallback({ num, name }) {
    const memorizedCallback = useCallback(() => {
        console.log("abc");
        return num;
    }, [num]);
    console.log(
        `num: ${num}, name: ${name}, callcack is equal: ${Object.is(
            fn,
            memorizedCallback
        )}`
    );

    fn = memorizedCallback;
    return (
        <div>
            <p>Test UseCallback</p>
        </div>
    );
}
const App = (props) => {
    const [count, setCount] = useState(0);
    const [num, setNum] = useState(num1);
    useEffect(() => {
        let id = setInterval(() => {
            setCount((count) => count + 1);
        }, 3000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="App">
            <h1>Hello</h1>
            <h2>Start editing to see some magic happen!</h2>
            <button>Num</button>
            <p>{count}</p>
            <TestUseCallback num={num} name="def" />
        </div>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
