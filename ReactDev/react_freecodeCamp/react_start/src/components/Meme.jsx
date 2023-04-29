import React from "react";
import memeData from "./memeData"

export default function Meme(props) {
    function handleClick() {
        console.log("I was clicked!ß");
    }

    function handleOnMouseOver() {
        console.log("mouse over")
    }

    const [allMemes, setAllMemes] = React.useState([])
    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch(`https://api.imgflip.com/get_memes`)
            const data = await res.json()
            setAllMemes(data)
        }
        getMemes()
    }, [])


    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    // const memeArray = memeData.data.memes
    function getMemeImage() {
        const memeArray = allMemes.data.memes
        const randomNumber = Math.floor(Math.random() * memeArray.length)
        const url = memeArray[randomNumber].url
        setMeme(preMeme => ({
            ...preMeme,
            randomImage: url
        }))

    }

    function handleChange(event) {
        // js object destructuring
        const { name, value } = event.target
        setMeme(preMeme => ({
            ...preMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">
                <input type="text" className="form-input" placeholder="Top text" value={meme.topText} name="topText" onChange={handleChange} />
                <input type="text" className="form-input" placeholder="Bottom text" value={meme.bottomText} name="bottomText" onChange={handleChange} />
                <button className="form-button" onClick={getMemeImage}>get a new image &#129409;</button>
            </div>
            <div className="meme">
                <img className="form-img" src={meme.randomImage} alt="img" onMouseOver={handleOnMouseOver} />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}