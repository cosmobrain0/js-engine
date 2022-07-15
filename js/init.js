init = () => {
    RectangleButton(
        UI, 100, 100, 190, 50, "#444", "#fff8", "CLICK", "#fff", "50px Arial",
        [btn => btn.renderer.bgcolour = `rgb(${random()*255}, ${random()*255}, ${random()*255})`]
    );
    CircleButton(
        UI, 300, 400, 35, "#444", "#f00", "Hi", "#fff", "50px Arial", [btn => console.log("hello")]
    );
}
