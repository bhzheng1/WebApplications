import React, {
    useRef,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useState,
} from "react";
import ReactDOM from "react-dom/client";

const CustomRef = forwardRef((props, ref) => {
    const [value, setValue] = useState(0);
    const handleClick = useCallback(() => {
        setValue((prevValue) => prevValue + 1);
    }, []);

    useImperativeHandle(
        ref,
        () => {
            console.log("useImperativeHandle");
            console.log(value);
            return {
                value,
                setValue,
            };
        },
        [value, setValue]
    );

    return (
        <div>
            <button onClick={handleClick}>Fancy {value}</button>
        </div>
    );
});

const App = (props) => {
    const ref = useRef(null);
    const [value, setValue] = useState(-1);
    const [callbackValue, setCallbackValue] = useState(-10);

    // this function won't refresh parent component
    // so the updated value won't be passed to parent component
    const handleClick = useCallback(() => {
        console.log("set ref.current");
        console.log(ref.current.value);
        ref.current.setValue((prevValue) => prevValue + 1);
        console.log(ref.current.value); //won't update because it is in callback
    }, []);

    // This function will pull value from child component
    // setValue will refresh parent component
    const handleClick1 = useCallback(() => {
        if (ref.current) {
            console.log("get ref.current");
            console.log(ref.current.value);
            setValue(ref.current.value);
        }
    }, []);

    // callbackRef will be called on mounts and unmounts
    // so callbackValue will be automatically updated with callbackRef
    const callbackRef = useCallback((object) => {
        console.log(object);
        setCallbackValue(object?.value);
    }, []);

    return (
        <>
            <button onClick={handleClick}>
                click to manually set value from parent component
            </button>
            <h1>ref current value {ref.current?.value}</h1>
            <button onClick={handleClick1}>
                click to manually get value from child component
            </button>
            <h1>value {value}</h1>

            <CustomRef ref={ref} />
            <hr />
            <CustomRef ref={callbackRef} />
            <h1>callbackRef: {callbackValue}</h1>
            <button onClick={handleClick}>
                click to manually set value from parent component
            </button>
        </>
    );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
