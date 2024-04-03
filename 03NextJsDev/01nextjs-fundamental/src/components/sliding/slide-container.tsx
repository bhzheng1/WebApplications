import React, { FC, useEffect, useState } from "react";
type SlideContainer = {
    direction: "left" | "right";
    width: string;
    IsSlideClosing: boolean;
    setIsSlideOpen: (value: boolean) => void;
    children: React.ReactNode;
};

const SlideContainer: FC<SlideContainer> = (props) => {
    const { direction, width, IsSlideClosing, setIsSlideOpen, children } =
        props;
    const [slideIsOpening, setSlideIsOpening] = useState(false);
    const slideContainerStyles: React.CSSProperties = {
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
        <div style={slideContainerStyles} onTransitionEnd={onTransitionEnd}>
            {children}
        </div>
    );
};
export default SlideContainer;
