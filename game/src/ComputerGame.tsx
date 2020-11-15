import React, {FunctionComponent} from 'react'
import Game from './Game'
import { GameProps } from './interfaces';

export const ComputerGame: FunctionComponent = () => {
    const gameProps: GameProps = {
        computerMode: true,
        selfTeaching: false
    }
    return <Game {...gameProps}/>;
}
