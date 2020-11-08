import React, {FunctionComponent} from 'react'
import Game from './Game'

interface GameProps {
    computerMode: boolean,
    selfTeaching: boolean
}

export const SelfTeaching: FunctionComponent = () => {
    const gameProps: GameProps = {
        computerMode: true,
        selfTeaching: true
    }
    return <Game {...gameProps}/>;
}
