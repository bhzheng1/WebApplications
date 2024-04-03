// ref could track State Changes, Accessing DOM Elements, referring component property
// ref is not in the props object of component
// ref can be forwarded to child component

import React, {
    forwardRef,
    useCallback,
    useRef,
    useImperativeHandle,
} from "react";
import ReactDOM from "react-dom/client";

// ref 传递给子组件
const MyButton = forwardRef((props, ref) => {
    return (
        <>
            <input type="text" ref={ref} />
            <button>Inner Button</button>
        </>
    );
});

//ref 传递给自定义handler
const MyButton1 = forwardRef((props, ref) => {
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => ({
        changeValue: (newValue) => {
            inputRef.current.focus();
            inputRef.current.value = newValue;
        },
    }));

    return (
        <>
            <input type="text" ref={inputRef} />
            <button>Inner Button</button>
        </>
    );
});

const App = (props) => {
    const ref = useRef(null);
    const handleClick = useCallback(() => {
        ref.current.focus();
    }, []);

    const ref1 = useRef(null);
    const handleClick1 = useCallback(() => {
        ref1.current.changeValue(100);
    }, []);

    return (
        <>
            <MyButton ref={ref} />
            <button onClick={handleClick}>Outer Button</button>
            <hr />
            <MyButton1 ref={ref1} />
            <button onClick={handleClick1}>Outer Button</button>
        </>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
