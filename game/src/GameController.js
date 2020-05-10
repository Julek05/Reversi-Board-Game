import Engine from "./Engine";
import Strategies from "./Strategies";
import GameState from "./GameState";

class GameController {
    constructor(gameState) {
        this.engine = new Engine();
        this.strategies = new Strategies();
        this.gameState = gameState;
        this.firstMove = false;
    }

    makeManualMove(y, x, computerMode) {
        const board = this.gameState.getCurrentBoardState();
        const boardWithoutPossibilities = this.engine.deepCopy(this.engine.deleteMovePossibilities(board));
        const activePlayer = this.gameState.activePlayer;

        if (this.engine.isMoveCorrect(boardWithoutPossibilities, y, x, activePlayer)) {
            this.firstMove = true;

            const newBoards = this.engine.deepCopy(this.gameState.boards);
            const boardAfterMove = this.engine.deepCopy(this.engine.turnDisks(boardWithoutPossibilities, y, x, activePlayer));
            const activePlayerAfterMove = this.engine.changeActivePlayer(activePlayer);
            const boardAfterMoveWithPossibilities = this.engine.addMovePossibilities(boardAfterMove, activePlayerAfterMove);
            const canMove = !this.engine.boardsAreEqual(boardAfterMove, boardAfterMoveWithPossibilities);

            newBoards.push(computerMode ? boardAfterMove : boardAfterMoveWithPossibilities);
            const uiBlock = computerMode;
            const computerBlock = !computerMode;
            this.gameState = new GameState(newBoards, activePlayerAfterMove, canMove, uiBlock, computerBlock);
        }
        return this.gameState;
    }

    makeAutomaticMove(chosenStrategy) {
        const board = this.gameState.getCurrentBoardState();
        const boardWithoutPossibilities = this.engine.deepCopy(this.engine.deleteMovePossibilities(board));
        const activePlayer = this.gameState.activePlayer;
        const newBoards = this.engine.deepCopy(this.gameState.boards);

        const boardAfterMove = this.engine.deepCopy(this.useChosenStrategy(boardWithoutPossibilities, chosenStrategy));
        const activePlayerAfterMove = this.engine.changeActivePlayer(activePlayer);
        const boardAfterMoveWithPossibilities = this.engine.addMovePossibilities(boardAfterMove, activePlayerAfterMove);

        newBoards.push(boardAfterMoveWithPossibilities);
        const canMove = !this.engine.boardsAreEqual(boardAfterMove, boardAfterMoveWithPossibilities);
        this.gameState = new GameState(newBoards, activePlayerAfterMove, canMove, false);

        return this.gameState;
    }

    useChosenStrategy(board, chosenStrategy) {
        const boardCopy = this.engine.deepCopy(board);

        if (chosenStrategy === 0) {
            board = this.strategies.maximisationStrategy(boardCopy);
        } else if (chosenStrategy === 1) {
            board = this.strategies.mobilityStrategy(boardCopy);
        } else if (chosenStrategy === 2) {
            board = this.strategies.valuatingFieldsStrategy(boardCopy);
        } else {
            board = this.strategies.allStrategiesFixed(boardCopy);
        }
        return board;
    }

    revertLastMove() {
        const newBoards = this.gameState.boards;
        if (newBoards.length > 1) {
            newBoards.pop();
            const board = this.gameState.getCurrentBoardState();
            const activePlayerAfterRevertMove = this.engine.changeActivePlayer(this.gameState.activePlayer);
            const boardAfterRevertMove = this.engine.addMovePossibilities(board, activePlayerAfterRevertMove);
            const canMove = this.engine.playerCanMove(boardAfterRevertMove, activePlayerAfterRevertMove);
            const uiBlock = activePlayerAfterRevertMove === 1;
            const computerBlock = activePlayerAfterRevertMove === 2;
            this.gameState = new GameState(newBoards, activePlayerAfterRevertMove, canMove, uiBlock, computerBlock);
        }
        return this.gameState;
    }

    giveUpTurn(computerMode) {
        const newBoards = this.engine.deepCopy(this.gameState.boards);
        const activePlayerAfterGiveUpTurn = this.engine.changeActivePlayer(this.gameState.activePlayer);
        const board = this.gameState.getCurrentBoardState();
        const boardWithPossibilities = this.engine.addMovePossibilities(board, activePlayerAfterGiveUpTurn);
        const canMove = !this.engine.boardsAreEqual(board, boardWithPossibilities);

        const turnOffPossibilities = activePlayerAfterGiveUpTurn === 1 && computerMode;
        newBoards.push(turnOffPossibilities ? board : boardWithPossibilities);

        const uiBlock = activePlayerAfterGiveUpTurn === 1 && computerMode;
        const computerBlock = !(activePlayerAfterGiveUpTurn === 1 && computerMode);
        const moveComputerAfterHumanGiveUpTurn = !computerBlock;

        if (canMove) {
            this.gameState = new GameState(newBoards, activePlayerAfterGiveUpTurn, canMove, uiBlock, computerBlock, moveComputerAfterHumanGiveUpTurn);
            return this.gameState;
        } else {
            return this.engine.endGame(this.gameState.getCurrentBoardState(), computerMode);
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
            }, 500);
        }
    }
}

export default GameController;