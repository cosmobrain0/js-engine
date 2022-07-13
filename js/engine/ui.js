class RectangleCollider {
	/**
	 * 
	 * @param {Button} parent 
	 * @param {Number} width 
	 * @param {Number} height 
	 */
	constructor(parent, width, height) {
		this.parent = parent;
		this.size = new Vector(width, height);
	}

	/**
	 * 
	 * @param {Vector} position the point to test
	 * @returns {boolean} if the point is over this collider
	 */
	intersects(position) {
		return false;
	}
}

class CircleCollider {
	/**
	 * 
	 * @param {Button} parent 
	 * @param {Number} radius 
	 */
	constructor(parent, radius) {
		this.parent = parent;
		this.radius = radius;
	}

	/**
	 * 
	 * @param {Vector} position the point to test
	 * @returns {boolean} if the point is over this collider
	 */
	intersects(position) {
		return false;
	}
}

class RectangleRenderer {
	constructor(parent, width, height, bgcolour, text, txtcolour, font) {
		this.parent = parent;
		this.width = width;
		this.height = height;
		this.bgcolour = bgcolour;
		this.text = text;
		this.txtcolour = txtcolour;
		this.txtsize = txtsize;
	}

	render() {
		let position = this.parent.globalPosition;
		fillStyle(this.bgcolour);
		fillRect(position.x, position.y, this.width, this.height);
		fillStyle(this.txtcolour);
		font(this.font);
		fillText(position.x+position.width*0.1, position.y+position.height-position.height*0.1);
	}
}

// TODO: Circle Renderer
// TODO: example rectangle button and examlpe circle button
// TODO: RectangleButton class and CircleButton class
// TODO: Renderer support for hover effects and images

/**
 * @typedef {RectangleCollider|CircleCollider} Collider
 */

class Button {
	/**
	 * 
	 * @param {Menu} parent 
	 * @param {Vector} position 
	 * @param {Collider} collider
	 * @param {Renderer} renderer
	 * @param {Function[]} callbacks 
	 * @param {Collider} collider
	 */
	constructor(parent, position, collider, renderer, callbacks) {
		this.collider = collider;
		this.renderer = renderer;
		this.collider.parent = this;
		this.renderer.parent = this;
		this.callbacks = callbacks;
		this.position = position.copy();
		this.parent = parent; // a menu
	}

	get hover() {
		return this.collider.intersects(Mouse.position);
	}

	get globalPosition() {
		return Vector.add(this.parent.globalPosition, this.position);
	}

	click() {
		for (let callback of this.callbacks) {
			callback.bind(this, this)();
		}
	}

	draw() {
		this.renderer.render();
	}
}

class Menu {
	constructor(position, parent) {
		this.position = position.copy();
		// NOTE: add dragging stuff to menu, not button
		this.parent = parent; // Menu or null
		this.buttons = [];
	}

	get hover() {
		return this.collider.intersects(Mouse.position);
	}

	get globalPosition() {
		return this.parent == null ? this.position.copy() : Vector.add(this.parent.globalPosition, this.position);
	}

	addButton(btn) {
		this.buttons.push(btn);
	}

	draw() {
		this.renderer.render();
	}
}
