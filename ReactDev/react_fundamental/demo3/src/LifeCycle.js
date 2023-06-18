import React, { Component } from "react";
export default class LifeCycle extends Component {
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
