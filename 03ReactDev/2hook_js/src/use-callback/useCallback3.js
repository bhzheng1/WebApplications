// https://medium.com/welldone-software/usecallback-might-be-what-you-meant-by-useref-useeffect-773bc0278ae
// useCallback to reflect the ref change in child component dynamically
// useRef and useEffect won't work
import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom/client";
import catImageUrl from "./cat.png";
const App = () => {
    const [count, setCount] = useState(1);
    const shouldShowImageOfCat = count % 3 === 0;

    const [catInfo, setCatInfo] = useState(false);

    // notice how this is a useCallback
    // that's used as the "ref" of the image below
    const catImageRef = useCallback((catImageNode) => {
        console.log(catImageNode);
        setCatInfo(catImageNode?.getBoundingClientRect());
    }, []);

    return (
        <div className="App">
            <h1>useEffect & useRef vs useCallback</h1>
            <p>
                An image of a cat would appear on every 3rd render.
                <br />
                <br />
                Would our hook be able to make the emoji see it?
                <br />
                <br />
                {catInfo ? "😂" : "😩"} - I {catInfo ? "" : "don't"} see the cat
                🐈
                {catInfo ? `, it's height is ${catInfo.height}` : ""}!
            </p>
            <input disabled value={`render #${count}`} />
            <button onClick={() => setCount((c) => c + 1)}>next render</button>
            <br />
            {shouldShowImageOfCat ? (
                <img
                    ref={catImageRef}
                    src={catImageUrl}
                    alt="cat"
                    width="50%"
                    style={{ padding: 10 }}
                />
            ) : (
                ""
            )}
        </div>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
