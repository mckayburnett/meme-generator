import React, { useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';

let memeInit = {
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg", 
    uuid: undefined
}

export default function Meme() {
    const [editing, setEditing] = React.useState(false)
    const [meme, setMeme] = React.useState({
        ...memeInit, 
        uuid: uuidv4()
    })
    const [allMemes, setAllMemes] = React.useState([]) // api data

    const [memesArray, setMemesArray] = React.useState([])

    function deleteMeme(uuid) {
        setMemesArray(prevMemes => prevMemes.filter(meme => meme?.uuid !== uuid))
       
    }


    function editMeme(topText, bottomText, uuid, randomImage) {
        setEditing(true)

        setMeme(() => ({
            randomImage, // url
            uuid, // preserving the uuid
            topText, 
            bottomText,
        }))
    }

    function handleEdit(e) {
        e.preventDefault()
        console.log('in handle edit');
        // research whether find returns a copy or not
        let memeIndex = memesArray.findIndex((item) => {
            return item.uuid === meme.uuid
        })

        let memeEdit = {
            ...memesArray[memeIndex],  // preserve uuid [{}, {}]
            bottomText: meme.bottomText, 
            topText: meme.topText,
        }

        // setMemesArray([...memesArray.filter(item => item.uuid !== meme.uuid), memeEdit]) // asynchronous
        setMemesArray(prev => {
            let copy  = [...prev]
            copy[memeIndex] = memeEdit
            return copy
        }) // asynchronous

        // setAllMemes(memes => ([memes.slice(0, memeIndex).concat(memes.slice(memeIndex + 1)), memeEdit])) // asynchronous

        setEditing(false)

        setMeme({
            ...memeInit, 
            uuid: uuidv4() // creating new meme uuid
        })
    }

    useEffect(() => {
        // console.log('memestate', allMemes);
    }, [allMemes])
    
    useEffect(() => {
        // console.log('memesArray', memesArray);
    }, [memesArray])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes") // 100
            .then(res => res.json()) // parsing boilerplate
            .then(data => {
                const memes = data.data.memes 
                memes.forEach(meme => {
                    meme['uuid'] = uuidv4() // enumerating/giving it an identifier
                })
                setAllMemes(memes)
            })
    }, [])
    
    function getMemeImage(e) {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prev => ({
            ...prev,
            randomImage: url
        }))
    }

    function handleChange(event){
        event.preventDefault()
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme, // preserve url
            [name]: value 
        }))
    }



    const savedMemes = memesArray.map(savedMeme => {
        const {topText, bottomText, randomImage, uuid} = savedMeme
        return (
            <div key={uuid} className="savedMeme">
                <img src={randomImage} alt="" className="savedImage"/>
                <h2 className="savedTopText">{topText}</h2>
                <h2 className="savedBottomText">{bottomText}</h2>
                <div className="buttons">
                    <button className="edit" onClick={() => editMeme(topText, bottomText, uuid, randomImage)}>Edit</button>
                    <button className="delete" onClick={() => deleteMeme(uuid)}>Delete</button>
                </div>
            </div>
        )
    })

    function handleSubmit(e){
        e.preventDefault()
        setMemesArray(prevMemesArray => [...prevMemesArray, meme])    
        setMeme({ // reset the meme to default state
            ...memeInit, 
            uuid: uuidv4()
        })
    }
    

return(
<div>
    <form className="form">
    <div className="memeWrapper">
        <img src={meme.randomImage} alt="" className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
    </div>
        <div className="inputBoxes">
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
        </div>
        {!editing ? 
        (<button type="submit" className="submit" onClick={handleSubmit}>Submit</button>) 
        : 
        (<button className="submit" onClick={handleEdit}>Edit</button>)}
        
    </form>

    <button onClick={getMemeImage} className="button">Get a new meme</button>
    <div className="savedMeme">
        {savedMemes}
    </div>
</div>
)
}