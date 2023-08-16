import React, { useContext, useState } from "react";
import ReactDOM from "react-dom/client";

const countContext = React.createContext();

//counter will be a child component of countContext
const Counter = (props) => {
    const { count, setCount } = useContext(countContext);
    return (
        <div>
            {count}
            <br />
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                count+1
            </button>
        </div>
    );
};

const Demo1 = (props) => {
    const [count, setCount] = useState(0);
    return (
        <countContext.Provider value={{ count, setCount }}>
            <Counter></Counter>
        </countContext.Provider>
    );
};

const App = (props) => {
    return (
        <>
            <Demo1></Demo1>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
