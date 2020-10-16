import {
    BOARD_DIMENSIONS, EMPTY_FIELD, TURN_BUTTON_INFO,
} from './constants';
import Utils from "./Utils";

class Engine {
    private currentCheckingY: number;
    private currentCheckingX: number;
    allDisksToTurn: number[][];
    private options: any[];
    constructor() {
        this.options = [];
        this.allDisksToTurn = [];
        this.currentCheckingY = 0;
        this.currentCheckingX = 0;
    }

    isMoveCorrect(board: number[][], y: number, x: number, activePlayer: number): boolean {
        if (board[y][x] === EMPTY_FIELD) {
            this.allDisksToTurn = [];
            this.options = [];
            if (this.findAllOptions(board, y, x, activePlayer)) {
                return this.checkAllDirections(board, activePlayer);
            }
        }
        return false;
    }

    turnDisks(board: number[][], parametersFieldThatPlayerSetDisk: number[],
              activePlayer: number): number[][] {
        const boardCopy: number[][] = Utils.deepCopyTwoDimensionalArray(board);
        const allDisksToSet: number[][] = [...this.allDisksToTurn, ...[parametersFieldThatPlayerSetDisk]];

        allDisksToSet.forEach(([y, x]) => boardCopy[y][x] = activePlayer);

        return boardCopy;
    }

    addMovePossibilities(board: number[][], activePlayer: number): number[][] {
        const changedBoard: number[][] = Utils.deepCopyTwoDimensionalArray(board);
        for (let y = 0; y < BOARD_DIMENSIONS.HEIGHT; y++) {
            for (let x = 0; x < BOARD_DIMENSIONS.WIDTH; x++) {
                if (this.isMoveCorrect(board, y, x, activePlayer)) {
                    changedBoard[y][x] = activePlayer + 2;
                }
            }
        }
        return changedBoard;
    }

    findAllOptions(board: number[][], y: number, x: number, activePlayer: number): boolean {
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

    checkAllDirections(board: number[][], activePlayer: number): boolean {
        return this.options.some(([y, x]) => this.checkOneDirection(board, y, x, activePlayer));
    }

    checkOneDirection(board: number[][], positionY: number, positionX: number,
                      activePlayer: number): boolean {
        const tempToTurn: number[][] = [[positionY, positionX]];
        const moveY: number = positionY - this.currentCheckingY;
        const moveX: number = positionX - this.currentCheckingX;
        let nextMoveY: number = positionY + moveY;
        let nextMoveX: number = positionX + moveX;

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

    setTextOfGiveUpTurnButton(board: number[][], activePlayer: number): string {
        return this.isLastMove(board, activePlayer)
            ? TURN_BUTTON_INFO.END_OF_GAME
            : TURN_BUTTON_INFO.GIVE_UP_TURN;
    }

    isLastMove(board: number[][], activePlayer: number): boolean {
        const nextMoveActivePlayer: number = Utils.changeActivePlayer(activePlayer);
        const nextMoveBoard: number[][] = this.addMovePossibilities(board, nextMoveActivePlayer);

        return !Utils.playerCanMove(nextMoveBoard, nextMoveActivePlayer);
    }
}

export default Engine;