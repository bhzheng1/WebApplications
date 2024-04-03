import React, { FC, useState, createContext } from "react";
import SlideContainer from "./slide-container";
import { AppContainer } from "./push-container";
export const SlideContext = createContext({
    openSlide: () => {},
    closeSlide: () => {},
    toggleSlide: () => {},
    setSlideProps: (props: any) => {},
});

type SlideContextProviderProps = {
    children?: React.ReactNode;
    openByDefault?: boolean;
    SlideComponent: React.FC;
    width?: string;
    direction?: "left" | "right";
    animation?: "slide" | "push";
};

const defaultProps = {
    openByDefault: false,
    width: "300px",
    direction: "right" as const,
    animation: "slide" as const,
};

const SlideContextProvider: FC<SlideContextProviderProps> = (props) => {
    const {
        openByDefault,
        width,
        direction,
        animation,
        SlideComponent,
        children,
    } = { ...defaultProps, ...props };

    const [isSlideOpen, setIsSlideOpen] = useState(openByDefault || false);
    const [slideIsClosing, setSlideIsClosing] = useState(true);
    const [slideProps, _setSlideProps] = useState({});

    const openSlide = () => {
        setIsSlideOpen(true);
        setSlideIsClosing(false);
    };

    const closeSlide = () => {
        setSlideIsClosing(true);
    };

    const toggleSlide = () => {
        if (isSlideOpen) {
            closeSlide();
        } else {
            openSlide();
        }
    };

    const setSlideProps = (newSlideProps: any) => {
        if (JSON.stringify(newSlideProps) !== JSON.stringify(slideProps)) {
            _setSlideProps(newSlideProps);
        }
    };

    const renderContents = () => {
        switch (animation) {
            case "push":
                return (
                    <>
                        {isSlideOpen && (
                            <SlideContainer
                                direction={direction!}
                                width={width!}
                                IsSlideClosing={slideIsClosing}
                                setIsSlideOpen={setIsSlideOpen}
                                {...slideProps}
                            >
                                <SlideComponent {...slideProps} />
                            </SlideContainer>
                        )}
                        <AppContainer
                            direction={direction!}
                            width={width!}
                            IsSlideClosing={slideIsClosing}
                        >
                            {children}
                        </AppContainer>
                    </>
                );
            case "slide":
            default:
                return (
                    <>
                        {isSlideOpen && (
                            <SlideContainer
                                direction={direction!}
                                width={width!}
                                IsSlideClosing={slideIsClosing}
                                setIsSlideOpen={setIsSlideOpen}
                                {...slideProps}
                            >
                                <SlideComponent {...slideProps} />
                            </SlideContainer>
                        )}
                        {children}
                    </>
                );
        }
    };
    return (
        <SlideContext.Provider
            value={{ openSlide, closeSlide, toggleSlide, setSlideProps }}
        >
            {renderContents()}
        </SlideContext.Provider>
    );
};
export default SlideContextProvider;
