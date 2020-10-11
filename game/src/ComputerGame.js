import React from 'react'
import Game from './Game'

function ComputerGame() {
    return (
        <Game
            computerMode={true}
            selfTeaching={false}
        />
    );
}

export default ComputerGame