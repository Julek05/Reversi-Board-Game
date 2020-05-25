import React from 'react'
import Game from './Game'

function ComputerGame() {
    return (
        <div>
            <Game backMovementButtonVisibility={{visibility: "hidden"}} strategiesVisibility={{visibility: "visible"}}
                  computerMode={true}/>
        </div>
    );
}

export default ComputerGame