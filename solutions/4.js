const fs = require('fs');
const input = fs.readFileSync('input/4.txt').toString().trim();
const grid = input.split('\n').map(l=>[...l]);

// part 1
const word = 'XMAS';
function findFrom(x, y) {
	if (grid[y][x] !== word[0]) return 0;

	return wordSearch(x,y,1,0) + wordSearch(x,y,-1,0)
		+ wordSearch(x,y,0,1) + wordSearch(x,y,0,-1)
		+ wordSearch(x,y,1,-1) + wordSearch(x,y,-1,1)
		+ wordSearch(x,y,1,1) + wordSearch(x,y,-1,-1);
}

function wordSearch(x, y, dx, dy) {
	for (let t = 0; t < word.length; t++) {
		if (x >= grid[0].length || x < 0 || y >= grid.length || y < 0) return 0;
		if (grid[y][x] !== word[t]) return 0;

		x += dx;
		y += dy;
	}

	return 1;
}

let sum = grid.reduce((s, l, y) => s + l.reduce((s, _, x) => s + findFrom(x,y), 0), 0);

console.log(`P1 ${sum}`);

// part 2
function xSearch(x, y) {
	if (grid[y][x] !== 'A') return false;
	if (x < 1 || x >= grid[y].length - 1) return false;
	if (y < 1 || y >= grid.length - 1) return false;

	const t = grid[y-1];
	const tl = t[x-1];
	if (tl !== 'M' && tl !== 'S') return false;
	const b = grid[y+1];
	const bl = b[x-1];

	const other = tl == 'M' ? 'S' : 'M';
	if (bl === tl) {
		return t[x+1] === other && b[x+1] === other;
	}
	else if (bl === other) {
		return t[x+1] === tl && b[x+1] === bl;
	}

	return false;
}

sum = grid.reduce((s, l, y) => s + l.reduce((s, _, x) => s + (xSearch(x,y) ? 1 : 0), 0), 0);

console.log(`P2 ${sum}`);