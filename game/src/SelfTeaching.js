import React from 'react'
import Game from './Game'

class SelfTeaching extends React.Component {
    render() {
        return (
            <div>
                <Game backMovementButtonVisibility={{visibility: "visible"}} strategiesVisibility={{visibility: "visible"}}
                      computerMode={true}/>
            </div>
        );
    }
}

export default SelfTeaching