import React from "react";
import Screen from "./Screen";

function Tr({game, index}) {
    return (
        <tr key={game.id}>
            <td>{index + 1}</td>
            <td>{game.player_name}</td>
            <td>{game.level}</td>
            <td>{game.player_points}</td>
            <td>{game.computer_points}</td>
            <td>
                {game.image_path !== ''
                    ? <Screen imagePath={game.image_path}/>
                    : <p>Brak screena</p>}
            </td>
            <td>{game.created_at.substr(0, 10)}</td>
        </tr>
    )
}

export default Tr;