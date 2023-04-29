import React from "react";
export default function WindowTracer(){
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
    React.useEffect(()=>{
        function watchWidth(){
            console.log("Setting up......")
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener("resize",watchWidth)

        // will run on each render while also once when element was removed from dom
        return function(){
            console.log("Clean up......")
            window.removeEventListener("resize",watchWidth)
        } 
    })

    return (
        <h1>
            Window width: {windowWidth}
        </h1>
    )
}