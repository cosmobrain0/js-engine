class RenderDetails {
    /**
     * 
     * @param {Matter.Body} body 
     * @param {String} fillStyle 
     * @param {String} strokeStyle 
     * @param {Number} lineWidth
     */
    constructor(body, fillStyle, strokeStyle, lineWidth) {
        this.body = body;
        this.fillStyle = fillStyle ? fillStyle : "#0000";
        this.strokeStyle = strokeStyle ? strokeStyle : "#0000";
        this.lineWidth = lineWidth instanceof Number ? lineWidth : 2;
    }
}

/**
 * @type {RenderDetails[]}
 */
const ObjectRenderers = [];

/**
 * creates a `Bodies.rectangle` object with specified renderer details
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} width 
 * @param {Number} height 
 * @param {Matter.IChamferableBodyDefinition} options 
 * @param {String} fillStyle 
 * @param {String} strokeStyle 
 * @param {Number} lineWidth
 */
let RenderRectangle = (x, y, width, height, options, fillStyle, strokeStyle, lineWidth) => {
    let body = Bodies.rectangle(x, y, width, height, options);
    ObjectRenderers.push(new RenderDetails(body, fillStyle, strokeStyle, lineWidth));
    return body;
}
