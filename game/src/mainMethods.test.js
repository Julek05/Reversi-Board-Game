const GameController = require('./GameController');
const GameState = require('./GameState');

const testBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 0, 0, 0],
    [0, 0, 4, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 4, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

const expectedBoardAfterMove = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0],
    [0, 0, 0, 3, 2, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

test("makeManualMove() - pierwszy ruch w grze", () => {
    const actualGameState = new GameState([testBoard], 2, true, false, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard, expectedBoardAfterMove], 1, true, false, true);

    expect(gameController.makeManualMove(5, 4, false)).toEqual(expectedGameState);
});


const testBoard2 = [
    [2, 1, 1, 1, 1, 4, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 4, 0, 0, 0, 0],
    [1, 0, 4, 1, 2, 0, 0, 0],
    [1, 0, 0, 2, 1, 4, 0, 0],
    [4, 0, 0, 0, 4, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 4]
];

const expectedBoardAfterMove2 = [
    [2, 1, 1, 1, 1, 0, 0, 0],
    [1, 2, 3, 0, 0, 0, 0, 0],
    [1, 3, 2, 0, 0, 0, 0, 0],
    [1, 0, 0, 2, 2, 0, 0, 0],
    [1, 0, 0, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 2]
];

test("makeManualMove() - odwracanie całego skosu", () => {
    const actualGameState = new GameState([testBoard2], 2, true, false, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard2, expectedBoardAfterMove2], 1, true, false, true);

    expect(gameController.makeManualMove(7, 7, false)).toEqual(expectedGameState);
});


const testBoard3 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 3, 0, 0, 0, 0],
    [0, 0, 3, 2, 0, 0, 0, 0],
    [0, 3, 3, 2, 1, 1, 0, 0],
    [0, 3, 2, 2, 1, 1, 0, 0],
    [0, 0, 3, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

const expectedBoardAfterMove3 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 4, 2, 4, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 4, 2, 1, 1, 1, 4, 0],
    [0, 0, 0, 1, 1, 1, 4, 0],
    [0, 0, 0, 4, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

test("makeManualMove() - odwrócenie pionków w dwóch kierunkach naraz", () => {
    const actualGameState = new GameState([testBoard3], 1, true, false, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard3, expectedBoardAfterMove3], 2, true, false, true);

    expect(gameController.makeManualMove(3, 2, false)).toEqual(expectedGameState);
});


const testBoard4 = [
    [1, 2, 2, 2, 2, 1, 1, 0],
    [2, 2, 2, 2, 2, 2, 1, 3],
    [2, 2, 2, 2, 2, 1, 1, 2],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [2, 2, 2, 2, 1, 2, 1, 1],
    [2, 2, 2, 1, 2, 2, 2, 1],
    [3, 2, 1, 1, 1, 2, 1, 1],
    [3, 0, 0, 1, 1, 1, 1, 1]
];

const expectedBoardAfterMove4 = [
    [1, 2, 2, 2, 2, 1, 1, 4],
    [1, 2, 2, 2, 2, 1, 1, 4],
    [1, 2, 2, 2, 1, 1, 1, 2],
    [1, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 1, 2, 1, 2, 1, 1],
    [1, 1, 2, 1, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1],
    [4, 4, 4, 1, 1, 1, 1, 1]
];

test("makeManualMove() - odwrócenie pionków w trzech kierunkach naraz", () => {
    const actualGameState = new GameState([testBoard4], 1, true, false, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard4, expectedBoardAfterMove4], 2, true, false, true);

    expect(gameController.makeManualMove(6, 0, false)).toEqual(expectedGameState);
});


const testBoard5 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 2, 0, 2, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0],
    [0, 2, 1, 4, 1, 2, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0],
    [0, 2, 0, 2, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

const expectedBoardAfterMove5 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 2, 0, 2, 0, 0],
    [0, 0, 2, 2, 2, 0, 0, 0],
    [0, 2, 2, 2, 2, 2, 0, 0],
    [0, 0, 2, 2, 2, 0, 0, 0],
    [0, 2, 0, 2, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

test("makeManualMove() - odwrócenie pionków naraz w ośmiu kierunkach (wszystkich możliwych)", () => {
    const actualGameState = new GameState([testBoard5], 2, true, false, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard5, expectedBoardAfterMove5], 1, false, true, false);

    expect(gameController.makeManualMove(4, 3, true)).toEqual(expectedGameState);
});


