import React, {useState} from 'react'
import axios from "axios";
import {API_URLS, DISKS_IMAGES, IMAGES_FOLDER_PATH, LEVELS, VISIBILITY_OF_ELEMENT} from "./constants";
import Utils from "./Utils";
import Loader from "./Loader";

function Options(props) {
    const { scoredDisksFirstPlayer, scoredDisksSecondPlayer, turnImage, computerMode, selfTeaching,
        backMovement, canMove, giveUpTurnClick, giveUpTurnButtonText, selectLevels, makeSetStateToParent, endOfGame } = props;

    const [image, setImage] = useState('');
    const [isSendingData, setIsSendingData] = useState(false);

    const [screenSenderVisibility, setScreenSenderVisibility] =
        useState(Utils.getVisibilityOfElement(endOfGame && computerMode && !selfTeaching));

    const backMovementButtonVisibility = Utils.getVisibilityOfElement(!endOfGame && selfTeaching);

    const levelsVisibility = Utils.getVisibilityOfElement(computerMode);

    const giveUpTurnVisibility = Utils.getVisibilityOfElement(!canMove && !endOfGame);

    const endOfGameInfoVisibility = Utils.getVisibilityOfElement(endOfGame);

    function isImage(image) {
        return image === 'object' && image.type.includes('image');
    }

    function isInvalidFile(image) {
        return image === '' || image === undefined || !isImage(image);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (isInvalidFile(image)) {
            alert('Błąd, nie dodano zdjęcia!');
            return;
        }
        setIsSendingData(true);
        const screen = new FormData();
        screen.append('image', image);

        axios.post(`${API_URLS.IMAGE}/${localStorage.getItem('id')}`, screen).then(response => {
            localStorage.removeItem('id');
            setScreenSenderVisibility(VISIBILITY_OF_ELEMENT.HIDDEN);
            setIsSendingData(false);
        }).then(error => {
            console.log(error);
            setIsSendingData(false);
        });
    }

    function fileSelectedHandler(event) {
        setImage(event.target.files[0]);
    }

    return (
        isSendingData
        ?
            <Loader/>
        :
            <div className="options">
                <div className="gameDiv">
                    <button type="button" className="btn btn-primary gameButton" onClick={makeSetStateToParent}>Nowa Gra</button>
                    <div id='screenSender' style={{visibility: screenSenderVisibility}}>
                        <h5>Czy chcesz wysłać screena?</h5>
                        <form onSubmit={handleSubmit}>
                            <input type="file" accept="image/*" onChange={fileSelectedHandler}/>
                            <button type="submit" className="btn btn-success gameButton screenButton">
                                Wyślij Screen</button>&nbsp;&nbsp;
                        </form>
                    </div>
                    <br/>
                    <button type="button" className="btn btn-dark gameButton" id="backMovement"
                            style={{visibility: backMovementButtonVisibility}} onClick={backMovement}>Cofnij ruch
                    </button>
                    <br/>
                    <button type="button" className="btn gameButton" id="giveUpTurnButton"
                            style={{visibility: giveUpTurnVisibility}}
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

                <div style={{visibility: levelsVisibility}} className="input-group mb-3" id="levels">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="selectLevels">Poziom trudności</label>
                    </div>
                    <select className="custom-select" id="selectLevels" defaultValue={LEVELS.EASY} disabled={selectLevels}>
                        {Object.values(LEVELS).map(level => {
                            return (
                                <option key={level} value={level}>{Utils.upperCaseFirstCharacter(level)}</option>
                            );
                        })}
                    </select>
                </div>
            </div>
    );
}

export default Options