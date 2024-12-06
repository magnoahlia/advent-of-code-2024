const fs = require('fs');

const input = fs.readFileSync('input/6.txt').toString().trim().split('\n').map(l => [...l]);
const map = input.map(r => r.map(v => v === '#'));

function newPos(r, c) {
	return {r: r, c: c};
}

function getDir(d) {
	switch (d) {
		case 0: return {r: -1, c: 0};
		case 1: return {r: 0, c: 1};
		case 2: return {r: 1, c: 0};
		case 3: return {r: 0, c: -1};
	}
}

let path = [];
for (let r = 0; r < input.length; r++)
for (let c = 0; c < input[r].length; c++) {
	if (input[r][c] === "^") {
		path.push(newPos(r,c));
	}
}

let d = 0;
while (true) {
	const pos = path[path.length - 1];

	if (path.length > 1 && map[pos.r][pos.c]) {
		path.pop();
		d = (d+1)%4;
		continue;
	} 

	const dir = getDir(d);
	const next = newPos(pos.r + dir.r, pos.c + dir.c);
	if (next.r < 0 || next.r >= map.length || next.c < 0 || next.c >= map[0].length) {
		break;
	}

	path.push(next);
}

const unique = new Set(path.map(v => JSON.stringify(v)));
console.log(`P1: ${unique.size}`);

function equals(p1, p2) {
	return p1.r === p2.r && p1.c === p2.c
}

function loopTest(start, oPos) {
	const path = [start]
	const visited = new Set();
	let d = 0;

	while (true) {
		const pos = path[path.length - 1];
		pos.d = d;

		if (path.length > 1 && (map[pos.r][pos.c] || equals(pos, oPos))) {
			path.pop();
			d = (d+1)%4;
			continue;
		} 

		const strP = JSON.stringify(pos);
		if (visited.has(strP)){
			return true;
		}

		visited.add(strP)

		const dir = getDir(d);
		const next = newPos(pos.r + dir.r, pos.c + dir.c);
		if (next.r < 0 || next.r >= map.length || next.c < 0 || next.c >= map[0].length) {
			return false;
		}

		path.push(next);
	}
}

const loops = path.filter((v) => !equals(path[0], v) && loopTest(path[0], v));

console.log(`P2 ${new Set([...loops.map(v => JSON.stringify(v))]).size}`);