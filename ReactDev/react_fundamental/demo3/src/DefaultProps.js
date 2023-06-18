import React, { Component } from "react";
export default class DefaultProps extends Component {
    //set a default props
    static defaultProps = {
        title: "the default title",
    };

    render() {
        //use the default props
        return <div>{this.props.title}</div>;
    }
}
