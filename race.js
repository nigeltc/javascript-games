var canvas;
var canvasContext;


window.onload = function() {
    canvas = document.getElementById("game-canvas");
    canvasContext = canvas.getContext("2d");

    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    setupInput();

    carImageLoad();
    carReset();
}

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll() {
    carMove();
    carTrackHandling();
}

function drawAll() {
    clearScreen();
    carDraw();
    drawTracks();
    
    //colorText(mouseX + "," + mouseY, mouseX, mouseY, "yellow");
    var mouseTrackCol = Math.floor(mouseX / trackWidth);
    var mouseTrackRow = Math.floor(mouseY / trackHeight);
    var trackIndexUnderMouse = rowColToArrayIndex(mouseTrackCol, mouseTrackRow);
    colorText(mouseTrackCol + "," + mouseTrackRow + ":" + trackIndexUnderMouse, mouseX, mouseY, "yellow");
}

