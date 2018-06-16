var canvas;
var canvasContext;


window.onload = function() {
    canvas = document.getElementById("game-canvas");
    canvasContext = canvas.getContext("2d");

    colorRect(0, 0, canvas.width, canvas.height, "black");
    colorText("LOADING...", canvas.width/2, canvas.height/2, "white");
    
    loadImages();

}

function imageLoadingDoneSoStartGame() {
    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);

    setupInput();
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
    //clearScreen();
    drawTracks();
    carDraw();
    
    //colorText(mouseX + "," + mouseY, mouseX, mouseY, "yellow");
    var mouseTrackCol = Math.floor(mouseX / trackWidth);
    var mouseTrackRow = Math.floor(mouseY / trackHeight);
    var trackIndexUnderMouse = rowColToArrayIndex(mouseTrackCol, mouseTrackRow);
    colorText(mouseTrackCol + "," + mouseTrackRow + ":" + trackIndexUnderMouse, mouseX, mouseY, "yellow");
}

