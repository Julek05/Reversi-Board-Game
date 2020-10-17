import React, {FormEvent, FunctionComponent, useState} from 'react'
import axios from "axios";
import {API_URLS, DISKS_IMAGES, IMAGES_FOLDER_PATH, LEVELS} from "./constants";
import Utils from "./Utils";
import {Loader} from "./Loader";
import ImageValidator from "./ImageValidator";

interface OptionsProps {
    scoredDisksFirstPlayer: number,
    scoredDisksSecondPlayer: number,
    turnImage: JSX.Element,
    backMovement: () => void,
    canMove: boolean,
    computerMode: boolean,
    selfTeaching: boolean,
    giveUpTurnClick: () => void,
    giveUpTurnButtonText: string,
    selectLevels: boolean,
    makeSetStateToParent: () => void,
    endOfGame: boolean
}

export const Options: FunctionComponent<OptionsProps> = (props: OptionsProps) => {
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

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const imageValidator: ImageValidator = new ImageValidator(image);

        if (imageValidator.isInvalidFile()) {
            alert('Błąd, nie dodano zdjęcia!');
            return;
        }
        setIsSendingData(true);
        const screen = new FormData();
        screen.append('image', image);

        axios.post(`${API_URLS.IMAGE}/${localStorage.getItem('id')}`, screen).then(response => {
            localStorage.removeItem('id');
            setScreenSenderVisibility(Utils.getVisibilityOfElement(false));
            setIsSendingData(false);
        }).then(error => {
            console.log(error);
            setIsSendingData(false);
        });
    }

    function fileSelectedHandler(event: FormEvent<HTMLInputElement>): void {
        // @ts-ignore
        setImage(event.target.files[0]);
    }

    return (
        isSendingData
        ?
            <Loader/>
        :
            <div className="options">
                <div className="gameDiv">
                    <h2 style={endOfGameInfoVisibility}>Koniec gry!</h2>
                    <button type="button" className="btn btn-primary gameButton" onClick={makeSetStateToParent}>Nowa Gra</button>
                    <div id='screenSender' style={screenSenderVisibility}>
                        <h5>Czy chcesz wysłać screena?</h5>
                        <form onSubmit={handleSubmit}>
                            <input type="file" accept="image/*" onChange={fileSelectedHandler}/>
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
                            style={giveUpTurnVisibility}
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

                <div style={levelsVisibility} className="input-group mb-3" id="levels">
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