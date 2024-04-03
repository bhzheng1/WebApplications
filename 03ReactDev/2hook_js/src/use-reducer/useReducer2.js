import React, { useReducer } from "react";
import ReactDom from "react-dom/client";

// first create the initial state
const initialState = {
    text: "",
    isUpperCase: false,
};

// second create action types
const ActionType = {
    SET_TEXT: "SET_TEXT",
    TOGGLE_UPPERCASE: "TOGGLE_UPPERCASE",
    TOGGLE_LOWERCASE: "TOGGLE_LOWERCASE",
    RESET: "RESET",
};
const SetTextAction = {
    type: ActionType.SET_TEXT,
    payload: {
        text: "",
    },
};
const ToggleUppercaseAction = {
    type: ActionType.TOGGLE_UPPERCASE,
    payload: {},
};
const ToggleLowercaseAction = {
    type: ActionType.TOGGLE_LOWERCASE,
    payload: {},
};
const ResetAction = {
    type: ActionType.RESET,
    payload: {
        text: "",
    },
};

// third create reducer functions
const handlers = {
    [ActionType.SET_TEXT]: (state, action) => {
        return {
            ...state,
            text: state.isUpperCase
                ? action.payload.text.toUpperCase()
                : action.payload.text,
        };
    },
    [ActionType.TOGGLE_UPPERCASE]: (state, action) => {
        return {
            ...state,
            isUpperCase: true,
            text: state.text.toUpperCase(),
        };
    },
    [ActionType.TOGGLE_LOWERCASE]: (state, action) => {
        return {
            ...state,
            isUpperCase: false,
            text: state.text.toLowerCase(),
        };
    },
    [ActionType.RESET]: (state, action) => {
        return {
            ...state,
            isUpperCase: false,
            text: action.payload.text,
        };
    },
};

// fourth create the reducer
const reducer = (state, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const handleChange = (e) => {
        SetTextAction.payload.text = e.target.value;
        dispatch(SetTextAction);
    };
    const handleToggleUpper = () => {
        dispatch(ToggleUppercaseAction);
    };
    const handleToggleLower = () => {
        dispatch(ToggleLowercaseAction);
    };
    const handleReset = () => {
        dispatch(ResetAction);
    };

    return (
        <div>
            <input type="text" value={state.text} onChange={handleChange} />
            <button onClick={handleToggleUpper}>Upper Case</button>
            <button onClick={handleToggleLower}>Lower Case</button>
            <button onClick={handleReset}>Reset</button>
            <p>{state.text}</p>
        </div>
    );
};
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<App />);
