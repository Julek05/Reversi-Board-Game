import React from 'react'
import Options from "./Options";
import GameController from "./GameController";
import GameState from "./GameState";

function Field(props) {
    return (
        <button className="field" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        const board = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 4, 0, 0, 0, 0],
            [0, 0, 4, 2, 2, 0, 0, 0],
            [0, 0, 0, 2, 1, 4, 0, 0],
            [0, 0, 0, 0, 4, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.state = {
            boards: [board],
            turnImage: <img src='images/black_disk.png' className='turnImage' alt=""/>,
            activePlayer: 2,
            canMove: true,
            uiBlock: false
        };
        const actualGameState = new GameState([board], 2, true, false);
        this.gameController = new GameController(actualGameState);
    }

    renderField(y, x, valueField) {
        return (
            <Field
                value={<img src={`${this.gameController.engine.setImgPath(valueField)}`} className='disk' alt=""/>}
                onClick={() => this.handleClick(y, x)}
                key={`${x},${y}`}
            />
        );
    }

    componentDidUpdate() {
        if (this.state.moveComputerAfterHumanGiveUpTurn) {
            setTimeout(() => {
                const chosenStrategy = this.gameController.engine.getChosenStrategy();
                const newState = this.gameController.makeAutomaticMove(chosenStrategy);
                this.gameController.gameState = newState;
                this.makeSetState(newState, this);
            }, 500);
        }
    }

    handleClick(y, x) {
        if (!this.state.uiBlock) {
            let chosenStrategy;
            if (this.props.computerMode) {
                chosenStrategy = this.gameController.engine.getChosenStrategy();
            }
            this.gameController.makeMove(y, x, this.props.computerMode, chosenStrategy, this.makeSetState, this);
        }
    }

    makeSetState(newState, obj) {
        obj.setState({
            boards: newState['boards'],
            activePlayer: newState['activePlayer'],
            turnImage: <img src={`${obj.gameController.engine.setImgPath(newState['activePlayer'])}`}
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
        for (let x = 0; x < 8; x++) {
            const rowBoard = [];
            for (let y = 0; y < 8; y++) {
                rowBoard.push(this.renderField(y, x, this.gameController.gameState.getCurrentBoardState()[y][x]));
            }
            board.push(<div className="board-row" key={x}>{rowBoard}</div>);
        }
        const [pointsPlayer1, pointsPlayer2] = this.gameController.engine.countPoints(this.gameController.gameState.getCurrentBoardState());
        const giveUpTurn = this.state.canMove ? 'hidden' : 'visible';
        const giveUpTurnButtonText = this.gameController.engine.setTextOfGiveUpTurnButton(this.gameController.gameState.getCurrentBoardState(),
              giveUpTurn, this.state.activePlayer);
        if (this.gameController.firstMove) {
            document.getElementById("selectStrategies").disabled = true;
        }
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
                             giveUpTurn={giveUpTurn} giveUpTurnClick={ () => this.handleClickGiveUpTurn()}
                             giveUpTurnButtonText={giveUpTurnButtonText}
                    />
                </div>
            </div>
        );
    }
}

export default Game