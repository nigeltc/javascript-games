
const groundSpeedDecayMult = 0.94;
const drivePower = 0.5;
const reversePower = 0.2;
const turnRate = 0.06;
const minSpeedToTurn = 0.5;

function Car() {
    this.x = 75;
    this.y = 75;
    this.ang = 0;
    this.speed = 0;
    this.img;

    this.keyHeldGas = false;
    this.keyHeldReverse = false;
    this.keyHeldTurnLeft = false;
    this.keyHeldTurnRight = false; 
    
    this.controlKeyUp;
    this.controlKeyRight;
    this.controlKeyDown;
    this.controlKeyLeft;

    this.setupInput = function(upKey, rightKey, downKey, leftKey) {
	this.controlKeyUp = upKey;
	this.controlKeyRight = rightKey;
	this.controlKeyDown = downKey;
	this.controlKeyLeft = leftKey;
    }
    
    this.reset = function(whichImage) {
	this.img = whichImage;
	for(var j=0; j<trackRows; j++) {
	    for(var i=0; i<trackColumns; i++) {
		var idx = rowColToArrayIndex(i, j);
		if ( trackGrid[idx] == TRACK_PLAYER_START ) {
		    console.log("row=" + j + ", col=" + i);
		    trackGrid[idx] = TRACK_ROAD;
		    this.ang = - Math.PI/2;
		    this.x = (i * trackWidth) + (trackWidth / 2);
		    this.y = (j * trackHeight) + (trackHeight / 2);
		    return;
		}
	    }
	}
    }

    this.move = function() {
	this.speed *= groundSpeedDecayMult;
	
	if (this.keyHeldGas) {
	    this.speed += drivePower;
	}
	if (this.keyHeldReverse) {
	    this.speed -= reversePower;
	}
	if (Math.abs(this.speed) > minSpeedToTurn) {
	    if (this.keyHeldTurnRight ) {
		this.ang += turnRate;
	    }
	    if (this.keyHeldTurnLeft ) {
		this.ang -= turnRate;
	    }
	}
	
	this.x += Math.cos(this.ang) * this.speed;
	this.y += Math.sin(this.ang) * this.speed;

	carTrackHandling(this);
    }

    this.draw = function() {
	drawBitmapCenteredWithRotation(this.img, this.x, this.y, this.ang);
    }
}

