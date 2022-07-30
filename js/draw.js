draw = () => {
	beginPath();
	fillStyle("#fff");
	arc(Mouse.position.x, Mouse.position.y, 20, 0, 2*Math.PI);
	fill();
}