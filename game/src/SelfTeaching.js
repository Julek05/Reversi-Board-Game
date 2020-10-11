import React from 'react'
import Game from './Game'

function SelfTeaching() {
    return (
        <Game
            computerMode={true}
            selfTeaching={true}
        />
    );
}

export default SelfTeaching