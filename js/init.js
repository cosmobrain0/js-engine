init = () => {
    RectangleButton(
        UI, 100, 100, 190, 50, "#444", "#fff8", "CLICK", "#fff", "50px Arial",
        [btn => btn.renderer.bgcolour = `rgb(${random()*255}, ${random()*255}, ${random()*255})`]
    );
    CircleButton(
        UI, 300, 400, 35, "#444", "#f00", "Hi", "#fff", "50px Arial", [btn => console.log("hello")]
    );
    player = Bodies.rectangle(1280, 0, 40, 40, null);
    Body.rotate(player, PI/180 * 30);
    walls = [];
    coins = [Bodies.rectangle(1280, 700, 20, 20, { isSensor: true, isStatic: true })];
    walls.push(
        Bodies.rectangle(0, 720, 10, 1440, { isStatic: true }),
        Bodies.rectangle(2560, 720, 10, 1440, { isStatic: true }),
        Bodies.rectangle(1280, 0, 2560, 10, { isStatic: true }),
        Bodies.rectangle(1280, 1440, 2560, 10, { isStatic: true })
    )
    Composite.add(engine.world, [player, ...walls, ...coins]);
}
