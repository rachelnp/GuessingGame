import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './GuessingGame.css'

const GuessingGame = (props) => {
    const [luckyNumber, setLuckyNumber] = useState(null); //number user is trying to guess
    const [currentGuess, setCurrentGuess] = useState(""); //user's current guess
    const [guesses, guessCount] = useState(null); //number of guesses user has made
    const [message, setMessage] = useState("Let's get started!"); //message/hint to display to the user

    useEffect(() => {
        if (luckyNumber === null) {
            setLuckyNumber (
                JSON.parse(localStorage.getItem("luckyNumber")) || generateLuckyNumber()
            )
        }
        if (guesses === 0) { 
            setCurrentGuess (
                JSON.parse(localStorage.getItem ("guesscount")) || 0       
            )
        }
    }, [guesses, luckyNumber])


const generateLuckyNumber = () => {
   let num = (Math.ceil(Math.random() * 100))
    localStorage.setItem("randomNum", JSON.stringify(num))
    return num;
}


function onGuess(event) {
    setCurrentGuess(event.target.value);
}


function handleSubmit(event) {
    let guessing = parseInt(currentGuess);
    guessCount(guesses + 1);
    localStorage.setItem("guesscount", JSON.stringify(guesses + 1))

    if (guessing === luckyNumber) {
        setMessage("Congrats, you guessed it!")
    } else if (guessing < luckyNumber){
        setMessage("Number is too low.")
    } else {
        setMessage("Your guess was too high!")
    }
    event.preventDefault()
}

const handleReset= () => {
    setCurrentGuess(""); 
    guessCount(null);
    setLuckyNumber(null);
    setMessage("Let's get started!")

    localStorage.removeItem("randomNum");
    localStorage.removeItem("count");
}


return (
    <div className="game" style={{ textAlign: 'center' }} onLoad={generateLuckyNumber}>
        <h2> I am thinking of a number between 1 and 100.<br></br>Guess the Lucky Number!</h2>
        <h3> You have made {guesses} guesses</h3>
        <Form>
            <Form.Control type="text" value={currentGuess} onChange={onGuess} name="input" />
            <p className="message"> {message} </p>
            <Button onClick={handleSubmit} variant="dark" type="submit" >Guess</Button>
            <br></br>
            <br></br>
            <Button onClick={handleReset} variant="dark" type="submit">Reset</Button>
        </Form>
    </div>
)
}

export default GuessingGame;