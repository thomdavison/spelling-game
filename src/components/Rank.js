import React from 'react'

function Rank({ score }) {
    const ranks = ["Beginner", "Poindexter", "Average", "Scholar", "Wise Owl", "Wordsmith", "Genius"]
    const rankLevels = [3, 10, 25, 45, 70, 100, 999]

    var rank = ranks[0]

    for (var i = 0; i < rankLevels.length; i++) {
        var rankLevel = rankLevels[i]
        if (score < rankLevel) {
            rank = ranks[i]
            break
        }
    }
    return (
        <div>
            <div className='score'>
                <h2>{score}</h2>
            </div>
            <div className='rank'>{rank}</div>
        </div>
    )
}

export default Rank