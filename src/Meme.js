import React from "react"

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = React.useState([])
    
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    
    function getMemeImage(e) {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url= allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }


        
    
    function handleChange(event){
        event.preventDefault()
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value === undefined ? "" : value

        }))
    }
    function handleSubmit(e){

    }

return(
    <div>
<form className="form" onSubmit={handleSubmit}>
    
    <img src={meme.randomImage} alt="" className="meme--image" />
    <h2 className="meme--text top">{meme.topText}</h2>
    <h2 className="meme--text bottom">{meme.bottomText}</h2>

    <input 
    type="text"
    placeholder="top text"
    className="form--input topinput"
    onChange={handleChange}
    name="topText"
    value={meme.topText}
    />

    <input 
     type="text"
     placeholder="bottom text"
     onChange={handleChange}
     name="bottomText"
     value={meme.bottomText}
     className="form--input bottominput"
    />
    <button type="submit" className="submit">Submit</button>
   
</form>

<button onClick={getMemeImage} className="button">Get a new meme</button>
</div>
)
}