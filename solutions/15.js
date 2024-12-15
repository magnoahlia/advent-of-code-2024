const fs = require('fs');
const Vector2 = require('./util/Vector2.js')
const input = fs.readFileSync('input/15.txt').toString().trim().split('\n\n');

function toDirection(c) {
	switch (c) {
		case '^': return new Vector2(0, -1);
		case '>': return new Vector2(1, 0);
		case 'v': return new Vector2(0, 1);
		case '<': return new Vector2(-1, 0);
	}
}

const directions = input[1].split('\n').flatMap(l => l.split('')).map(v => toDirection(v));
const map = input[0].split('\n').map((l) => l.split(''));

const mapAt = (map, pos) => map[pos.y][pos.x];

function findRobot(map) { 
	for (let r = 0; r < map.length; r++) 
	for (let c = 0; c < map[r].length; c++) {
		if (map[r][c] === '@') {
			map[r][c] = '.';
			return new Vector2(c, r);
		}
	}
}

const gpsScore = (map, token) => map.reduce((s, row, r) => s + row.reduce((s, v, c) => s+(v === token ? 100*r+c : 0), 0), 0);

// part 1
let robot = findRobot(map); 
for (d of directions) {
	const move = [robot];

	while (true) {
		const p = move[move.length - 1];
		const np = p.add(d);
		const nt = mapAt(map, np);

		if (nt === '.') {
			break;
		} else if (nt === '#') {
			move.length = 0;
			break;
		} else {
			move.push(np);
		}
	}

	while (move.length > 0) {
		const p = move.pop();
		const np = p.add(d);

		if (p.equals(robot)) {
			robot = np;
			continue;
		}

		const nt = mapAt(map, np);
		map[np.y][np.x] = mapAt(map, p);
		map[p.y][p.x] = nt;
	}
}

console.log(gpsScore(map, 'O'));

// part 2
const bigMap = input[0].split('\n').map((l) => l.split('')).map(l => l.flatMap(v => {
	switch (v) {
		case '@': return ['@', '.'];
		case 'O': return ['[', ']'];
		default: return [v, v];
	}
}));

robot = findRobot(bigMap);
for (d of directions) {
	const move = new Map();
	const search = [robot];

	while (search.length > 0) {
		const p = search.shift();
		const ps = JSON.stringify(p);
		if (move.has(ps)) continue;

		const np = p.add(d);
		const nt = mapAt(bigMap, np);

		if (nt === '#') {
			move.clear();
			break;
		}

		move.set(ps, p);

		if (nt === '.') {
			continue;
		}

		if (d.y !== 0) {
			const op = np.add(new Vector2(nt === '[' ? 1 : -1, 0));

			if (op.x > np.x) {
				search.push(np);
				search.push(op);
			} else if (op.x < np.x) {
				search.push(op);
				search.push(np);
			}

		} else {
			search.push(np);
		}
	}

	const moves = [...move].map(([k,p]) => p);
	while (moves.length > 0) {
		const p = moves.pop();
		const np = p.add(d);

		if (p.equals(robot)) {
			robot = np;
			continue;
		}

		const nt = mapAt(bigMap, np);
		bigMap[np.y][np.x] = mapAt(bigMap, p);
		bigMap[p.y][p.x] = nt;
	}
}

console.log(gpsScore(bigMap, '['));