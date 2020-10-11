import Strategies from "./Strategies";
import GameState from "./GameState";
import Utils from "./Utils";
import {LEVELS, PLAYERS, TIMES_TO_WAIT_IN_MILISECONDS} from "./constants";

class GameController {
    constructor(gameState) {
        this.strategies = new Strategies();
        this.engine = this.strategies.engine;
        this.gameState = gameState;
        this.firstMove = false;
    }

    makeManualMove(y, x, computerMode) {
        const board = this.gameState.getCurrentBoardState();
        const boardWithoutPossibilities = Utils.deleteMovePossibilities(board);
        const activePlayer = this.gameState.activePlayer;

        if (this.engine.isMoveCorrect(boardWithoutPossibilities, y, x, activePlayer)) {
            this.firstMove = true;

            const newBoards = Utils.deepCopy(this.gameState.boards);
            const boardAfterMove = this.engine.turnDisks(boardWithoutPossibilities, [y, x], activePlayer);
            const activePlayerAfterMove = Utils.changeActivePlayer(activePlayer);
            const boardAfterMoveWithPossibilities = this.engine.addMovePossibilities(boardAfterMove, activePlayerAfterMove);
            const canMove = !Utils.boardsAreEqual(boardAfterMove, boardAfterMoveWithPossibilities);

            newBoards.push(computerMode ? boardAfterMove : boardAfterMoveWithPossibilities);
            const uiBlock = computerMode;
            const computerBlock = !computerMode;
            this.gameState = new GameState(newBoards, activePlayerAfterMove, canMove, uiBlock, computerBlock);
        }
        return this.gameState;
    }

    makeAutomaticMove(chosenLevel) {
        const board = this.gameState.getCurrentBoardState();
        const boardWithoutPossibilities = Utils.deleteMovePossibilities(board);
        const activePlayer = this.gameState.activePlayer;
        const newBoards = Utils.deepCopy(this.gameState.boards);

        const boardAfterMove = this.useMatchingStrategyToLevel(boardWithoutPossibilities, chosenLevel);
        const activePlayerAfterMove = Utils.changeActivePlayer(activePlayer);
        const boardAfterMoveWithPossibilities = this.engine.addMovePossibilities(boardAfterMove, activePlayerAfterMove);

        newBoards.push(boardAfterMoveWithPossibilities);
        const canMove = !Utils.boardsAreEqual(boardAfterMove, boardAfterMoveWithPossibilities);
        this.gameState = new GameState(newBoards, activePlayerAfterMove, canMove, false);

        return this.gameState;
    }

    useMatchingStrategyToLevel(board, chosenLevel) {
        if (chosenLevel === LEVELS.EASY) {
            return this.strategies.maximisationStrategy(board);
        } else if (chosenLevel === LEVELS.MIDDLE) {
            return this.strategies.mobilityStrategy(board);
        } else {
            return this.strategies.valuatingFieldsStrategy(board);
        }
    }

    revertLastMove() {
        const newBoards = this.gameState.boards;
        if (newBoards.length > 1) {
            newBoards.pop();
            const board = this.gameState.getCurrentBoardState();
            const activePlayerAfterRevertMove = Utils.changeActivePlayer(this.gameState.activePlayer);
            const boardAfterRevertMove = this.engine.addMovePossibilities(board, activePlayerAfterRevertMove);
            const canMove = Utils.playerCanMove(boardAfterRevertMove, activePlayerAfterRevertMove);
            const uiBlock = activePlayerAfterRevertMove === PLAYERS.FIRST_PLAYER;
            const computerBlock = activePlayerAfterRevertMove === PLAYERS.SECOND_PLAYER;
            this.gameState = new GameState(newBoards, activePlayerAfterRevertMove, canMove, uiBlock, computerBlock);
        }
        return this.gameState;
    }

    giveUpTurn(computerMode) {
        const newBoards = Utils.deepCopy(this.gameState.boards);
        const activePlayerAfterGiveUpTurn = Utils.changeActivePlayer(this.gameState.activePlayer);
        const board = this.gameState.getCurrentBoardState();
        const boardWithPossibilities = this.engine.addMovePossibilities(board, activePlayerAfterGiveUpTurn);
        const canMove = !Utils.boardsAreEqual(board, boardWithPossibilities);

        if (canMove) {
            const turnOffPossibilities = activePlayerAfterGiveUpTurn === PLAYERS.FIRST_PLAYER && computerMode;
            newBoards.push(turnOffPossibilities ? board : boardWithPossibilities);

            const uiBlock = activePlayerAfterGiveUpTurn === PLAYERS.FIRST_PLAYER && computerMode;
            const computerBlock = !(activePlayerAfterGiveUpTurn === PLAYERS.FIRST_PLAYER && computerMode);
            const moveComputerAfterHumanGiveUpTurn = !computerBlock;

            this.gameState = new GameState(newBoards, activePlayerAfterGiveUpTurn, canMove, uiBlock,
                computerBlock, moveComputerAfterHumanGiveUpTurn);
            return this.gameState;
        } else {
            return board;
        }
    }

    makeMove(y, x, computerMode, chosenStrategy, callback, obj) {
        const newState = this.makeManualMove(y, x, computerMode);
        this.gameState = newState;
        callback(newState, obj);

        if (computerMode && newState['canMove'] && !newState['computerBlock']) {
            setTimeout(() => {
                const newState = this.makeAutomaticMove(chosenStrategy);
                this.gameState = newState;
                callback(newState, obj);
            }, TIMES_TO_WAIT_IN_MILISECONDS.COMPUTER_MOVE);
        }
    }
}

export default GameController;