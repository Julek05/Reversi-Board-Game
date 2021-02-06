import React, {FunctionComponent} from 'react'
import Game from '../Game/Game'
import { GameProps } from '../Common/interfaces';

export const SelfTeaching: FunctionComponent = () => {
    const gameProps: GameProps = {
        computerMode: true,
        selfTeaching: true
    }
    return <Game {...gameProps}/>;
}
