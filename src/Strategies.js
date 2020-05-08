const Engine = require('./Engine');

class Strategies {
    constructor() {
        this.engine = new Engine();
        this.X_squareFields = [[1, 1], [1, 6], [6, 1], [6, 6]];
        this.C_squareFields = [[0, 1], [1, 0], [0, 6], [1, 7], [6, 0], [7, 1], [6, 7], [7, 6]];
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
        const dataTurnDisks = this.chooseBestOption(allPossibilities);

        this.engine.allDisksToTurn = dataTurnDisks[1];
        return this.engine.turnDisks(board, dataTurnDisks[2], dataTurnDisks[3], 1);
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
        const dataTurnDisks = this.chooseBestOption(allPossibilities);
        this.engine.allDisksToTurn = dataTurnDisks[1];
        return this.engine.turnDisks(board, dataTurnDisks[2], dataTurnDisks[3], 1);
    }

    sortPossibilities(allPossibilities) {
        allPossibilities.sort((a, b) => {
            return a[0] - b[0]
        });
        allPossibilities.reverse();

        return allPossibilities;
    }

    chooseBestOption(allPossibilities) {
        const sortedAllPossibilities = this.sortPossibilities(allPossibilities);

        let sameBestOptions = 0;
        for (let i = 1; i < sortedAllPossibilities.length; i++) {
            if (sortedAllPossibilities[0][0] !== sortedAllPossibilities[i][0]) {
                break;
            }
            sameBestOptions++;
        }

        if (sameBestOptions > 0) {
            const randomNumber = Math.floor(Math.random() * (sameBestOptions + 1));
            return sortedAllPossibilities[randomNumber];
        } else {
            return sortedAllPossibilities[0];
        }
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
        const dataTurnDisks = this.chooseBestOption(allPossibilities);
        this.engine.allDisksToTurn = dataTurnDisks[1];
        return this.engine.turnDisks(board, dataTurnDisks[2], dataTurnDisks[3], 1);
    }

    checkOpponentPossibilities(turnedDisks) {
        let amountOfPossibilities = 0;
        let amountOfWorstFields = 0;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.engine.isMoveCorrect(turnedDisks, y, x, 2)) {
                    amountOfPossibilities++;
                    for (let i = 0; i < this.X_squareFields.length; i++) {
                        if (y === this.X_squareFields[i][0] && x === this.X_squareFields[i][1]) {
                            amountOfWorstFields += 3;
                        }
                    }
                    for (let i = 0; i < this.C_squareFields.length; i++) {
                        if (y === this.C_squareFields[i][0] && x === this.C_squareFields[i][1]) {
                            amountOfWorstFields++;
                        }
                    }
                }
            }
        }
        return amountOfWorstFields - amountOfPossibilities;
    }

    doTurnDisks(board, bestOptions, index) {
        this.engine.allDisksToTurn = bestOptions[index][1];
        return this.engine.turnDisks(board, bestOptions[index][2], bestOptions[index][3], 1);
    }

    allStrategiesFixed(board) {
        const cornerPriorityResult = this.cornerPriority(board);
        if (Array.isArray(cornerPriorityResult)) {
            return this.engine.turnDisks(board, cornerPriorityResult[0], cornerPriorityResult[1], 1);
        }

        const firstEdgePriorityResult = this.firstEdgePriority(board);
        if (Array.isArray(firstEdgePriorityResult)) {
            return this.engine.turnDisks(board, firstEdgePriorityResult[0], firstEdgePriorityResult[1], 1);
        }

        const secondEdgePriorityResult = this.secondEdgePriority(board);
        if (Array.isArray(secondEdgePriorityResult)) {
            const bestOptions = this.doAllStrategies(board);

            for (let i = bestOptions.length - 1; i >= 0; i--) {
                if (!this.actualMoveIsExclusion(secondEdgePriorityResult, bestOptions[i])) {
                    return this.doTurnDisks(board, bestOptions, i);
                }
            }
            return this.doTurnDisks(board, bestOptions, 2);
        }
        const bestOptions = this.doAllStrategies(board);

        if (this.moveAccordingToMobilityAndMaximisationStrategies(bestOptions)) {
            return this.doTurnDisks(board, bestOptions, 0);
        }

        return this.doTurnDisks(board, bestOptions, 2);
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
        return false;
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
        return false;
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
        if (allMovesToExclusion.length !== 0) {
            return allMovesToExclusion;
        }
        return false;
    }

    checkAllEdges(y, x, board) {
        const topEdge = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]];
        const downEdge = [[7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7]];
        const leftEdge = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]];
        const rightEdge = [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7]];
        const edges = [topEdge, downEdge, leftEdge, rightEdge];

        for (const edge of edges) {
            if (this.moveIsOnOneEdge(y, x, edge)) {
                if (this.edgeHasTwoTypesOfDisks(edge, board)) {
                    const turnedDisks = this.engine.turnDisks(board, y, x, 1);
                    return !this.edgeHasTwoTypesOfDisks(edge, turnedDisks);
                }
            }
        }
        return false;
    }

    isC_square(y, x) {
        for (let i = 0; i < this.C_squareFields.length; i++) {
            if (y === this.C_squareFields[i][0] && x === this.C_squareFields[i][1]) {
                return true;
            }
        }
        return false;
    }

    moveIsOnOneEdge(y, x, edge) {
        for (const field of edge) {
            if (y === field[0] && x === field[1]) {
                return true;
            }
        }
        return false;
    }

    edgeHasTwoTypesOfDisks(edge, board) {
        let hasBlueDisk = false;
        let hasBlackDisk = false;
        for (const field of edge) {
            const actualFieldOnBoard = board[field[0]][field[1]];
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
        for (const moveToExclusion of movesToExclusion) {
            if (bestOption[2] === moveToExclusion[0] && bestOption[3] === moveToExclusion[1]) {
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
        return [this.sortPossibilities(allPossibilitiesMaximisationStrategy)[0],
                this.sortPossibilities(allPossibilitiesMobilityStrategy)[0],
                this.sortPossibilities(allPossibilitiesValuatingFieldsStrategy)[0]];
    }

    moveAccordingToMobilityAndMaximisationStrategies(bestOptions) {
        const y1 = bestOptions[0][2];
        const x1 = bestOptions[0][3];
        const y2 = bestOptions[1][2];
        const x2 = bestOptions[1][3];
        const y3 = bestOptions[2][2];
        const x3 = bestOptions[2][3];
        return this.areEqualBestOptions(y1, x1, y2, x2) && !this.isCorner(y3, x3) && !this.isAroundCorner(y1, x1);
    }

    areEqualBestOptions(y1, x1, y2, x2) {
        return y1 === y2 && x1 === x2;
    }

    isCorner(y, x) {
        const corners = [[0, 0], [7, 0], [0, 7], [7, 7]];
        for (let i = 0; i < corners.length; i++) {
            if (y === corners[i][0] && x === corners[i][1]) {
                return true;
            }
        }
        return false;
    }

    isAroundCorner(y, x) {
        for (let i = 0; i < this.X_squareFields.length; i++) {
            if (y === this.X_squareFields[i][0] && x === this.X_squareFields[i][1]) {
                return true;
            }
        }
        for (let i = 0; i < this.C_squareFields.length; i++) {
            if (y === this.C_squareFields[i][0] && x === this.C_squareFields[i][1]) {
                return true;
            }
        }
        return false;
    }
}

module.exports = Strategies;