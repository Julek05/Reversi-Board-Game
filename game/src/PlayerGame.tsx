import React, {FunctionComponent} from 'react'
import Game from './Game'

export const PlayerGame: FunctionComponent = () => {
    return (
        <Game
            computerMode={false}
            selfTeaching={false}
        />
    );
}
