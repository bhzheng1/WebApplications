import React, { type FC, useReducer } from "react";
import ReactDOM from "react-dom/client";

// An enum with all the types of actions to use in our reducer
enum CountActionKind {
    INCREASE = "INCREASE",
    DECREASE = "DECREASE",
}

// An interface for our actions
interface CountAction {
    type: CountActionKind;
    payload: number;
}

// An interface for our state
interface CountState {
    count: number;
}

// Our reducer function that uses a switch statement to handle our actions
function counterReducer(state: CountState, action: CountAction): CountState {
    const { type, payload } = action;
    switch (type) {
        case CountActionKind.INCREASE:
            return {
                ...state,
                count: state.count + payload,
            };
        case CountActionKind.DECREASE:
            return {
                ...state,
                count: state.count - payload,
            };
        default:
            return state;
    }
}
// An example of using the `useReducer` hooks with our reducer function and an initial state
const Counter: FC = () => {
    const [state, dispatch] = useReducer(counterReducer, { count: 0 });
    return (
        <div>
            Count: {state.count}
            {/* Calling our actions on button click */}
            <button
                onClick={() =>
                    dispatch({ type: CountActionKind.INCREASE, payload: 5 })
                }
            >
                -
            </button>
            <button
                onClick={() =>
                    dispatch({ type: CountActionKind.DECREASE, payload: 5 })
                }
            >
                +
            </button>
        </div>
    );
};
const App: FC = () => (
    <div>
        <Counter />
    </div>
);
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
