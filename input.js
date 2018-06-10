var mouseX = 0;
var mouseY = 0;

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

var keyHeldGas = false;
var keyHeldReverse = false;
var keyHeldTurnLeft = false;
var keyHeldTurnRight = false; 

function setupInput() {
    canvas.addEventListener("mousemove", updateMousePos);
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
}

function keyPressed(evt) {
    //console.log("key pressed: " + evt.keyCode);
    if (evt.keyCode == KEY_LEFT) {
	keyHeldTurnLeft = true;
	//carAng -= 0.5;
    }

    if (evt.keyCode == KEY_RIGHT) {
	keyHeldTurnRight = true;
	//carAng += 0.5;
    }

    if (evt.keyCode == KEY_UP) {
	keyHeldGas = true;
	//carSpeed += 0.5;
    }

    if (evt.keyCode == KEY_DOWN) {
	keyHeldReverse = true;
	//carSpeed -= 0.5;
    }

    evt.preventDefault();
}

function keyReleased(evt) {
    //console.log("key released: " + evt.keyCode);
    if (evt.keyCode == KEY_LEFT) {
	keyHeldTurnLeft = false;
    }

    if (evt.keyCode == KEY_RIGHT) {
	keyHeldTurnRight = false;
    }

    if (evt.keyCode == KEY_UP) {
	keyHeldGas = false;
    }

    if (evt.keyCode == KEY_DOWN) {
	keyHeldReverse = false;
    }

    evt.preventDefault();
}

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

}

