init = () => {
    RectangleButton(
        UI, 100, 100, 190, 50, "#444", "#fff8", "CLICK", "#fff", "50px Arial",
        [btn => btn.renderer.bgcolour = `rgb(${random()*255}, ${random()*255}, ${random()*255})`]
    );
    CircleButton(
        UI, 300, 400, 35, "#444", "#f00", "Hi", "#fff", "50px Arial", [btn => console.log("hello")]
    );
    player = RenderRectangle(1280, 0, 40, 40, null, "#fff", "#07f", 5);
    Body.rotate(player, PI/180 * 30);
    walls = [];
    coins = [RenderRectangle(1280, 700, 20, 20, { isSensor: true, isStatic: true }, "#fff", null, null)];
    walls.push(
        RenderRectangle(0, 720, 10, 1440, { isStatic: true }, "#f00", null, null),
        RenderRectangle(2560, 720, 10, 1440, { isStatic: true }, "#f00", null, null),
        RenderRectangle(1280, 0, 2560, 10, { isStatic: true }, "#f00", null, null),
        RenderRectangle(1280, 1440, 2560, 10, { isStatic: true }, "#f00", null, null)
    )
    Composite.add(engine.world, [player, ...walls, ...coins]);
    Matter.Events.on(engine, "collisionStart", evt => {
        let pairs = evt.pairs.filter(x => (x.bodyA == player && coins.includes(x.bodyB)) || (x.bodyB == player && coins.includes(x.bodyA)));;
        pairs.forEach(x => Matter.World.remove(engine.world, x.bodyA == player ? x.bodyB : x.bodyA));
        if (pairs.length) console.log("player collision");
    })
}
