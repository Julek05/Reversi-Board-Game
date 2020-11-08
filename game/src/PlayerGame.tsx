import React, {FunctionComponent} from 'react'
import Game from './Game'

interface GameProps {
    computerMode: boolean,
    selfTeaching: boolean
}

export const PlayerGame: FunctionComponent = () => {
    const gameProps: GameProps = {
        computerMode: false,
        selfTeaching: false
    }
    return <Game {...gameProps}/>;
}
