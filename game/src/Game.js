import React from 'react'
import Options from "./Options";
import GameController from "./GameController";
import GameState from "./GameState";
import Utils from "./Utils";
import Field from "./Field";
import {
    API_URLS,
    INITIAL_BOARD,
    PLAYERS,
    TIME_TO_WAIT_COMPUTER_MOVE
} from "./constants";
import axios from "axios";
import Loader from "./Loader";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actualBoard: INITIAL_BOARD,
            boards: [INITIAL_BOARD],
            turnImage: <img src={Utils.getImgPath(PLAYERS.SECOND_PLAYER)} className='turnImage' alt=""/>,
            activePlayer: PLAYERS.SECOND_PLAYER,
            canMove: true,
            uiBlock: false,
            moveComputerAfterHumanGiveUpTurn: false,
            endOfGame: false,
            isSendingData: false
        };
        const initialGameState = new GameState([INITIAL_BOARD], PLAYERS.SECOND_PLAYER, true, false);
        this.gameController = new GameController(initialGameState);
    }

    renderField(y, x, valueField) {
        return (
            <Field
                value={<img src={Utils.getImgPath(valueField)} className='disk' alt=""/>}
                onClick={() => this.handleClick(y, x)}
                key={`${x},${y}`}
            />
        );
    }

    componentDidUpdate() {
        if (this.state.moveComputerAfterHumanGiveUpTurn) {
            setTimeout(() => {
                const chosenLevel = Utils.getChosenLevel();
                const newState = this.gameController.makeAutomaticMove(chosenLevel);
                this.gameState = newState;
                this.makeSetState(newState, this);
            }, TIME_TO_WAIT_COMPUTER_MOVE);
        }
    }

    handleClick(y, x) {
        if (!this.state.uiBlock) {
            let chosenStrategy;
            if (this.props.computerMode) {
                chosenStrategy = Utils.getChosenLevel();
            }
            this.gameController.makeMove(y, x, this.props.computerMode, chosenStrategy, this.makeSetState, this);
        }
    }

    makeSetState(newState, obj) {
        obj.setState({
            actualBoard: Utils.getActualBoard(newState['boards']),
            boards: newState['boards'],
            activePlayer: newState['activePlayer'],
            turnImage: <img src={Utils.getImgPath(newState['activePlayer'])} className='turnImage' alt=""/>,
            canMove: newState['canMove'],
            uiBlock: newState['uiBlock'],
            moveComputerAfterHumanGiveUpTurn: newState['moveComputerAfterHumanGiveUpTurn'],
            endOfGame: false,
            isSendingData: false
        });
    }

    handleClickRevertLastMove() {
        const newState = this.gameController.revertLastMove();
        this.makeSetState(newState, this);
    }

    handleClickGiveUpTurn() {
        const result = this.gameController.giveUpTurn(this.props.computerMode);
        if (Array.isArray(result)) {
            this.setState({endOfGame: true});
            this.endGame(result, this.props.computerMode, this.props.selfTeaching);
        } else {
            this.makeSetState(result, this);
        }
    }

    endGame(board, computerMode, selfTeaching) {
        const [pointsPlayer1, pointsPlayer2] = Utils.countPoints(board);
        if (computerMode && !selfTeaching) {
            this.sendGame(pointsPlayer1, pointsPlayer2);
        }
    }

    sendGame(computerPoints, playerPoints) {
        const game = {
            'player_name': localStorage.getItem("player_name"),
            'level': Utils.deletePolishSigns(Utils.getChosenLevel()),
            'player_points': playerPoints,
            'computer_points': computerPoints
        }
        this.setState({isSendingData: true})
        axios.post(API_URLS.GAMES, game).then(response => {
            this.setState({isSendingData: false});
            localStorage.setItem('id', response.data);
        }).then(error => {
            console.log(error);
        });
    }

    makeSetStateToParent() {
        if (window.confirm("Czy na pewno chcesz rozpocząć nową grę?")) {
            const initialGameState = new GameState([INITIAL_BOARD], PLAYERS.SECOND_PLAYER, true, false);
            this.gameController = new GameController(initialGameState);
            this.makeSetState(initialGameState, this);
        }
    }

    render() {
        const [pointsPlayer1, pointsPlayer2] = Utils.countPoints(this.state.actualBoard);
        const giveUpTurnButtonText = this.state.canMove ? '' : this.gameController.engine.setTextOfGiveUpTurnButton(
            this.state.actualBoard, this.state.activePlayer);

        return (
            this.state.isSendingData
            ?
                <Loader />
            :
                <div className="gameContainer">
                    <div id="boardContainer">
                        {this.state.actualBoard.map((row, rowIndex) => {
                            return (
                                <div className="board-row" key={rowIndex}>
                                    {row.map((field, fieldIndex) => this.renderField(rowIndex, fieldIndex, field))}
                                </div>
                            )
                        })}
                    </div>
                    <div className="optionsContainer">
                        <Options scoredDisksFirstPlayer={pointsPlayer1}
                                 scoredDisksSecondPlayer={pointsPlayer2}
                                 turnImage={this.state.turnImage}
                                 backMovement={() => this.handleClickRevertLastMove()}
                                 canMove={this.state.canMove}
                                 computerMode={this.props.computerMode}
                                 selfTeaching={this.props.selfTeaching}
                                 giveUpTurnClick={() => this.handleClickGiveUpTurn()}
                                 giveUpTurnButtonText={giveUpTurnButtonText}
                                 selectLevels={this.gameController.firstMove}
                                 makeSetStateToParent={() => this.makeSetStateToParent()}
                                 endOfGame={this.state.endOfGame}
                        />
                    </div>
                </div>
        );
    }
}

export default Game