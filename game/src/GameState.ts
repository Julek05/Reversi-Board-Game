import Utils from "./Utils";

class GameState {
    public readonly boards: number[][][];
    public activePlayer: number;
    private canMove: boolean;
    private uiBlock: boolean;
    private computerBlock: boolean;
    private moveComputerAfterHumanGiveUpTurn: boolean;
    constructor(boards: number[][][], activePlayer: number, canMove: boolean, uiBlock: boolean, computerBlock: boolean = true,
                moveComputerAfterHumanGiveUpTurn: boolean = false) {
        this.boards = boards;
        this.activePlayer = activePlayer;
        this.canMove = canMove;
        this.uiBlock = uiBlock;
        this.computerBlock = computerBlock;
        this.moveComputerAfterHumanGiveUpTurn = moveComputerAfterHumanGiveUpTurn;
    }

    getCurrentBoardState(): number[][] {
        return Utils.deepCopyTwoDimensionalArray(this.boards[this.boards.length - 1]);
    }
}

export default GameState;