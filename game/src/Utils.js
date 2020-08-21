import {API_URLS, DISKS_IMAGES, IMAGES_FOLDER_PATH, LEVELS, POINTS_VARATIONS} from "./constans";
import axios from "axios";

class Utils {
    //TODO zablokowac, zeby z samouczka nie mozna bylo wysylac screena i gra sie nie zapisywala
    static endGame(board, computerMode) {
        document.getElementById("turnWrapper").style.visibility = "hidden";

        const [pointsPlayer1, pointsPlayer2] = Utils.countPoints(board);
        if (computerMode) {
            Utils.sendDataToApi(pointsPlayer1, pointsPlayer2);
        } else {
            Utils.endGameAlert(pointsPlayer1, pointsPlayer2);
        }
        return false;
    }

    static getChosenStrategy() {
        return document.getElementById("selectStrategies").options.selectedIndex.valueOf();
    }

    static upperCaseFirstCharacter(phrase) {
        return `${phrase.slice(0, 1).toUpperCase()}${phrase.slice(1, phrase.length)}`
    }

    static getLevel(chosenStrategy) {
        const levels = [LEVELS.EASY, LEVELS.MIDDLE, LEVELS.HARD];

        return levels[chosenStrategy];
    }

    static sendDataToApi(computerPoints, playerPoints) {
        const data = {
            'player_name': localStorage.getItem("player_name"),
            'level': Utils.getLevel(Utils.getChosenStrategy()),
            'player_points': playerPoints,
            'computer_points': computerPoints
        }

        axios.post(API_URLS.GAMES, data).then(response => {
            localStorage.setItem('id', response.data);
            document.getElementById("giveUpTurnButton").style.visibility = "hidden"
            document.getElementById("screenSender").style.visibility = "visible";
            Utils.endGameAlert(computerPoints, playerPoints);
        }).then(error => {
            console.log(error);
        });
    }

    static countPoints(board) {
        let player1Points = 0;
        let player2Points = 0;

        for (const field of board.flat()) {
            if (field === 1) {
                player1Points++;
            } else if (field === 2) {
                player2Points++;
            }
        }
        return [player1Points, player2Points];
    }

    static endGameAlert(pointsPlayer1, pointsPlayer2) {
        setTimeout(() => {
            alert(`Obydwaj gracze nie mogą wykonać żadnego ruchu - koniec gry!\n\n 
                ${Utils.getAlertMessage(pointsPlayer1, pointsPlayer2)}`);
        }, 250);
    }

    static getAlertMessage(pointsPlayer1, pointsPlayer2) {
        if (pointsPlayer1 > pointsPlayer2) {
            return `Wygrał gracz z niebieskimi pionkami, zdobył ${pointsPlayer1} ${Utils.correctVariant(pointsPlayer1)}
                    \n\nGracz z czarnymi pionkami, zdobył ${pointsPlayer2} ${Utils.correctVariant(pointsPlayer2)}`;
        } else if (pointsPlayer1 < pointsPlayer2) {
            return `Wygrał gracz z czarnymi pionkami, zdobył ${pointsPlayer2} ${Utils.correctVariant(pointsPlayer2)}
                    \n\nGracz z niebieskimi pionkami, zdobył ${pointsPlayer1} ${Utils.correctVariant(pointsPlayer1)}`;
        }

        return `Remis, obydwaj gracze zdobyli po ${pointsPlayer1} ${Utils.correctVariant(pointsPlayer1)}`;
    }

    static correctVariant(playerPoints) {
        if ((playerPoints % 10 === 2 && playerPoints !== 12) || (playerPoints % 10 === 3 && playerPoints !== 13)
            || (playerPoints % 10 === 4 && playerPoints !== 14)) {
            return POINTS_VARATIONS.FIRST_OPTION;
        } else if (playerPoints === 1) {
            return POINTS_VARATIONS.SECOND_OPTION;
        } else {
            return POINTS_VARATIONS.THIRD_OPTION;
        }
    }

    static setImgPath(valueField) {
        const imgPaths = [
            '',
            `${IMAGES_FOLDER_PATH}/${DISKS_IMAGES.BLUE}`,
            `${IMAGES_FOLDER_PATH}/${DISKS_IMAGES.BLACK}`,
            `${IMAGES_FOLDER_PATH}/${DISKS_IMAGES.POSSIBILITY_BLUE}`,
            `${IMAGES_FOLDER_PATH}/${DISKS_IMAGES.POSSIBILITY_BLACK}`
        ];

        return imgPaths[valueField];
    }

    static boardsAreEqual(boardBeforeAction, boardAfterAction) {
        return JSON.stringify(boardBeforeAction) === JSON.stringify(boardAfterAction);
    }

    static playerCanMove(board, activePlayer) {
        return board.flat().includes(activePlayer + 2);
    }

    static deepCopy(objectToCopy) {
        return JSON.parse(JSON.stringify(objectToCopy));
    }

    static isC_square(y, x) {
        const C_squareFields = [[0, 1], [1, 0], [0, 6], [1, 7], [6, 0], [7, 1], [6, 7], [7, 6]];
        for (const [y_, x_] of C_squareFields) {
            if (y === y_ && x === x_) {
                return true;
            }
        }
        return false;
    }

    static isX_square(y, x) {
        const X_squareFields = [[1, 1], [1, 6], [6, 1], [6, 6]];
        for (const [y_, x_] of X_squareFields) {
            if (y === y_ && x === x_) {
                return true;
            }
        }
        return false;
    }

    static nextToEnemyDisk(field, activePlayer) {
        return ![0, activePlayer].includes(field);
    }

    static insideTheBoard(y, x) {
        const boardRange = [0, 1, 2, 3, 4, 5, 6, 7];
        return boardRange.includes(y) && boardRange.includes(x);
    }

    static deleteMovePossibilities(board) {
        const boardCopy = Utils.deepCopy(board);
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if (boardCopy[y][x] !== 1 && boardCopy[y][x] !== 2) {
                    board[y][x] = 0;
                }
            }
        }
        return board;
    }

    static changeActivePlayer(activePlayer) {
        return activePlayer === 1 ? 2 : 1;
    }

    static sortPossibilities(allPossibilities) {
        return allPossibilities.sort((a, b) => {
            return a[0] - b[0]
        }).reverse();
    }

    static chooseBestOption(allPossibilities) {
        const sortedAllPossibilities = Utils.sortPossibilities(allPossibilities);

        let sameBestOptions = 0;
        const firstPossibility = sortedAllPossibilities[0][0];

        for (let i = 1; i < sortedAllPossibilities.length; i++) {
            if (firstPossibility !== sortedAllPossibilities[i][0]) {
                break;
            }
            sameBestOptions++;
        }

        const index = sameBestOptions > 0 ?
            Math.floor(Math.random() * (sameBestOptions + 1))
            : sameBestOptions;

        return sortedAllPossibilities[index];
    }
}

export default Utils;