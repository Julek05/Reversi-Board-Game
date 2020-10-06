import React from 'react'
import Game from './Game'
import {VISIBILITY_OF_ELEMENT} from "./constants";

function ComputerGame() {
    return (
        <Game backMovementButtonVisibility={{visibility: VISIBILITY_OF_ELEMENT.HIDDEN}}
              levelsVisibility={{visibility: VISIBILITY_OF_ELEMENT.VISIBLE}}
              computerMode={true}
        />
    );
}

export default ComputerGame