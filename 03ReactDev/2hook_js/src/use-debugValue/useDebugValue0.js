import React, { useDebugValue, useState } from "react";
import ReactDOM from "react-dom/client";

//custom hooks封装state相关的逻辑封装
function useCustomHook() {
    const [count, setCount] = useState(0);
    useDebugValue(count > 5 ? "count>5" : "count<5"); //显示在DevTools上面
    const mySetCount = () => {
        setCount((pre) => pre + 2);
    };
    return [count, mySetCount];
}

const App = (props) => {
    const [count, setCount] = useCustomHook();
    return (
        <>
            {count} <button onClick={() => setCount()}>count + 2</button>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