const testBoard6 = [
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 1, 2, 2, 2, 2],
    [2, 1, 1, 1, 2, 2, 2, 2],
    [2, 1, 2, 2, 2, 1, 2, 2],
    [2, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 2, 2, 2, 2, 2],
    [4, 1, 2, 2, 2, 2, 2, 2]
];

const expectedBoardAfterMove6 = [
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 1, 2, 2, 2, 2],
    [2, 1, 1, 1, 2, 2, 2, 2],
    [2, 1, 2, 2, 2, 1, 2, 2],
    [2, 1, 2, 1, 1, 1, 1, 2],
    [2, 2, 1, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2]
];

test("makeManualMove() - ostatni ruch w grze - pełna plansza", () => {
    const actualGameState = new GameState([testBoard6], 2, true, false, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard6, expectedBoardAfterMove6], 1, false, true, false);

    expect(gameController.makeManualMove(7, 0, true)).toEqual(expectedGameState);
});


const testBoard7 = [
    [3, 2, 1, 1, 1, 1, 1, 0],
    [3, 3, 2, 1, 1, 1, 0, 0],
    [3, 2, 1, 1, 1, 1, 1, 1],
    [3, 1, 1, 1, 2, 2, 1, 1],
    [0, 1, 1, 2, 1, 2, 2, 2],
    [0, 3, 2, 2, 2, 1, 2, 2],
    [0, 3, 2, 3, 1, 1, 1, 3],
    [0, 3, 3, 0, 0, 0, 0, 0]
];

const expectedBoardAfterMove7 = [
    [0, 2, 1, 1, 1, 1, 1, 4],
    [4, 0, 2, 1, 1, 1, 4, 4],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [4, 1, 1, 1, 2, 2, 1, 1],
    [4, 1, 1, 2, 1, 2, 2, 2],
    [0, 0, 2, 2, 2, 1, 2, 2],
    [0, 0, 2, 0, 1, 1, 1, 0],
    [0, 0, 0, 4, 4, 4, 4, 0]
];

test("makeManualMove() - odwrócenie pionków w jednym kierunku - większość planszy zapełniona", () => {
    const actualGameState = new GameState([testBoard7], 1, true, false, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard7, expectedBoardAfterMove7], 2, true, false, true);

    expect(gameController.makeManualMove(2, 0, false)).toEqual(expectedGameState);
});

const testBoard8 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 0, 0, 0],
    [0, 0, 4, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 4, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

const expectedBoardAfterMove8 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 0, 0, 0],
    [0, 0, 4, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 4, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

test("makeManualMove() - niepoprawny ruch - ruch się nie wykonuje", () => {
    const actualGameState = new GameState([testBoard8], 2, true, false);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([expectedBoardAfterMove8], 2, true, false);

    expect(gameController.makeManualMove(2, 4)).toEqual(expectedGameState);
});

////////////////////////////////////////////////////////////////////////////
//makeAutomaticMove()
////////////////////////////////////////////////////////////////////////////
// maximisationStrategy()
const testBoard9 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 3, 0],
    [0, 0, 0, 2, 2, 2, 2, 0],
    [0, 0, 3, 2, 1, 0, 3, 0],
    [0, 0, 0, 3, 0, 0, 0, 0]
];

const expectedBoardAfterMove9 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 0, 0],
    [0, 0, 4, 1, 2, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 4, 1, 2, 2, 2, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 4, 1, 4, 0, 0, 0]
];

test("makeAutomaticMove() - strategia maksymalizacji - prosty przypadek", () => {
    const actualGameState = new GameState([testBoard9], 1, true, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard9, expectedBoardAfterMove9], 2, true, false);

    expect(gameController.makeAutomaticMove(0)).toEqual(expectedGameState);
});


