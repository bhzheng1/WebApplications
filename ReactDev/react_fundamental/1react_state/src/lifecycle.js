import React, { useState, Component } from "react";
import ReactDOM from "react-dom/client";
import PropTypes from "prop-types";

class PropTypeCheck extends Component {
    static propTypes = {
        title: PropTypes.string,
    };

    static defaultProps = {
        title: "default title",
    };

    render() {
        return <div>{this.props.title}</div>;
    }
}

class DefaultProps extends Component {
    //set a default props
    static defaultProps = {
        title: "the default title",
    };

    render() {
        //use the default props
        return <div>{this.props.title}</div>;
    }
}
class LifeCycle extends Component {
    constructor(props) {
        super(props);
        console.log("constructor");
        console.log(props);
        //constructor 只做state的初始化
        this.state = { time: new Date(), ...props.props };
    }

    tick() {
        this.setState({ ...this.state, time: new Date() });
    }

    //加载
    componentWillMount() {
        console.log("component will mount");
        //WillMount时可以call function
        this.timeId = setInterval(() => this.tick(), 1000);
    }
    componentDidMount() {
        console.log("component already mounted");
    }

    componentWillReceiveProps(nextProps) {
        console.log("组件将要接收参数");
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log("组件是否应该更新?");
        console.log(nextState);
        if (nextState.time.getSeconds() % 2 === 1) {
            return false;
        }
        return true;
    }

    componentWillUpdate() {
        console.log("组件将要更新");
    }

    componentDidUpdate() {
        console.log("组件已经更新完毕");
    }

    //卸载
    componentWillUnmount() {
        // unmount的时候可以destroy function
        clearInterval(this.timeId);
        console.log("组件将要卸载");
    }

    render() {
        console.log("render");
        return (
            <div style={{ border: "solid black 1px" }}>
                <p>component state: {this.state.a}</p>
                <p>{this.state.time.getSeconds()}</p>
                test
                <br />
                <button type="button" onClick={() => this.setState({})}>
                    set state 更新
                </button>
                <button type="button" onClick={() => this.forceUpdate()}>
                    force update更新
                </button>
            </div>
        );
    }
}
//组件初始化部分
//组件两种更新方式 setState, forceUpdate
//组件会随父组件的更新而更新

class LifeCycleV17 extends Component {
    constructor(props) {
        super(props);
        console.log("constructor: ", this.state);
        this.state = { a: 1, b: 2, time: new Date() };
        this.timeId = setInterval(() => this.tick(), 1000);
    }

    tick() {
        this.setState({ ...this.state, time: new Date() });
    }
    //静态生命周期函数
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("静态生命周期函数", nextProps, prevState);
        //函数返回结果会被添加到state/更新state的内容
        //null state不需要任何改变
        return { like: true };
    }
    componentDidMount() {
        console.log("component already mounted");
    }

    //next is the data after updating
    shouldComponentUpdate(nextProps, nextState) {
        console.log("组件是否应该更新?", nextProps, nextState);
        return true;
    }

    getSnapshotBeforeUpdate() {
        console.log("更新前获取截图", this.state);
        return "from snapshot";
    }

    //prev is the data before updating
    //info is the return in getSnapshotBeforeUpdate
    componentDidUpdate(prevProps, prevState, info) {
        console.log("组件已经更新完毕", prevProps, prevState, info);
    }

    //卸载
    componentWillUnmount() {
        // unmount的时候可以destroy function
        clearInterval(this.timeId);
        console.log("组件将要卸载");
    }

    handleClick() {
        console.log("setState", this.state);
        //setState will update state before getDerivedStateFromProps
        this.setState({ ...this.state, props: { x: 1 } });
    }
    render() {
        console.log("render", this.state);
        return (
            <div>
                <p>Demo</p>
                <p>{this.state.time.getSeconds()}</p>
                <br />
                <button type="button" onClick={() => this.handleClick()}>
                    lifecycle change state
                </button>
            </div>
        );
    }
}
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
            <PropTypeCheck title={0}></PropTypeCheck> {/*show type error*/}
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
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
