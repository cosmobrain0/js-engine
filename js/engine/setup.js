const { log } = console;

const CANVASWIDTH = 2560;
const CANVASHEIGHT = 1440;

let c = document.createElement("canvas");
let ctx = c.getContext("2d");
c.width = CANVASWIDTH;
c.height = CANVASHEIGHT;
c.style.background = '#000';
ctx.textBaseline = 'top';
ctx.fillStyle = '#fff';
ctx.font = "40px Arial";
document.body.appendChild(c);
ctx.imageSmoothingEnabled = false;

/**
 * @typedef {Object} MouseButton
 * @property {boolean} down true while this button is pressed
 * @property {Vector} start the position of the mouse the last time it was pressed
 * @property {Vector[]} path the path the mouse took the last time this button was held down
 * @property {Number?} identifier the identifier for touch input
 */
class MouseButton {
	/**
	 * 
	 * @param {Vector} start 
	 * @param {boolean} down 
	 */
	constructor(start, down, identifier=null) {
		this.down = down;
		this.start = start.copy();
		this.path = [];
		this.identifier = identifier;
	}

	drag() {
		if (this.path.length) return this.path[this.path.length-1].to(this.start).length();
		return 0;
	}
}
/**
 * @typedef {Object} Mouse
 * @property {Vector} position the current position
 * @property {MouseButton} leftclick information about the mouse left click button
 * @property {MouseButton} rightclick information about the mouse right click button
 * @property {Menu} selected the current selected menu
 * @property {MouseButton[]} touches
 */
/**
 * @property {Mouse} Mouse information regarding mouse / touch input
 * @property {Object} keymap shows which keys are currently pressed
 */
const Input = {
	mouse:	{
		position: new Vector(0, 0),
		leftclick: new MouseButton(new Vector(0, 0), false),
		rightclick: new MouseButton(new Vector(0, 0), false),
		selected: null,
		touches: []
	},
	keymap: {}
}
const UI = new Menu(new Vector(0, 0), null);
const Time = {
	previousFrameTime: null,
	currentFrameTime: null,
	lastDeltaTime: null,
	deltaTime: null
};
/**
 * @type {Matter.Engine}
 */
let physicsEngine; // physics engine
/**
 * set this to true to stop calc() being called
 */
let paused = false;

let init = () => false;
let calc = () => false;
let draw = () => false;

/**
 * @property {Function[]} mousemove
 * @property {Function[]} mousedown
 * @property {Function[]} mouseup
 * @property {Function[]} keydown
 * @property {Function[]} keyup
 * @property {Function[]} wheel
 * @property {Function[]} touchstart
 * @property {Function[]} touchmove
 * @property {Function[]} touchcancel
 * @property {Function[]} touchend
 */
let events = {
	mousemove  : [],
	mousedown  : [],
	mouseup    : [],
	keydown    : [],
	keyup      : [],
	wheel      : [],
	touchstart : [],
	touchmove  : [],
	touchcancel: [],
	touchend   : [],
}

window.onload = () => {
	physicsEngine = Matter.Engine.create();
	paused = false;
	init();
    requestAnimationFrame(main);
	Time.previousFrameTime = Date.now();
}

let main = () => {
	Time.currentFrameTime = Date.now();
	Time.lastDeltaTime = Time.deltaTime == null ? 1 : Time.deltaTime;
	Time.deltaTime = Time.currentFrameTime - Time.previousFrameTime;
	if (!paused) {
		let totalTimeRequired = Time.deltaTime;
		let previousX = Time.lastDeltaTime%10;
		if (previousX == 0) previousX = 10;
		let currentX = 0;
		let totalTimeDone = 0;
		while (totalTimeDone < totalTimeRequired) {
			currentX = min(totalTimeRequired-totalTimeDone, 10);
			Matter.Engine.update(physicsEngine, currentX, currentX/previousX);
			totalTimeDone += currentX;
			previousX = currentX;
		}
		calc();
	}
	Time.previousFrameTime = Time.currentFrameTime;
    ctx.clearRect(0, 0, c.width, c.height);
    Utility.adjustSize();
	draw();
	UI.draw();
    requestAnimationFrame(main);
}