const testBoard10 = [
    [1, 2, 2, 2, 2, 2, 3, 0],
    [2, 2, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 3, 0, 0, 0, 0],
    [2, 0, 3, 2, 1, 0, 0, 0],
    [2, 0, 0, 1, 2, 3, 0, 0],
    [2, 0, 0, 0, 3, 2, 0, 0],
    [2, 0, 0, 0, 0, 0, 3, 0],
    [3, 0, 0, 0, 0, 0, 0, 0]
];

const expectedBoardAfterMove10 = [
    [1, 2, 2, 2, 2, 2, 0, 0],
    [1, 2, 0, 0, 0, 0, 0, 0],
    [1, 0, 2, 0, 4, 0, 0, 0],
    [1, 0, 0, 2, 1, 4, 0, 0],
    [1, 0, 4, 1, 2, 0, 0, 0],
    [1, 0, 0, 4, 0, 2, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0]
];

test("makeAutomaticMove() - strategia maksymalizacji - trudniejszy przypadek", () => {
    const actualGameState = new GameState([testBoard10], 1, true, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard10, expectedBoardAfterMove10], 2, true, false);

    expect(gameController.makeAutomaticMove(0)).toEqual(expectedGameState);
});


const testBoard11 = [
    [2, 3, 1, 1, 2, 2, 2, 3],
    [3, 2, 1, 2, 2, 2, 2, 2],
    [2, 1, 2, 2, 1, 1, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 2],
    [1, 1, 2, 1, 2, 1, 1, 1],
    [1, 1, 1, 2, 2, 2, 1, 1],
    [1, 1, 1, 2, 2, 1, 1, 1],
    [0, 0, 1, 2, 2, 2, 2, 3]
];


const expectedBoardAfterMove11 = [
    [2, 4, 1, 1, 1, 1, 1, 1],
    [4, 2, 1, 2, 2, 2, 1, 1],
    [2, 1, 2, 2, 1, 1, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 2, 1, 2, 1, 1, 1],
    [1, 1, 1, 2, 2, 2, 1, 1],
    [1, 1, 1, 2, 2, 1, 1, 1],
    [4, 4, 1, 2, 2, 2, 2, 4]
];

test("makeAutomaticMove() - strategia maksymalizacji - odwrócenie pionków w 1, 2, 3 kierunkach w zależności od opcji ruchu", () => {
    const actualGameState = new GameState([testBoard11], 1, true, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard11, expectedBoardAfterMove11], 2, true, false);

    expect(gameController.makeAutomaticMove(0)).toEqual(expectedGameState);
});


const testBoard12 = [
    [0, 0, 1, 1, 1, 1, 1, 1],
    [3, 2, 2, 2, 2, 2, 1, 1],
    [2, 2, 2, 2, 1, 2, 1, 1],
    [3, 2, 1, 2, 2, 1, 2, 1],
    [3, 2, 1, 1, 2, 2, 2, 1],
    [3, 2, 1, 1, 1, 2, 2, 1],
    [3, 0, 1, 3, 2, 1, 2, 3],
    [0, 1, 0, 1, 1, 3, 1, 0]
];


const expectedBoardAfterMove12 = [
    [4, 4, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [2, 1, 2, 2, 1, 2, 1, 1],
    [0, 2, 1, 2, 2, 1, 2, 1],
    [0, 2, 1, 1, 2, 2, 2, 1],
    [0, 2, 1, 1, 1, 2, 2, 1],
    [0, 4, 1, 4, 2, 1, 2, 0],
    [0, 1, 4, 1, 1, 4, 1, 0]
];

test("makeAutomaticMove() - strategia maksymalizacji - 8 różnych opcji ruchu", () => {
    const actualGameState = new GameState([testBoard12], 1, true, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard12, expectedBoardAfterMove12], 2, true, false);

    expect(gameController.makeAutomaticMove(0)).toEqual(expectedGameState);
});


