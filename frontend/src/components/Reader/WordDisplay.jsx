import React from 'react';
import './WordDisplay.css';

function WordDisplay({ word }) {
    if (!word) return <div className="word-container"></div>;

    // Algorytm nadawania wag literom w zależności od ich pozycji
    const letterWeight = (index, length) => {
        const relativePos = index / length;

        // większa waga dla początku i środka
        if (relativePos < 0.3) return 1.2;
        if (relativePos < 0.7) return 1.0;
        return 0.8;
    };

    // Algorytm wyliczający indeks Optimal Recognition Point (ORP)
    const getORPIndex = (word) => {
        const chars = Array.from(word);
        const n = chars.length;

        if (n <= 2) return 0;

        let bestIndex = 0;
        let bestScore = -Infinity;

        for (let i = 0; i < n; i++) {
            let score = 0; 

            for (let k = 0; k < n; k++) {
                const distance = Math.abs(k - i);
                const isRight = k > i;

                const decay = Math.exp(-distance * (isRight ? 0.5 : 0.8));
                const weight = letterWeight(k, n);

                score += weight * decay;
            }

            if (score > bestScore) {
                bestScore = score;
                bestIndex = i;
            }
        }

        return bestIndex;
    };

    const chars = Array.from(word);
    const focalIndex = getORPIndex(chars.join(''));

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