class Engine {
    constructor() {
        this.options = [];
        this.allDisksToTurn = [];
        this.currentCheckingY = 0;
        this.currentCheckingX = 0;
    }

    isMoveCorrect(board, y, x, activePlayer) {
        if (board[y][x] === 0) {
            this.allDisksToTurn = [];
            this.options = [];
            if (this.findAllOptions(board, y, x, activePlayer)) {
                return (this.checkAllDirections(board, activePlayer));
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    turnDisks(board, y, x, activePlayer) {
        const boardCopy = this.deepCopy(board);
        for (let i = 0; i < this.allDisksToTurn.length; i++) {
            boardCopy[this.allDisksToTurn[i][0]][this.allDisksToTurn[i][1]] = activePlayer;
        }
        boardCopy[y][x] = activePlayer;
        return boardCopy;
    }

    changeActivePlayer(activePlayer) {
        if (activePlayer === 1) {
            return 2;
        } else {
            return 1;
        }
    }

    addMovePossibilities(board, activePlayer) {
        const boardCopy = this.deepCopy(board);
        const changedBoard = this.deepCopy(board);
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (this.isMoveCorrect(boardCopy, y, x, activePlayer)) {
                    changedBoard[y][x] = activePlayer + 2;
                }
            }
        }
        return changedBoard;
    }

    deleteMovePossibilities(board) {
        const boardCopy = this.deepCopy(board);
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (boardCopy[y][x] !== 1 && boardCopy[y][x] !== 2) {
                    board[y][x] = 0;
                }
            }
        }
        return board;
    }

    findAllOptions(board, y, x, activePlayer) {
        const top = [y - 1, x];
        const down = [y + 1, x];
        const right = [y, x + 1];
        const left = [y, x - 1];
        const topLeft = [y - 1, x - 1];
        const topRight = [y - 1, x + 1];
        const downLeft = [y + 1, x - 1];
        const downRight = [y + 1, x + 1];
        const indexesAroundDisk = [top, down, right, left, topLeft, topRight, downLeft, downRight];
        this.currentCheckingY = y;
        this.currentCheckingX = x;

        for (let i = 0; i < indexesAroundDisk.length; i++) {
            const tempY = indexesAroundDisk[i][0];
            const tempX = indexesAroundDisk[i][1];
            if (this.insideTheBoard(tempY, tempX) && this.nextToEnemyDisk(board, tempY, tempX, activePlayer)) {
                this.options.push([tempY, tempX]);
            }
        }
        return this.options.length > 0;
    }

    nextToEnemyDisk(board, y, x, activePlayer) {
        return board[y][x] !== 0 && board[y][x] !== activePlayer;
    }

    insideTheBoard(y, x) {
        return (y >= 0 && y <= 7 && x >= 0 && x <= 7);
    }

    checkAllDirections(board, activePlayer) {
        let minimumToAccept = false;
        for (let i = 0; i < this.options.length; i++) {
            if (this.checkOneDirection(board, this.options[i][0], this.options[i][1], activePlayer)) {
                minimumToAccept = true;
            }
        }
        return minimumToAccept;
    }

    checkOneDirection(board, positionY, positionX, activePlayer) {
        const tempToTurn = [];
        tempToTurn.push([positionY, positionX]);
        const moveY = positionY - this.currentCheckingY;
        const moveX = positionX - this.currentCheckingX;
        let nextMoveY = positionY + moveY;
        let nextMoveX = positionX + moveX;

        while (this.insideTheBoard(nextMoveY, nextMoveX)) {
            if (board[nextMoveY][nextMoveX] === 0) {
                return false;
            } else if (board[nextMoveY][nextMoveX] !== activePlayer) {
                tempToTurn.push([nextMoveY, nextMoveX]);
                nextMoveY += moveY;
                nextMoveX += moveX;
            } else {
                for (let i = 0; i < tempToTurn.length; i++) {
                    this.allDisksToTurn.push(tempToTurn[i]);
                }
                return true;
            }
        }
        return false;
    }

    countPoints(board) {
        let player1Points = 0;
        let player2Points = 0;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (board[y][x] === 1) {
                    player1Points += 1;
                } else if (board[y][x] === 2) {
                    player2Points += 1;
                }
            }
        }
        return [player1Points, player2Points];
    }

    endGameAlert(actualPoints) {
        setTimeout(() => {
            let result;
            if (actualPoints[0] > actualPoints[1]) {
                result = "Wygrał gracz z niebieskimi pionkami, zdobył " + actualPoints[0] + " " + this.correctVariant(actualPoints[0]) +
                    "\n\nGracz z czarnymi pionkami, zdobył " + actualPoints[1] + " " + this.correctVariant(actualPoints[1]);
            } else if (actualPoints[0] < actualPoints[1]) {
                result = "Wygrał gracz z czarnymi pionkami, zdobył " + actualPoints[1] + " " + this.correctVariant(actualPoints[1]) +
                    "\n\nGracz z niebieskimi pionkami, zdobył " + actualPoints[0] + " " + this.correctVariant(actualPoints[0]);
            } else {
                result = "Remis, obydwaj gracze zdobyli po " + actualPoints[0] + " " + this.correctVariant(actualPoints[0]);
            }
            alert("Obydwaj gracze nie mogą wykonać żadnego ruchu - koniec gry!\n\n" + result);
        }, 250);
    }

    correctVariant(playerPoints) {
        if ((playerPoints % 10 === 2 && playerPoints !== 12) || (playerPoints % 10 === 3 && playerPoints !== 13)
            || (playerPoints % 10 === 4 && playerPoints !== 14)) {
            return "punkty";
        } else if (playerPoints === 1) {
            return "punkt";
        } else {
            return "punktów";
        }
    }

    setImgPath(valueField) {
        if (valueField === 1) {
            return 'images/blue_disk.png';
        } else if (valueField === 2) {
            return 'images/black_disk.png';
        } else if (valueField === 3) {
            return 'images/blue_possibility.png';
        } else if (valueField === 4) {
            return 'images/black_possibility.png';
        } else {
            return '';
        }
    }

    boardsAreEqual(boardBeforeAction, boardAfterAction) {
        return JSON.stringify(boardBeforeAction) === JSON.stringify(boardAfterAction);
    }

    playerCanMove(board, activePlayer) {
        if (activePlayer === 1) {
            return board.some(row => row.includes(3));
        } else {
            return board.some(row => row.includes(4));
        }
    }

    deepCopy(objectToCopy) {
        return JSON.parse(JSON.stringify(objectToCopy));
    }

    setTextOfGiveUpTurnButton(board, giveUpTurn, activePlayer) {
        if (giveUpTurn) {
            if (this.isLastMove(board, activePlayer)) {
                return 'Koniec Gry';
            }
        }
        return 'Oddaj Turę';
    }

    isLastMove(board, activePlayer) {
        const nextMoveActivePlayer = this.changeActivePlayer(activePlayer);
        const nextMoveBoard = this.addMovePossibilities(board, nextMoveActivePlayer);

        return !this.playerCanMove(nextMoveBoard, nextMoveActivePlayer);
    }

    endGame(board) {
        if (document.getElementById("backMovement").style.visibility === "hidden") {
            document.getElementById("turnWrapper").style.visibility = "hidden";
        }
        const actualPoints = this.countPoints(board);
        this.endGameAlert(actualPoints);
        return null;
    }

    getChosenStrategy() {
        return document.getElementById("selectStrategies").options.selectedIndex.valueOf();
    }
}

module.exports = Engine;