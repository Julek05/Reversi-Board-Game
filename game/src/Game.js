import React, {useEffect, useState} from 'react'
import Options from "./Options";
import GameController from "./GameController";
import GameState from "./GameState";
import Field from "./Field";
import Utils from "./Utils";

function Game(props) {
    const {backMovementButtonVisibility, strategiesVisibility, computerMode} = props;
    const initialBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 4, 0, 0, 0, 0],
        [0, 0, 4, 1, 2, 0, 0, 0],
        [0, 0, 0, 2, 1, 4, 0, 0],
        [0, 0, 0, 0, 4, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    const [boards, setBoards] = useState([initialBoard]);
    const [turnImage, setTurnImage] = useState(<img src={Utils.setImgPath(2)} className='turnImage' alt=""/>);
    const [activePlayer, setActivePlayer] = useState(2);
    const [canMove, setCanMove] = useState(true);
    const [uiBlock, setUiBlock] = useState(false);
    const [moveComputerAfterHumanGiveUpTurn, setMoveComputerAfterHumanGiveUpTurn] = useState(false);

    const initialGameState = new GameState([initialBoard], 2, true, false);
    const gameController = new GameController(initialGameState);
    let gameState = gameController.gameState;
    const engine = gameController.engine;

    function renderField(y, x, valueField) {
        return (
            <Field
                value={<img src={Utils.setImgPath(valueField)} className='disk' alt=""/>}
                onClick={handleClick(y, x)}
                key={`${x},${y}`}
            />
        );
    }

    useEffect(() => {
        if (moveComputerAfterHumanGiveUpTurn) {
            setTimeout(() => {
                const chosenStrategy = Utils.getChosenStrategy();
                const newState = gameController.makeAutomaticMove(chosenStrategy);
                makeSetState(newState);
            }, 500);
        }
    })

    function makeSetState(newState) {
        setBoards(newState['boards']);
        setActivePlayer(newState['activePlayer']);
        setTurnImage(<img src={Utils.setImgPath(newState['activePlayer'])} className='turnImage' alt=""/>);
        setCanMove(newState['canMove']);
        setUiBlock(newState['uiBlock']);
        setMoveComputerAfterHumanGiveUpTurn(newState['moveComputerAfterHumanGiveUpTurn']);
    }

    function handleClick(y, x) {
        if (!uiBlock) {
            let chosenStrategy;
            if (computerMode) {
                chosenStrategy = Utils.getChosenStrategy();
            }
            gameController.makeMove(y, x, computerMode, chosenStrategy, makeSetState);
        }
    }

    function handleClickRevertLastMove() {
        // const newState = gameController.revertLastMove();
        // makeSetState(newState);
    }

    function handleClickGiveUpTurn() {
        // const newState = gameController.giveUpTurn(computerMode);
        // if (newState !== null) {
        //     makeSetState(newState);
        // }
    }

    const board = [];
    const actualBoard = gameState.getCurrentBoardState();
    for (let x = 0; x < 8; x++) {
        const rowBoard = [];
        for (let y = 0; y < 8; y++) {
            rowBoard.push(renderField(y, x, actualBoard[y][x]));
        }
        board.push(<div className="board-row" key={x}>{rowBoard}</div>);
    }
    const [pointsPlayer1, pointsPlayer2] = Utils.countPoints(actualBoard);
    const giveUpTurn = canMove ? 'hidden' : 'visible';
    const giveUpTurnButtonText = engine.setTextOfGiveUpTurnButton(actualBoard, giveUpTurn, activePlayer);

    return (
        <div className="gameContainer">
            <div id='game' className="boardContainer">
                {board}
            </div>
            <div className="optionsContainer">
                <Options scoredDisksFirstPlayer={pointsPlayer1} scoredDisksSecondPlayer={pointsPlayer2}
                         strategiesVisibility={strategiesVisibility} turnImage={turnImage}
                         backMovementButtonVisibility={backMovementButtonVisibility}
                         backMovement={handleClickRevertLastMove}
                         giveUpTurn={giveUpTurn} giveUpTurnClick={handleClickGiveUpTurn}
                         giveUpTurnButtonText={giveUpTurnButtonText}
                         selectStrategies={gameController.firstMove}
                />
            </div>
        </div>
    );
}

export default Game;