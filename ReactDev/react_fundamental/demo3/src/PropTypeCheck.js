import React, { Component } from "react";
import PropTypes from "prop-types";
export default class Title extends Component {
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
