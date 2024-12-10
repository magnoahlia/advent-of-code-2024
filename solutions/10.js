const fs = require('fs');
const Vector2 = require('./util/Vector2');

const input = fs.readFileSync('input/10.txt').toString().trim().split('\n').map((l,r) => l.split('').map((v,c) => ({h: parseInt(v), p: new Vector2(c,r)})));
const size = new Vector2(input[0].length, input.length);
const trailheads = input.flat().filter(v => v.h === 0);

function pathfindScore(head, greedy) {
	let score= 0;

	const visited = greedy ? null : new Set();

	const front= [head];
	while (front.length > 0) {
		const c = front.pop();

		if (visited) visited.add(c.p);

		if (c.h === 9) {
			score++;
			continue;
		}

		for (let d = 0; d < 4; d++) {
			const np = c.p.add(Vector2.fromDirection(d));
			if (np.x < 0 || np.x >= size.x || np.y < 0 || np.y >= size.y) continue;

			const n = input[np.y][np.x];
			if (visited && visited.has(n.p)) continue;

			if (n.h - c.h === 1) front.push(n);
		}
	}

	return score;
}

console.log(trailheads.reduce((s, head) => s + pathfindScore(head), 0));
console.log(trailheads.reduce((s, head) => s + pathfindScore(head, true), 0));