const testBoard13 = [
    [1, 2, 2, 3, 0, 0, 0, 3],
    [2, 2, 2, 0, 0, 0, 0, 2],
    [2, 2, 1, 0, 0, 0, 1, 2],
    [2, 2, 2, 1, 1, 1, 1, 2],
    [2, 2, 2, 2, 1, 1, 1, 2],
    [2, 2, 2, 1, 2, 1, 1, 2],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2]
];


const expectedBoardAfterMove13 = [
    [1, 2, 2, 0, 0, 0, 0, 1],
    [2, 2, 2, 4, 0, 0, 4, 1],
    [2, 2, 1, 4, 4, 4, 1, 1],
    [2, 2, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [2, 2, 2, 1, 2, 1, 1, 1],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2]
];

test("makeAutomaticMove() - strategia maksymalizacji - dwie opcje ruchu na krawędziach", () => {
    const actualGameState = new GameState([testBoard13], 1, true, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard13, expectedBoardAfterMove13], 2, true, false);

    expect(gameController.makeAutomaticMove(0)).toEqual(expectedGameState);
});


//valuatingFieldsStrategy()
const testBoard14 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 3, 0],
    [0, 0, 0, 2, 2, 2, 2, 0],
    [0, 0, 3, 2, 1, 0, 3, 0],
    [0, 0, 0, 3, 0, 0, 0, 0]
];

const expectedBoardAfterMove14 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 0, 0],
    [0, 0, 4, 1, 2, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 4, 1, 2, 2, 2, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 4, 1, 4, 0, 0, 0]
];

test("makeAutomaticMove() - strategia wartościowania pól - prosty przypadek", () => {
    const actualGameState = new GameState([testBoard14], 1, true, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard14, expectedBoardAfterMove14], 2, true, false);

    expect(gameController.makeAutomaticMove(2)).toEqual(expectedGameState);
});


const testBoard15 = [
    [1, 2, 2, 2, 2, 2, 3, 0],
    [2, 2, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 3, 0, 0, 0, 0],
    [2, 0, 3, 2, 1, 0, 0, 0],
    [2, 0, 0, 1, 2, 3, 0, 0],
    [2, 0, 0, 0, 3, 2, 0, 0],
    [2, 0, 0, 0, 0, 0, 3, 0],
    [3, 0, 0, 0, 0, 0, 0, 0]
];

const expectedBoardAfterMove15 = [
    [1, 2, 2, 2, 2, 2, 0, 0],
    [1, 2, 0, 0, 0, 0, 0, 0],
    [1, 0, 2, 0, 4, 0, 0, 0],
    [1, 0, 0, 2, 1, 4, 0, 0],
    [1, 0, 4, 1, 2, 0, 0, 0],
    [1, 0, 0, 4, 0, 2, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0]
];

test("makeAutomaticMove() - strategia wartościowania pól - trudniejszy przypadek", () => {
    const actualGameState = new GameState([testBoard15], 1, true, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard15, expectedBoardAfterMove15], 2, true, false);

    expect(gameController.makeAutomaticMove(2)).toEqual(expectedGameState);
});


const testBoard16 = [
    [2, 3, 1, 1, 2, 2, 2, 2],
    [3, 2, 1, 2, 2, 2, 2, 2],
    [2, 1, 2, 2, 1, 1, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 2],
    [1, 1, 2, 1, 2, 1, 1, 1],
    [1, 1, 1, 2, 2, 2, 1, 1],
    [1, 1, 1, 2, 2, 1, 1, 1],
    [0, 0, 1, 2, 2, 2, 2, 3]
];

const expectedBoardAfterMove16 = [
    [2, 4, 1, 1, 2, 2, 2, 2],
    [4, 2, 1, 2, 2, 2, 2, 2],
    [2, 1, 2, 2, 1, 1, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 2],
    [1, 1, 2, 1, 2, 1, 1, 1],
    [1, 1, 1, 2, 2, 2, 1, 1],
    [1, 1, 1, 2, 2, 1, 1, 1],
    [4, 4, 1, 1, 1, 1, 1, 1]
];

