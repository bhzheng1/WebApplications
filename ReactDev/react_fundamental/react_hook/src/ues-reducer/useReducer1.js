import React, { useReducer } from "react";
import ReactDOM from "react-dom/client";

const initialState = {
    text: "",
    isUpperCase: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_TEXT":
            return {
                ...state,
                text: state.isUpperCase
                    ? action.text.toUpperCase()
                    : action.text,
            };
        case "UPPERCASE":
            return {
                ...state,
                isUpperCase: true,
                text: state.text.toUpperCase(),
            };
        case "LOWERCASE":
            return {
                ...state,
                isUpperCase: false,
                text: state.text.toLowerCase(),
            };
        default:
            return state;
    }
};

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const handleChange = (e) => {
        dispatch({ type: "SET_TEXT", text: e.target.value });
    };
    const handleToggleUpper = () => {
        dispatch({ type: "UPPERCASE" });
    };
    const handleToggleLower = () => {
        dispatch({ type: "LOWERCASE" });
    };
    return (
        <div>
            <input type="text" value={state.text} onChange={handleChange} />
            <button onClick={handleToggleUpper}>Uppder Case</button>
            <button onClick={handleToggleLower}>Lower Case</button>
            <p>{state.text}</p>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
