
var carX = 75;
var carY = 75;
var carAng = 0;
var carSpeed = 0;

const groundSpeedDecayMult = 0.94;
const drivePower = 0.5;
const reversePower = 0.2;
const turnRate = 0.06;
const minSpeedToTurn = 0.5;

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
    if (Math.abs(carSpeed) > minSpeedToTurn) {
	if (keyHeldTurnRight ) {
	    carAng += turnRate;
	}
	if (keyHeldTurnLeft ) {
	    carAng -= turnRate;
	}
    }
    
    carX += Math.cos(carAng) * carSpeed;
    carY += Math.sin(carAng) * carSpeed;
}

function carDraw() {
    drawBitmapCenteredWithRotation( carPic, carX, carY, carAng);
}

