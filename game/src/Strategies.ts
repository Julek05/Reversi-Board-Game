import Engine from "./Engine";
import Utils from "./Utils";
import {
    BOARD_DIMENSIONS, C_SQUARE_FIELDS,
    PLAYERS,
    POINTS_FOR_C_SQUARE,
    POINTS_FOR_X_SQUARE,
    VALUATING_BOARD,
    X_SQUARE_FIELDS
} from "./constants";

class Strategies {
    public engine: Engine;
    constructor() {
        this.engine = new Engine();
    }

    maximisationStrategy(board: number[][]): number[][] {
        const allPossibilities: any[] = [];
        for (let y = 0; y < BOARD_DIMENSIONS.HEIGHT; y++) {
            for (let x = 0; x < BOARD_DIMENSIONS.WIDTH; x++) {
                if (this.engine.isMoveCorrect(board, y, x, PLAYERS.FIRST_PLAYER)) {
                    allPossibilities.push([this.engine.allDisksToTurn.length, this.engine.allDisksToTurn, y, x]);
                }
            }
        }
        return this.makeLastStep(allPossibilities, board);
    }

    makeLastStep(allPossibilities: any[], board: number[][]): number[][] {
        const [allDisksToTurn, y, x] = Utils.chooseBestOption(allPossibilities);
        this.engine.allDisksToTurn = allDisksToTurn;
        return this.engine.turnDisks(board, [y, x], PLAYERS.FIRST_PLAYER);
    }

    valuatingFieldsStrategy(board: number[][]): number[][] {
        const allPossibilities: any[] = [];
        for (let y = 0; y < BOARD_DIMENSIONS.HEIGHT; y++) {
            for (let x = 0; x < BOARD_DIMENSIONS.WIDTH; x++) {
                if (this.engine.isMoveCorrect(board, y, x, PLAYERS.FIRST_PLAYER)) {
                    allPossibilities.push([VALUATING_BOARD[y][x], this.engine.allDisksToTurn, y, x]);
                }
            }
        }
        return this.makeLastStep(allPossibilities, board);
    }

    mobilityStrategy(board: number[][]): number[][] {
        const allPossibilities: any[] = [];
        for (let y = 0; y < BOARD_DIMENSIONS.HEIGHT; y++) {
            for (let x = 0; x < BOARD_DIMENSIONS.WIDTH; x++) {
                if (this.engine.isMoveCorrect(board, y, x, PLAYERS.FIRST_PLAYER)) {
                    const allDisksToTurnCopy: number[][] = Utils.deepCopyTwoDimensionalArray(this.engine.allDisksToTurn);
                    const turnedDisks = this.engine.turnDisks(board, [y, x], PLAYERS.FIRST_PLAYER);
                    const opponentPossibilities = this.checkOpponentPossibilities(turnedDisks);
                    allPossibilities.push([opponentPossibilities, allDisksToTurnCopy, y, x]);
                }
            }
        }
        return this.makeLastStep(allPossibilities, board);
    }

    checkOpponentPossibilities(turnedDisks: number[][]): number {
        let amountOfPossibilities: number = 0;
        let amountOfWorstFields: number = 0;
        for (let y = 0; y < BOARD_DIMENSIONS.HEIGHT; y++) {
            for (let x = 0; x < BOARD_DIMENSIONS.WIDTH; x++) {
                if (this.engine.isMoveCorrect(turnedDisks, y, x, PLAYERS.SECOND_PLAYER)) {
                    amountOfPossibilities++;
                    if (Utils.isSpecialField(y, x, X_SQUARE_FIELDS)) {
                        amountOfWorstFields += POINTS_FOR_X_SQUARE;
                    } else if (Utils.isSpecialField(y, x, C_SQUARE_FIELDS)) {
                        amountOfWorstFields += POINTS_FOR_C_SQUARE;
                    }
                }
            }
        }
        return amountOfWorstFields - amountOfPossibilities;
    }
}

export default Strategies;