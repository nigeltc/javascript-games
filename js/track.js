

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
		 1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
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
    for(var j=0; j<trackRows; j++) {
	for(var i=0; i<trackColumns; i++) {
	    var idx = rowColToArrayIndex(i, j);
	    var tileKindHere = trackGrid[idx];
	    var useImg;
	    switch(tileKindHere) {
	    case TRACK_WALL:
		useImg = wallPic;
		break;
		
	    case TRACK_ROAD:
		useImg = roadPic;
		break;
		
	    case TRACK_GOAL:
		useImg = goalPic;
		break;
		
	    case TRACK_TREE:
		useImg = treePic;
		break;
		
	    case TRACK_FLAG:
		useImg = flagPic;
		break;
		
	    }
	    canvasContext.drawImage(useImg, trackWidth*i, trackHeight*j);
	}
    }
}

function rowColToArrayIndex(col, row) {
    return trackColumns * row + col;
}

function carTrackHandling() {
    var carTrackCol = Math.floor(carX / trackWidth);
    var carTrackRow = Math.floor(carY / trackHeight);
    var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);
    //if ( (trackIndexUnderCar >= 0) &&
    //	  (trackIndexUnderCar < trackColumns * trackRows) ) {
    if ((carTrackCol >= 0) &&
	(carTrackCol < trackColumns) &&
	(carTrackRow >= 0) &&
	(carTrackRow < trackRows)) {
	if (isObstacleAtColRow(carTrackCol, carTrackRow)) {
	    // lose speed on collision with wall
	    carX -= Math.cos(carAng) * carSpeed;
	    carY -= Math.sin(carAng) * carSpeed;
	    carSpeed *= -0.5;
	}
    }
}

