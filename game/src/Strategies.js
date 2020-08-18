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

    doTurnDisks(board, [allDisksToTurn, y, x]) {
        this.engine.allDisksToTurn = allDisksToTurn;
        return this.engine.turnDisks(board, y, x, 1);
    }

    allStrategiesFixed(board) {
        const [y1, x1] = this.cornerPriority(board);
        if (y1 !== null) {
            return this.engine.turnDisks(board, y1, x1, 1);
        }

        const [y2, x2] = this.firstEdgePriority(board);
        if (y2 !== null) {
            return this.engine.turnDisks(board, y2, x2, 1);
        }

        const secondEdgePriorityResult = this.secondEdgePriority(board);
        if (Array.isArray(secondEdgePriorityResult)) {
            const bestOptions = this.doAllStrategies(board);

            for (let i = bestOptions.length - 1; i >= 0; i--) {
                if (!this.actualMoveIsExclusion(secondEdgePriorityResult, bestOptions[i])) {
                    return this.doTurnDisks(board, bestOptions[i]);
                }
            }
            return this.doTurnDisks(board, bestOptions);
        }
        const [option1, option2, option3] = this.doAllStrategies(board);

        if (this.moveAccordingToMobilityAndMaximisationStrategies(option1[2], option1[3], option2[2],
            option2[3], option3[2], option3[3])) {
            return this.doTurnDisks(board, option1);
        }

        return this.doTurnDisks(board, option3);
    }

    cornerPriority(board) {
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.engine.isMoveCorrect(board, y, x, 1)) {
                    if (this.isCorner(y, x)) {
                        return [y, x];
                    }
                }
            }
        }
        return [null, null];
    }

    firstEdgePriority(board) {
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.engine.isMoveCorrect(board, y, x, 1)) {
                    if (this.checkAllEdges(y, x, board) && !this.isC_square(y, x)) {
                        return [y, x];
                    }
                }
            }
        }
        return [null, null];
    }

    secondEdgePriority(board) {
        const allMovesToExclusion = [];
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.engine.isMoveCorrect(board, y, x, 1)) {
                    if (this.firstEdgePriority(this.engine.turnDisks(board, y, x, 1))) {
                        allMovesToExclusion.push([y, x]);
                    }
                }
            }
        }
        return allMovesToExclusion.length > 0 ? allMovesToExclusion : false;
    }

    checkAllEdges(y, x, board) {
        const topEdge = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]];
        const downEdge = [[7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7]];
        const leftEdge = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]];
        const rightEdge = [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7]];
        const edges = [topEdge, downEdge, leftEdge, rightEdge];

        for (const edge of edges) {
            if (this.moveIsOnOneEdge(y, x, edge) && this.edgeHasTwoTypesOfDisks(edge, board)) {
                const turnedDisks = this.engine.turnDisks(board, y, x, 1);
                return !this.edgeHasTwoTypesOfDisks(edge, turnedDisks);
            }
        }
        return false;
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

    moveIsOnOneEdge(y, x, edge) {
        for (const [y_, x_] of edge) {
            if (y === y_ && x === x_) {
                return true;
            }
        }
        return false;
    }

    edgeHasTwoTypesOfDisks(edge, board) {
        let hasBlueDisk = false;
        let hasBlackDisk = false;
        for (const [y, x] of edge) {
            const actualFieldOnBoard = board[y][x];
            if (actualFieldOnBoard === 1) {
                hasBlueDisk = true;
            }
            if (actualFieldOnBoard === 2) {
                hasBlackDisk = true;
            }
        }
        return hasBlueDisk && hasBlackDisk;
    }

    actualMoveIsExclusion(movesToExclusion, bestOption) {
        for (const [y, x] of movesToExclusion) {
            if (bestOption[2] === y && bestOption[3] === x) {
                return true;
            }
        }
        return false;
    }

    doAllStrategies(board) {
        const allPossibilitiesMaximisationStrategy = [];
        const allPossibilitiesMobilityStrategy = [];
        const allPossibilitiesValuatingFieldsStrategy = [];
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.engine.isMoveCorrect(board, y, x, 1)) {
                    allPossibilitiesMaximisationStrategy.push([this.engine.allDisksToTurn.length, this.engine.allDisksToTurn, y, x]);

                    allPossibilitiesValuatingFieldsStrategy.push([this.boardValues[y][x], this.engine.allDisksToTurn, y, x]);

                    const allDisksToTurnCopy = this.engine.deepCopy(this.engine.allDisksToTurn);
                    const turnedDisks = this.engine.turnDisks(board, y, x, 1);
                    const opponentPossibilities = this.checkOpponentPossibilities(turnedDisks);
                    allPossibilitiesMobilityStrategy.push([opponentPossibilities, allDisksToTurnCopy, y, x]);
                }
            }
        }
        return [this.sortPossibilities(allPossibilitiesMaximisationStrategy)[0].shift(),
                this.sortPossibilities(allPossibilitiesMobilityStrategy)[0].shift(),
                this.sortPossibilities(allPossibilitiesValuatingFieldsStrategy)[0]].shift();
    }

    moveAccordingToMobilityAndMaximisationStrategies(y1, x1, y2, x2, y3, x3) {
        return this.areEqualBestOptions(y1, x1, y2, x2) && !this.isCorner(y3, x3) && !this.isAroundCorner(y1, x1);
    }

    areEqualBestOptions(y1, x1, y2, x2) {
        return y1 === y2 && x1 === x2;
    }

    isCorner(y, x) {
        const corners = [[0, 0], [7, 0], [0, 7], [7, 7]];
        for (const [y_, x_] of corners) {
            if (y === y_ && x === x_) {
                return true;
            }
        }
        return false;
    }

    isAroundCorner(y, x) {
        return this.isC_square(y, x) || this.isX_square(y, x);
    }
}

export default Strategies;