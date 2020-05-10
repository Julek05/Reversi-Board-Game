
class GameState {
    constructor(boards, activePlayer, canMove, uiBlock, computerBlock = true,
                moveComputerAfterHumanGiveUpTurn = false) {
        this.boards = boards;
        this.activePlayer = activePlayer;
        this.canMove = canMove;
        this.uiBlock = uiBlock;
        this.computerBlock = computerBlock;
        this.moveComputerAfterHumanGiveUpTurn = moveComputerAfterHumanGiveUpTurn;
    }

    getCurrentBoardState() {
        return JSON.parse(JSON.stringify(this.boards[this.boards.length - 1]));
    }
}

export default GameState;