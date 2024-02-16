import React from 'react'
import { motion } from "framer-motion"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle } from '@fortawesome/free-solid-svg-icons'
import Rank from './Rank'

function Board({ score, letters, currentWord, onTileClick, submit, submittedWords, deleteFunc, shuffle, updateGameState, submittedInvalidWord }) {

    const spring = {
        type: "spring",
        damping: 25,
        stiffness: 120
    };

    let word = ""
    let words = submittedWords
    if (submittedWords.length > 0) {
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
            <Rank score={score} />
            <div className='currentWord'>
                <motion.h1
                    animate={{ x: submittedInvalidWord ? 1 : -1 }}
                    transition={{ type: "spring", bounce: 10 }}>
                    {currentWord}
                </motion.h1>
            </div>
            <div className='submittedWords' onClick={() => updateGameState("submittedWords")} >
                <motion.h3
                    animate={{ x: 1 }}
                    transition={{ type: "spring", bounce: 5 }}>
                    {word}
                </motion.h3>
            </div>
            <div className='row'>
                <ul>
                    {letters.map((letter) => (
                        <motion.h1
                            id={letter.isCentreLetter ? 'center-letter' : ''}
                            className="letter"
                            key={letter.id}
                            layout
                            transition={spring}
                            onClick={() => onTileClick(letter)}>
                            {letter.value}
                        </motion.h1>
                    ))}
                </ul>
            </div>
            <div className='button-row'>
                <button onClick={deleteFunc}>Delete</button>
                <button onClick={shuffle}><FontAwesomeIcon icon={faShuffle} /></button>
                <button onClick={submit}>Submit</button>
            </div>
        </div >

    )
}

export default Board