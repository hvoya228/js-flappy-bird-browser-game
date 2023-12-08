let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let bird = new Image(), 
background = new Image(), 
ground = new Image(), 
topPipe = new Image(), 
bottomPipe = new Image();

let birdXPosition = 10;
let birdYPosition = 150;
let gravitationFroce = 1;

let pipesPosition = [];
let currentPipeIndex;

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
        context.drawImage(bottomPipe, pipesPosition[i].x, pipesPosition[i].y + topPipe.height + 90);

        movePipe(pipesPosition[i]);
        checkCollision(pipesPosition[i]);

        if (pipesPosition[i].x == 50) {

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
        birdYPosition + bird.height >= currentPipe.y + topPipe.height + 90)) {
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
    birdYPosition -= 20;
}

function setGameOver() {
    location.reload();
}

function start() {

    loadImages();
    pipesPosition[0] = {x : canvas.width, y : 0 }

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
document.addEventListener("keydown", doBirdJump);