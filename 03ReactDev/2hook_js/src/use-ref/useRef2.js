import React, { useRef, forwardRef, useCallback } from "react";
import ReactDOM from "react-dom/client";

//forwardRef 可以包裹一个组件，使这个组件拥有转发ref到子组件的功能

const TextInputWithButton = forwardRef((props, ref) => (
    <div>
        <label>
            {props.text}:
            <input type="text" ref={ref} />
        </label>
        <button>{props.children}</button>
    </div>
));

//组件的属性传递contentRef到子组件
const TextInputWithButton1 = (props) => {
    return (
        <div>
            <label>
                {props.text}
                <input type="text" ref={props.contentRef} />
            </label>
            <button>{props.children}</button>
        </div>
    );
};

const App = (props) => {
    const ref = useRef();
    const handleClick = useCallback(() => ref.current.focus(), []);
    const ref1 = useRef();
    const handleClick1 = useCallback(() => ref1.current.focus(), []);

    return (
        <>
            <div>
                <TextInputWithButton text="forwardRef" ref={ref}>
                    click me!
                </TextInputWithButton>
                <button onClick={handleClick}>获取焦点</button>
            </div>
            <hr />
            <div>
                <TextInputWithButton1 text="propsRef" contentRef={ref1}>
                    click me!
                </TextInputWithButton1>
                <button onClick={handleClick1}>获取焦点</button>
            </div>
        </>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
