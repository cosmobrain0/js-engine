init = () => {
    UI.addButton(new Button(
        UI, new Vector(100, 100), new RectangleCollider(null, 190, 50), new RectangleRenderer(null, 190, 50, "#444", "CLICK", "#fff", "50px Arial"), [
            (btn) => btn.renderer.bgcolour = `rgb(${random()*255}, ${random()*255}, ${random()*255})`,
        ]
    ));
}