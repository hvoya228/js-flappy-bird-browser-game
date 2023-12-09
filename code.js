let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let bird = new Image(), 
background = new Image(), 
ground = new Image(), 
topPipe = new Image(), 
bottomPipe = new Image();

let birdXPosition = 10;
let birdYPosition = 150;
let gravitationFroce = 1.5;

let pipesPosition = [];
let currentPipeIndex;
let holeBetweenPipesHeight = 75;

let infoText = document.getElementById("info-text");
let scoreText = document.getElementById("score-text");

let score = 0;

function loadImages() {
    bird.src = "img/bird.png";
    background.src = "img/background.png";
    ground.src = "img/ground.png";
    topPipe.src = "img/topPipe.png";
    bottomPipe.src = "img/bottomPipe.png";
    bottomPipe.onload = fillCanvas;
}

function fillCanvas() {
    context.drawImage(background, 0, 0);
    spawnPipes();
    context.drawImage(ground, 0, canvas.height - ground.height);
    context.drawImage(bird, birdXPosition, birdYPosition);
}

function spawnPipes() {

    for (let i = 0; i < pipesPosition.length; i++) {

        currentPipeIndex = i;

        context.drawImage(topPipe, pipesPosition[i].x, pipesPosition[i].y);
        context.drawImage(bottomPipe, pipesPosition[i].x, pipesPosition[i].y + topPipe.height + holeBetweenPipesHeight);

        movePipe(pipesPosition[i]);
        checkCollision(pipesPosition[i]);

        if (pipesPosition[i].x == 40) {

            updateScore();

            pipesPosition.push({
                x : canvas.width, 
                y : Math.floor(Math.random() * topPipe.height) - topPipe.height
            });
        }
    }
}

function movePipe (currentPipe) {
    currentPipe.x--;
}

function checkCollision(currentPipe) {
    if (birdXPosition + bird.width >= currentPipe.x &&
        birdXPosition <= currentPipe.x + topPipe.width &&
       (birdYPosition <= currentPipe.y + topPipe.height || 
        birdYPosition + bird.height >= currentPipe.y + topPipe.height + holeBetweenPipesHeight)) {
            setGameOver();
         }

    if (birdYPosition + bird.height >= canvas.height - ground.height) {
        setGameOver();
    }
}

function enableGravity(){
    birdYPosition += gravitationFroce;
}

function doBirdJump() {
    birdYPosition -= 25;
}

function setGameOver() {
    bird.src = null;
    setText('Game Over! Press R to restart...', infoText);
}

function setText(text, textObject) {
    textObject.textContent = String(text);
}

function updateScore() {
    score++;
    setText(`score: ${score}`, scoreText);
}

function start() {
    loadImages();
    pipesPosition[0] = {x : canvas.width, y : 0 }
    setText('Jump with space!', infoText);
    setText('score: 0', scoreText);
}

function update() {
    fillCanvas();
    enableGravity();

    requestAnimationFrame(update);
}

// Calls when page is loaded
start();

// Calls every frame
update();

// Calls when some key is pressed
document.addEventListener("keydown", function(event) {
    if (event.key === " ") {
        doBirdJump();
    }

    if (event.key === "r" || event.key === "к") {
        location.reload();
    }
});