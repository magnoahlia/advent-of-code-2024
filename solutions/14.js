const fs = require('fs');
const { mod, lcm } = require('./util/math.js');
const input = fs.readFileSync('input/14ex.txt').toString().trim().split('\n')
	.map(l => l.split(' ').map(p => p.substring(2).split(',').map(v => parseInt(v))))

const b = [11, 7];
// const b = [101, 103];
const t = 100;
const qs = b.map(c => Math.floor(c/2));

function simComp(p, v, b, t) {
	return mod(p + v * t, b);
}

function sim(p, v, b, t) {
	return p.map((pc, i) => simComp(pc, v[i], b[i], t));
}

const positions = input.map(r => sim(r[0], r[1], b, t));

function areaCount(positions, origin, size) {
	const max = origin.map((c,i) => c + size[i]);
	return positions.reduce((s, p) => s + (p.every((c,i) => c >= origin[i] && c < max[i]) ? 1 : 0), 0);
}

console.log(areaCount(positions, [0,0], qs) *
			areaCount(positions, [qs[0]+1, 0], qs) *
			areaCount(positions, [0, qs[1]+1], qs) *
			areaCount(positions, qs.map(c => c+1), qs));


function draw(t) {
	const pos = input.map(r => sim(r[0], r[1], b, t));
	console.log(t);
	for (y = 0; y < b[1]; y++) {
		let l = '';
		for (x = 0; x < b[0]; x++) {
			l += (pos.some(p => p[0] === x && p[1] === y)) ? 'O' : '.';
		}
		console.log(l);
	}
}

// naughty brute force solution--print the full set of states and find the tree
// todo: do this better!
for (i = 0; i < lcm(...b); i++) 
{
	draw(i);
}