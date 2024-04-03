// 这个hook与forwardRef一起用于增强ref的能力，使ref可以引用任何object，而不仅仅是DOM节点。
import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import ReactDOM from "react-dom/client";

const FancyInput = forwardRef((props, ref) => {
    const [fresh, setFresh] = useState(0);
    const attRef = useRef(0);
    useImperativeHandle(
        ref,
        () => {
            return {
                attRef,
                fresh,
            };
        },
        [fresh]
    );
    const handleClick = useCallback(() => {
        attRef.current += 1;
    }, []);

    return (
        <div>
            {attRef.current} {"\u00A0"}
            <button onClick={handleClick}>Fancy</button>
            <button onClick={() => setFresh(!fresh)}>fresh</button>
        </div>
    );
});

const App = (props) => {
    const fancyInputRef = useRef(null);
    return (
        <>
            <FancyInput ref={fancyInputRef} />
            <hr />
            <button onClick={() => console.log(fancyInputRef.current)}>
                properties of child instance
            </button>
        </>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
