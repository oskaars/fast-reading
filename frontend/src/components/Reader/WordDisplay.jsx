import React from 'react';
import './WordDisplay.css';

function WordDisplay({ word }) {
    console.log("zyje")
    if (!word) return <div className="word-container"></div>;

    //index of ORP -> optimal recognition point: TODO: do some research on how exactly does this work
    const getFocalIndex = (wordLength) => {
        if (wordLength === 1) return 0;
        if (wordLength <= 5) return 1;
        if (wordLength <= 9) return 2;
        return 3;
    };

    const chars = Array.from(word);
    const focalIndex = getFocalIndex(chars.length);

    const leftPart = chars.slice(0, focalIndex).join('');
    const centerLetter = chars[focalIndex];
    const rightPart = chars.slice(focalIndex + 1).join('');

    return (
        <div className="word-container">
            <div className="left-part">{leftPart}</div>
            <div className="center-part">{centerLetter}</div>
            <div className="right-part">{rightPart}</div>
        </div>
    );
}

export default WordDisplay;