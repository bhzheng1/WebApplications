import React, { Component } from "react";

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = { like: false };
    }

    handleClick() {
        this.setState({
            ...this.state,
            like: !this.state.like,
        });
    }
    render() {
        console.log("Button updated");
        return (
            <button
                type="button"
                style={this.state.like ? { color: "red" } : { color: "black" }}
                onClick={() => this.handleClick()}
            >
                {this.state.like ? "liked" : "like"}
            </button>
        );
    }
}
