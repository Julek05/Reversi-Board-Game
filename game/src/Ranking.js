import React, {useState} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-modal";
Modal.setAppElement('#root');

class Ranking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: []
        };
    }

    componentDidMount() {
        this.getGames('łatwy');
    }

    getGames(level) {
        axios.get(`http://localhost:8000/api/game/${level}`).then(response => {
        console.log(response.data)
            this.setState({
                games: response.data
            });
        });
    }

    render() {
        return (
            <div className='ranking'><br/>
                <ButtonGroup aria-label="Basic example" >
                    <Button variant="info" onClick={() => this.getGames('łatwy')}>Łatwy</Button>
                    <Button variant="info" onClick={() => this.getGames('średni')}>Średni</Button>
                    <Button variant="info" onClick={() => this.getGames('trudny')}>Trudny</Button>
                    <Button variant="info" onClick={() => this.getGames('ekspert')}>Ekspert</Button>
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
                                        : <p>Brak screenu</p>}
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

function Screen(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div>
            <Button variant="success" onClick={() => setModalIsOpen(true)}>Pokaż zdjęcie</Button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    content : {
                        top                   : '50%',
                        left                  : '50%',
                        right                 : 'auto',
                        bottom                : 'auto',
                        marginRight           : '-50%',
                        transform             : 'translate(-50%, -50%)'
                    }
                }
                }
            >
                <img height='540' width='580' src={`${getImgPath(props.imagePath)}`} alt=''/>
                <div>
                    <Button variant="success" onClick={() => setModalIsOpen(false)}>Zamknij</Button>
                </div>
            </Modal>
        </div>
    );
}

function getImgPath(imagePath) {
    return 'http://localhost:8000/uploads/' + imagePath;
}

export default Ranking