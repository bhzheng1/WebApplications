import React from "react";
import ReactDOM from "react-dom/client";

// components without props as children
function Parent0(props) {
    return <div>{props.children}</div>;
}

// component with props as children
function Parent1(props) {
    function onClick() {
        console.log("hello there");
    }

    const childrenWithProps = React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { onClick });
        }
        return child;
    });
    return <div>{childrenWithProps}</div>;
}

// function with parameter as children
function Parent2(props) {
    function sayHello() {
        console.log("hello there");
    }
    return <div>{props.children(sayHello)}</div>;
}

const App = (props) => {
    return (
        <div>
            <Parent0>
                <button>test1</button>
                <button>test2</button>
            </Parent0>
            <hr />
            <Parent1>
                <button>test1</button>
                <button>test2</button>
            </Parent1>
            <hr />
            <Parent2>
                {(sayHello) => (
                    <>
                        <button onClick={sayHello}>test1</button>
                        <button onClick={sayHello}>test2</button>
                    </>
                )}
            </Parent2>
        </div>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
