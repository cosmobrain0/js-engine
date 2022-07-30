draw = () => {
	beginPath();
	fillStyle("#fff");
	arc(Input.mouse.position.x, Input.mouse.position.y, 20, 0, 2*Math.PI);
	fill();
}