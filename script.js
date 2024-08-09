const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const restart = document.querySelector("#play-again");

const conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "";
let running = false;

initialGame();

function initialGame() {
    cells.forEach(cell => cell.addEventListener("click", captureClick));
    restart.addEventListener("click", restartGame);
    chooseFirstPlayer();
}

function chooseFirstPlayer() {
    currentPlayer = Math.random() < 0.5 ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function captureClick() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    verifyWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function verifyWinner() {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i < conditions.length; i++) {
        const condition = conditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }

        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            winningCells = condition;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!!!`;
        running = false;
        applyBlinkEffect(winningCells);
        restart.style.display = "block";
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
        applyRedBlinkEffect();
        restart.style.display = "block";
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = "";
    cells.forEach(cell => cell.textContent = "");
    restart.style.display = "none";
    chooseFirstPlayer();
}

function applyBlinkEffect(winningCells) {
    setTimeout(() => {
        winningCells.forEach(index => {
            const cellElement = cells[index];
            cellElement.classList.add('blink');
        });
    }, 100);

    setTimeout(() => {
        cells.forEach(cell => cell.classList.remove('blink'));
    }, 3000);
}

function applyRedBlinkEffect() {
    setTimeout(() => {
        cells.forEach(cell => {
            cell.classList.add('red-blink');
        });
    }, 100);

    setTimeout(() => {
        cells.forEach(cell => cell.classList.remove('red-blink'));
    }, 1500);
}