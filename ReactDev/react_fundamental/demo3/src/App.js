import { useState } from "react";
import LifeCycle from "./LifeCycle";
import LifeCycleV17 from "./LifecycleV17";
import DefaultProps from "./DefaultProps";
import PropTypeCheck from "./PropTypeCheck";

function App() {
    const [state, setState] = useState({ isRenderLifeCycle: true });
    return (
        <div className="App">
            {/* {state.isRenderLifeCycle ? (
                <LifeCycle props={{ a: 111, b: 1 }}></LifeCycle>
            ) : (
                "不渲染lifecycle"
            )} */}

            {/* {state.isRenderLifeCycle ? (
                <LifeCycleV17 props={{ a: 111, b: 1 }}></LifeCycleV17>
            ) : (
                "不渲染lifecycle"
            )} */}

            {/* <DefaultProps></DefaultProps> */}

            <PropTypeCheck title={0}></PropTypeCheck>
            <br />
            <button type="button" onClick={() => setState({ ...state })}>
                app set state update
            </button>
            <button
                type="button"
                onClick={() =>
                    setState({
                        ...state,
                        isRenderLifeCycle: !state.isRenderLifeCycle,
                    })
                }
            >
                切换渲染
            </button>
        </div>
    );
}

export default App;
