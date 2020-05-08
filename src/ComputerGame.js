import React from 'react'
import Game from './Game'

class ComputerGame extends React.Component {
    render() {
        return (
            <div>
                <Game backMovementButtonVisibility={{visibility: "hidden"}} strategiesVisibility={{visibility: "visible"}}
                      computerMode={true}/>
            </div>
        );
    }
}

export default ComputerGame