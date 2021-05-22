import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Notification from "./components/Notification";
import Popup from "./components/Popup";
import { showNotification as show } from "./helpers/helpers";
import { RandomWord } from "./helpers/helpers";

function App() {
    const [selectedWord, setSelectedWord] = useState("");
    const [playable, setPlayable] = useState(true);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const getWords = async () => {
            let wordsArray = await RandomWord();
            setSelectedWord(
                wordsArray[Math.floor(Math.random() * wordsArray.length)]
            );
        };
        getWords();
    }, []);

    useEffect(() => {
        const handleKeydown = (event) => {
            const { key, keyCode } = event;
            if (
                (playable && keyCode >= 65 && keyCode <= 90) ||
                keyCode === 189
            ) {
                const letter = key.toLowerCase();

                if (selectedWord.includes(letter)) {
                    if (!correctLetters.includes(letter)) {
                        setCorrectLetters((correctLetters) => [
                            ...correctLetters,
                            letter,
                        ]);
                    } else {
                        show(setShowNotification);
                    }
                } else {
                    if (!wrongLetters.includes(letter)) {
                        setWrongLetters((wrongLetters) => [
                            ...wrongLetters,
                            letter,
                        ]);
                    } else {
                        show(setShowNotification);
                    }
                }
            }
        };
        window.addEventListener("keydown", handleKeydown);

        return () => window.removeEventListener("keydown", handleKeydown);
    }, [correctLetters, wrongLetters, playable, selectedWord]);

    async function playAgain() {
        setPlayable(true);

        // Empty arrays
        setCorrectLetters([]);
        setWrongLetters([]);

        const newWords = await RandomWord();
        const random = Math.floor(Math.random() * newWords.length);
        setSelectedWord(newWords[random]);
    }

    return (
        <>
            <Header />
            <div className="game-container">
                <Figure wrongLetters={wrongLetters} />
                <WrongLetters wrongLetters={wrongLetters} />
                <Word
                    selectedWord={selectedWord}
                    correctLetters={correctLetters}
                />
            </div>
            <Popup
                correctLetters={correctLetters}
                wrongLetters={wrongLetters}
                selectedWord={selectedWord}
                setPlayable={setPlayable}
                playAgain={playAgain}
            />
            <Notification showNotification={showNotification} />
        </>
    );
}

export default App;
