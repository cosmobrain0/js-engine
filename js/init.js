init = () => {
    UI.buttons.push(
        new Button(100, 100, 300, 80, "CLICK", [
            /**
             * 
             * @param {Button} btn this
             */
            btn => {
                btn.bgcolour = `rgb(${random()*255}, ${random()*255}, ${random()*255})`;
            }
        ], "#000", "#fff")
    );
}