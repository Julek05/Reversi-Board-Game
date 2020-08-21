import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {API_URLS, LEVELS} from "./constans";
import Utils from "./Utils";
import Tr from "./Tr";

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
                       <Tr game={game} index={index} />
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default Ranking