import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom/client";

//useMemo里保存的是渲染的结果。
//在parent重新渲染的情况下，使用useMemo可以控制children是否需要重新渲染。
const Child = ({ test }) => {
    console.log(`child renders ${test.name}`);
    return (
        <h2>
            {test.name}: {test.value}
        </h2>
    );
};

const Parent = ({ x, y }) => {
    //每次x或y改变，parent re-render，demo0都会重新计算生成，Child会重新渲染
    const demo0 = (
        <div>
            {console.log("demo0")}
            <Child test={{ name: "demo0", value: x }} />
        </div>
    );

    //parent render，如果y不变，则demo不会重新计算，Child也不会重新渲染
    const demo1 = useMemo(
        () => (
            <div>
                {console.log("demo1")}
                <Child test={{ name: "demo1", value: y }} />
            </div>
        ),
        [y]
    );

    return (
        <>
            {demo0}
            <br />
            {demo1}
        </>
    );
};

const App = (props) => {
    const [x, setX] = useState(100);
    const [y, setY] = useState(200);

    return (
        <>
            <Parent x={x} y={y} />
            <button onClick={() => setX(x + 1)}>x+1</button>
            <button onClick={() => setY(y + 1)}>y+1</button>
        </>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
