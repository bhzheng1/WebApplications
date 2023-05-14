import React from "react";
import Header from "./components/Header";
import Meme from "./components/Meme";
import StateDemo from "./components/StateDemo"

export default function App(props) {
    return (
        <div>
            <Header />
            <Meme />
            <StateDemo />
        </div>
    )
}