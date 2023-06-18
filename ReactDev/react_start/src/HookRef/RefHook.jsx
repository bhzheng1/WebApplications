// https://dmitripavlutin.com/react-useref-guide/
//useRef(initialValue) is a built-in React hook that accepts one argument as the initial value and returns a reference (aka ref). 
//A reference is an object having a special property current.
//reference.current accesses the reference value, and reference.current = newValue updates the reference value. Pretty simple.
import { useRef, useState, useEffect } from 'react';

function TemplateComponent() {
  const reference = useRef(initialValue);
  const someHandler = () => {
    // Access reference value:
    const value = reference.current;
    // Update reference value:
    reference.current = newValue;
  };
  // ...
}
// Reference and state diff
// Updating a reference doesn't trigger re-rendering, while updating the state makes the component re-render;
// The reference update is synchronous (the updated reference value is available right away), while the state update is asynchronous (the state variable is updated after re-rendering).

function RefLogButtonClicks() {
  const countRef = useRef(0);

  const handle = () => {
    countRef.current++;
    console.log(`Clicked ${countRef.current} times`);
  };
  console.log('I rendered!');
  return <button onClick={handle}>Click me</button>;
}

function StateLogButtonClicks() {
  const [count, setCount] = useState(0);

  const handle = () => {
    const updatedCount = count + 1;
    console.log(`Clicked ${updatedCount} times`);
    setCount(updatedCount);
  };
  console.log('I rendered!');
  return <button onClick={handle}>Click me</button>;
}


// 1. store inside a reference infrastructure data of side effects
//The component Stopwatch uses setInterval(callback, time) timer function to increase each second the counter of a stopwatch. 
//The timer id is stored into a reference timerIdRef
function Stopwatch() {
  const timerIdRef = useRef(0);
  const [count, setCount] = useState(0);
  const startHandler = () => {
    if (timerIdRef.current) { return; }
    timerIdRef.current = setInterval(() => setCount(c => c+1), 1000);
  };
  const stopHandler = () => {
    clearInterval(timerIdRef.current);
    timerIdRef.current = 0;
  };
  useEffect(() => {
    return () => clearInterval(timerIdRef.current);
  }, []);
  return (
    <div>
      <div>Timer: {count}s</div>
      <div>
        <button onClick={startHandler}>Start</button>
        <button onClick={stopHandler}>Stop</button>
      </div>
    </div>
  );
}

// 2. Another useful application of the useRef() hook is to access DOM elements. 
// This is performed in 3 steps
// a. Define the reference to access the element const elementRef = useRef();
// b. Assign the reference to ref attribute of the element: <div ref={elementRef}></div>;
// c. After mounting, elementRef.current points to the DOM element.

import { useRef, useEffect } from 'react';
function AccessingElement() {
  const elementRef = useRef();
   useEffect(() => {
    const divElement = elementRef.current;
    console.log(divElement); // logs <div>I'm an element</div>
  }, []);
  return (
    <div ref={elementRef}>
      I'm an element
    </div>
  );
}

function InputFocus() {
  const inputRef = useRef();
  useEffect(() => {
    // Logs `HTMLInputElement` 
    console.log(inputRef.current);
    inputRef.current.focus();
  }, []);
  // Logs `undefined` during initial rendering
  console.log(inputRef.current);
  return <input ref={inputRef} type="text" />;
}

// Updating references restriction:
// The function scope of the functional component should either calculate the output or invoke hooks.
// That's why updating a reference (as well as updating state) shouldn't be performed inside the immediate scope of the component's function.
// The reference must be updated either inside a useEffect() callback or inside handlers (event handlers, timer handlers, etc).

function MyComponent({ prop }) {
  const myRef = useRef(0);
  useEffect(() => {
    myRef.current++; // Good!
    setTimeout(() => {
      myRef.current++; // Good!
    }, 1000);
  }, []);
  const handler = () => {
    myRef.current++; // Good!
  };
  myRef.current++; // Bad!
  if (prop) {
    myRef.current++; // Bad!
  }
  return <button onClick={handler}>My button</button>;
}
