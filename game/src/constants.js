export const LEVELS = {
    EASY: 'łatwy',
    MIDDLE: 'średni',
    HARD: 'trudny',
}

export const IMAGES_FOLDER_PATH = 'images';

export const DISKS_IMAGES = {
    BLACK: 'black_disk.png',
    BLUE: 'blue_disk.png',
    POSSIBILITY_BLUE: 'blue_possibility.png',
    POSSIBILITY_BLACK: 'black_possibility.png',
    TURN_BLUE: 'blue_disk_turn.png',
    TURN_BLACK: 'black_disk_turn.png'
}

export const IMG_FIELDS_PATHS = [
    '',
    `${IMAGES_FOLDER_PATH}/${DISKS_IMAGES.BLUE}`,
    `${IMAGES_FOLDER_PATH}/${DISKS_IMAGES.BLACK}`,
    `${IMAGES_FOLDER_PATH}/${DISKS_IMAGES.POSSIBILITY_BLUE}`,
    `${IMAGES_FOLDER_PATH}/${DISKS_IMAGES.POSSIBILITY_BLACK}`
];

export const MAIN_PAGE_IMAGES = {
    MAIN_PAGE: 'main_page.jpg',
    LOGO: 'logo.png',
}

export const PAGE_URLS = {
    TWO_PLAYERS_MODE: 'tryb_dla_dwoch_graczy',
    COMPUTER_GAME: 'gra_z_komputerem',
    SELF_TEACHING: 'samouczek',
    RULES: 'zasady_gry',
    ADVICES: 'porady_strategie',
    RANKING: 'ranking',
    MAIN_PAGE: 'strona_glowna',
}

export const BASE_API_URL = 'http://localhost:8000';

export const API_URLS = {
    UPLOADS: `${BASE_API_URL}/uploads`,
    GAMES: `${BASE_API_URL}/api/game`,
    IMAGE: `${BASE_API_URL}/api/game/image`
};

export const TURN_BUTTON_INFO = {
    END_OF_GAME: 'Koniec Gry',
    GIVE_UP_TURN: 'Oddaj Turę'
}

export const POINTS_VARATIONS = {
    FIRST_OPTION: "punkty",
    SECOND_OPTION: "punkt",
    THIRD_OPTION: "punktów"
}

export const SUBPAGES = {
    TWO_PLAYERS_MODE: 'Tryb dla dwóch graczy',
    COMPUTER_GAME: 'Gra z komputerem',
    SELF_TEACHING: 'Samouczek',
    RULES: 'Zasady Gry',
    ADVICES: 'Strategie i porady',
    RANKING: 'Ranking',
    MAIN_PAGE: 'Strona główna',
}

export const INITIAL_BOARD = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 4, 0, 0, 0, 0],
    [0, 0, 4, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 4, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
];

export const VALUATING_BOARD = [
    [99, -8, 12, 6, 6, 12, -8, 99],
    [-8, -24, -4, -3, -3, -4, -24, -8],
    [12, -4, 10, 4, 4, 10, -4, 12],
    [6, -3, 4, 0, 0, 4, -3, 6],
    [6, -3, 4, 0, 0, 4, -3, 6],
    [12, -4, 10, 4, 4, 10, -4, 12],
    [-8, -24, -4, -3, -3, -4, -24, -8],
    [99, -8, 12, 6, 6, 12, -8, 99]
];

export const BOARD_DIMENSIONS = {
    WIDTH: 8,
    HEIGHT: 8
};

export const PLAYERS = {
    FIRST_PLAYER: 1,
    SECOND_PLAYER: 2
}

export const POINTS_FOR_C_SQUARE = 1;

export const POINTS_FOR_X_SQUARE = 3;

export const C_SQUARE_FIELDS = [[0, 1], [1, 0], [0, 6], [1, 7], [6, 0], [7, 1], [6, 7], [7, 6]];
export const X_SQUARE_FIELDS = [[1, 1], [1, 6], [6, 1], [6, 6]];

export const BOARD_RANGE = [0, 1, 2, 3, 4, 5, 6, 7];

export const EMPTY_FIELD = 0;

export const VISIBILITY_OF_ELEMENT = {
    VISIBLE: 'visible',
    HIDDEN: 'hidden'
}

export const TIME_TO_WAIT_COMPUTER_MOVE = 500; //miliseconds

export const LEVELS_DICTIONARY = {
    'easy': 'łatwy',
    'middle': 'średni',
    'hard': 'trudny'
};