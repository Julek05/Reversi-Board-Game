import {
    BOARD_RANGE, EMPTY_FIELD,
    IMG_FIELDS_PATHS, PLAYERS,
    VISIBILITY_OF_ELEMENT
} from "./constants";

class Utils {
    static getChosenLevel() {
        return document.getElementById("selectLevels").value;
    }

    static upperCaseFirstCharacter(phrase) {
        return `${phrase.slice(0, 1).toUpperCase()}${phrase.slice(1, phrase.length)}`
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

    static getVisibilityOfElement(result) {
        return {visibility: result ? VISIBILITY_OF_ELEMENT.VISIBLE : VISIBILITY_OF_ELEMENT.HIDDEN};
    }
}

export default Utils;