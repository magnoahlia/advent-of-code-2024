class Vector2 {
	constructor (x,y) {
		this.x = x;
		this.y = y;
	}

	to(v) {
		return new Vector2(v.x - this.x, v.y - this.y);
	}

	add(v) {
		return new Vector2(v.x + this.x, v.y + this.y);
	}

	toString() {
		return `(${this.x}, ${this.y})`;
	}

	valueOf() {
		return this.toString();
	}
}

module.exports = Vector2;