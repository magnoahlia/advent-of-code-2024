const fs = require('fs');
const Vector2 = require('./util/Vector2.js')
const { MinPriorityQueue } = require('@datastructures-js/priority-queue');
const input = fs.readFileSync('input/16.txt').toString().trim().split('\n').map(l => l.split(''));

const maze = input.map(r => r.map(v => v === '#'));

function findToken(map, token) {
	for (let r = 0; r < map.length; r++) 
	for (let c = 0; c < map[r].length; c++) {
		if (map[r][c] === token) {
			return new Vector2(c, r);
		}
	}
}

const start = findToken(input, 'S');
const end = findToken(input, 'E');

function pathfind(maze, start, end) {
	const front = new MinPriorityQueue(e => e[2]);
	const costs = new Map();
	const cameFrom = new Map();

	front.enqueue([start, new Vector2(1, 0), 0]);
	costs.set(JSON.stringify(start), 0);

	const from = (pos, dir, cost) => [pos.add(dir), dir, cost];

	while (!front.isEmpty()) {
		const [current, dir, cost] = front.dequeue();
		// console.log(cost);
		// printPath(maze, start, current, cameFrom);
		if (current.equals(end)) {
			printPath(maze, start, end, cameFrom);
			return cost;
		}

		const turn = dir.flipped();
		const nextPossible = [
			from(current, dir, cost + 1),
			from(current, turn, cost + 1001),
			from(current, new Vector2(-turn.x, -turn.y), cost + 1001),
			from(current, new Vector2(-dir.x, -dir.y), cost + 2001)
		];

		for ([next, d, c] of nextPossible)  {
			if (maze[next.y][next.x]) continue;

			const nextKey = JSON.stringify(next);
			if (!costs.has(nextKey) || c < costs.get(nextKey)) {
				costs.set(nextKey, c);
				front.enqueue([next, d, c]);
				cameFrom.set(nextKey, current);
			}
		}
	}
}

function printPath(maze, start, end, cameFrom) {
	const path = [end];
	while (path[0] && !path[0].equals(start)) {
		path.splice(0,0, cameFrom.get(JSON.stringify(path[0])));
	}

	for (let r = 0; r < maze.length; r++) {
		let l = '';
		for (let c = 0; c < maze.length; c++) {
			var p = new Vector2(c, r);
			if (p.equals(start)) {
				l += 'S';
				continue;
			}

			if (p.equals(end)) {
				l += 'E';
				continue;
			}

			l += path.some(p => p?.equals(new Vector2(c, r))) ? '.' : maze[r][c] ? '#' : ' ';
		}
		console.log(l);
	}
}

console.log(pathfind(maze, start, end));