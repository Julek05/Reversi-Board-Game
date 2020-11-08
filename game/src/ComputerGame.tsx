import React, {FunctionComponent} from 'react'
import Game from './Game'

interface GameProps {
    computerMode: boolean,
    selfTeaching: boolean
}

export const ComputerGame: FunctionComponent = () => {
    const gameProps: GameProps = {
        computerMode: true,
        selfTeaching: false
    }
    return <Game {...gameProps}/>;
}
