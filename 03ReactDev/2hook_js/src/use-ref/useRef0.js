import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
/*
useRef 可以用于保存一些状态值。
useRef 是函数组件的实例属性, 组件销毁之前，实例属性都会存在，组件刷新属性仍然会保持。
*/
function Counter() {
    const [count, setCount] = useState(0);
    const preCountRef = useRef(count);
    const preCount = preCountRef.current;
    useEffect(() => {
        preCountRef.current = count;
        console.log(`preCount: ${count}`);
    });
    return (
        <div>
            <h1>
                count: {count}, before: {preCount}
                <button onClick={() => setCount(count + 1)}>count + 1</button>
            </h1>
        </div>
    );
}

//使用全局变量，Ref会一直存在
const Ref = { count: 0 };
function msToTime(duration) {
    var milliseconds = Math.floor(duration % 1000),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return (
        hours +
        ":" +
        minutes +
        ":" +
        seconds +
        "." +
        String(milliseconds).padStart(3, "0")
    );
}

function Counter1() {
    const [count, setCount] = useState(0);
    const preCount = Ref.count;
    useEffect(() => {
        Ref.count = count;
        console.log(`preCount: ${count}`);
    });

    return (
        <div>
            <h1>
                count: {count}, before: {preCount}
                <button onClick={() => setCount(count + 1)}>count + 1</button>
            </h1>
        </div>
    );
}

function Stopwatch() {
    const timerIdRef = useRef(0);
    const [count, setCount] = useState(0);
    const startHandler = () => {
        if (timerIdRef.current) {
            return;
        }
        timerIdRef.current = setInterval(() => setCount((c) => c + 1), 1);
    };
    const stopHandler = () => {
        clearInterval(timerIdRef.current);
        timerIdRef.current = 0;
    };
    useEffect(() => {
        return () => clearInterval(timerIdRef.current);
    }, []);
    return (
        <div>
            <div>Timer: {msToTime(count)}</div>
            <div>
                <button onClick={startHandler}>Start</button>
                <button onClick={stopHandler}>Stop</button>
            </div>
        </div>
    );
}

const App = (props) => {
    const [show, setShow] = useState(true);
    return (
        <>
            {show ? <Counter /> : null}
            <hr />
            {show ? <Counter1 /> : null}
            <button onClick={() => setShow(!show)}>销毁/挂载组件</button>
            <hr />
            <Stopwatch />
        </>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
