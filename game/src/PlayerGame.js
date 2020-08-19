import React from 'react'
import Game from './Game'

function PlayerGame() {
    return (
        <>
            <Game backMovementButtonVisibility={{visibility: "hidden"}} strategiesVisibility={{visibility: "hidden"}}
                  computerMode={false}/>
        </>
    );
}

export default PlayerGame