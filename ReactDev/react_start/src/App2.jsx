import React from "react"
import Star from "./components/Star"
import boxes from "./components/boxes"
import Box from "./components/Box"

export default function App(props) {
    const [contact, setContact] = React.useState({
        firstName: "John",
        lastName: "Doe",
        phone: "+1 (719) 555-1212",
        email: "itsmyrealname@example.com",
        isFavorite: false
    })

    function toggleFavorite() {
        setContact(prevContact => {
            return {
                ...prevContact,
                isFavorite: !prevContact.isFavorite
            }
        })
    }

    const [squares, setSquares] = React.useState(boxes)
    function toggleBox(id) {
        setSquares(preSquares => {
            return preSquares.map(element => element.id === id ? { ...element, on: !element.on } : { ...element })
        })
    }

    const squareElements = squares.map(square => (<Box
        // key will not be passed to element props
        key={square.id}
        on={square.on}
        id={square.id}
        handleClick={toggleBox}
    />))

    return (
        <div className="main2">
            <article className="card2">
                <img src="./images/user.png" className="card--image" />
                <div className="card--info">
                    {/* pass function to child component as prop, custom elment does not have onClick event*/}
                    <Star isFavorite={contact.isFavorite} handleClick={toggleFavorite} />
                    <h2 className="card--name">
                        {contact.firstName} {contact.lastName}
                    </h2>
                    <p className="card--contact">{contact.phone}</p>
                    <p className="card--contact">{contact.email}</p>
                </div>
            </article>
            <br />
            {squareElements}
        </div>
    )
}
