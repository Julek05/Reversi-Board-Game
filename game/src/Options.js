import React, {useState} from 'react'
import axios from "axios";
import {API_URLS, DISKS_IMAGES, IMAGES_FOLDER_PATH, LEVELS} from "./constans";
import Utils from "./Utils";

function Options(props) {
    const [image, setImage] = useState('');
    // screenSenderVisibility: 'hidden'

    const { scoredDisksFirstPlayer, scoredDisksSecondPlayer, strategiesVisibility, turnImage, backMovementButtonVisibility,
        backMovement, giveUpTurn, giveUpTurnClick, giveUpTurnButtonText, selectStrategies } = props;

    function handleSubmit(event) {
        event.preventDefault();
        const screen = new FormData();
        screen.append('image', image);
        screen.append('id', localStorage.getItem('id'));
        localStorage.removeItem('id');
        screen.append('_method', 'PATCH');

        // axios.post(`${API_URLS.GAMES}/${id}`, screen).then(response => {
        axios.post(`${API_URLS.GAMES}/1`, screen).then(response => {
            document.getElementById("screenSender").style.visibility = "hidden";
        }).then(error => {
            console.log(error);
        });
    }

    function fileSelectedHandler(event) {
        setImage(event.target.files[0]);
    }

    function newGame() {
        if (window.confirm("Czy na pewno chcesz rozpocząć nową grę?")) {
            window.location.reload();
        }
    }

    return (
        <div className="options">
            <div className="gameDiv">
                <button type="button" className="btn btn-primary gameButton" onClick={newGame}>Nowa Gra</button>
                {/*<div id='screenSender' style={{visibility: this.state.screenSenderVisibility}}>*/}
                <div id='screenSender' style={{visibility: 'hidden'}}>
                    <h5>Czy chcesz wysłać screena?</h5>
                    <form onSubmit={handleSubmit}>
                        <input type="file" onChange={fileSelectedHandler}/>
                        <button type="submit" className="btn btn-success gameButton screenButton">
                            Wyślij Screen</button>&nbsp;&nbsp;
                    </form>
                </div>
                <br/>
                <button type="button" className="btn btn-dark gameButton" id="backMovement"
                        style={backMovementButtonVisibility} onClick={backMovement}>Cofnij ruch
                </button>
                <br/>
                <button type="button" className="btn gameButton" id="giveUpTurnButton"
                        style={{visibility: giveUpTurn}}
                        onClick={giveUpTurnClick}>{giveUpTurnButtonText}
                </button>
            </div>

            <div className="card text-white bg-info mb-3" id="turnWrapper">
                <div id="turnParagraph" className="card-header">Tura gracza:</div>
                <div className="card-body">
                    <div id="turnDisk">{turnImage}</div>
                </div>
            </div>

            <div className="card border-primary mb-3" id="result">
                <div className="card-header" style={{fontSize: 18}}>Punkty</div>
                <div id="scoredDisks">
                    <img src={`${IMAGES_FOLDER_PATH}/${DISKS_IMAGES.TURN_BLACK}`} className="disk scoredPlayersDisks" alt=""/>
                    <div className="points">{scoredDisksSecondPlayer}</div>
                    <img src={`${IMAGES_FOLDER_PATH}/${DISKS_IMAGES.TURN_BLUE}`} className="disk scoredPlayersDisks" alt=""/>
                    <div className="points">{scoredDisksFirstPlayer}</div>
                </div>
            </div>

            <div style={strategiesVisibility} className="input-group mb-3" id="strategies">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="selectStrategies">Poziom trudności</label>
                </div>
                <select className="custom-select" id="selectStrategies" defaultValue={"1"} disabled={selectStrategies}>
                    <option id="maximisationStrategy" value="1">{Utils.upperCaseFirstCharacter(LEVELS.EASY)}</option>
                    <option id="mobilityStrategy" value="2">{Utils.upperCaseFirstCharacter(LEVELS.MIDDLE)}</option>
                    <option id="valuatingFieldsStrategy" value="3">{Utils.upperCaseFirstCharacter(LEVELS.HARD)}</option>
                </select>
            </div>
        </div>
    );
}

export default Options