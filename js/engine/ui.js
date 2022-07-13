class Item {
	/**
	 * 
	 * @param {Number} x 
	 * @param {Number} y 
	 * @param {Number} width 
	 * @param {Number} height 
	 */
	constructor(x, y, width, height) {
		this.position = new Vector(x, y);
		this.size = new Vector(width, height);
		this.active = false;
	}

	get x() { return this.position.x; }
	get y() { return this.position.y; }
	set x(v) { this.position.x = x; }
	set y(v) { this.position.y = y; }
	
	get width() { return this.size.x; }
	get height() { return this.size.y; }
	set width(v) { this.size.x = v; }
	set height(v) { this.size.y = v; }

	hover(point) {
		return inRange(point.x, this.x, this.x+this.width) && inRange(point.y, this.y, this.y+this.height);
	}
}

class Button extends Item {
	/**
	 * 
	 * @param {Number} x 
	 * @param {Number} y 
	 * @param {Number} width 
	 * @param {Number} height 
	 * @param {String} text 
	 * @param {Function[]} events 
	 * @param {String} bgcolour 
	 * @param {String} txtcolour 
	 * @param {Number?} idealSize 
	 * @param {boolean|Function?} draggable
	 */
	constructor(x, y, width, height, text, events, bgcolour, txtcolour, idealSize, draggable) {
		super(x, y, width, height);
		this.events = events.slice();
		this.text = text;
		this.bgcolour  = bgcolour  || `rgb(100, 100, 100)`;
		this.txtcolour = txtcolour || `rgb(230, 230, 230)`;
		this.idealSize = idealSize || null;
		this.sprite = null;
		this.active = true;
		this.beginDragged = false;
		this.draggablePositions = draggable ? (draggable instanceof Function ? draggable : (position => true)) : (position => position.x == x && position.y == y);
	}

	toggleActive() { this.active = !this.active }

	/**
	 * 
	 * @param {Vector} pointer 
	 * @param {boolean} clicking 
	 */
	update(pointer, clicking) {
		if (clicking && this.active && this.hover(pointer)) {
			for (let evt of this.events) (evt.bind(this, this))();
		}
	}

	/**
	 * 
	 * @param {boolean} override 
	 */
	draw(override) {
		if (override || this.active) {
			if (this.sprite) {
				drawImage(
					this.sprite,
					0, 0, this.sprite.width, this.sprite.height,
					this.x, this.y, this.width, this.height
				);
			} else {
				let sizeFromWidth = this.width*0.9 / this.text.length / 0.6;
				let sizeFromHeight = this.height*0.9 / 0.8;
				let idealSize = this.idealSize != null ? this.idealSize : parseInt(Math.min(sizeFromWidth, sizeFromHeight));
				ctx.fillStyle = this.bgcolour;
				ctx.fillRect(this.x, this.y, this.width, this.height);
				ctx.font = `${idealSize}px Courier New`;
				ctx.fillStyle = this.txtcolour;
				ctx.fillText(this.text, this.x+this.width/2 - idealSize*0.6*this.text.length/2, this.y+idealSize*0.8/2+this.height/2);
			}
		}
	}
}

class Menu {
	#isActive;

	constructor() {
		this.menus = [];
		this.buttons = [];
		this.#isActive = false;
		this.active = true;
	}

	set active(v) {
		for (let menu of this.menus) menu.active = v;
		for (let button of this.buttons) button.active = v;
		this.#isActive = v;
	}

	get active() { return this.#isActive; }

	toggleActive() { this.active = !this.active }

	/**
	 * 
	 * @param {Vector} pointer 
	 * @param {boolean} clicking 
	 */
	update(pointer, clicking) {
		for (let menu of this.menus) menu.update(pointer, clicking);
		for (let button of this.buttons) button.update(pointer, clicking);
	}

	/**
	 * 
	 * @param {boolean} menuOverride 
	 * @param {boolean} buttonOverride 
	 */
	draw(menuOverride, buttonOverride) {
		for (let menu of this.menus) menu.draw(menuOverride);
		for (let button of this.buttons) button.draw(buttonOverride);
	}
}
