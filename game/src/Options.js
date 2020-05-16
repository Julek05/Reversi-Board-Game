import React from 'react'
import axios from "axios";

class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
           image: ''
        });
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const screen = new FormData();
        screen.append('image', this.state.image);
        screen.append('id', localStorage.getItem('id'));
        localStorage.removeItem('id');
        screen.append('_method', 'PATCH');

        // axios.post(`http://localhost:8000/api/game/${id}`, screen).then(response => {
        axios.post(`http://localhost:8000/api/game/1`, screen).then(response => {
            document.getElementById("screenSender").style.visibility = "hidden";
        }).then(error => {
            console.log(error);
        });
    }

    fileSelectedHandler(event) {
        this.setState({
            image: event.target.files[0]
        })
    }

    static newGame() {
        if (window.confirm("Czy na pewno chcesz rozpocząć nową grę?")) {
            window.location.reload();
        }
    }

    render() {
        return <div className="options">
            <div className="gameDiv">
                <button type="button" className="btn btn-primary gameButton" onClick={Options.newGame}>Nowa Gra</button>
                <div id='screenSender' style={{visibility: "hidden"}}>
                    <h5>Czy chcesz wysłać screena?</h5>
                    <form onSubmit={this.handleSubmit}>
                        <input type="file" onChange={this.fileSelectedHandler}/>
                        <button type="submit" className="btn btn-success gameButton screenButton">
                            Wyślij Screen</button>&nbsp;&nbsp;
                    </form>
                </div>
                <br/>
                <button type="button" className="btn btn-dark gameButton" id="backMovement"
                        style={this.props.backMovementButtonVisibility} onClick={this.props.backMovement}>Cofnij ruch
                </button>
                <br/>
                <button type="button" className="btn gameButton" id="giveUpTurnButton"
                        style={{visibility: this.props.giveUpTurn}}
                        onClick={this.props.giveUpTurnClick}>{this.props.giveUpTurnButtonText}
                </button>
            </div>

            <div className="card text-white bg-info mb-3" id="turnWrapper">
                <div id="turnParagraph" className="card-header">Tura gracza:</div>
                <div className="card-body">
                    <div id="turnDisk">{this.props.turnImage}</div>
                </div>
            </div>

            <div className="card border-primary mb-3" id="result">
                <div className="card-header" style={{fontSize: 18}}>Punkty</div>
                <div id="scoredDisks">
                    <img src='images/black_disk_turn.png' className="disk scoredPlayersDisks" alt=""/>
                    <div className="points">{this.props.scoredDisksSecondPlayer}</div>
                    <img src='images/blue_disk_turn.png' className="disk scoredPlayersDisks" alt=""/>
                    <div className="points">{this.props.scoredDisksFirstPlayer}</div>
                </div>
            </div>

            <div style={this.props.strategiesVisibility} className="input-group mb-3" id="strategies">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="selectStrategies">Poziom trudności</label>
                </div>
                <select className="custom-select" id="selectStrategies" defaultValue={"4"}>
                    <option id="maximisationStrategy" value="1">Łatwy</option>
                    <option id="mobilityStrategy" value="2">Średni</option>
                    <option id="valuatingFieldsStrategy" value="3">Trudny</option>
                    <option id="allStrategiesFixed" value="4">Ekspert</option>
                </select>
            </div>
        </div>
    }
}

export default Options