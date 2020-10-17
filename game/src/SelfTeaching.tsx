import React, {FunctionComponent} from 'react'
import Game from './Game'

export const SelfTeaching: FunctionComponent = () => {
    const gameProps: object = {
        computerMode: true,
        selfTeaching: true
    }
    return <Game {...gameProps}/>;
}
