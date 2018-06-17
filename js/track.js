

const trackWidth = 40;
const trackHeight = 40;
const trackGap = 2;
const trackColumns = 20;
const trackRows = 15;
//var trackGrid = [true, false, true, true];
//var trackGrid = new Array(trackColumns*trackRows);
//               1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9  0  
var trackGrid = [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
		 4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
		 1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
		 1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
		 1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
		 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
		 1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
		 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
		 1, 2, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
		 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
		 0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
		 0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
		 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 4];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYER_START = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

function isObstacleAtColRow(col, row) {
    if ((col >= 0) &&
	(col < trackColumns) &&
	(row >= 0) &&
	(row < trackRows)) {
	var trackIndexUnderCoord = rowColToArrayIndex(col, row);
	return trackGrid[trackIndexUnderCoord] != TRACK_ROAD;
    } else {
	return false;
    }
}

function drawTracks() {
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for(var j=0; j<trackRows; j++) {
	for(var i=0; i<trackColumns; i++) {
	    var tileKindHere = trackGrid[arrayIndex];
	    var useImg = trackPics[tileKindHere];
	    canvasContext.drawImage(useImg, drawTileX, drawTileY);
	    drawTileX += trackWidth;
	    arrayIndex++;
	}
	drawTileY += trackHeight;
	drawTileX = 0;
    }
}

function rowColToArrayIndex(col, row) {
    return trackColumns * row + col;
}

function carTrackHandling(whichCar) {
    var carTrackCol = Math.floor(whichCar.x / trackWidth);
    var carTrackRow = Math.floor(whichCar.y / trackHeight);
    var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);
    if ((carTrackCol >= 0) &&
	(carTrackCol < trackColumns) &&
	(carTrackRow >= 0) &&
	(carTrackRow < trackRows)) {
	if (isObstacleAtColRow(carTrackCol, carTrackRow)) {
	    // lose speed on collision with wall
	    whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
	    whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;
	    whichCar.speed *= -0.5;
	}
    }
}

