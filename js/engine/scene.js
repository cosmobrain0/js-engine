class Scene {
    /**
     * 
     * @param {SceneOptions} options
     * @param {Object} data
     */
    constructor(options = {init:null, cont:null, restart:null, pause:null, end:null, calc:null, draw:null},
        data
    ) {
        this.init = options.init == null ? Scene.defaultInit : options.init;
        this.cont = options.cont == null ? Scene.defaultCont : options.cont;
        this.restart = options.restart == null ? Scene.defaultRestart : options.restart;
        this.pause = options.pause == null ? Scene.defaultPause : options.pause;
        this.end = options.end == null ? Scene.defaultEnd : options.end;
        this.calc = options.calc == null ? Scene.defaultCalc : options.calc;
        this.draw = options.draw == null ? Scene.defaultDraw : options.draw;
        this.data = data;
        this.UI = new Menu(new Vector(0, 0), null);
        this.requiresInit = true;
        this.requiresRestart = false;
    }

    static defaultInit() { /* do nothing */ }
    static defaultCont() { /* do nothing */ }
    static defaultRestart() { /* do nothing */ }
    static defaultPause() { /* do nothing */ }
    static defaultEnd() { /* do nothing */ }
    static defaultCalc() { /* do nothing */ }
    static defaultDraw() { this.UI.draw(); }

    /**
     * 
     * @param {Scene} scene 
     */
    static load(scene) {
        paused = true;
        if (currentScene) {
            currentScene.pause();
            currentScene.end();
        }
        currentScene = scene;
        if (currentScene.requiresInit) currentScene.init();
        if (currentScene.requiresRestart) currentScene.restart();
        paused = false;
    }
}