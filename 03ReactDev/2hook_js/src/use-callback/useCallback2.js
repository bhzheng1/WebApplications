//useCallback记录方法时会包含方法里的所有外部变量值。
//方法的每一次运行，都只会使用上一次记录的变量值，而不会动态的读取变量的值。
//useCallback的第二个参数是依赖数组，如果依赖数组包含方法内外部变量，则外部变量变化，useCallback会重新创建方法。
//如果依赖数组不包含方法内的外部变量，则外部变量变化，useCallback不会重新创建方法，计算所得仍然是原来的结果。
import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom/client";

const App = (props) => {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const callback1 = useCallback(() => {
        console.log("callback without dependency");
        // the count will always be 0, since it is memorized in the callback function
        console.log(`before setting: ${count1}`);
        // but the setCount will change the outside count value
        setCount1((preCount) => preCount + 1);
        console.log(`after setting: ${count1}`);
    }, []);
    const callback2 = useCallback(() => {
        console.log("callback without dependency");
        // the count will always be the previous count value, since it is memorized in the callback function
        console.log(`before setting: ${count2}`);
        setCount2((preCount) => preCount + 1);
        // the count value in current callback will always be same;
        console.log(`after setting: ${count2}`);
        // the count value will be changed in next render since it is in the dependencies.
    }, [count2]);
    return (
        <>
            <button onClick={callback1}>callback1 to change {count1}</button>
            <button onClick={callback2}>callback2 to change {count2}</button>
        </>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
