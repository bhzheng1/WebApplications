"use client";
import { useContext } from "react";
import { SlideContext } from "@/components/sliding/sliding-provider";
function App() {
    const { toggleSlide } = useContext(SlideContext);
    return (
        <div className="App">
            <h1>App</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam, eligendi provident. Aliquid nisi ducimus dignissimos
                nulla nemo excepturi rerum blanditiis, omnis pariatur
                doloremque! Cupiditate fugit numquam sapiente at nam incidunt.
            </p>
            <button onClick={toggleSlide} className="primary-button">
                Toggle Menu
            </button>
        </div>
    );
}

export default App;
