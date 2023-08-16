import React, { useState, useRef } from "react";
import ReactDOM from "react-dom/client";

//useRef可以引用组件的dom
function TextInputWithFocusButton() {
    const inputElementRef = useRef();
    const onButtonClick = () => {
        inputElementRef.current.focus();
    };
    return (
        <div>
            {
                //使用ref引用子组件的dom
            }
            <input type="text" ref={inputElementRef} />
            <button onClick={onButtonClick}>focus the input</button>
        </div>
    );
}

const App = (props) => {
    const [count, setCount] = useState(0);

    return (
        <>
            {count}
            <button onClick={() => setCount(count + 1)}>count + 1</button>
            <hr />
            <TextInputWithFocusButton />
        </>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
