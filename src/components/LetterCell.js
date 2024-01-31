import React from 'react'

function LetterCell({ value, onClick, isCenterLetter }) {
    return (
        <div id={isCenterLetter ? "center-letter" : ""} className='circle' onClick={onClick}><h1>{value}</h1></div>
    )
}

export default LetterCell