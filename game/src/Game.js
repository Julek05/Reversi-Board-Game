import React from 'react'
import Options from "./Options";
import GameController from "./GameController";
import GameState from "./GameState";
import Utils from "./Utils";
import Field from "/Field";
import {
    BOARD_DIMENSIONS,
    INITIAL_BOARD,
    PLAYERS,
    TIMES_TO_WAIT_IN_MILISECONDS,
    VISIBILITY_OF_ELEMENT
} from "./constants";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: [INITIAL_BOARD],
            turnImage: <img src={Utils.setImgPath(PLAYERS.SECOND_PLAYER)} className='turnImage' alt=""/>,
            activePlayer: PLAYERS.SECOND_PLAYER,
            canMove: true,
            uiBlock: false,
            moveComputerAfterHumanGiveUpTurn: false
        };
        const initialGameState = new GameState([INITIAL_BOARD], PLAYERS.SECOND_PLAYER, true, false);
        this.gameController = new GameController(initialGameState);
        this.endOfGame = VISIBILITY_OF_ELEMENT.HIDDEN;
    }

    renderField(y, x, valueField) {
        return (
            <Field
                value={<img src={Utils.setImgPath(valueField)} className='disk' alt=""/>}
                onClick={() => this.handleClick(y, x)}
                key={`${x},${y}`}
            />
        );
    }

    componentDidUpdate() {
        if (this.state.moveComputerAfterHumanGiveUpTurn) {
            setTimeout(() => {
                const chosenStrategy = Utils.getChosenStrategy();
                const newState = this.gameController.makeAutomaticMove(chosenStrategy);
                this.gameState = newState;
                this.makeSetState(newState, this);
            }, TIMES_TO_WAIT_IN_MILISECONDS.COMPUTER_MOVE);
        }
    }

    handleClick(y, x) {
        if (!this.state.uiBlock) {
            let chosenStrategy;
            if (this.props.computerMode) {
                chosenStrategy = Utils.getChosenStrategy();
            }
            this.gameController.makeMove(y, x, this.props.computerMode, chosenStrategy, this.makeSetState, this);
        }
    }

    makeSetState(newState, obj) {
        obj.setState({
            boards: newState['boards'],
            activePlayer: newState['activePlayer'],
            turnImage: <img src={Utils.setImgPath(newState['activePlayer'])}
                            className='turnImage' alt=""/>,
            canMove: newState['canMove'],
            uiBlock: newState['uiBlock'],
            moveComputerAfterHumanGiveUpTurn: newState['moveComputerAfterHumanGiveUpTurn']
        });
    }

    handleClickRevertLastMove() {
        const newState = this.gameController.revertLastMove();
        this.makeSetState(newState, this);
    }

    handleClickGiveUpTurn() {
        const newState = this.gameController.giveUpTurn(this.props.computerMode);
        if (newState !== null) {
            this.makeSetState(newState, this);
        } else {
            this.endOfGame = VISIBILITY_OF_ELEMENT.VISIBLE;
        }
    }

    makeSetStateToParent() {
        if (window.confirm("Czy na pewno chcesz rozpocząć nową grę?")) {
            const initialGameState = new GameState([INITIAL_BOARD], PLAYERS.FIRST_PLAYER, true, false);
            this.gameController = new GameController(initialGameState);
            this.makeSetState(initialGameState, this);
        }
    }

    render() {
        const board = [];
        const actualBoard = this.gameController.gameState.getCurrentBoardState();
        for (let x = 0; x < BOARD_DIMENSIONS.WIDTH; x++) {
            const rowBoard = [];
            for (let y = 0; y < BOARD_DIMENSIONS.HEIGHT; y++) {
                rowBoard.push(this.renderField(y, x, actualBoard[y][x]));
            }
            board.push(<div className="board-row" key={x}>{rowBoard}</div>);
        }
        const [pointsPlayer1, pointsPlayer2] = Utils.countPoints(actualBoard);
        const giveUpTurn = this.state.canMove ? VISIBILITY_OF_ELEMENT.HIDDEN : VISIBILITY_OF_ELEMENT.VISIBLE;
        const giveUpTurnButtonText = this.gameController.engine.setTextOfGiveUpTurnButton(actualBoard, giveUpTurn,
            this.state.activePlayer);
        return (
            <div className="gameContainer">
                <div id='game' className="boardContainer">
                    {board}
                </div>
                <div className="optionsContainer">
                    <Options scoredDisksFirstPlayer={pointsPlayer1} scoredDisksSecondPlayer={pointsPlayer2}
                             strategiesVisibility={this.props.strategiesVisibility} turnImage={this.state.turnImage}
                             backMovementButtonVisibility={this.props.backMovementButtonVisibility}
                             backMovement={() => this.handleClickRevertLastMove()}
                             giveUpTurn={giveUpTurn} giveUpTurnClick={() => this.handleClickGiveUpTurn()}
                             giveUpTurnButtonText={giveUpTurnButtonText}
                             selectStrategies={this.gameController.firstMove}
                             makeSetStateToParent={() => this.makeSetStateToParent()}
                             thisParent={this}
                             endOfGame={this.endOfGame}
                    />
                </div>
            </div>
        );
    }
}

export default Game