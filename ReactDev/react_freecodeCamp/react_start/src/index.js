import React from "react"
import {createRoot} from "react-dom/client"
import App2 from "./App2"
import App1 from "./App1"
import App0 from "./App0"
import App3 from "./App3"
import App4 from "./App4"
import App5 from "./App5"
import App6 from "./App6"
import App7 from "./App7"
import * as Layout from "./RouterLayout";
import * as HookState from './HookState'
import Calculator from './StateLifting/Calculator'
import App9 from './SiblingCommunication/App'


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App9 />);
