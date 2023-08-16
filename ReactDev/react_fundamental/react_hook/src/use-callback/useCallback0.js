//the useCallback hook is a performance hook.
//Memoization is a way to cache a result so that it doesn’t need to be computed again. This can boost performance.
//https://www.knowledgehut.com/blog/web-development/all-about-react-usecallback
import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom/client";

function add() {
    return (a, b) => a + b;
}
//Each object equal to itself.
//But Object doesn't equal to Object which has same code.
//if function created twice, then the two function are different.
const add1 = add();
const add2 = add();

function Title() {
    console.log("Title Rendering");
    return (
        <div>
            <h2>useCallBack hook</h2>
        </div>
    );
}

function Button(props) {
    console.log(`Button clicked ${props.children}`);
    return (
        <div>
            <button onClick={props.handleClick}>{props.children}</button>
        </div>
    );
}

function Count(props) {
    console.log("Count rendering");
    return (
        <div>
            {props.text} is {props.count}
        </div>
    );
}

// React.memo is a Higher Order Component (HOC) that prevents a functional component from being re-rendered if its props or state do not change.
const CountMemo = React.memo(Count);
const ButtonMemo = React.memo(Button);
const TitleMemo = React.memo(Title);

const FunctionEquality = function () {
    return (
        <p>
            Function Equality Checks: add1===add2:
            {(add1 === add2).toString()}, add1===add1:
            {(add1 === add1).toString()}
        </p>
    );
};

const Parent0 = () => {
    const [age, setAge] = useState(25);
    const [salary, setSalary] = useState(25000);

    const incrementAge = () => {
        setAge(age + 1);
    };
    const incrementSalary = () => {
        setSalary(salary + 1000);
    };
    useEffect(() => {
        console.log("Parent0");
    });
    return (
        <div>
            <Title />
            <Count text="age" count={age} />
            <Button handleClick={incrementAge}>Increment my age</Button>
            <Count text="salary" count={salary} />
            <Button handleClick={incrementSalary}>Increment my salary</Button>
        </div>
    );
};

const Parent1 = function () {
    const [age, setAge] = useState(25);
    const [salary, setSalary] = useState(25000);

    //click either button, parent component will re-renders.
    //Functions will also be re-created before parent component re-renders.
    //Buttons having function as props will also re-render .
    const incrementAge = () => {
        setAge(age + 1);
    };
    const incrementSalary = () => {
        setSalary(salary + 1000);
    };
    useEffect(() => {
        console.log("parent1");
    });
    return (
        <div>
            <TitleMemo />
            <CountMemo text="age" count={age} />
            <ButtonMemo handleClick={incrementAge}>Increment my age</ButtonMemo>
            <CountMemo text="salary" count={salary} />
            <ButtonMemo handleClick={incrementSalary}>
                Increment my salary
            </ButtonMemo>
        </div>
    );
};
const Parent2 = function () {
    const [age, setAge] = useState(25);
    const [salary, setSalary] = useState(25000);

    //function will be memorized if code is the same.
    const incrementAge = useCallback(() => {
        setAge(age + 1);
    }, [age]);
    const incrementSalary = useCallback(() => {
        setSalary(salary + 1000);
    }, [salary]);
    useEffect(() => {
        console.log("parent2");
    });
    return (
        <div>
            <TitleMemo />
            <CountMemo text="age" count={age} />
            <ButtonMemo handleClick={incrementAge}>Increment my age</ButtonMemo>
            <CountMemo text="salary" count={salary} />
            <ButtonMemo handleClick={incrementSalary}>
                Increment my salary
            </ButtonMemo>
        </div>
    );
};

const App = function () {
    return (
        <>
            <FunctionEquality />
            <hr />
            <Parent0 />
            <hr />
            <Parent1 />
            <hr />
            <Parent2 />
        </>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
