import React from "react";

export default function Joke(props){
    console.log(props.isPun)
    const[isShown, setIsShown] = React.useState(false)

    function toggleShown(){
        setIsShown(prevShown => !prevShown);
    }
    return (
        <div>
            <hr />
            {props.setup && <h3>Setup: {props.setup}</h3>}

            {isShown && props.punchline && <p>Punchline: {props.punchline}</p>}
            <button onClick={toggleShown}>{isShown?"Hide":"Show"} Punchline</button>
        </div>
    )
}