import React, { useState, useEffect, useMemo, useCallback } from "react";
import ReactDOM from "react-dom/client";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ViewListIcon from "@mui/icons-material/ViewList";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./custom.css";
import ListFilter from "./icons/List";
import CardFilter from "./icons/Card";
//自定义Hook
function useViewType() {
    const [viewType, setViewType] = useState("card");
    useEffect(() => {
        //localStorage.getItem("viewType") 不能直接作为 state 的默认值。 因为localStorage不再node环境中
        setViewType(localStorage.getItem("viewType") || "card");
    }, []);

    const toggleViewType = useCallback((newViewType) => {
        if (newViewType !== null) {
            setViewType(newViewType);
            localStorage.setItem("viewType", newViewType);
        }
    }, []);
    return { viewType, toggleViewType };
}

function App() {
    const [view, setView] = useState("list");
    const [data, setData] = useState(null);
    const data2 = useMemo(() => calc(data), [data]);
    const { viewType, toggleViewType } = useViewType();

    const isCardView = viewType === "card";
    const isListView = viewType === "list";

    //run after render
    function calc(data) {
        let result = [];
        if (data !== null) {
            result = data.map((x) => x * 2);
            console.log("calc", result, Date.now());
        }
        return result;
    }
    const handleChange = (event, nextView) => {
        if (nextView !== null) {
            setView(nextView);
        }
    };
    useEffect(() => {
        new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("solved");
                let data = [1, 2, 3];
                resolve(data);
            }, "5000");
        })
            .then(
                (data) => {
                    setData(data);
                    console.log(data, Date.now());
                    return data;
                },
                (reason) => {
                    console.log(reason);
                }
            )
            .then((data) => {
                //run after render
                setTimeout(() => {
                    console.log(data, Date.now());
                }, "5000");
            });
    }, []);

    return (
        <>
            <ToggleButtonGroup
                orientation="horizontal"
                color="primary"
                value={view}
                exclusive
                onChange={handleChange}
                size="small"
            >
                <ToggleButton value="list" aria-label="list">
                    <ViewListIcon />
                </ToggleButton>
                <ToggleButton value="calendar" aria-label="calendar">
                    <CalendarMonthIcon />
                </ToggleButton>
            </ToggleButtonGroup>
            {view === "list" ? (
                <p>
                    list: {data} at {Date.now()}
                </p>
            ) : (
                <p>
                    calendar: {data2} at {Date.now()}
                </p>
            )}
            <div className="bloghome__swith-view">
                {/*svg could be component*/}
                <CardFilter
                    onClick={() => toggleViewType("card")}
                    fill={viewType === "card" ? "#006dfe" : "#CECECE"}
                />
                <ListFilter
                    onClick={() => toggleViewType("list")}
                    fill={viewType === "list" ? "#006dfe" : "#CECECE"}
                />
            </div>
            {isListView && (
                <p>
                    list: {data} at {Date.now()}
                </p>
            )}
            {isCardView && (
                <p>
                    card: {data2} at {Date.now()}
                </p>
            )}
        </>
    );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
