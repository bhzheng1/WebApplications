import React from "react";
import styled from "styled-components";
import type { FC } from "react";

const Light = styled.div<{ size: string; color: string }>`
    height: ${(props) => props.size};
    width: ${(props) => props.size};
    background-color: ${(props) => props.color};
    border-radius: 50%;
    border: 1px solid grey;
    display: inline-block;
    margin: 5px;
`;

const LightGroup = styled.div<{ size: string }>`
    width: ${(props) => props.size};
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid grey;
    border-radius: 8px;
    background-color: #efefef;
`;

const TrafficLightField: FC = ({ name, value, setFieldValue }: any) => {
    const colors = ["red", "orange", "green"];
    const [current, setCurrent] = React.useState(value);
    const colorFor = (index: number) =>
        current === index ? colors[index] : "transparent";

    React.useEffect(() => {
        name && setFieldValue && setFieldValue(name, current);
    }, [name, current, setFieldValue]);

    return (
        <LightGroup size="50px">
            <Light
                size="40px"
                color={colorFor(0)}
                onClick={() => setCurrent(0)}
            />
            <Light
                size="40px"
                color={colorFor(1)}
                onClick={() => setCurrent(1)}
            />
            <Light
                size="40px"
                color={colorFor(2)}
                onClick={() => setCurrent(2)}
            />
        </LightGroup>
    );
};

// custom field component
const withField =
    (Component: FC) =>
    ({ field, form, ...props }: any) =>
        <Component {...field} {...form} {...props} />;

const TrafficLight = withField(TrafficLightField);

export default TrafficLight;
