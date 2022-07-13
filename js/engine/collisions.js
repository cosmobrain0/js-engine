class LineCollider {
    constructor(x1, y1, x2, y2) {
        this.p1 = new Vector(x1, y1);
        this.p2 = new Vector(x2, y2);
    }

    get m() { return (this.p2.y-this.p1.y)/(this.p2.x-this.p1.x); };
    get c() { return this.p1.y - this.m * this.p1.x; }
    get vertical() { return this.p1.x == this.p2.x; }

    y(x) { return this.m * x + this.c };
    x(y) { return (y-this.c)/this.m };
}

class CircleCollider {
    constructor(x, y, r) {
        this.origin = new Vector(x, y);
        this.radius = r;
    }

    get diameter() { return this.radius*2; }
    get sqrRadius() { return this.radius*this.radius; }
}

class RectCollider {
    constructor(x, y, width, height) {
        this.origin = new Vector(x, y); // top left
        this.width = width;
        this.height = height;
    }
}

// TODO: complete

class Collisions {
    /**
     * 
     * @param {LineCollider} line1 
     * @param {LineCollider} line2 
     * @returns {boolean} wether or not the two lines intersect
     */
    static lineLineCollision(line1, line2) {
        if (line1.vertical || line2.vertical) {

        }
        let x = (line2.c - line1.c)/(line1.m - line2.m);
        return (line1.m != line2.m) && inRangeUnordered(x, line1.p1.x, line1.p2.x) && inRangeUnordered(x, line2.p1.x, line2.p2.y);
    }

    /**
     * 
     * @param {LineCollider} line 
     * @param {RectCollider} rect 
     * @returns {boolean}
     */
    static lineRectCollision(line, rect) {
        let rangex = rangeOverlapUnordered(line.p1.x, line.p2.x, rect.origin.x, rect.origin.x+rect.width );
        let rangey = rangeOverlapUnordered(line.p1.y, line.p2.y, rect.origin.y, rect.origin.y+rect.height);
        return (rangex[1] >= rangex[0]) && (rangey[1] >= rangey[0]);
    }
}
