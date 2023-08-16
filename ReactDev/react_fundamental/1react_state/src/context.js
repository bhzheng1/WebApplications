import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import PropTypes from "prop-types";

class Title extends Component {
    static contextTypes = {
        title: PropTypes.string,
        themeColor: PropTypes.string,
    };
    render() {
        console.log("title", this.props, this.context);
        const themeColor = this.context.themeColor;
        return <h1 style={{ color: themeColor }}>{this.context.title}</h1>;
    }
}

class Demo extends Component {
    static contextTypes = {
        title: PropTypes.string,
        themeColor: PropTypes.string,
    };
    render() {
        console.log("Demo", this.props, this.context);
        return <Title title={this.props.title}></Title>;
    }
}

class Button extends Component {
    //only needs the context and contextTypes that the component used
    static contextTypes = {
        themeColor: PropTypes.string,
        handleChangeThemeColor: PropTypes.func,
    };

    render() {
        const { themeColor, handleChangeThemeColor } = this.context;

        return (
            <div>
                <button
                    type="button"
                    style={{ color: themeColor }}
                    onClick={() => handleChangeThemeColor("red")}
                >
                    red
                </button>
                <button
                    type="button"
                    style={{ color: themeColor }}
                    onClick={() => handleChangeThemeColor("green")}
                >
                    green
                </button>
            </div>
        );
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            themeColor: "",
        };
    }

    static childContextTypes = {
        title: PropTypes.string,
        themeColor: PropTypes.string,
        handleChangeThemeColor: PropTypes.func,
    };

    getChildContext() {
        return {
            title: "title from app",
            themeColor: this.state.themeColor,
            handleChangeThemeColor: (color) =>
                this.handleChangeThemeColor(color),
        };
    }
    handleChangeThemeColor(color) {
        this.setState({
            ...this.state,
            themeColor: color,
        });
    }

    render() {
        return (
            <div className="App">
                <Demo></Demo>
                <Button></Button>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
