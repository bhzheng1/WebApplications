import React, { type FC, useReducer } from "react";
import ReactDOM from "react-dom/client";
type Action =
    | { type: "click0" }
    | { type: "click1"; payload: number }
    | { type: "click2"; payload: string };
type State =
    | { status: null }
    | { status: "click0" }
    | { status: "click1"; data: number }
    | { status: "click2"; data: string };

const click0Handler = () => {
    console.log(`button0 clicked`);
};

const click1Handler = (data: number) => {
    console.log(`button1 clicked ${data}`);
};

const click2Handler = (data: string) => {
    console.log(`button1 clicked ${data}`);
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "click0":
            click0Handler();
            return { status: "click0" };
        case "click1":
            click1Handler(action.payload);
            return { status: "click1", data: action.payload };
        case "click2":
            click2Handler(action.payload);
            return { status: "click2", data: action.payload };
    }
}

const Child: FC<{ dispatch: React.Dispatch<Action> }> = ({ dispatch }) => {
    return (
        <div>
            <button onClick={() => dispatch({ type: "click0" })}>click0</button>
            <button onClick={() => dispatch({ type: "click1", payload: 10 })}>
                click1
            </button>
            <button
                onClick={() => dispatch({ type: "click2", payload: "click2" })}
            >
                click2
            </button>
        </div>
    );
};

const App: FC = () => {
    const [state, dispatch] = useReducer(reducer, { status: null });
    return (
        <div>
            <Child dispatch={dispatch} />
        </div>
    );
};
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
