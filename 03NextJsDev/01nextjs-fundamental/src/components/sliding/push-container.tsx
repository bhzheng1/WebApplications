import React, { type FC, useState, useEffect } from "react";
type AppContainerProps = {
    direction: "left" | "right";
    width: string;
    IsSlideClosing: boolean;
    children?: React.ReactNode;
};
const AppContainer: FC<AppContainerProps> = (props) => {
    const { direction, width, IsSlideClosing, children } = props;
    const appContainerStyles = {
        transform: IsSlideClosing
            ? "translateX(0)"
            : `translateX(${direction === "right" ? "-" : "+"}${width})`,
        transition: "transform 0.5s ease",
    };

    return <div style={appContainerStyles}>{children}</div>;
};

type PushContainerProps = {
    direction: "left" | "right";
    width: string;
    IsSlideClosing: boolean;
    setIsSlideOpen: (value: boolean) => void;
    children: React.ReactNode;
};
const PushContainer: FC<PushContainerProps> = (props) => {
    const { direction, width, IsSlideClosing, setIsSlideOpen, children } =
        props;
    const [slideIsOpening, setSlideIsOpening] = useState(false);

    const pushContainerStyles: React.CSSProperties = {
        position: "fixed",
        width,
        zIndex: 999,
        top: 0,
        left: direction === "right" ? undefined : 0,
        right: direction === "right" ? 0 : undefined,
        height: "100vh",
        background: "whitesmoke",
        transform: slideIsOpening
            ? "translateX(0)"
            : `translateX(${direction === "right" ? "+" : "-"}100%)`,
        transition: "transform 0.5s ease",
    };

    useEffect(() => {
        setSlideIsOpening(true);
    }, []);
    useEffect(() => {
        if (IsSlideClosing) {
            setSlideIsOpening(false);
        }
    }, [IsSlideClosing]);
    const onTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        if (IsSlideClosing && e.currentTarget === e.target) {
            setIsSlideOpen(false);
        }
    };

    return (
        <div style={pushContainerStyles} onTransitionEnd={onTransitionEnd}>
            {children}
        </div>
    );
};

export default PushContainer;
export { AppContainer };
