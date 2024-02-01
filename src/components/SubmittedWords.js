import React from 'react'

function SubmittedWords({ updateGameState, submittedWords }) {
    return (
        <div>

            <div >
                <h1>Submitted Words</h1>
            </div>
            <div className='currentWord'>
                <h2 className='score'>{submittedWords.length}</h2>
            </div>

            <div className='allSubmittedWordsContainer'>
                <div className='allSubmittedWords'>{submittedWords.map(txt => <div className='word'>{txt}</div>)}</div>
            </div>
            <div className='button-row'>
                <button onClick={() => updateGameState("board")}>Back</button>
            </div>
        </div>
    )
}

export default SubmittedWords