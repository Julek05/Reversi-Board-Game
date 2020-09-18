import {ADDITIONAL_FIELDS, BOARD_DIMENSIONS, TURN_BUTTON_INFO} from './constants';
import Utils from "./Utils";

class Engine {
    constructor() {
        this.options = [];
        this.allDisksToTurn = [];
        this.currentCheckingY = 0;
        this.currentCheckingX = 0;
    }

    isMoveCorrect(board, y, x, activePlayer) {
        if (board[y][x] === ADDITIONAL_FIELDS.EMPTY) {
            this.allDisksToTurn = [];
            this.options = [];
            if (this.findAllOptions(board, y, x, activePlayer)) {
                return (this.checkAllDirections(board, activePlayer));
            }
        }
        return false;
    }

    turnDisks(board, y, x, activePlayer) {
        const boardCopy = Utils.deepCopy(board);
        for (const [y, x] of this.allDisksToTurn) {
            boardCopy[y][x] = activePlayer;
        }
        boardCopy[y][x] = activePlayer;
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
        const top = [y - 1, x], down = [y + 1, x], right = [y, x + 1], left = [y, x - 1];
        const topLeft = [y - 1, x - 1], topRight = [y - 1, x + 1], downLeft = [y + 1, x - 1], downRight = [y + 1, x + 1];

        const indexesAroundDisk = [top, down, right, left, topLeft, topRight, downLeft, downRight];
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
        let minimumToAccept = false;
        for (const [y, x] of this.options) {
            if (this.checkOneDirection(board, y, x, activePlayer)) {
                minimumToAccept = true;
            }
        }
        return minimumToAccept;
    }

    checkOneDirection(board, positionY, positionX, activePlayer) {
        const tempToTurn = [[positionY, positionX]];
        const moveY = positionY - this.currentCheckingY;
        const moveX = positionX - this.currentCheckingX;
        let nextMoveY = positionY + moveY;
        let nextMoveX = positionX + moveX;

        while (Utils.insideTheBoard(nextMoveY, nextMoveX)) {
            if (board[nextMoveY][nextMoveX] === ADDITIONAL_FIELDS.EMPTY) {
                return false;
            } else if (board[nextMoveY][nextMoveX] !== activePlayer) {
                tempToTurn.push([nextMoveY, nextMoveX]);
                nextMoveY += moveY;
                nextMoveX += moveX;
            } else {
                for (const tmp of tempToTurn) {
                    this.allDisksToTurn.push(tmp);
                }
                return true;
            }
        }
        return false;
    }

    setTextOfGiveUpTurnButton(board, giveUpTurn, activePlayer) {
        return giveUpTurn && this.isLastMove(board, activePlayer)
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