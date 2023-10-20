const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreBlock = document.querySelector(".score");

// snake
const snake = {
    x: 10,
    y: 10,
    dx: 0,
    dy: 0,
    cells: [{ x: 10, y: 10 }],
    maxCells: 4,
    score: 0
};

// food
const food = {
    x: 0,
    y: 0,
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function update() {
    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) snake.x = canvas.width - 10;
    if (snake.y < 0) snake.y = canvas.height - 10;

    if (snake.x >= canvas.width) snake.x = 0;
    if (snake.y >= canvas.height) snake.y = 0;

    snake.cells.unshift({ 
        x: snake.x, 
        y: snake.y 
    });

    if (snake.cells.length > snake.maxCells) snake.cells.pop();
    
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";

    snake.cells.forEach((cell, index) => {
        ctx.fillRect(cell.x, cell.y, 10, 10);

        if (cell.x === food.x && cell.y === food.y) {
            snake.maxCells++;
            food.x = getRandomInt(0, canvas.width / 10 - 1) * 10;
            food.y = getRandomInt(0, canvas.height / 10 - 1) * 10;
            updateScore();
        }

        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                dafaultState();
            }
        }
    });

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);
}

function dafaultState() {
    snake.x = 10;
    snake.y = 10;
    snake.cells = [{ x: 10, y: 10 }];
    snake.maxCells = 4;
    snake.dx = 10;
    snake.dy = 0;
    snake.score = 0 - 1;
    food.x = getRandomInt(0, canvas.width / 10 - 1) * 10;
    food.y = getRandomInt(0, canvas.height / 10 - 1) * 10;

    updateScore();
}

function updateScore() {
    snake.score++;
    scoreBlock.textContent = snake.score;
}

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowUp":
            if (snake.dy !== 10) {
                snake.dx = 0;
                snake.dy = -10;
            }
        break;

        case "ArrowDown":
            if (snake.dy !== -10) {
                snake.dx = 0;
                snake.dy = 10;
            }
        break;

        case "ArrowLeft":
            if (snake.dx !== 10) {
                snake.dx = -10;
                snake.dy = 0;
            }
        break;

        case "ArrowRight":
            if (snake.dx !== -10) {
                snake.dx = 10;
                snake.dy = 0;
            }
        break;
    }
});

// CONTROLL BUTTONS ADD $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// Control Buttons
const upButton = document.getElementById("upButton");
const downButton = document.getElementById("downButton");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

upButton.addEventListener("click", function () {
    if (snake.dy !== 10) {
        snake.dx = 0;
        snake.dy = -10;
    }
});

downButton.addEventListener("click", function () {
    if (snake.dy !== -10) {
        snake.dx = 0;
        snake.dy = 10;
    }
});

leftButton.addEventListener("click", function () {
    if (snake.dx !== 10) {
        snake.dx = -10;
        snake.dy = 0;
    }
});

rightButton.addEventListener("click", function () {
    if (snake.dx !== -10) {
        snake.dx = 10;
        snake.dy = 0;
    }
});

// COMPLETE CONTROLL BUTTONS@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const audio = document.getElementById("myAudio");
const playPauseButton = document.getElementById("playPauseButton");

playPauseButton.addEventListener("click", function() {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = "Pause";
    } else {
        audio.pause();
        playPauseButton.innerHTML = "Play";
    }
});

gameLoop();
