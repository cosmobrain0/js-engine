class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    to(other) {
        return Vector.subtract(other, this);
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    theta() {
        return Math.atan2(this.y, this.x);
    }

    sqrLength() {
        return this.x ** 2 + this.y ** 2;
    }

    calculateCartesian(theta, length) {
        this.x = Math.cos(theta) * length;
        this.y = Math.sin(theta) * length;
    }

    setCartesian(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        // this.calculatePolar();
        return this;
    }

    setPolar(theta = 0, length = 0) {
        /*this.theta = theta;
        this.length = length;*/
        this.calculateCartesian(theta, length);
        return this;
    }

    add(x = 0, y = 0) {
        if (x instanceof Vector) {
            this.x += x.x;
            this.y += x.y;
            // this.calculatePolar();
            return this;
        }
        this.x += x;
        this.y += y;
        // this.calculatePolar();
        return this;
    }
	
    subtract(x = 0, y = 0) {
        if (x instanceof Vector) {
            this.x -= x.x;
            this.y -= x.y;
            // this.calculatePolar();
            return this;
        }
        this.x -= x;
        this.y -= y;
        // this.calculatePolar();
        return this;
    }

    rotate(theta = 0) {
        // this.theta += theta;
        this.calculateCartesian(this.theta() + theta, this.length());
        return this;
    }

    extend(length = 0) {
        this.length += length;
        this.calculateCartesian(this.theta(), this.length() + length);
        return this;
    }

    multiply(value = 1) {
        this.calculateCartesian(this.theta(), this.length() * value);
        return this;
    }

    normalise() {
        this.calculateCartesian(this.theta(), 1);
        return this;
    }

    distanceTo(other) {
        return Vector.subtract(this, other).length();
    }

    sqrDistanceTo(other) {
        return Vector.subtract(this, other).sqrLength();
    }

    static dot(vector1, vector2) {
        return vector1.x * vector2.x + vector1.y * vector2.y;
    }

    static normalised(vector) { // yes that's how it's spelt. Deal with it.
        return Vector.fromPolar(vector.theta(), 1);
    }

    static add(vector1, vector2) {
        return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
    }

    static subtract(vector1, vector2) {
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    }

    static multiply(vector, scalar) {
        return new Vector(vector.x * scalar, vector.y * scalar);
    } // to divide, give 1/scalar

    static fromPolar(theta, length) {
        let angle = Math.abs(theta) >= Math.PI ? (2 * Math.PI) - (theta * -1) : theta;
        return new Vector(Math.cos(angle) * length, Math.sin(angle) * length);
    }

    static copy(vector) {
        return new Vector(vector.x, vector.y);
    }

    static project(start, projection) {
        return Vector.multiply(projection, Vector.dot(start, projection)/Vector.dot(projection, projection));
    }

    static random(maxX, maxY) {
        return new Vector(Math.random()*maxX, Math.random()*maxY);
    }

    static lerp(a, b, t) {
        return Vector.subtract(b, a).multiply(t).add(a);
    }
}
