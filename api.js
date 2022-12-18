//przepisac na klasy

const boxes = document.querySelectorAll('.box');
const turaHtml = document.querySelector('.tura');
const win = document.querySelector('.win');
const resethtml = document.querySelector(`.reset`)
const player = document.querySelector(`.player`)
const ai = document.querySelector(`.ai`)

const resultX = document.querySelector(`.resultX`)
const resultO = document.querySelector(`.resultO`)

const players = {
    one: "fa-x",
    two: 'fa-circle',
    winner: '',
winX: 0,
    winO: 0,
    round: 0,
    ai: false,
    flaga: false,
}
let board = [
    [``, ``, ``],
    [``, ``, ``],
    [``, ``, ``]
]
const winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [6, 4, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

const reset = () => {
    players.winner = "";
    players.round = 0;
    win.textContent = players.winner;
    turaHtml.textContent = players.round;
    board = [
        [``, ``, ``],
        [``, ``, ``],
        [``, ``, ``]
    ]

    boxes.forEach(item => {
        item.classList.remove(players.two);
        item.classList.remove(players.one);
    })
}
const getRandom = () => {
    return Math.floor(Math.random() * (2 + 1));
}

const resultGame = () => {
    resultX.textContent = players.winX;
    resultO.textContent = players.winO;
}

resethtml.addEventListener('click', reset)

ai.addEventListener('click', () => {
    players.ai = true;
    ai.classList.add('active');
    player.classList.remove('active');
    players.winO = 0;
    players.winX = 0;
    reset();
})
player.addEventListener('click', () => {
    players.ai = false;
    ai.classList.remove('active');
    player.classList.add('active');
    players.winO = 0;
    players.winX = 0;
    reset();
})

const aiPlayer = () => {

    const turn = players.round % 2 === 0 ? players.two : players.one;
    let row;
    let column;
    if (players.round == 9 || end()) return;
    do {
        row = getRandom();
        column = getRandom();
    } while (board[row][column] !== '')
    if (players.round == 9) return;
    board[row][column] = turn;
    document.querySelector(`[data-row="${row}"][data-column="${column}"]`).classList.add(turn);
    players.round++;
    turaHtml.textContent = players.round;
    if (end()) {

        if (players.winner == "X wygrały")
            ++players.winX;
        win.textContent = players.winner;
        setTimeout(reset, 1500);
    }
    return;
}

boxes.forEach(item => item.addEventListener('click', (e) => {

    const {
        row,
        column
    } = e.target.dataset;
    const turn = players.round % 2 === 0 ? players.two : players.one;

    if (board[row][column] !== '') return;

    if (!end()) {
        board[row][column] = turn;
        e.target.classList.add(turn);
        end();
        players.round++;
        players.flaga = true;
        if (players.ai && players.flaga)
            setTimeout(aiPlayer, 300);

        players.flaga = false;
        end();
    }

    if (end()) {
        if (players.winner == "X wygrały")
            ++players.winX;
        else
            ++players.winO;
        win.textContent = players.winner;
        setTimeout(reset, 1500);
    }

    if (players.round == 9) {
        win.textContent = "Remis";
        setTimeout(reset, 1500);
    }

    turaHtml.textContent = players.round;
    end();
}))

const end = () => {
    resultGame();
    const result = board.reduce((total, row) => total.concat(row))
    let win = null;
    let moves = {
        'fa-x': [],
        'fa-circle': [],
    }

    result.forEach((field, index) => moves[field] ? moves[field].push(index) : null)
    winCombination.forEach(combo => {
        if (combo.every(index => moves[players.one].indexOf(index) > -1)) {
            players.winner = 'X wygrały';
            win = true;
        }

        if (combo.every(index => moves[players.two].indexOf(index) > -1)) {
            players.winner = 'O wygrały';
            win = true;
        }

    })
    return win;
}