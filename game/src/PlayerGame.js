import React from 'react'
import Game from './Game'

function PlayerGame() {
    return (
        <Game
            computerMode={false}
            selfTeaching={false}
        />
    );
}

export default PlayerGame