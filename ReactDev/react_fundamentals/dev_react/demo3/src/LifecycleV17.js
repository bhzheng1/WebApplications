import React, { Component } from "react";
export default class LifeCycleV17 extends Component {
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
