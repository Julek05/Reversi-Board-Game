import React from 'react'
import Game from './Game'
import {VISIBILITY_OF_ELEMENT} from "./constants";

function PlayerGame() {
    return (
        <>
            <Game backMovementButtonVisibility={{visibility: VISIBILITY_OF_ELEMENT.HIDDEN}}
                  strategiesVisibility={{visibility: VISIBILITY_OF_ELEMENT.HIDDEN}}
                  computerMode={false}/>
        </>
    );
}

export default PlayerGame