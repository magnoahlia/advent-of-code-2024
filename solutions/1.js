const fs = require('fs');

// Part 1

const lists = fs.readFileSync('input/1.txt').toString().split('\n').reduce((a, v) => {
	const p = v.split('   ');
	a[0].push(p[0]);
	a[1].push(p[1]);
	return a;
}, [[],[]]);

lists.forEach(l => l.sort());

let sum = 0;
for (let i = 0; i < lists[0].length; i++) {
	sum += Math.abs(lists[0][i]-lists[1][i]);
}

console.log(`P1: ${sum}`);

// Part 2

const counts = lists[1].reduce((d, v) => {
	d[v] = (d[v]|0) + 1;
	return d;
}, {});

const p2Sum = lists[0].reduce((s, v) => s += v*(counts[v]|0), 0);

console.log(`P2: ${p2Sum}`);