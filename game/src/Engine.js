import axios from 'axios';
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
            }
        }
        return false;
    }

    turnDisks(board, y, x, activePlayer) {
        const boardCopy = this.deepCopy(board);
        for (const [y, x] of this.allDisksToTurn) {
            boardCopy[y][x] = activePlayer;
        }
        boardCopy[y][x] = activePlayer;
        return boardCopy;
    }

    changeActivePlayer(activePlayer) {
        return activePlayer === 1 ? 2 : 1;
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

        for (const [y, x] of indexesAroundDisk) {
            if (this.insideTheBoard(y, x) && this.nextToEnemyDisk(board[y][x], activePlayer)) {
                this.options.push([y, x]);
            }
        }
        return this.options.length > 0;
    }

    nextToEnemyDisk(field, activePlayer) {
        return field !== 0 && field !== activePlayer;
    }

    insideTheBoard(y, x) {
        return (y >= 0 && y <= 7 && x >= 0 && x <= 7);
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

        while (this.insideTheBoard(nextMoveY, nextMoveX)) {
            if (board[nextMoveY][nextMoveX] === 0) {
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

    countPoints(board) {
        let player1Points = 0;
        let player2Points = 0;
        for (const row of board) {
            for (const field of row) {
                if (field === 1) {
                    player1Points++;
                } else if (field === 2) {
                    player2Points++;
                }
            }
        }
        return [player1Points, player2Points];
    }

    endGameAlert(pointsPlayer1, pointsPlayer2) {
        setTimeout(() => {
            let result;
            if (pointsPlayer1 > pointsPlayer2) {
                result = "Wygrał gracz z niebieskimi pionkami, zdobył " + pointsPlayer1 + " " + this.correctVariant(pointsPlayer1) +
                    "\n\nGracz z czarnymi pionkami, zdobył " + pointsPlayer2 + " " + this.correctVariant(pointsPlayer2);
            } else if (pointsPlayer1 < pointsPlayer2) {
                result = "Wygrał gracz z czarnymi pionkami, zdobył " + pointsPlayer2 + " " + this.correctVariant(pointsPlayer2) +
                    "\n\nGracz z niebieskimi pionkami, zdobył " + pointsPlayer1 + " " + this.correctVariant(pointsPlayer1);
            } else {
                result = "Remis, obydwaj gracze zdobyli po " + pointsPlayer1 + " " + this.correctVariant(pointsPlayer1);
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
        return board.some(row => row.includes((activePlayer + 2)));
    }

    deepCopy(objectToCopy) {
        return JSON.parse(JSON.stringify(objectToCopy));
    }

    setTextOfGiveUpTurnButton(board, giveUpTurn, activePlayer) {
        return giveUpTurn && this.isLastMove(board, activePlayer) ? 'Koniec Gry' : 'Oddaj Turę';
    }

    isLastMove(board, activePlayer) {
        const nextMoveActivePlayer = this.changeActivePlayer(activePlayer);
        const nextMoveBoard = this.addMovePossibilities(board, nextMoveActivePlayer);

        return !this.playerCanMove(nextMoveBoard, nextMoveActivePlayer);
    }

    getLevel(chosenStrategy) {
        const levels = ['łatwy', 'średni', 'trudny', 'ekspert'];

        return levels[chosenStrategy];
    }

    sendDataToApi(computerPoints, playerPoints) {
        const data = {
            'player_name': localStorage.getItem("player_name"),
            'level': this.getLevel(this.getChosenStrategy()),
            'player_points': playerPoints,
            'computer_points': computerPoints,
        }

        axios.post('http://localhost:8000/api/game', data).then(response => {
            document.getElementById("giveUpTurnButton").style.visibility = "hidden"
            this.endGameAlert(computerPoints, playerPoints);
        }).then(error => {
            console.log(error);
        });
    }

    endGame(board, computerMode) {
        document.getElementById("backMovement").style.visibility = "hidden";
        document.getElementById("turnWrapper").style.visibility = "hidden";

        const [pointsPlayer1, pointsPlayer2] = this.countPoints(board);
        if (computerMode) {
            this.sendDataToApi(pointsPlayer1, pointsPlayer2);
        } else {
            this.endGameAlert(pointsPlayer1, pointsPlayer2);
        }
        return null;
    }

    getChosenStrategy() {
        return document.getElementById("selectStrategies").options.selectedIndex.valueOf();
    }
}

export default Engine;