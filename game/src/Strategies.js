import Engine from "./Engine";
import Utils from "./Utils";

class Strategies {
    constructor() {
        this.engine = new Engine();
        this.boardValues = [
            [99, -8, 12, 6, 6, 12, -8, 99],
            [-8, -24, -4, -3, -3, -4, -24, -8],
            [12, -4, 10, 4, 4, 10, -4, 12],
            [6, -3, 4, 0, 0, 4, -3, 6],
            [6, -3, 4, 0, 0, 4, -3, 6],
            [12, -4, 10, 4, 4, 10, -4, 12],
            [-8, -24, -4, -3, -3, -4, -24, -8],
            [99, -8, 12, 6, 6, 12, -8, 99]
        ];
    }

    maximisationStrategy(board) {
        const allPossibilities = [];
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.engine.isMoveCorrect(board, y, x, 1)) {
                    allPossibilities.push([this.engine.allDisksToTurn.length, this.engine.allDisksToTurn, y, x]);
                }
            }
        }
        return this.makeLastStep(allPossibilities, board);
    }

    makeLastStep(allPossibilities, board) {
        const [tmp, allDisksToTurn, y, x] = Utils.chooseBestOption(allPossibilities);
        this.engine.allDisksToTurn = allDisksToTurn;
        return this.engine.turnDisks(board, y, x, 1);
    }

    valuatingFieldsStrategy(board) {
        const allPossibilities = [];
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.engine.isMoveCorrect(board, y, x, 1)) {
                    allPossibilities.push([this.boardValues[y][x], this.engine.allDisksToTurn, y, x]);
                }
            }
        }
        return this.makeLastStep(allPossibilities, board);
    }

    mobilityStrategy(board) {
        const allPossibilities = [];
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.engine.isMoveCorrect(board, y, x, 1)) {
                    const allDisksToTurnCopy = Utils.deepCopy(this.engine.allDisksToTurn);
                    const turnedDisks = this.engine.turnDisks(board, y, x, 1);
                    const opponentPossibilities = this.checkOpponentPossibilities(turnedDisks);
                    allPossibilities.push([opponentPossibilities, allDisksToTurnCopy, y, x]);
                }
            }
        }
        return this.makeLastStep(allPossibilities, board);
    }

    checkOpponentPossibilities(turnedDisks) {
        let amountOfPossibilities = 0;
        let amountOfWorstFields = 0;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.engine.isMoveCorrect(turnedDisks, y, x, 2)) {
                    amountOfPossibilities++;
                    if (Utils.isX_square(y, x)) {
                        amountOfWorstFields += 3;
                    } else if (Utils.isC_square(y, x)) {
                        amountOfWorstFields++;
                    }
                }
            }
        }
        return amountOfWorstFields - amountOfPossibilities;
    }
}

export default Strategies;