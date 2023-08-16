import React, { useReducer } from "react";
import ReactDOM from "react-dom/client";
/*
 * 知识点：
 *  - useReducer 就是一个自定义 useState 可以执行多种 state 更新。
 *  - 几个元素：输入数据，reducer 函数，init函数，dispatch 函数 的作用。
 *  - 通过 init 计算最初的 state,亦可省略
 *  - action定义对state的操作,action has properties: type and payload
 *  - 通过 dispatch(action) 更新 state
 *  - 通过 reducer(state, action) 定义根据action对state的操作
 *  - redux and useReducer为同一个作者，贯彻一种state management思想。
 */

function init(initialData) {
    return { count: initialData.count + 1 };
}
function reducer(state, action) {
    switch (action.type) {
        case "reset":
            return { count: action.payload };
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
        default:
            return state;
    }
}

function Counter1({ initialData }) {
    const [state, dispatch] = useReducer(reducer, initialData, init);
    return (
        <div>
            count: {state.count}
            <button
                onClick={() =>
                    dispatch({
                        type: "reset",
                        payload: init(initialData).count,
                    })
                }
            >
                reset
            </button>
            <button onClick={() => dispatch({ type: "increment" })}>+</button>
            <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        </div>
    );
}

function Counter2({ initialData }) {
    const [state, dispatch] = useReducer(reducer, initialData);
    return (
        <div>
            count: {state.count}
            <button
                onClick={() =>
                    dispatch({
                        type: "reset",
                        payload: initialData.count,
                    })
                }
            >
                reset
            </button>
            <button onClick={() => dispatch({ type: "increment" })}>+</button>
            <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        </div>
    );
}

const App = (props) => (
    <>
        <Counter1 initialData={{ count: 1 }} />
        <Counter2 initialData={{ count: 1 }} />
    </>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
