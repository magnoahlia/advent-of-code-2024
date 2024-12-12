const fs = require('fs');
const Vector2 = require('./util/Vector2.js')
const input = fs.readFileSync('input/12.txt').toString().trim().split('\n').map((l) => l.split(''));
const size = new Vector2(input[0].length, input.length);

function isEdge(pos, plant) {
	if (pos.x < 0 || pos.x >= size.x || pos.y < 0 || pos.y >= size.y) return true;
	return input[pos.y][pos.x] !== plant;
}

// flood fill to find regions and edges
const plots = [];
const found = new Set();
for (let r = 0; r < input.length; r++) 
for (let c = 0; c < input[r].length; c++) {
	const firstPos = new Vector2(c, r);
	if (found.has(firstPos.toString())) continue;
	const first = input[r][c];
	const plot = {plant: first, positions: [], edges: []};
	let front = [firstPos];
	while (front.length > 0) {
		const currPos = front.pop();

		if (found.has(currPos.toString())) continue;

		found.add(currPos.toString());
		plot.positions.push(currPos);

		for (pos of Vector2.Directions.map(d => d.add(currPos))) {
			if (isEdge(pos, plot.plant)) {
				plot.edges.push({pos: pos, adj: currPos.clone()});
			} else {
				front.push(pos);
			}
		}
	}

	plots.push(plot);
}

console.log(plots.reduce((s, plot) => s + (plot.positions.length * plot.edges.length), 0));

// part 2

// an side is a continuous run of edges in a direction (x or y)
// no side shares edges with another side
// BUT there can be more than one edge/side of for same position (i.e. internal holes)
let price = 0;
for (plot of plots) {
	let sides = 0;
	const found = new Set();
	plot.edges.sort((a, b) => a.pos.x - b.pos.x).sort((a, b) => a.pos.y - b.pos.y);
	for (let e = 0; e < plot.edges.length; e++) {
		const curr = plot.edges[e];
		if (found.has(curr)) continue;
		const side = [curr];
		let dir;
		for (let n = e + 1; n < plot.edges.length; n++) {
			const next = plot.edges[n];
			if (found.has(next)) continue;

			const toPos = side[side.length - 1].pos.to(next.pos);

			if (!((toPos.x === 1 && toPos.y === 0) || (toPos.x === 0 && toPos.y === 1))) continue;

			const toAdj = side[side.length - 1].adj.to(next.adj);
			if (!toAdj.equals(toPos)) continue;
			if (dir && !toPos.equals(dir)) continue;

			dir = toPos;
			found.add(next);
			side.push(next);
		}
		sides++;
	}
	const plotPrice = plot.positions.length * sides;

	price += plotPrice;
}

console.log(price);

// too low: 884729