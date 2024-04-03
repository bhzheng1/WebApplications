// useLayoutEffect fires before the brower repaints the screen.
// useEffect fires after the brower repaints the screen.
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { createPortal } from "react-dom";
import Grid from "@mui/material/Grid";

function TooltipContainer({ children, x, y, contentRef }) {
    return (
        <div
            style={{
                position: "absolute",
                pointerEvents: "none",
                left: 0,
                top: 0,
                transform: `translate3d(${x}px, ${y}px, 0)`,
            }}
        >
            <div ref={contentRef} className="tooltip">
                {children}
            </div>
        </div>
    );
}

function Tooltip({ children, targetRect }) {
    const ref = useRef(null);
    const [tooltipHeight, setTooltipHeight] = useState(0);

    // This artificially slows down rendering
    let now = performance.now();
    while (performance.now() - now < 100) {
        // Do nothing for a bit...
    }

    useEffect(() => {
        const { height } = ref.current.getBoundingClientRect();
        setTooltipHeight(height);
    }, []);

    let tooltipX = 0;
    let tooltipY = 0;
    if (targetRect !== null) {
        tooltipX = targetRect.left;
        tooltipY = targetRect.top - tooltipHeight;
        if (tooltipY < 0) {
            // It doesn't fit above, so place below.
            tooltipY = targetRect.bottom;
        }
    }

    return createPortal(
        <TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
            {children}
        </TooltipContainer>,
        document.body
    );
}
function ButtonWithTooltip({ tooltipContent, ...rest }) {
    const [targetRect, setTargetRect] = useState(null);
    const buttonRef = useRef(null);
    return (
        <>
            <button
                {...rest}
                ref={buttonRef}
                onPointerEnter={() => {
                    const rect = buttonRef.current.getBoundingClientRect();
                    setTargetRect({
                        left: rect.left,
                        top: rect.top,
                        right: rect.right,
                        bottom: rect.bottom,
                    });
                }}
                onPointerLeave={() => {
                    setTargetRect(null);
                }}
            />
            {targetRect !== null && (
                <Tooltip targetRect={targetRect}>{tooltipContent}</Tooltip>
            )}
        </>
    );
}

////////////////////////////////////////////////////////////////////////////////////////

function Tooltip1({ children, targetRect }) {
    const ref = useRef(null);
    const [tooltipHeight, setTooltipHeight] = useState(0);

    // This artificially slows down rendering
    let now = performance.now();
    while (performance.now() - now < 100) {
        // Do nothing for a bit...
    }

    useLayoutEffect(() => {
        const { height } = ref.current.getBoundingClientRect();
        setTooltipHeight(height);
    }, []);

    let tooltipX = 0;
    let tooltipY = 0;
    if (targetRect !== null) {
        tooltipX = targetRect.left;
        tooltipY = targetRect.top - tooltipHeight;
        if (tooltipY < 0) {
            // It doesn't fit above, so place below.
            tooltipY = targetRect.bottom;
        }
    }

    return createPortal(
        <TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
            {children}
        </TooltipContainer>,
        document.body
    );
}
function ButtonWithTooltip1({ tooltipContent, ...rest }) {
    const [targetRect, setTargetRect] = useState(null);
    const buttonRef = useRef(null);
    return (
        <>
            <button
                {...rest}
                ref={buttonRef}
                onPointerEnter={() => {
                    const rect = buttonRef.current.getBoundingClientRect();
                    setTargetRect({
                        left: rect.left,
                        top: rect.top,
                        right: rect.right,
                        bottom: rect.bottom,
                    });
                }}
                onPointerLeave={() => {
                    setTargetRect(null);
                }}
            />
            {targetRect !== null && (
                <Tooltip1 targetRect={targetRect}>{tooltipContent}</Tooltip1>
            )}
        </>
    );
}

const App = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item>
                <ButtonWithTooltip
                    tooltipContent={
                        <div>
                            This tooltip does not fit above the button.
                            <br />
                            This is why it's displayed below instead!
                        </div>
                    }
                >
                    Hover over me (tooltip above)
                </ButtonWithTooltip>
                <div style={{ height: 50 }} />
                <ButtonWithTooltip
                    tooltipContent={
                        <div>This tooltip fits above the button</div>
                    }
                >
                    Hover over me (tooltip below)
                </ButtonWithTooltip>
                <div style={{ height: 50 }} />
                <ButtonWithTooltip
                    tooltipContent={
                        <div>This tooltip fits above the button</div>
                    }
                >
                    Hover over me (tooltip below)
                </ButtonWithTooltip>
            </Grid>

            <Grid item>
                <ButtonWithTooltip1
                    tooltipContent={
                        <div>
                            This tooltip does not fit above the button.
                            <br />
                            This is why it's displayed below instead!
                        </div>
                    }
                >
                    Hover over me (tooltip above)
                </ButtonWithTooltip1>
                <div style={{ height: 50 }} />
                <ButtonWithTooltip1
                    tooltipContent={
                        <div>This tooltip fits above the button</div>
                    }
                >
                    Hover over me (tooltip below)
                </ButtonWithTooltip1>
                <div style={{ height: 50 }} />
                <ButtonWithTooltip1
                    tooltipContent={
                        <div>This tooltip fits above the button</div>
                    }
                >
                    Hover over me (tooltip below)
                </ButtonWithTooltip1>
            </Grid>
        </Grid>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
