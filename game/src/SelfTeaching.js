import React from 'react'
import Game from './Game'
import {VISIBILITY_OF_ELEMENT} from "./constants";

function SelfTeaching() {
    return (
        <Game backMovementButtonVisibility={{visibility: VISIBILITY_OF_ELEMENT.VISIBLE}}
              levelsVisibility={{visibility: VISIBILITY_OF_ELEMENT.VISIBLE}}
              computerMode={true}
        />
    );
}

export default SelfTeaching