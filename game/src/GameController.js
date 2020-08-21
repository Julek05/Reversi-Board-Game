import Strategies from "./Strategies";
import GameState from "./GameState";
import Utils from "./Utils";

class GameController {
    constructor(gameState) {
        this.strategies = new Strategies();
        this.engine = this.strategies.engine;
        this.gameState = gameState;
        this.firstMove = false;
    }

    makeManualMove(y, x, computerMode) {
        const board = this.gameState.getCurrentBoardState();
        const boardWithoutPossibilities = Utils.deepCopy(Utils.deleteMovePossibilities(board));
        const activePlayer = this.gameState.activePlayer;

        if (this.engine.isMoveCorrect(boardWithoutPossibilities, y, x, activePlayer)) {
            this.firstMove = true;

            const newBoards = Utils.deepCopy(this.gameState.boards);
            const boardAfterMove = Utils.deepCopy(this.engine.turnDisks(boardWithoutPossibilities, y, x, activePlayer));
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

    makeAutomaticMove(chosenStrategy) {
        const board = this.gameState.getCurrentBoardState();
        const boardWithoutPossibilities = Utils.deepCopy(Utils.deleteMovePossibilities(board));
        const activePlayer = this.gameState.activePlayer;
        const newBoards = Utils.deepCopy(this.gameState.boards);

        const boardAfterMove = Utils.deepCopy(this.useChosenStrategy(boardWithoutPossibilities, chosenStrategy));
        const activePlayerAfterMove = Utils.changeActivePlayer(activePlayer);
        const boardAfterMoveWithPossibilities = this.engine.addMovePossibilities(boardAfterMove, activePlayerAfterMove);

        newBoards.push(boardAfterMoveWithPossibilities);
        const canMove = !Utils.boardsAreEqual(boardAfterMove, boardAfterMoveWithPossibilities);
        this.gameState = new GameState(newBoards, activePlayerAfterMove, canMove, false);

        return this.gameState;
    }

    useChosenStrategy(board, chosenStrategy) {
        const boardCopy = Utils.deepCopy(board);

        if (chosenStrategy === 0) {
            return this.strategies.maximisationStrategy(boardCopy);
        } else if (chosenStrategy === 1) {
            return this.strategies.mobilityStrategy(boardCopy);
        } else if (chosenStrategy === 2) {
            return this.strategies.valuatingFieldsStrategy(boardCopy);
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
            const uiBlock = activePlayerAfterRevertMove === 1;
            const computerBlock = activePlayerAfterRevertMove === 2;
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

        const turnOffPossibilities = activePlayerAfterGiveUpTurn === 1 && computerMode;
        newBoards.push(turnOffPossibilities ? board : boardWithPossibilities);

        const uiBlock = activePlayerAfterGiveUpTurn === 1 && computerMode;
        const computerBlock = !(activePlayerAfterGiveUpTurn === 1 && computerMode);
        const moveComputerAfterHumanGiveUpTurn = !computerBlock;

        if (canMove) {
            this.gameState = new GameState(newBoards, activePlayerAfterGiveUpTurn, canMove, uiBlock,
                computerBlock, moveComputerAfterHumanGiveUpTurn);
            return this.gameState;
        } else {
            return Utils.endGame(board, computerMode);
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