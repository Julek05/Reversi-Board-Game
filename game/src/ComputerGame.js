import React from 'react'
import Game from './Game'

function ComputerGame() {
    return (
        <>
            <Game backMovementButtonVisibility={{visibility: "hidden"}} strategiesVisibility={{visibility: "visible"}}
                  computerMode={true}/>
        </>
    );
}

export default ComputerGame