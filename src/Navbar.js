import React from "react"
import pikaimg from "./pikaimg.jpg"

export default function Navbar() {

// When the user scrolls down 20px from the top of the document, slide down the navbar
// When the user scrolls to the top of the page, slide up the navbar (50px out of the top view)
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
}

    return (
        <>
            <div className="navbar">
              
              <img src={pikaimg} alt="pikalogo" className="pikaimg"></img>

              <p className="navbar--title">Meme Generator</p>

              <ul>

                <li><a href="#home">Home</a></li>
                <li><a href="#meme-gen">Meme Generator</a></li>
                <li><a href="#footer">Credits</a></li>
              </ul>
            </div>
        </>
    )
}