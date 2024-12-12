class Vector2 {
	constructor (x,y) {
		this.x = x;
		this.y = y;
	}

	clone()  {
		return new Vector2(this.x, this.y);
	}

	to(v) {
		return new Vector2(v.x - this.x, v.y - this.y);
	}

	add(v) {
		return new Vector2(v.x + this.x, v.y + this.y);
	}

	equals(v) {
		return v.x === this.x && v.y === this.y;
	}

	toString() {
		return `(${this.x}, ${this.y})`;
	}

	valueOf() {
		return this.toString();
	}

	static fromDirection(d) { return this.constructor.Directions[d]; }

	static get Directions() { return [
		new Vector2(0,1),
		new Vector2(1,0),
		new Vector2(0,-1),
		new Vector2(-1,0)
	]};
}

module.exports = Vector2;