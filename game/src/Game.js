import React from 'react'
import Options from "./Options";
import GameController from "./GameController";
import GameState from "./GameState";
import Utils from "./Utils";
import Field from "./Field";
import {
    INITIAL_BOARD,
    PLAYERS,
    TIMES_TO_WAIT_IN_MILISECONDS,
    VISIBILITY_OF_ELEMENT
} from "./constants";

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
            moveComputerAfterHumanGiveUpTurn: false
        };
        const initialGameState = new GameState([INITIAL_BOARD], PLAYERS.SECOND_PLAYER, true, false);
        this.gameController = new GameController(initialGameState);
        this.endOfGame = false;
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
            }, TIMES_TO_WAIT_IN_MILISECONDS.COMPUTER_MOVE);
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
            this.endOfGame = true;
        }
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
        const giveUpTurn = this.state.canMove ? VISIBILITY_OF_ELEMENT.HIDDEN : VISIBILITY_OF_ELEMENT.VISIBLE;
        const giveUpTurnButtonText = this.gameController.engine.setTextOfGiveUpTurnButton(this.state.actualBoard, giveUpTurn,
            this.state.activePlayer);

        return (
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
                             levelsVisibility={this.props.levelsVisibility}
                             turnImage={this.state.turnImage}
                             backMovementButtonVisibility={this.props.backMovementButtonVisibility}
                             backMovement={() => this.handleClickRevertLastMove()}
                             giveUpTurn={giveUpTurn}
                             giveUpTurnClick={() => this.handleClickGiveUpTurn()}
                             giveUpTurnButtonText={giveUpTurnButtonText}
                             selectLevels={this.gameController.firstMove}
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