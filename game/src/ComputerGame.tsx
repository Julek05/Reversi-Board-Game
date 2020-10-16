import React, {FunctionComponent} from 'react'
import Game from './Game'

export const ComputerGame: FunctionComponent = () => {
    return (
        <Game
            computerMode={true}
            selfTeaching={false}
        />
    );
}
