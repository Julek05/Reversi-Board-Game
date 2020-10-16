import Strategies from "./Strategies";
import GameState from "./GameState";
import Utils from "./Utils";
import {LEVELS, PLAYERS, TIME_TO_WAIT_COMPUTER_MOVE} from "./constants";
import Engine from "./Engine";
import Game from "./Game";

class GameController {
    private strategies: Strategies;
    engine: Engine;
    private gameState: GameState;
    private firstMove: boolean;
    constructor(gameState: GameState) {
        this.strategies = new Strategies();
        this.engine = this.strategies.engine;
        this.gameState = gameState;
        this.firstMove = false;
    }

    makeManualMove(y: number, x: number, computerMode: boolean): GameState {
        const board: number[][] = this.gameState.getCurrentBoardState();
        const boardWithoutPossibilities: number[][] = Utils.deleteMovePossibilities(board);
        const activePlayer: number = this.gameState.activePlayer;

        if (this.engine.isMoveCorrect(boardWithoutPossibilities, y, x, activePlayer)) {
            this.firstMove = true;

            const newBoards: number[][][] = Utils.deepCopyThreeDimensionalArray(this.gameState.boards);
            const boardAfterMove: number[][] = this.engine.turnDisks(boardWithoutPossibilities, [y, x], activePlayer);
            const activePlayerAfterMove: number = Utils.changeActivePlayer(activePlayer);
            const boardAfterMoveWithPossibilities: number[][] = this.engine.addMovePossibilities(boardAfterMove, activePlayerAfterMove);
            const canMove: boolean = !Utils.boardsAreEqual(boardAfterMove, boardAfterMoveWithPossibilities);

            newBoards.push(computerMode ? boardAfterMove : boardAfterMoveWithPossibilities);
            const uiBlock: boolean = computerMode;
            const computerBlock: boolean = !computerMode;
            this.gameState = new GameState(newBoards, activePlayerAfterMove, canMove, uiBlock, computerBlock);
        }
        return this.gameState;
    }

    makeAutomaticMove(chosenLevel: string): GameState {
        const board: number[][] = this.gameState.getCurrentBoardState();
        const boardWithoutPossibilities: number[][] = Utils.deleteMovePossibilities(board);
        const activePlayer: number = this.gameState.activePlayer;
        const newBoards: number[][][] = Utils.deepCopyThreeDimensionalArray(this.gameState.boards);

        const boardAfterMove: number[][] = this.useMatchingStrategyToLevel(boardWithoutPossibilities, chosenLevel);
        const activePlayerAfterMove: number = Utils.changeActivePlayer(activePlayer);
        const boardAfterMoveWithPossibilities: number[][] = this.engine.addMovePossibilities(boardAfterMove, activePlayerAfterMove);

        newBoards.push(boardAfterMoveWithPossibilities);
        const canMove: boolean = !Utils.boardsAreEqual(boardAfterMove, boardAfterMoveWithPossibilities);
        this.gameState = new GameState(newBoards, activePlayerAfterMove, canMove, false);

        return this.gameState;
    }

    useMatchingStrategyToLevel(board: number[][], chosenLevel: string): number[][] {
        if (chosenLevel === LEVELS.EASY) {
            return this.strategies.maximisationStrategy(board);
        } else if (chosenLevel === LEVELS.MIDDLE) {
            return this.strategies.mobilityStrategy(board);
        } else {
            return this.strategies.valuatingFieldsStrategy(board);
        }
    }

    revertLastMove(): GameState {
        const newBoards: number[][][] = this.gameState.boards;
        if (newBoards.length > 1) {
            newBoards.pop();
            const board: number[][] = this.gameState.getCurrentBoardState();
            const activePlayerAfterRevertMove: number = Utils.changeActivePlayer(this.gameState.activePlayer);
            const boardAfterRevertMove: number[][] = this.engine.addMovePossibilities(board, activePlayerAfterRevertMove);
            const canMove: boolean = Utils.playerCanMove(boardAfterRevertMove, activePlayerAfterRevertMove);
            const uiBlock: boolean = activePlayerAfterRevertMove === PLAYERS.FIRST_PLAYER;
            const computerBlock: boolean = activePlayerAfterRevertMove === PLAYERS.SECOND_PLAYER;
            this.gameState = new GameState(newBoards, activePlayerAfterRevertMove, canMove, uiBlock, computerBlock);
        }
        return this.gameState;
    }

    giveUpTurn(computerMode: boolean): GameState|number[][] {
        const newBoards: number[][][] = Utils.deepCopyThreeDimensionalArray(this.gameState.boards);
        const activePlayerAfterGiveUpTurn: number = Utils.changeActivePlayer(this.gameState.activePlayer);
        const board: number[][] = this.gameState.getCurrentBoardState();
        const boardWithPossibilities: number[][] = this.engine.addMovePossibilities(board, activePlayerAfterGiveUpTurn);
        const canMove: boolean = !Utils.boardsAreEqual(board, boardWithPossibilities);

        if (canMove) {
            const turnOffPossibilities: boolean = activePlayerAfterGiveUpTurn === PLAYERS.FIRST_PLAYER && computerMode;
            newBoards.push(turnOffPossibilities ? board : boardWithPossibilities);

            const uiBlock: boolean = activePlayerAfterGiveUpTurn === PLAYERS.FIRST_PLAYER && computerMode;
            const computerBlock: boolean = !(activePlayerAfterGiveUpTurn === PLAYERS.FIRST_PLAYER && computerMode);
            const moveComputerAfterHumanGiveUpTurn: boolean = !computerBlock;

            this.gameState = new GameState(newBoards, activePlayerAfterGiveUpTurn, canMove, uiBlock,
                computerBlock, moveComputerAfterHumanGiveUpTurn);
            return this.gameState;
        } else {
            return board;
        }
    }

    makeMove(y: number, x: number, computerMode: boolean, chosenStrategy: string,
             callback: (newState: GameState, obj: Game) => void, obj: Game): void {
        const newState = this.makeManualMove(y, x, computerMode);
        this.gameState = newState;
        callback(newState, obj);

        if (computerMode && newState['canMove'] && !newState['computerBlock']) {
            setTimeout(() => {
                const newState = this.makeAutomaticMove(chosenStrategy);
                this.gameState = newState;
                callback(newState, obj);
            }, TIME_TO_WAIT_COMPUTER_MOVE);
        }
    }
}

export default GameController;