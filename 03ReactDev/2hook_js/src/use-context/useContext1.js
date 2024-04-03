import React, { useContext, useReducer } from "react";
import ReactDom from "react-dom/client";

const initialState = { count: 0 };

// c create a context
const myContext = React.createContext();

// create reducer functions
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

//wrap the myContext.provider in another component
const ContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        // add the state and dispatch to the context provider
        <myContext.Provider value={{ state, dispatch }}>
            {props.children}
        </myContext.Provider>
    );
};

//children component
const Counter = (props) => {
    // use the context to get the state and dispatch
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
    // use the context to get the state and dispatch
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
