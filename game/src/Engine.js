import {BOARD_DIMENSIONS, EMPTY_FIELD, TURN_BUTTON_INFO} from './constants';
import Utils from "./Utils";

class Engine {
    constructor() {
        this.options = [];
        this.allDisksToTurn = [];
        this.currentCheckingY = 0;
        this.currentCheckingX = 0;
    }

    isMoveCorrect(board, y, x, activePlayer) {
        if (board[y][x] === EMPTY_FIELD) {
            this.allDisksToTurn = [];
            this.options = [];
            if (this.findAllOptions(board, y, x, activePlayer)) {
                return this.checkAllDirections(board, activePlayer);
            }
        }
        return false;
    }

    turnDisks(board, parametersFieldThatPlayerSetDisk, activePlayer) {
        const boardCopy = Utils.deepCopy(board);
        const allDisksToSet = [...this.allDisksToTurn, ...[parametersFieldThatPlayerSetDisk]];

        allDisksToSet.forEach(([y, x]) => boardCopy[y][x] = activePlayer);

        return boardCopy;
    }

    addMovePossibilities(board, activePlayer) {
        const changedBoard = Utils.deepCopy(board);
        for (let y = 0; y < BOARD_DIMENSIONS.HEIGHT; y++) {
            for (let x = 0; x < BOARD_DIMENSIONS.WIDTH; x++) {
                if (this.isMoveCorrect(board, y, x, activePlayer)) {
                    changedBoard[y][x] = activePlayer + 2;
                }
            }
        }
        return changedBoard;
    }

    findAllOptions(board, y, x, activePlayer) {
        const indexesAroundDisk = Utils.getIndexesAroundDisk(y, x);
        this.currentCheckingY = y;
        this.currentCheckingX = x;

        for (const [y, x] of indexesAroundDisk) {
            if (Utils.insideTheBoard(y, x) && Utils.nextToEnemyDisk(board[y][x], activePlayer)) {
                this.options.push([y, x]);
            }
        }
        return this.options.length > 0;
    }

    checkAllDirections(board, activePlayer) {
        return this.options.some(([y, x]) => this.checkOneDirection(board, y, x, activePlayer));
    }

    checkOneDirection(board, positionY, positionX, activePlayer) {
        const tempToTurn = [[positionY, positionX]];
        const moveY = positionY - this.currentCheckingY;
        const moveX = positionX - this.currentCheckingX;
        let nextMoveY = positionY + moveY;
        let nextMoveX = positionX + moveX;

        while (Utils.insideTheBoard(nextMoveY, nextMoveX)) {
            if (board[nextMoveY][nextMoveX] === EMPTY_FIELD) {
                return false;
            } else if (board[nextMoveY][nextMoveX] !== activePlayer) {
                tempToTurn.push([nextMoveY, nextMoveX]);
                nextMoveY += moveY;
                nextMoveX += moveX;
            } else {
                this.allDisksToTurn = [...this.allDisksToTurn, ...tempToTurn];
                return true;
            }
        }
        return false;
    }

    setTextOfGiveUpTurnButton(board, activePlayer) {
        return this.isLastMove(board, activePlayer)
            ? TURN_BUTTON_INFO.END_OF_GAME
            : TURN_BUTTON_INFO.GIVE_UP_TURN;
    }

    isLastMove(board, activePlayer) {
        const nextMoveActivePlayer = Utils.changeActivePlayer(activePlayer);
        const nextMoveBoard = this.addMovePossibilities(board, nextMoveActivePlayer);

        return !Utils.playerCanMove(nextMoveBoard, nextMoveActivePlayer);
    }
}

export default Engine;