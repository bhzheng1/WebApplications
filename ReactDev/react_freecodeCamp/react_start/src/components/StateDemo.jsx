import React from "react"
export default function StateDemo(props) {
    const [thingsArray, setThingsArray] = React.useState(["thing 1", "thing 2"])
    const thingsElements = thingsArray.map(thing => <li key={thing}>{thing}</li>)
    
    function handleClick(){
        setThingsArray(preThingsArray => [...preThingsArray, `thing ${preThingsArray.length + 1}`])
    }

    return (
        <div>
            <button onClick={handleClick}>Add Item</button>
            <ul className="main-facts">
                {thingsElements}
            </ul>
        </div>
    )
}
