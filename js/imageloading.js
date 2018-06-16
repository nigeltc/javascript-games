var carPic = document.createElement("img");
var roadPic = document.createElement("img");
var wallPic = document.createElement("img");
var goalPic = document.createElement("img");
var treePic = document.createElement("img");
var flagPic = document.createElement("img");
var picsToLoad = 0;

function countLoadedImagesAndLaunchIfReady() {
    picsToLoad -= 1;
    if (picsToLoad == 0) {
	// start game
	imageLoadingDoneSoStartGame();
    }
}

function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = "images/" + fileName;
}

function loadImages() {
    var imageList = [
	{varName: carPic, fileName: "player1car.png"},
	{varName: roadPic, fileName: "track_road.png"},
	{varName: wallPic, fileName: "track_wall.png"},
	{varName: goalPic, fileName: "track_goal.png"},
	{varName: treePic, fileName: "track_tree.png"},
	{varName: flagPic, fileName: "track_flag.png"}
    ];

    picsToLoad = imageList.length;
    for(var i=0; i<imageList.length; i++) {
	beginLoadingImage(imageList[i].varName, imageList[i].fileName);
    }
}
