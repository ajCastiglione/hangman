import React, { useEffect } from "react";
import { checkWin } from "../helpers/helpers";

const Popup = ({
    correctLetters,
    wrongLetters,
    selectedWord,
    setPlayable,
    playAgain,
}) => {
    let finalMsg = "";
    let finalMsgRevealWord = "";
    let playable = true;

    if (checkWin(correctLetters, wrongLetters, selectedWord) === "win") {
        finalMsg = "Congratulations! You won!";
        playable = false;
    } else if (checkWin(correctLetters, wrongLetters, selectedWord)) {
        finalMsg = "Unfortunately, you've lost.";
        finalMsgRevealWord = `... the word was: ${selectedWord}`;
        playable = false;
    }

    useEffect(() => {
        setPlayable(playable);
    }, [setPlayable, playable]);

    return (
        // <!-- Container for final message -->
        <div
            className="popup-container"
            style={finalMsg !== "" ? { display: "flex" } : {}}>
            <div className="popup">
                <h2>{finalMsg}</h2>
                <h3>{finalMsgRevealWord}</h3>
                <button onClick={playAgain}>Play Again</button>
            </div>
        </div>
    );
};

export default Popup;
