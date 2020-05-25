import React from 'react'
import Game from './Game'

function SelfTeaching() {
    return (
        <div>
            <Game backMovementButtonVisibility={{visibility: "visible"}} strategiesVisibility={{visibility: "visible"}}
                  computerMode={true}/>
        </div>
    );
}

export default SelfTeaching