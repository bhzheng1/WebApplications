import React, { Component, useState } from "react";
import ReactDOM from "react-dom/client";
import logo from "./logo.svg"; //引入文件的路径
import "./App.css"; //引入css文件 with cssloader3

console.log(logo); //logo is string
class Button extends Component {
    constructor(props) {
        super(props);
        this.state = { like: false };
    }

    handleClick() {
        this.setState({
            ...this.state,
            like: !this.state.like,
        });
    }
    render() {
        console.log("Button updated");
        return (
            <button
                type="button"
                style={this.state.like ? { color: "red" } : { color: "black" }}
                onClick={() => this.handleClick()}
            >
                {this.state.like ? "liked" : "like"}
            </button>
        );
    }
}
function Nav(props) {
    console.log("Nav updated");
    return (
        <div style={{ color: "white", backgroundColor: "black" }}>
            {props.title}
            {props.children}
        </div>
    );
}

function App() {
    const [state, setState] = useState({});
    console.log("app updated");
    return (
        <div className="App">
            <Nav title="Nav title">
                <h3>Nav children 1</h3>
                <h3>Nav children 2</h3>
                <h3>Nav children 3</h3>
            </Nav>
            <h1>this is my title</h1>
            <Input />

            <Button />
            <p onClick={() => setState({})}>update app</p>
        </div>
    );
}

//受控组件: input will be rewritten by function
class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
    }
    handleInput(e) {
        console.log(e.target);

        if (e.target.value.length > 5) {
            return;
        }
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        console.log("input updated");
        return (
            <input
                type="text"
                onInput={(e) => this.handleInput(e)}
                value={this.state.value}
            />
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
