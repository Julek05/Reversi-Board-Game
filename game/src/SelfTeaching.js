import React from 'react'
import Game from './Game'

function SelfTeaching() {
    return (
        <>
            <Game backMovementButtonVisibility={{visibility: "visible"}} strategiesVisibility={{visibility: "visible"}}
                  computerMode={true}/>
        </>
    );
}

export default SelfTeaching