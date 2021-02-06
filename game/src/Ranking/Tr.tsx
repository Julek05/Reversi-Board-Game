import React, {FunctionComponent} from "react";
import {Screen} from "./Screen";
import {LEVELS_DICTIONARY} from "../Common/constants";

interface GameObjectType {
    id: number,
    level: string,
    player_points: number,
    computer_points: number,
    image_path: string,
    created_at: string,
    updated_at: string,
    user_name: string,
}

interface TrProps {
    game: GameObjectType,
    index: number
}

export const Tr: FunctionComponent<TrProps> = ({game, index}) => {
    const {id, level, player_points,
        computer_points, image_path, created_at, user_name} = game;

    return (
        <tr key={id}>
            <td>{index + 1}</td>
            <td>{user_name}</td>
            <td>{LEVELS_DICTIONARY[level]}</td>
            <td>{player_points}</td>
            <td>{computer_points}</td>
            <td>
                {image_path !== ''
                    ? <Screen imagePath={image_path}/>
                    : <p>Brak screena</p>}
            </td>
            <td>{created_at.substr(0, 10)}</td>
        </tr>
    )
}
