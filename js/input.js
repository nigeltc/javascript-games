var mouseX = 0;
var mouseY = 0;

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

function keySet(evt, whichCar, setTo) {
    if (evt.keyCode == whichCar.controlKeyLeft) {
	whichCar.keyHeldTurnLeft = setTo;
    }

    if (evt.keyCode == whichCar.controlKeyRight) {
	whichCar.keyHeldTurnRight = setTo;
    }

    if (evt.keyCode == whichCar.controlKeyUp) {
	whichCar.keyHeldGas = setTo;
    }

    if (evt.keyCode == whichCar.controlKeyDown) {
	whichCar.keyHeldReverse = setTo;
    }

    //evt.preventDefault();
}

function keyPressed(evt) {
    //console.log("key pressed: " + evt.keyCode);
    keySet(evt, blueCar, true);
    keySet(evt, greenCar, true);
    //evt.preventDefault();
}

function keyReleased(evt) {
    //console.log("key released: " + evt.keyCode);
    keySet(evt, blueCar, false);
    keySet(evt, greenCar, false);
    //evt.preventDefault();
}

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    //console.log("("+mouseX+","+mouseY+")");
}

function setupInput() {
    //console.log("setupInput()");
    canvas.addEventListener("mousemove", updateMousePos);
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);

    greenCar.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
    blueCar.setupInput(KEY_UP, KEY_RIGHT, KEY_DOWN, KEY_LEFT);
}

