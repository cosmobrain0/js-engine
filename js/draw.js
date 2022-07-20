draw = () => {
	beginPath();
	fillStyle("#fff");
	arc(Mouse.position.x, Mouse.position.y, 20, 0, 2*Math.PI);
	fill();
	
	fillStyle("#f004");
	save();
	translate(player.position.x, player.position.y);
	rotate(player.angle);
	fillRect(-20, -20, 40, 40);
	restore();
}