import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { useSelector, useDispatch, Provider } from "react-redux";
import {
    increment,
    decrement,
    reset,
    incrementByAmount,
} from "../slices/counterSlice";
import store from "../stores/counterStore";

const Counter = () => {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState(0);
    const addValue = Number(incrementAmount) || 0;
    const resetAll = () => {
        setIncrementAmount(0);
        dispatch(reset());
    };

    return (
        <section>
            <div>
                <p>{count}</p>
                <button onClick={resetAll}>Reset</button>
                <button onClick={() => dispatch(increment())}>+ 1</button>
                <button onClick={() => dispatch(decrement())}>- 1</button>
            </div>

            <div>
                <br />
                <label for="increment-amount">increment amount</label>
                <input
                    id="increment-amount"
                    type="text"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                ></input>
                <button onClick={() => dispatch(incrementByAmount(addValue))}>
                    Add amount
                </button>
            </div>
        </section>
    );
};

const App = () => {
    return (
        <div>
            <Counter />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
