import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Screen from "./Screen";
import {API_URLS, LEVELS} from "./constans";
import Engine from "./Engine";

function Ranking()  {
    const [games, setGames] = useState([]);

    useEffect(() => getGames(LEVELS.EASY), []);

    function getGames(level) {
        axios.get(`${API_URLS.GAMES}/${level}`).then(response => {
            setGames(response.data);
        });
    }

    return (
        <div className='ranking'><br/>
            <ButtonGroup>
                {Object.values(LEVELS).map(level => {
                    return (
                        <Button variant="info" key={level} onClick={() => getGames(level)}>
                            {Utils.upperCaseFirstCharacter(level)}
                        </Button>
                    );
                })}
            </ButtonGroup><br/><br/>
            <h2 id='headerRanking'>Ranking najlepszych graczy:</h2><br/>
            <Table striped bordered hover size>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nick</th>
                    <th>Poziom trudności</th>
                    <th>Punkty gracza</th>
                    <th>Punkty komputera</th>
                    <th>Screen - końcowa<br/>plansza</th>
                    <th>Data</th>
                </tr>
                </thead>
                <tbody>
                    {games && games.map((game, index) =>
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
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default Ranking