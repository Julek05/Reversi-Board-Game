import React, {FunctionComponent} from 'react'
import Game from '../Game/Game'
import { GameProps } from '../Common/interfaces';

export const ComputerGame: FunctionComponent = () => {
    const gameProps: GameProps = {
        computerMode: true,
        selfTeaching: false
    }
    return <Game {...gameProps}/>;
}
