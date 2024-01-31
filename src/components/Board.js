import React from 'react'
import LetterCell from './LetterCell'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle } from '@fortawesome/free-solid-svg-icons'

function Board({ score, letters, currentWord, onTileClick, submit, submittedWords, deleteFunc, shuffle }) {
    let word = ""

    if (submittedWords.length > 0) {

        let words = submittedWords
        if (submittedWords.length > 4) {
            words = submittedWords.slice(-4)
        }
        let i = 0;

        while (i < words.length) {
            if (i === words.length - 1) {
                word += words[i]
            } else {
                word += words[i] + " - "
            }
            i++
        }
    }


    return (
        <div>
            <div className='score'>
                <h1>{score}</h1>
            </div>
            <div className='currentWord'>
                <h1>{currentWord}</h1>
            </div>
            <div className='submittedWords'>
                <h3>{word}</h3>
            </div>
            <div >
                <div className='row'>
                    <LetterCell value={letters[0]} onClick={() => onTileClick(0)} />
                    <LetterCell value={letters[1]} onClick={() => onTileClick(1)} />
                    <LetterCell value={letters[2]} onClick={() => onTileClick(2)} />
                </div>
                <div className='row'>
                    <LetterCell value={letters[3]} onClick={() => onTileClick(3)} />
                    <LetterCell isCenterLetter={true} value={letters[4]} onClick={() => onTileClick(4)} />
                    <LetterCell value={letters[5]} onClick={() => onTileClick(5)} />
                </div>
                <div className='row'>
                    <LetterCell value={letters[6]} onClick={() => onTileClick(6)} />
                    <LetterCell value={letters[7]} onClick={() => onTileClick(7)} />
                    <LetterCell value={letters[8]} onClick={() => onTileClick(8)} />
                </div>
                <div className='row'>
                    <button onClick={deleteFunc}>Delete</button>
                    <button onClick={shuffle}><FontAwesomeIcon icon={faShuffle} /></button>
                    <button onClick={submit}>Submit</button>
                </div>
            </div>

        </div>
    )
}

export default Board