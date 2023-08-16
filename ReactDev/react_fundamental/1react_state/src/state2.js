import React, { useState } from "react";
import ReactDOM from "react-dom/client";
function Title(porps) {
    const color = porps.color;
    return <h2 style={{ color: color }}>title</h2>;
}

function Button(props) {
    const color = props.color;
    return (
        <div>
            <button
                style={{ color: color }}
                onClick={() => props.handleClick("red")}
            >
                red
            </button>
            <button
                style={{ color: color }}
                onClick={() => props.handleClick("green")}
            >
                green
            </button>
        </div>
    );
}
function App() {
    const [color, setColor] = useState("");
    function handleClick(color) {
        setColor(color);
    }
    return (
        <div className="App">
            <Title color={color}></Title>
            <Button
                color={color}
                handleClick={(color) => handleClick(color)}
            ></Button>
        </div>
    );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
