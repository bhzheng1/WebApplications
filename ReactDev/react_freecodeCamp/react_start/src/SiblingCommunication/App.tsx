import React, { useState } from "react";
import "./styles.css";
import { Parent } from "./Parent";
import { Sibling1 } from "./Sibling1";
import { Sibling2 } from "./Sibling2";

export default function App() {
  const [title, setTitle] = useState("App Title");
  return (
    <div className="App">
      <div>{title}</div>
      <Parent>
        <Sibling1 name={title} />
        <Sibling2
          age={100}
          notifyParent={() => {
            setTitle((title) => title + "😀");
          }}
        />
      </Parent>
    </div>
  );
}