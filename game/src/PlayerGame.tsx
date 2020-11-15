import React, {FunctionComponent} from 'react'
import Game from './Game'
import { GameProps } from './interfaces';

export const PlayerGame: FunctionComponent = () => {
    const gameProps: GameProps = {
        computerMode: false,
        selfTeaching: false
    }
    return <Game {...gameProps}/>;
}
