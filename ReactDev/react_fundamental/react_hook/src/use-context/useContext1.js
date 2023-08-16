import React, { useContext, useReducer } from "react";
import ReactDom from "react-dom/client";

const initialState = { count: 0 };
const myContext = React.createContext();

function reducer(state, action) {
    switch (action.type) {
        case "reset":
            return initialState;
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
        default:
            return state;
    }
}

const ContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <myContext.Provider value={{ state, dispatch }}>
            {props.children}
        </myContext.Provider>
    );
};

//children component
const Counter = (props) => {
    const { state, dispatch } = useContext(myContext);
    return (
        <div>
            Counter Count: {state.count}
            <button onClick={() => dispatch({ type: "reset" })}>reset</button>
            <button onClick={() => dispatch({ type: "increment" })}>+</button>
            <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        </div>
    );
};

const Counter1 = (props) => {
    const { state, dispatch } = useContext(myContext);
    return (
        <div>
            Counter Count: {state.count}
            <button onClick={() => dispatch({ type: "reset" })}>reset</button>
            <button onClick={() => dispatch({ type: "increment" })}>+</button>
            <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        </div>
    );
};

const Counter2 = React.cloneElement(<Counter />);
const App = (props) => {
    return (
        <ContextProvider>
            <Counter></Counter>
            <hr />
            <Counter1></Counter1>
            <hr />
            {Counter2}
        </ContextProvider>
    );
};

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<App />);
