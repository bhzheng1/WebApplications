// useLayoutEffect fires before the brower repaints the screen.
// useEffect fires after the brower repaints the screen.
import React, { Component, useEffect, useLayoutEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

function Test(props) {
    const ref = useRef("first value");
    useEffect(() => {
        ref.current = "some value";
        console.log("useEffect fires");
        return () => {
            console.log("useEffect destroyed");
        };
    });

    // then, later in another hook or something
    useLayoutEffect(() => {
        console.log("useLayoutEffect fires");
        console.log(ref.current); // <-- this logs an old value because this runs first!
        return () => {
            console.log("useLayoutEffect destroyed");
        };
    });
    return (
        <div>
            {console.log("Test render")}
            <h2>{ref.current}</h2>
        </div>
    );
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }
    setCount = () => {
        this.setState({ count: this.state.count + 1 });
    };
    componentDidMount() {
        console.log("app componentDidMount");
    }

    componentDidUpdate() {
        console.log("app componentDidUpdate");
    }

    render() {
        return (
            <>
                <Test />
                <button onClick={this.setCount}>count + 1</button>
                test {console.log("app render")}
            </>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
