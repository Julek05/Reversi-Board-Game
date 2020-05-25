import React from 'react'
import Game from './Game'

function PlayerGame() {
    return (
        <div>
            <Game backMovementButtonVisibility={{visibility: "hidden"}} strategiesVisibility={{visibility: "hidden"}}
                  computerMode={false}/>
        </div>
    );
}

export default PlayerGame