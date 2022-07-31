class Scene {
    /**
     * @typedef {Object} SceneOptions
     * @property {((scene: Scene) => void)?} init called once, the first time a transition to this scene occurs
     * @property {((scene: Scene) => void)?} cont called when this scene is active and is switched from paused to unpaused
     * @property {((scene: Scene) => void)?} restart called to reset the scene while it is active
     * @property {((scene: Scene) => void)?} pause called when the scene is active and is switched from unpaused to paused
     * @property {((scene: Scene) => void)?} end called when this scene is switching from active to inactive
     * @property {((scene: Scene) => void)?} calc called once every frame while this scene is active. Use this to update the game state
     * @property {((scene: Scene, ctx: CanvasRenderingContext2D) => void)?} draw could be called at any point while this scene is active. Should draw to the given `CanvasRenderingContext2D`
     */
    /**
     * 
     * @param {SceneOptions} options
     * @param {Object} data
     */
    constructor(options = {init:null, cont:null, restart:null, pause:null, end:null, calc:null, draw:null},
        data
    ) {
        this.init = options.init == null ? Scene.init : options.init;
        this.cont = options.cont == null ? Scene.cont : options.cont;
        this.restart = options.restart == null ? Scene.restart : options.restart;
        this.pause = options.pause == null ? Scene.pause : options.pause;
        this.end = options.end == null ? Scene.end : options.end;
        this.calc = options.calc == null ? Scene.calc : options.calc;
        this.draw = options.draw == null ? Scene.draw : options.draw;
        this.data = data;
    }

    static init() { /* do nothing */ }
    static cont() { /* do nothing */ }
    static restart() { /* do nothing */ }
    static pause() { /* do nothing */ }
    static end() { /* do nothing */ }
    static calc() { /* do nothing */ }
    static draw() { /* do nothing */ }
}