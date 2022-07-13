draw = () => {
	beginPath();
	fillStyle("#fff");
	arc(Mouse.position.x, Mouse.position.y, 20, 0, 2*Math.PI);
	fill();

	if (Mouse.leftclick.down) {
		strokeStyle("#00f");
		lineWidth(5);
		beginPath();
		moveTo(Mouse.leftclick.start.x, Mouse.leftclick.start.y);
		lineTo(Mouse.position.x, Mouse.position.y);
		stroke();
	}
	if (Mouse.rightclick.down) {
		strokeStyle("#f00");
		lineWidth(5);
		beginPath();
		moveTo(Mouse.rightclick.start.x, Mouse.rightclick.start.y);
		lineTo(Mouse.position.x, Mouse.position.y);
		stroke();
	}
	if (Mouse.leftclick.path.length) {
		strokeStyle("#04f");
		lineWidth(7);
		beginPath();
		moveTo(Mouse.leftclick.start.x, Mouse.leftclick.start.y);
		for (let {x, y} of Mouse.leftclick.path) {
			lineTo(x, y);
		}
		stroke();
	}
	if (Mouse.rightclick.path.length) {
		strokeStyle("#f40");
		lineWidth(7);
		beginPath();
		moveTo(Mouse.rightclick.start.x, Mouse.rightclick.start.y);
		for (let {x, y} of Mouse.rightclick.path) {
			lineTo(x, y);
		}
		stroke();
	}
}