import React, {FunctionComponent} from 'react'
import Game from './Game'
import { GameProps } from './interfaces';

export const SelfTeaching: FunctionComponent = () => {
    const gameProps: GameProps = {
        computerMode: true,
        selfTeaching: true
    }
    return <Game {...gameProps}/>;
}
