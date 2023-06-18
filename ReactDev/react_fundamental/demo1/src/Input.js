import React, { Component } from "react";
//受控组件: input will be rewritten by function
export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
    }
    handleInput(e) {
        console.log(e.target);

        if (e.target.value.length > 5) {
            return;
        }
        this.setState({
            value: e.target.value,
        });
    }

    render() {
        console.log("input updated");
        return (
            <input
                type="text"
                onInput={(e) => this.handleInput(e)}
                value={this.state.value}
            />
        );
    }
}
