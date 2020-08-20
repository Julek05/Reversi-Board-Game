const Engine = require('./Engine');
const engine = new Engine();

const testBoard1 = [
    [0, 0, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 1, 1, 2, 0, 2],
    [0, 0, 2, 1, 2, 1, 2, 2],
    [0, 0, 1, 1, 2, 2, 1, 2],
    [0, 1, 1, 1, 2, 1, 2, 2],
    [2, 2, 1, 2, 2, 2, 1, 2],
    [0, 0, 2, 1, 2, 1, 1, 2],
    [0, 0, 2, 2, 2, 2, 2, 2]
];

const resultBoardtest1 = [
    [0, 0, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 1, 1, 2, 0, 2],
    [0, 0, 2, 1, 2, 1, 2, 2],
    [0, 0, 1, 1, 2, 2, 1, 2],
    [0, 1, 1, 1, 2, 1, 2, 2],
    [2, 1, 1, 2, 2, 2, 1, 2],
    [1, 0, 2, 1, 2, 1, 1, 2],
    [0, 0, 2, 2, 2, 2, 2, 2]
];

const resultBoardtest2 = [
    [0, 0, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 1, 1, 2, 0, 2],
    [0, 0, 2, 1, 2, 1, 2, 2],
    [0, 2, 2, 2, 2, 2, 1, 2],
    [0, 2, 2, 1, 2, 1, 2, 2],
    [2, 2, 1, 2, 2, 2, 1, 2],
    [0, 0, 2, 1, 2, 1, 1, 2],
    [0, 0, 2, 2, 2, 2, 2, 2]
];

const testBoard2 = [
    [1, 1, 2, 2, 1, 1, 2, 1],
    [2, 1, 2, 2, 2, 1, 2, 1],
    [1, 1, 1, 2, 1, 1, 2, 1],
    [2, 1, 2, 1, 2, 1, 2, 1],
    [1, 1, 2, 2, 1, 1, 2, 1],
    [2, 1, 2, 2, 1, 2, 2, 1],
    [1, 1, 2, 1, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 0]
];
test("isMoveCorrect() - zajęcie rogu, ruch nieprawidłowy", () => {
    expect(engine.isMoveCorrect(testBoard1, 0, 0, 1)).toBe(false)
});

test("isMoveCorrect() - odwrócenie pionka po skosie", () => {
    expect(engine.isMoveCorrect(testBoard1, 6, 0, 1)).toBe(true)
});

test("isMoveCorrect() - odwrócenie pionka w linii prostej", () => {
    expect(engine.isMoveCorrect(testBoard1, 6, 1, 1)).toBe(true)
});

test("isMoveCorrect() - zajęcie rogu gracz nr 1", () => {
    expect(engine.isMoveCorrect(testBoard2, 7, 7, 1)).toBe(true)
});

test("isMoveCorrect() - zajęcie rogu gracz nr 2 - ruch nieprawidłowy", () => {
    expect(engine.isMoveCorrect(testBoard2, 7, 7, 2)).toBe(false)
});

test("turnDisks() - odwrócenie pionka po skosie, większość planszy zapełniona", () => {
    engine.isMoveCorrect(testBoard1, 6, 0, 1);
    expect(engine.turnDisks(testBoard1, 6, 0, 1)).toEqual(resultBoardtest1)
});

test("turnDisks() - odwrócenie pionków w trzech kierunkach naraz, większość planszy zapełniona", () => {
    engine.isMoveCorrect(testBoard1, 3, 1, 2);
    expect(engine.turnDisks(testBoard1, 3, 1, 2)).toEqual(resultBoardtest2)
});

const testBoard3 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [2, 1, 1, 1, 1, 1, 2, 2],
    [2, 1, 1, 2, 1, 1, 1, 1],
    [2, 1, 1, 1, 2, 2, 1, 1],
    [2, 1, 1, 1, 1, 1, 1, 1]
];


const resultBoardtest3 = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0],
    [2, 1, 2, 1, 1, 1, 2, 2],
    [2, 2, 1, 2, 1, 1, 1, 1],
    [2, 1, 1, 1, 2, 2, 1, 1],
    [2, 1, 1, 1, 1, 1, 1, 1]
];


test("turnDisks() - środek gry", () => {
    engine.isMoveCorrect(testBoard3, 2, 4, 2);
    expect(engine.turnDisks(testBoard3, 2, 4, 2)).toEqual(resultBoardtest3)
});


const testBoard4 = [
    [2, 0, 0, 0, 0, 0, 0, 1],
    [2, 2, 1, 0, 0, 0, 1, 0],
    [2, 2, 2, 0, 2, 2, 2, 2],
    [2, 2, 1, 2, 1, 1, 1, 1],
    [2, 2, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 1, 1, 2, 1, 1],
    [2, 2, 1, 1, 1, 1, 1, 1],
    [2, 1, 1, 1, 1, 1, 1, 1]
];


const resultBoardtest4 = [
    [2, 1, 0, 0, 0, 0, 0, 1],
    [2, 1, 1, 0, 0, 0, 1, 0],
    [2, 1, 2, 0, 2, 2, 2, 2],
    [2, 1, 1, 2, 1, 1, 1, 1],
    [2, 1, 1, 1, 1, 1, 1, 1],
    [2, 1, 2, 1, 1, 2, 1, 1],
    [2, 1, 1, 1, 1, 1, 1, 1],
    [2, 1, 1, 1, 1, 1, 1, 1]
];


test("turnDisks() - odwrócenie pionków wdłuż całej planszy w linii prostej", () => {
    engine.isMoveCorrect(testBoard4, 0, 1, 1);
    expect(engine.turnDisks(testBoard4, 0, 1, 1)).toEqual(resultBoardtest4)
});
