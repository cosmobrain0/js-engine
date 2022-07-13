class Button {
	constructor(position, callbacks) {
		this.collider = new Collider();
		this.renderer = new Renderer();
		this.callbacks = callbacks;
		this.position = position.copy();
	}

	get hover() {
		return this.collider.intersects(Mouse.position);
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
	constructor(position) {
		this.collider = new Collider();
		this.renderer = new Renderer();
		this.position = position.copy();
		// add dragging stuff to menu, not button
	}

	get hover() {
		return this.collider.intersects(Mouse.position);
	}

	draw() {
		this.renderer.render();
	}
}