test("makeAutomaticMove() - strategia wartościowania pól - odwrócenie pionków w 1, 2, 3 kierunkach w zależności od opcji ruchu", () => {
    const actualGameState = new GameState([testBoard16], 1, true, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard16, expectedBoardAfterMove16], 2, true, false);

    expect(gameController.makeAutomaticMove(2)).toEqual(expectedGameState);
});


const testBoard17 = [
    [1, 2, 2, 3, 0, 0, 0, 3],
    [2, 2, 2, 0, 0, 0, 0, 2],
    [2, 2, 1, 0, 0, 0, 1, 2],
    [2, 2, 2, 1, 1, 1, 1, 2],
    [2, 2, 2, 2, 1, 1, 1, 2],
    [2, 2, 2, 1, 2, 1, 1, 2],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2]
];

const expectedBoardAfterMove17 = [
    [1, 2, 2, 0, 0, 0, 0, 1],
    [2, 2, 2, 4, 0, 0, 4, 1],
    [2, 2, 1, 4, 4, 4, 1, 1],
    [2, 2, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [2, 2, 2, 1, 2, 1, 1, 1],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2]
];

test("makeAutomaticMove() - strategia wartościowania pól - dwie opcje ruchu na krawędziach", () => {
    const actualGameState = new GameState([testBoard17], 1, true, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard17, expectedBoardAfterMove17], 2, true, false);

    expect(gameController.makeAutomaticMove(2)).toEqual(expectedGameState);
});


//mobilityStrategy()
const testBoard18 = [
    [1, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 3, 2, 0, 0, 0],
    [2, 0, 3, 2, 2, 0, 0, 0],
    [2, 0, 0, 1, 2, 3, 0, 0],
    [2, 0, 0, 0, 3, 2, 0, 0],
    [2, 0, 0, 0, 0, 0, 3, 0],
    [3, 0, 0, 0, 0, 0, 0, 0]
];

const expectedBoardAfterMove18 = [
    [1, 0, 0, 0, 0, 0, 0, 0],
    [1, 2, 0, 0, 0, 0, 0, 0],
    [1, 0, 2, 0, 2, 0, 0, 0],
    [1, 0, 0, 2, 2, 0, 0, 0],
    [1, 0, 4, 1, 2, 0, 0, 0],
    [1, 0, 4, 4, 0, 2, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0]
];

test("makeAutomaticMove() - strategia mobilności - krawędz kontra skos", () => {
    const actualGameState = new GameState([testBoard18], 1, true, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard18, expectedBoardAfterMove18], 2, true, false);

    expect(gameController.makeAutomaticMove(1)).toEqual(expectedGameState);
});


const testBoard19 = [
    [2, 3, 1, 1, 2, 2, 2, 3],
    [3, 2, 1, 2, 2, 2, 2, 2],
    [2, 1, 2, 2, 1, 1, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 2],
    [1, 1, 2, 1, 2, 1, 1, 1],
    [1, 1, 1, 2, 2, 2, 1, 1],
    [1, 1, 1, 2, 2, 1, 1, 1],
    [0, 0, 1, 2, 2, 2, 2, 3]
];

const expectedBoardAfterMove19 = [
    [2, 4, 1, 1, 2, 2, 2, 0],
    [4, 2, 1, 2, 2, 2, 2, 2],
    [2, 1, 2, 2, 1, 1, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 2],
    [1, 1, 2, 1, 2, 1, 1, 1],
    [1, 1, 1, 2, 2, 2, 1, 1],
    [1, 1, 1, 2, 2, 1, 1, 1],
    [4, 4, 1, 1, 1, 1, 1, 1]
];

test("makeAutomaticMove() - strategia mobilności - odwrócenie pionków w 1, 2, 3 kierunkach w zależności od opcji ruchu", () => {
    const actualGameState = new GameState([testBoard19], 1, true, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard19, expectedBoardAfterMove19], 2, true, false);

    expect(gameController.makeAutomaticMove(1)).toEqual(expectedGameState);
});


const testBoard20 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 2, 1, 2, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 2, 2, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

const expectedBoardAfterMove20 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

