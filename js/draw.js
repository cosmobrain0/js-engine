draw = () => {
	beginPath();
	fillStyle("#fff");
	arc(Mouse.position.x, Mouse.position.y, 20, 0, 2*Math.PI);
	fill();

	bodies = Composite.allBodies(engine.world);

    // for (let i = 0; i < bodies.length; i += 1) {
	// 	beginPath();

    //     let vertices = bodies[i].vertices;

    //     moveTo(vertices[0].x, vertices[0].y);

    //     for (let j = 1; j < vertices.length; j += 1) {
    //         lineTo(vertices[j].x, vertices[j].y);
    //     }

    //     lineTo(vertices[0].x, vertices[0].y);
	// 	let renderer = ObjectRenderers.filter(x => x.body == bodies[i])[0];
	// 	// if (renderer == null) renderer = new RenderDetails();
	// 	lineWidth(renderer.lineWidth);
	// 	strokeStyle(renderer.strokeStyle);
	// 	fillStyle(renderer.fillStyle);
	// 	fill();
	// 	stroke();
    // }
	fillStyle("#f004");
	save();
	translate(player.position.x, player.position.y);
	rotate(player.angle);
	fillRect(-20, -20, 40, 40);
	restore();
}