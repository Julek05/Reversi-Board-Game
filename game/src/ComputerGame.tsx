import React, {FunctionComponent} from 'react'
import Game from './Game'

export const ComputerGame: FunctionComponent = () => {
    const gameProps: object = {
        computerMode: true,
        selfTeaching: false
    }
    return (
        <Game
            {...gameProps}
        />
    );
}
