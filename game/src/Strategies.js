import Engine from "./Engine";

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
        const [allDisksToTurn, y, x] = this.chooseBestOption(allPossibilities);
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

    sortPossibilities(allPossibilities) {
        return allPossibilities.sort((a, b) => {
                return a[0] - b[0]
            }).reverse();
    }

    chooseBestOption(allPossibilities) {
        const sortedAllPossibilities = this.sortPossibilities(allPossibilities);

        let sameBestOptions = 0;
        const firstPossibility = sortedAllPossibilities[0][0];
        for (const possibility of sortedAllPossibilities) {
            if (firstPossibility !== possibility[0]) {
                break;
            }
            sameBestOptions++;
        }

        const index = sameBestOptions > 0 ?
            Math.floor(Math.random() * (sameBestOptions + 1))
            : sameBestOptions;

        const bestOption = sortedAllPossibilities[index];
        bestOption.shift();
        return bestOption;
    }

    mobilityStrategy(board) {
        const allPossibilities = [];
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.engine.isMoveCorrect(board, y, x, 1)) {
                    const allDisksToTurnCopy = this.engine.deepCopy(this.engine.allDisksToTurn);
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
                    if (this.isX_square(y, x)) {
                        amountOfWorstFields += 3;
                    } else if (this.isC_square(y, x)) {
                        amountOfWorstFields++;
                    }
                }
            }
        }
        return amountOfWorstFields - amountOfPossibilities;
    }

    isC_square(y, x) {
        const C_squareFields = [[0, 1], [1, 0], [0, 6], [1, 7], [6, 0], [7, 1], [6, 7], [7, 6]];
        for (const [y_, x_] of C_squareFields) {
            if (y === y_ && x === x_) {
                return true;
            }
        }
        return false;
    }

    isX_square(y, x) {
        const X_squareFields = [[1, 1], [1, 6], [6, 1], [6, 6]];
        for (const [y_, x_] of X_squareFields) {
            if (y === y_ && x === x_) {
                return true;
            }
        }
        return false;
    }
}

export default Strategies;