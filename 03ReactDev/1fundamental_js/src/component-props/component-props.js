// https://www.freecodecamp.org/news/react-props-cheatsheet/
import React from "react";
import ReactDOM from "react-dom/client";
import AccessAlarmIconGoogle from "@mui/icons-material/AccessAlarm";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";

const Child1 = (props) => <button>{props.name}</button>;
const Child2 = ({ name, ...props }) => <button>{name}</button>;
const Child3 = (name, props) => <button>{name}</button>; //cause error

// React component as a prop: https://www.developerway.com/posts/react-component-as-prop-the-right-way
// sample: Building a button with an icon

// first: icon as react element
const ButtonWithIconElement = ({ children, icon }) => (
    <button>
        {icon}
        {children}
    </button>
);

//Second: icon as a Component
const ButtonWithIconComponent = ({ children, Icon, iconProps }) => (
    <button>
        <Icon {...iconProps} /> {children}
    </button>
);

//Third: icon as a function
const ButtonWithIconRenderFunction = ({ children, renderIcon }) => {
    const icon = renderIcon();
    return (
        <button>
            {icon} {children}
        </button>
    );
};

const App = (props) => {
    return (
        <>
            <Child1 name="child1" />
            <Divider />
            <Child1 {...{ name: "child1" }} />
            <Divider />
            <Child2 name="child2" />
            <Divider />
            <ButtonWithIconElement
                icon={<AccessAlarmIconGoogle color="warning" />}
            />
            <Divider />
            <ButtonWithIconComponent
                Icon={DeleteIcon}
                iconProps={{ fontSize: "large" }}
            />
            <Divider />
            <ButtonWithIconRenderFunction
                renderIcon={() => <AccessAlarmIconGoogle color="A400" />}
            />
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
