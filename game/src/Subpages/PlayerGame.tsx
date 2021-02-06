import React, {FunctionComponent} from 'react'
import Game from '../Game/Game'
import { GameProps } from '../Common/interfaces';

export const PlayerGame: FunctionComponent = () => {
    const gameProps: GameProps = {
        computerMode: false,
        selfTeaching: false
    }
    return <Game {...gameProps}/>;
}
