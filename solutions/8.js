const fs = require('fs');
const Vector2 = require('./util/Vector2.js');
const input = fs.readFileSync('input/8.txt').toString().trim().split('\n');
const bounds = new Vector2(input[0].length, input.length);

const antennas = input.map((l,r) => [...l].reduce((a, v, c) => {
	if (v !== '.') a.push({f: v, p: new Vector2(c,r)});
	return a;
}, [])).flat();

// group by frequency
const grouped = Object.entries(Object.groupBy(antennas, ({f}) => f)).map(v => v[1]);

const p1 = grouped.reduce((set, g) => {
	for (let i = 0; i < g.length; i++) {
		for (let n = 0; n < g.length; n++) {
			if (n===i) continue;
			const to = g[i].p.to(g[n].p);
			const ant = to.add(g[n].p);
			if (ant.x >= 0 && ant.x < bounds.x && ant.y >= 0 && ant.y < bounds.y) {
				set.add(ant.toString());
			}
		}
	}

	return set;
}, new Set());

console.log(p1.size);

const p2 = grouped.reduce((set, g) => {
	for (let i = 0; i < g.length; i++) {
		for (let n = 0; n < g.length; n++) {
			if (n===i) continue;
			const to = g[i].p.to(g[n].p);
			let ant = to.add(g[i].p);
			while (ant.x >= 0 && ant.x < bounds.x && ant.y >= 0 && ant.y < bounds.y) {
				set.add(ant.toString());
				ant = ant.add(to);
			}
		}
	}

	return set;
}, new Set());

console.log(p2.size);