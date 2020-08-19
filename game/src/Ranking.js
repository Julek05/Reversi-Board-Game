import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Screen from "./Screen";
import {API_URLS, LEVELS} from "./constans";
import Engine from "./Engine";

class Ranking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: []
        };

        this.engine = new Engine();
    }

    componentDidMount() {
        this.getGames(LEVELS.EASY);
    }

    getGames(level) {
        axios.get(`${API_URLS.GAMES}/${level}`).then(response => {
            this.setState({
                games: response.data
            });
        });
    }

    render() {
        return (
            <div className='ranking'><br/>
                <ButtonGroup>
                    {Object.values(LEVELS).map(level => {
                        return (
                            <Button variant="info" onClick={() => this.getGames(level)}>
                                {this.engine.upperCaseFirstCharacter(level)}
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
                        {this.state.games.map((item, index) =>
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.player_name}</td>
                                <td>{item.level}</td>
                                <td>{item.player_points}</td>
                                <td>{item.computer_points}</td>
                                <td>
                                    {item.image_path !== ''
                                        ? <Screen imagePath={item.image_path}/>
                                        : <p>Brak screena</p>}
                                </td>
                                <td>{item.created_at.substr(0, 10)}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Ranking