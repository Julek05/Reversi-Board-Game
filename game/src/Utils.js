import {
    ADDITIONAL_FIELDS,
    API_URLS,
    BOARD_DIMENSIONS, BOARD_RANGE,
    C_SQUARE_FIELDS,
    DISKS_IMAGES,
    IMAGES_FOLDER_PATH, IMG_FIELDS_PATHS,
    LEVELS, PLAYERS,
    POINTS_VARATIONS, TIMES_TO_WAIT_IN_MILISECONDS, VISIBILITY_OF_ELEMENT, X_SQUARE_FIELDS
} from "./constants";
import axios from "axios";

class Utils {
    //TODO zablokowac, zeby z samouczka nie mozna bylo wysylac screena i gra sie nie zapisywala
    static endGame(board, computerMode) {
        document.getElementById("turnWrapper").style.visibility = VISIBILITY_OF_ELEMENT.HIDDEN;

        const [pointsPlayer1, pointsPlayer2] = Utils.countPoints(board);
        if (computerMode) {
            Utils.sendDataToApi(pointsPlayer1, pointsPlayer2);
        } else {
            Utils.endGameAlert(pointsPlayer1, pointsPlayer2);
        }
        return true;
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
            document.getElementById("giveUpTurnButton").style.visibility = VISIBILITY_OF_ELEMENT.HIDDEN;
            document.getElementById("screenSender").style.visibility = VISIBILITY_OF_ELEMENT.VISIBLE;
            Utils.endGameAlert(computerPoints, playerPoints);
        }).then(error => {
            console.log(error);
        });
    }

    static countPoints(board) {
        let player1Points = 0;
        let player2Points = 0;

        for (const field of board.flat()) {
            if (field === PLAYERS.FIRST_PLAYER) {
                player1Points++;
            } else if (field === PLAYERS.SECOND_PLAYER) {
                player2Points++;
            }
        }
        return [player1Points, player2Points];
    }

    static endGameAlert(pointsPlayer1, pointsPlayer2) {
        setTimeout(() => {
            alert(`Obydwaj gracze nie mogą wykonać żadnego ruchu - koniec gry!\n\n 
                ${Utils.getAlertMessage(pointsPlayer1, pointsPlayer2)}`);
        }, TIMES_TO_WAIT_IN_MILISECONDS.END_GAME_ALERT);
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

    static isFirstOption(playerPoints) {
        return (playerPoints % 10 === 2 && playerPoints !== 12) || (playerPoints % 10 === 3 && playerPoints !== 13)
            || (playerPoints % 10 === 4 && playerPoints !== 14);
    }

    static correctVariant(playerPoints) {
        if (Utils.isFirstOption(playerPoints)) {
            return POINTS_VARATIONS.FIRST_OPTION;
        } else if (playerPoints === 1) {
            return POINTS_VARATIONS.SECOND_OPTION;
        } else {
            return POINTS_VARATIONS.THIRD_OPTION;
        }
    }

    static setImgPath(valueField) {
        return IMG_FIELDS_PATHS[valueField];
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
        for (const [y_, x_] of C_SQUARE_FIELDS) {
            if (y === y_ && x === x_) {
                return true;
            }
        }
        return false;
    }

    static isX_square(y, x) {
        for (const [y_, x_] of X_SQUARE_FIELDS) {
            if (y === y_ && x === x_) {
                return true;
            }
        }
        return false;
    }

    static nextToEnemyDisk(field, activePlayer) {
        return ![ADDITIONAL_FIELDS.EMPTY, activePlayer].includes(field);
    }

    static insideTheBoard(y, x) {
        return BOARD_RANGE.includes(y) && BOARD_RANGE.includes(x);
    }

    static isPlayerField(field) {
        return [PLAYERS.FIRST_PLAYER, PLAYERS.SECOND_PLAYER].includes(field);
    }

    static deleteMovePossibilities(board) {
        const boardCopy = Utils.deepCopy(board);
        for (let y = 0; y < BOARD_DIMENSIONS.HEIGHT; y++) {
            for (let x = 0; x < BOARD_DIMENSIONS.WIDTH; x++) {
                if (Utils.isPlayerField(boardCopy[y][x])) {
                    board[y][x] = EMPTY_FIELD;
                }
            }
        }
        return board;
    }

    static changeActivePlayer(activePlayer) {
        return activePlayer === PLAYERS.FIRST_PLAYER
            ? PLAYERS.SECOND_PLAYER : PLAYERS.FIRST_PLAYER;
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