import {
    BOARD_RANGE, EMPTY_FIELD,
    IMG_FIELDS_PATHS, PLAYERS,
    VISIBILITY_OF_ELEMENT
} from "./constants";

class Utils {
    static getChosenLevel(): string {
        return (document.querySelector("#selectLevels") as HTMLInputElement).value;
    }

    static upperCaseFirstCharacter(phrase: string): string {
        return `${phrase.slice(0, 1).toUpperCase()}${phrase.slice(1, phrase.length)}`
    }

    static countPoints(board: number[][]): number[] {
        let player1Points: number = 0;
        let player2Points: number = 0;

        for (const row of board) {
            for (const field of row) {
                if (field === PLAYERS.FIRST_PLAYER) {
                    player1Points++;
                } else if (field === PLAYERS.SECOND_PLAYER) {
                    player2Points++;
                }
            }
        }

        return [player1Points, player2Points];
    }

    static getImgPath(valueField: number): string {
        return IMG_FIELDS_PATHS[valueField];
    }

    static boardsAreEqual(boardBeforeAction: number[][], boardAfterAction: number[][]): boolean {
        return JSON.stringify(boardBeforeAction) === JSON.stringify(boardAfterAction);
    }

    static playerCanMove(board: number[][], activePlayer: number): boolean {
        return board.some(row => row.includes(activePlayer + 2));
    }

    static deepCopyTwoDimensionalArray(arrayToCopy: number[][]): number[][] {
        return JSON.parse(JSON.stringify(arrayToCopy));
    }

    static deepCopyThreeDimensionalArray(arrayToCopy: number[][][]): number[][][] {
        return JSON.parse(JSON.stringify(arrayToCopy));
    }

    static isSpecialField(y: number, x: number, specialFields: number[][]): boolean {
        return specialFields.some(([y_, x_]) => y === y_ && x === x_);
    }

    static nextToEnemyDisk(field: number, activePlayer: number): boolean {
        return ![EMPTY_FIELD, activePlayer].includes(field);
    }

    static insideTheBoard(y: number, x: number): boolean {
        return BOARD_RANGE.includes(y) && BOARD_RANGE.includes(x);
    }

    static isPlayerField(field: number): boolean {
        return [PLAYERS.FIRST_PLAYER, PLAYERS.SECOND_PLAYER].includes(field);
    }

    static deleteMovePossibilities(board: number[][]): number[][] {
        return board.map(row => row.map(field => Utils.isPlayerField(field) ? field : EMPTY_FIELD));
    }

    static changeActivePlayer(activePlayer: number): number {
        return activePlayer === PLAYERS.FIRST_PLAYER
            ? PLAYERS.SECOND_PLAYER : PLAYERS.FIRST_PLAYER;
    }

    static sortPossibilities(allPossibilities: any[]): any[] {
        return allPossibilities.sort((a, b) => a[0] - b[0]).reverse();
    }

    static chooseBestOption(allPossibilities: any[]): any[] {
        const sortedAllPossibilities: any[] = Utils.sortPossibilities(allPossibilities);

        let sameBestOptions: number = 0;
        const firstPossibilityPoints: number = sortedAllPossibilities[0][0];

        for (let i = 1; i < sortedAllPossibilities.length; i++) {
            if (firstPossibilityPoints !== sortedAllPossibilities[i][0]) {
                break;
            }
            sameBestOptions++;
        }

        const indexBestOption: number = sameBestOptions > 0
            ? Math.floor(Math.random() * (sameBestOptions + 1))
            : sameBestOptions;

        const bestOption: any[] = sortedAllPossibilities[indexBestOption];
        bestOption.shift();

        return bestOption;
    }

    static getIndexesAroundDisk(y: number, x: number): number[][] {
        const top: number[] = [y - 1, x], down: number[] = [y + 1, x], right: number[] = [y, x + 1];
        const left: number[] = [y, x - 1], topLeft: number[] = [y - 1, x - 1], topRight: number[] = [y - 1, x + 1];
        const downLeft: number[] = [y + 1, x - 1], downRight: number[] = [y + 1, x + 1];

        return [top, down, right, left, topLeft, topRight, downLeft, downRight];
    }

    static getActualBoard(boards: number[][][]): number[][] {
        return boards[boards.length - 1];
    }

    static deletePolishSigns(level: string): string {
        return level.replace(/ł/g, 'l').replace(/ś/g, 's');
    }

    static getVisibilityOfElement(result: boolean): object {
        return {visibility: result ? VISIBILITY_OF_ELEMENT.VISIBLE : VISIBILITY_OF_ELEMENT.HIDDEN};
    }
}

export default Utils;