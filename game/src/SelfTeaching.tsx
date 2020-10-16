import React, {FunctionComponent} from 'react'
import Game from './Game'

export const SelfTeaching: FunctionComponent = () => {
    return (
        <Game
            computerMode={true}
            selfTeaching={true}
        />
    );
}
