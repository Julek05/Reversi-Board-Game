import React, {Component, FunctionComponent} from 'react'
import {Options} from "./Options";
import GameController from "./GameController";
import GameState from "./GameState";
import Utils from "./Utils";
import {Field} from "./Field";
import {
    API_URLS,
    INITIAL_BOARD,
    PLAYERS,
    TIME_TO_WAIT_COMPUTER_MOVE
} from "./constants";
import axios from "axios";
import {Loader} from "./Loader";

interface GameProps {
    computerMode: boolean,
    selfTeaching: boolean
}

interface State {
    actualBoard: number[][],
    boards: number[][][],
    turnImage: HTMLImageElement,
    activePlayer: number,
    canMove: boolean,
    uiBlock: boolean,
    moveComputerAfterHumanGiveUpTurn: boolean,
    endOfGame: boolean,
    isSendingData: boolean
}

export default class Game extends Component {
    private gameController: GameController;
    public state: State;
    public computerMode: boolean;
    public selfTeaching: boolean;
    constructor(props: GameProps) {
        super(props.computerMode, props.selfTeaching);
        this.state = {
            actualBoard: INITIAL_BOARD,
            boards: [INITIAL_BOARD],
            // @ts-ignore
            turnImage: <img src={Utils.getImgPath(PLAYERS.SECOND_PLAYER)} className='turnImage' alt=""/>,
            activePlayer: PLAYERS.SECOND_PLAYER,
            canMove: true,
            uiBlock: false,
            moveComputerAfterHumanGiveUpTurn: false,
            endOfGame: false,
            isSendingData: false
        };
        const initialGameState: GameState = new GameState([INITIAL_BOARD], PLAYERS.SECOND_PLAYER, true, false);
        this.gameController = new GameController(initialGameState);
        this.computerMode = props.computerMode;
        this.selfTeaching = props.selfTeaching;
    }

    renderField(y: number, x: number, valueField: number) {
        return (
            <Field
                value={valueField}
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
                this.gameController.gameState = newState;
                this.makeSetState(newState, this);
            }, TIME_TO_WAIT_COMPUTER_MOVE);
        }
    }

    handleClick(y: number, x: number): void {
        if (!this.state.uiBlock) {
            let chosenStrategy: string = '';
            if (this.computerMode) {
                chosenStrategy = Utils.getChosenLevel();
            }
            this.gameController.makeMove(y, x, this.computerMode, chosenStrategy, this.makeSetState, this);
        }
    }

    makeSetState(newState: GameState, obj: Game): void {
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

    handleClickRevertLastMove(): void {
        const newState = this.gameController.revertLastMove();
        this.makeSetState(newState, this);
    }

    handleClickGiveUpTurn(): void {
        const result = this.gameController.giveUpTurn(this.computerMode);
        if (Array.isArray(result)) {
            this.setState({endOfGame: true});
            this.endGame(result, this.computerMode, this.selfTeaching);
        } else {
            this.makeSetState(result, this);
        }
    }

    endGame(board: number[][], computerMode: boolean, selfTeaching: boolean): void {
        const [pointsPlayer1, pointsPlayer2] = Utils.countPoints(board);
        if (computerMode && !selfTeaching) {
            this.sendGame(pointsPlayer1, pointsPlayer2);
        }
    }

    sendGame(computerPoints: number, playerPoints: number): void {
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

    makeSetStateToParent(): void {
        if (window.confirm("Czy na pewno chcesz rozpocząć nową grę?")) {
            const initialGameState = new GameState([INITIAL_BOARD], PLAYERS.SECOND_PLAYER, true, false);
            this.gameController = new GameController(initialGameState);
            this.makeSetState(initialGameState, this);
        }
    }

    render() {
        const [pointsPlayer1, pointsPlayer2]: number[] = Utils.countPoints(this.state.actualBoard);
        const giveUpTurnButtonText = this.state.canMove ? '' : this.gameController.engine.setTextOfGiveUpTurnButton(
            this.state.actualBoard, this.state.activePlayer);

        return (
            this.state.isSendingData
            ?
                <Loader />
            :
                <div className="gameContainer">
                    <div id="boardContainer">
                        {this.state.actualBoard.map((row: number[], rowIndex: number) => {
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
                                 computerMode={this.computerMode}
                                 selfTeaching={this.selfTeaching}
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