onmousemove = e => {
	Input.mouse.position = Utility.adjustMousePosition(e.clientX, e.clientY);
	if (Input.mouse.leftclick.down) Input.mouse.leftclick.path.push(Input.mouse.position.copy());
	if (Input.mouse.rightclick.down) Input.mouse.rightclick.path.push(Input.mouse.position.copy());
	for (let f of events.mousemove) f(e);
}
onmousedown = e => {
    if (e.button == 0) {
		Input.mouse.leftclick.down = true;
		Input.mouse.leftclick.start = Input.mouse.position.copy();
		Input.mouse.leftclick.path = [Input.mouse.position.copy()];
		Input.mouse.selected = null;
		
	}
    else if (e.button == 2) {
		Input.mouse.rightclick.down = true;
		Input.mouse.rightclick.start = Input.mouse.position.copy();
		Input.mouse.rightclick.path = [Input.mouse.position.copy()];
	}
	for (let f of events.mousedown) f(e);
}
onmouseup = e => {
    if (e.button == 0) {
		Input.mouse.leftclick.down = false;
		UI.update();
	}
    else if (e.button == 2) Input.mouse.rightclick.down = false;
	for (let f of events.mouseup) f(e);
}
oncontextmenu = e => e.preventDefault(); // custom context menus?

onkeyup = e => {
    Input.keymap[e.key] = false;
    // handle any one-time-per-key-press inputs
	for (let f of events.keyup) f(e);
}

onkeydown = e => {
    Input.keymap[e.key] = true;
    // handle any key-held-down inputs
	for (let f of events.keydown) f(e);
}

onwheel = e => {
    // e.deltaY
	for (let f of events.wheel) f(e);
}

ontouchstart = e => {
	for (let i=0; i<e.touches.length; i++) {
		/**
		 * @type {MouseButton}
		 */
		let touch = {};
		touch.down = true;
		touch.start = Utility.adjustMousePosition(e.touches[i].clientX, e.touches[i].clientY);
		touch.path = [touch.start.copy()];
		touch.identifier = e.touches[i].identifier;
		let previousTouch = Input.mouse.touches.filter(x => x.identifier == touch.identifier);
		if (previousTouch[0]) {
			Input.mouse.touches[Input.mouse.touches.indexOf(previousTouch[0])] = touch;
		} else {
			Input.mouse.touches.push(touch);
		}
		for (let f of events.touchstart) f(e, e.touches[i]);
	}
}
ontouchmove = e => {
	for (let i=0; i < e.changedTouches.length; i++) {
		Input.mouse.touches.forEach(x => {
			if (e.changedTouches[i].identifier == x.identifier) {
				let pos = Utility.adjustMousePosition(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
				x.path.push(pos.copy());
			}
		})
		for (let f of events.touchstart) f(e, e.changedTouches[i]);
	}
}
ontouchcancel = e => {
	for (let i=0; i<e.changedTouches.length; i++) {
		for (let j=Input.mouse.touches.length-1; j>=0; j--) {
			if (e.changedTouches[i].identifier == Input.mouse.touches[j].identifier) {
				Input.mouse.touches[j].down = false;
			}
		}
		for (let f of events.touchstart) f(e, e.changedTouches[i]);
	}
}
ontouchend = e => {
	for (let i=0; i<e.changedTouches.length; i++) {
		for (let j=Input.mouse.touches.length-1; j>=0; j--) {
			if (e.changedTouches[i].identifier == Input.mouse.touches[j].identifier) {
				Input.mouse.touches[j].down = false;
			}
		}
		for (let f of events.touchstart) f(e, e.changedTouches[i]);
	}
}