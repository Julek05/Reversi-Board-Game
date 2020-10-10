import {
    API_URLS, BOARD_RANGE, EMPTY_FIELD,
    IMG_FIELDS_PATHS, PLAYERS, POINTS_VARATIONS,
    TIMES_TO_WAIT_IN_MILISECONDS, VISIBILITY_OF_ELEMENT
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
        return null;
    }

    static getChosenLevel() {
        return document.getElementById("selectLevels").value;
    }

    static upperCaseFirstCharacter(phrase) {
        return `${phrase.slice(0, 1).toUpperCase()}${phrase.slice(1, phrase.length)}`
    }

    static sendDataToApi(computerPoints, playerPoints) {
        const data = {
            'player_name': localStorage.getItem("player_name"),
            'level': Utils.deletePolishSigns(Utils.getChosenLevel()),
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

    static getImgPath(valueField) {
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

    static isSpecialField(y, x, specialFields) {
        return specialFields.some(([y_, x_]) => y === y_ && x === x_);
    }

    static nextToEnemyDisk(field, activePlayer) {
        return ![EMPTY_FIELD, activePlayer].includes(field);
    }

    static insideTheBoard(y, x) {
        return BOARD_RANGE.includes(y) && BOARD_RANGE.includes(x);
    }

    static isPlayerField(field) {
        return [PLAYERS.FIRST_PLAYER, PLAYERS.SECOND_PLAYER].includes(field);
    }

    static deleteMovePossibilities(board) {
        return board.map(row => row.map(field => Utils.isPlayerField(field) ? field : EMPTY_FIELD));
    }

    static changeActivePlayer(activePlayer) {
        return activePlayer === PLAYERS.FIRST_PLAYER
            ? PLAYERS.SECOND_PLAYER : PLAYERS.FIRST_PLAYER;
    }

    static sortPossibilities(allPossibilities) {
        return allPossibilities.sort((a, b) => a[0] - b[0]).reverse();
    }

    static chooseBestOption(allPossibilities) {
        const sortedAllPossibilities = Utils.sortPossibilities(allPossibilities);

        let sameBestOptions = 0;
        const firstPossibilityPoints = sortedAllPossibilities[0][0];

        for (let i = 1; i < sortedAllPossibilities.length; i++) {
            if (firstPossibilityPoints !== sortedAllPossibilities[i][0]) {
                break;
            }
            sameBestOptions++;
        }

        const indexBestOption = sameBestOptions > 0
            ? Math.floor(Math.random() * (sameBestOptions + 1))
            : sameBestOptions;

        const bestOption = sortedAllPossibilities[indexBestOption];
        bestOption.shift();

        return bestOption;
    }

    static getIndexesAroundDisk(y, x) {
        const top = [y - 1, x], down = [y + 1, x], right = [y, x + 1], left = [y, x - 1];
        const topLeft = [y - 1, x - 1], topRight = [y - 1, x + 1], downLeft = [y + 1, x - 1], downRight = [y + 1, x + 1];

        return [top, down, right, left, topLeft, topRight, downLeft, downRight];
    }

    static getActualBoard(boards) {
        return boards[boards.length - 1];
    }

    static deletePolishSigns(level) {
        return level.replace(/ł/g, 'l').replace(/ś/g, 's');
    }
}

export default Utils;