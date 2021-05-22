import React from "react";

const Word = ({ selectedWord, correctLetters }) => {
    if (selectedWord) {
        return (
            <div className="word">
                {selectedWord.split("").map((letter, idx) => {
                    return (
                        <span className="letter" key={idx}>
                            {correctLetters.includes(letter) ? letter : ""}
                        </span>
                    );
                })}
            </div>
        );
    } else {
        return (
            <div className="word">
                <h2>Loading...</h2>
            </div>
        );
    }
};

export default Word;
