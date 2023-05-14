import React,{useState, useEffect} from "react";

export default function App() {
    const [starWarsData, setStarWarsData] = React.useState({})
    const [count, setCount] = React.useState(1)

    // Will render infinity because the dead loop setStarWarsData->re-render->setStarWatsData, "side effects"
    // fetch("https://swapi.dev/api/people/1")
    //     .then(res => res.json()).then(data => setStarWarsData(data))
    // console.log(starWarsData)

    React.useEffect(()=>{
        console.log("run with all render!")
    })

    // effect be activated by dependencies array
    React.useEffect(function () {
        console.log("Effect ran")
        fetch(`https://swapi.dev/api/people/${count}`)
            .then(res => res.json()).then(data => setStarWarsData(data))
    }, [count])

    return (
        <div>
            <pre>{JSON.stringify(starWarsData, null, 2)}</pre>
            <h2>The count is {count}</h2>
            <button onClick={() => setCount(preCount => preCount + 1)}>Add</button>
        </div>
    )
}