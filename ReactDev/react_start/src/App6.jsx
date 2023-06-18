import React from "react";
import Navbar from "./components/Navbar6";
import Main from "./components/Main";

export default function App(){
    const [darkMode, setDarkMode] = React.useState(true)
    
    function toggleDarkMode(){
        setDarkMode(prevMode => !prevMode)
    }
    return (
        <div className="container">
           <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}></Navbar>
           <Main darkMode={darkMode}></Main> 
        </div>
    )
}