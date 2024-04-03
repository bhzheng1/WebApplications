import React, { useContext, createContext, useMemo } from "react";
import ReactDom from "react-dom/client";

// first: create the context
const MyContext = createContext();

// second: create the context provider
const MyContextProvider = (props) => {
    const { children } = props;
    const value = useMemo(
        () => ({
            name: "test",
            age: 10,
            sex: "male",
            hobby: ["sing", "dance"],
        }),
        []
    );
    return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

// third: create the context consumer

const MyContextConsumer = MyContext.Consumer;

// consume context directly
const MyContextConsumer1 = () => {
    const { name, age, sex, hobby } = useContext(MyContext);
    return (
        <div>
            <div>name: {name}</div>
            <div>age: {age}</div>
            <div>sex: {sex}</div>
            <div>hobby: {hobby}</div>
        </div>
    );
};

// consume context with context consumer
const MyContextConsumer2 = (props) => {
    const { name, age, sex, hobby } = props;
    return (
        <div>
            <div>name: {name}</div>
            <div>age: {age}</div>
            <div>sex: {sex}</div>
            <div>hobby: {hobby}</div>
        </div>
    );
};

const App = (props) => {
    return (
        <MyContextProvider>
            <MyContextConsumer1 />

            <br />
            <MyContextConsumer>
                {(value) => {
                    return <MyContextConsumer2 {...value} />;
                }}
            </MyContextConsumer>
        </MyContextProvider>
    );
};
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<App />);
