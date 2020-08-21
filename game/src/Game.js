import React from 'react'
import Options from "./Options";
import GameController from "./GameController";
import GameState from "./GameState";
import Utils from "./Utils";
import Field from "./Field";

class Game extends React.Component {
    constructor(props) {
        super(props);
        const initialBoard = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 4, 0, 0, 0, 0],
            [0, 0, 4, 1, 2, 0, 0, 0],
            [0, 0, 0, 2, 1, 4, 0, 0],
            [0, 0, 0, 0, 4, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.state = {
            boards: [initialBoard],
            turnImage: <img src={Utils.setImgPath(2)} className='turnImage' alt=""/>,
            activePlayer: 2,
            canMove: true,
            uiBlock: false,
            moveComputerAfterHumanGiveUpTurn: false
        };
        const initialGameState = new GameState([initialBoard], 2, true, false);
        this.gameController = new GameController(initialGameState);
        this.gameState = this.gameController.gameState;
        this.engine = this.gameController.engine;
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
            }, 500);
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
        }
    }

    render() {
        const board = [];
        const actualBoard = this.gameState.getCurrentBoardState();
        for (let x = 0; x < 8; x++) {
            const rowBoard = [];
            for (let y = 0; y < 8; y++) {
                rowBoard.push(this.renderField(y, x, actualBoard[y][x]));
            }
            board.push(<div className="board-row" key={x}>{rowBoard}</div>);
        }
        const [pointsPlayer1, pointsPlayer2] = Utils.countPoints(actualBoard);
        const giveUpTurn = this.state.canMove ? 'hidden' : 'visible';
        const giveUpTurnButtonText = this.engine.setTextOfGiveUpTurnButton(actualBoard, giveUpTurn,
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
                    />
                </div>
            </div>
        );
    }
}

export default Game