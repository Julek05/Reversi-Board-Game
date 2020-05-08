import React from 'react'
import Game from './Game'

class PlayerGame extends React.Component {
    render() {
        return (
            <div>
                <Game backMovementButtonVisibility={{visibility: "hidden"}} strategiesVisibility={{visibility: "hidden"}}
                      computerMode={false}/>
            </div>
        );
    }
}

export default PlayerGame