test("makeAutomaticMove() - strategia mobilności - 1 możliwość ruchu przeciwnika kontra 0", () => {
    const actualGameState = new GameState([testBoard20], 1, true, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard20, expectedBoardAfterMove20], 2, false, false);

    expect(gameController.makeAutomaticMove(1)).toEqual(expectedGameState);
});


const testBoard21 = [
    [0, 2, 0, 0, 0, 0, 0, 0],
    [0, 3, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0],
    [0, 3, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

const expectedBoardAfterMove21 = [
    [0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 1, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [4, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [4, 1, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

test("makeAutomaticMove() - strategia mobilności - ta sama ilość możliwych ruchów przeciwnika," +
     " ale w jednej sytuacji jedną z opcji ruchu przeciwnika będzie C-square", () => {
    const actualGameState = new GameState([testBoard21], 1, true, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard21, expectedBoardAfterMove21], 2, true, false);

    expect(gameController.makeAutomaticMove(1)).toEqual(expectedGameState);
});


const testBoard22 = [
    [3, 2, 1, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0],
    [0, 0, 0, 2, 0, 3, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0]
];

const expectedBoardAfterMove22 = [
    [1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 4, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

//allStrategiesFixed()
test("makeAutomaticMove() - łączenie strategii  - komputer wykonuje ruch według strategii wartościowania pól", () => {
    const actualGameState = new GameState([testBoard22], 1, true, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard22, expectedBoardAfterMove22], 2, true, false);

    expect(gameController.makeAutomaticMove(3)).toEqual(expectedGameState);
});


const testBoard23 = [
    [3, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 2, 0, 0, 0, 2],
    [0, 0, 0, 0, 2, 0, 0, 3],
    [0, 0, 0, 0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

const expectedBoardAfterMove23 = [
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 4],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 2, 0, 0, 0, 2],
    [0, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

test("makeAutomaticMove() - łączenie strategii - pomimo, że najlepszy ruch dla strategii mobilności i maksymalizacji jest taki sam " +
     "to komputer wykonuje ruch według strategii wartościowania pól ponieważ zajmuje róg - jest to jeden z wyjątków", () => {
    const actualGameState = new GameState([testBoard23], 1, true, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard23, expectedBoardAfterMove23], 2, true, false);

    expect(gameController.makeAutomaticMove(3)).toEqual(expectedGameState);
});


const testBoard24 = [
    [2, 0, 0, 1, 2, 3, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

const expectedBoardAfterMove24 = [
    [2, 0, 4, 1, 2, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

test("makeAutomaticMove() - łączenie strategii - komputer wykonuje ruch według strategii maksymalizacji i mobilności", () => {
    const actualGameState = new GameState([testBoard24], 1, true, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard24, expectedBoardAfterMove24], 2, true, false);

    expect(gameController.makeAutomaticMove(3)).toEqual(expectedGameState);
});


const testBoard25 = [
    [1, 1, 2, 2, 2, 2, 3, 1],
    [1, 3, 1, 2, 2, 2, 2, 2],
    [1, 2, 2, 1, 1, 1, 2, 1],
    [1, 1, 2, 2, 1, 1, 2, 1],
    [1, 1, 2, 1, 1, 1, 2, 1],
    [1, 1, 1, 1, 1, 1, 2, 1],
    [1, 1, 1, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
];

const expectedBoardAfterMove25 = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 4, 1, 2, 2, 1, 1, 2],
    [1, 2, 2, 1, 1, 1, 1, 1],
    [1, 1, 2, 2, 1, 1, 1, 1],
    [1, 1, 2, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 2, 2, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
];

test("makeAutomaticMove() - łączenie strategii - wszystkie strategie wskazują na ten sam ruch", () => {
    const actualGameState = new GameState([testBoard25], 1, true, true);
    const gameController = new GameController(actualGameState);

    const expectedGameState = new GameState([testBoard25, expectedBoardAfterMove25], 2, true, false);

    expect(gameController.makeAutomaticMove(3)).toEqual(expectedGameState);
});
