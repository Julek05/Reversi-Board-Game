import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

class Ranking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: []
        };
    }
    componentDidMount() {
        this.getGames('easy');
    }

    getGames(level) {
        // event.preventDefault();
        axios.get(`http://localhost:8000/api/game/${level}`).then(response => {
        console.log(response.data)
            this.setState({
                games: response.data
            });
        });
    }

    render() {
        //
        return (
            <div className='ranking'><br/>
                <ButtonGroup aria-label="Basic example" >
                    <Button className='levels' variant="info" onClick={() => this.getGames('easy')}>Łatwy</Button>
                    <Button variant="info" onClick={() => this.getGames('medium')}>Średni</Button>
                    <Button variant="info" onClick={() => this.getGames('hard')}>Trudny</Button>
                    <Button variant="info" onClick={() => this.getGames('expert')}>Ekspert</Button>
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
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Ranking