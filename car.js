var carPic = document.createElement("img");
var carPicLoaded = false;

var carX = 75;
var carY = 75;
var carAng = 0;
var carSpeed = 0;

const groundSpeedDecayMult = 0.94;
const drivePower = 0.5;
const reversePower = 0.2;
const turnRate = 0.03;

function carReset() {
    for(var j=0; j<trackRows; j++) {
	for(var i=0; i<trackColumns; i++) {
	    var idx = rowColToArrayIndex(i, j);
	    if ( trackGrid[idx] == TRACK_PLAYER_START ) {
		trackGrid[idx] = TRACK_ROAD;
		carAng = - Math.PI/2;
		carX = (i * trackWidth) + (trackWidth / 2);
		carY = (j * trackHeight) + (trackHeight / 2);
	    }
	}
    }
}

function carMove() {
    carSpeed *= groundSpeedDecayMult;
    
    if (keyHeldGas ) {
	carSpeed += drivePower;
    }
    if (keyHeldReverse ) {
	carSpeed -= reversePower;
    }
    if (keyHeldTurnRight ) {
	carAng += turnRate;
    }
    if (keyHeldTurnLeft ) {
	carAng -= turnRate;
    }
    
    carX += Math.cos(carAng) * carSpeed;
    carY += Math.sin(carAng) * carSpeed;
}

function carDraw() {
    if (carPicLoaded) {
	drawBitmapCenteredWithRotation( carPic, carX, carY, carAng);
    }
}

function carImageLoad() {
    carPic.onload = function() {
	carPicLoaded = true;
    };
    carPic.src = "player1car.png";
}
