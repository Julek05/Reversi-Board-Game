import React, {FunctionComponent} from 'react'
import Game from './Game'

export const PlayerGame: FunctionComponent = () => {
    const gameProps: object = {
        computerMode: false,
        selfTeaching: false
    }
    return (
        <Game
            {...gameProps}
        />
    );
}
