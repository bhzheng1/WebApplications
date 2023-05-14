import logo from "./logo.svg"; //引入文件的路径
import "./App.css"; //引入css文件 with cssloader3
import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Nav from "./Nav";

console.log(logo); //logo is string

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

export default App;
