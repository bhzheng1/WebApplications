import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Card from "./components/Card";
import Contact from "./components/Contact";
import Joke from "./components/Joke";
import jokesData from "./components/jokesData"
import cardData from "./components/cardData"
const person = {
    img: "../images/cat.jpg",
    name: "Mr. hello",
    phone: "12312313",
    email: "aaaaaaa"
}

const App = (props) => {
    const colors = ["red", "orange", "Yellow", "Green", "Blue", "Indigo", "Violet"].map(c => { return <li key={c}>{c}</li> })
    const jokeElements = jokesData.map(joke => {
        const item = Object.assign({}, joke, { hello: "Hello world" });
        return <Joke key={item.id} {...item} />
    })

    const cards = cardData.map(
        card => {
            return <Card key={card.id} {...card} />
        }
    )
    return (
        <div className="container">
            <Navbar />
            <Hero />
            <section className="contact-list">
                <Contact
                    img="../images/cat.jpg"
                    name="Mr. hello"
                    phone="12312313"
                    email="msfsdfsdfsdfsafd"
                />
                <Contact {...person} />
            </section>

            <ul>{colors}</ul>
            <section className="cards-list">
                {cards}
            </section>
            {jokeElements}

        </div>
    )
}
export default App